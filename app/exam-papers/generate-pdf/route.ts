export const runtime = 'nodejs';

type ExamQuestion = {
  id?: string | number;
  questionText: string;
  options: string[];
  correctAnswerIndex?: number; // 0..n
  explanation?: string;
};

type ExamPaper = {
  title: string;
  subject: string;
  board?: string;
  timeAllowed?: string;
  instructions?: string;
  passage?: string;
  questions: ExamQuestion[];
};

function pdfStringEscape(s: string) {
  // Escape backslashes and parentheses for PDF literal strings: ( ... )
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function safeText(input: unknown, fallback = ''): string {
  if (typeof input !== 'string') return fallback;
  // Strip CR to normalize; keep LF for wrapping logic.
  return input.replace(/\r/g, '');
}

function toTitleCase(s: string) {
  return s.replace(/\b\w/g, (m) => m.toUpperCase());
}

function wrapText(text: string, maxChars: number): string[] {
  const raw = safeText(text, '').split('\n');
  const out: string[] = [];
  for (const para of raw) {
    const words = para.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) {
      out.push('');
      continue;
    }
    let line = '';
    for (const w of words) {
      if (!line) {
        line = w;
        continue;
      }
      if ((line + ' ' + w).length <= maxChars) {
        line += ' ' + w;
      } else {
        out.push(line);
        line = w;
      }
    }
    if (line) out.push(line);
  }
  return out;
}

type Line = { text: string; size?: number; bold?: boolean };

function buildPaperLines(paper: ExamPaper): Line[] {
  const title = safeText(paper.title, '11+ Exam Paper');
  const subject = safeText(paper.subject, 'Subject');
  const board = safeText(paper.board, 'Standard');
  const timeAllowed = safeText(paper.timeAllowed, 'Not specified');
  const instructions = safeText(
    paper.instructions,
    'Answer all questions. Choose the best answer for each question.'
  );

  const lines: Line[] = [];

  // Cover-style header (simple)
  lines.push({ text: '11 Plus Exam Papers', size: 16, bold: true });
  lines.push({ text: title, size: 18, bold: true });
  lines.push({ text: `${toTitleCase(subject)} • ${board} Style`, size: 12 });
  lines.push({ text: `Time Allowed: ${timeAllowed}`, size: 11 });
  lines.push({ text: `Total Questions: ${paper.questions.length}`, size: 11 });
  lines.push({ text: '' });
  lines.push({ text: 'Instructions', size: 12, bold: true });
  wrapText(instructions, 92).forEach((t) => lines.push({ text: t, size: 10 }));
  lines.push({ text: '' });
  lines.push({ text: '—', size: 10 });
  lines.push({ text: '' });

  if (paper.passage) {
    lines.push({ text: 'Reading Passage', size: 12, bold: true });
    wrapText(paper.passage, 92).forEach((t) => lines.push({ text: t, size: 10 }));
    lines.push({ text: '' });
  }

  lines.push({ text: 'Questions', size: 13, bold: true });
  lines.push({ text: '' });

  paper.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    wrapText(`${qNum}. ${safeText(q.questionText, '')}`, 92).forEach((t) =>
      lines.push({ text: t, size: 11 })
    );
    const opts = Array.isArray(q.options) ? q.options : [];
    opts.forEach((opt, j) => {
      const letter = String.fromCharCode(65 + j);
      wrapText(`   ${letter}. ${safeText(opt, '')}`, 88).forEach((t) =>
        lines.push({ text: t, size: 10 })
      );
    });
    lines.push({ text: '' });
  });

  // Answer key
  lines.push({ text: 'Answer Key (Parents & Tutors)', size: 13, bold: true });
  lines.push({ text: '' });

  paper.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const ansIdx = typeof q.correctAnswerIndex === 'number' ? q.correctAnswerIndex : 0;
    const letter = String.fromCharCode(65 + Math.max(0, ansIdx));
    const expl = safeText(q.explanation, '');
    lines.push({ text: `${qNum}. ${letter}`, size: 11, bold: true });
    if (expl) {
      wrapText(`Explanation: ${expl}`, 92).forEach((t) => lines.push({ text: t, size: 10 }));
    }
    lines.push({ text: '' });
  });

  return lines;
}

// Minimal PDF builder (text only, built-in Helvetica)
function buildPdfFromLines(lines: Line[]): Uint8Array {
  // A4 in points
  const PAGE_W = 595.28;
  const PAGE_H = 841.89;

  const M_LEFT = 48;
  const M_RIGHT = 48;
  const M_TOP = 56;
  const M_BOTTOM = 56;

  const MAX_CHARS_APPROX = 92; // used earlier for wrapping; keeps it readable

  // Layout rules
  const defaultFontSize = 11;
  const lineGap = 3;

  // Break into pages by vertical space
  type Page = { ops: string[] };
  const pages: Page[] = [];

  let y = PAGE_H - M_TOP;
  let current: Page = { ops: [] };

  function newPage() {
    pages.push(current);
    current = { ops: [] };
    y = PAGE_H - M_TOP;
  }

  function setFont(size: number) {
    // /F1 is Helvetica
    current.ops.push(`/F1 ${size} Tf`);
  }

  function moveTo(x: number, yPos: number) {
    current.ops.push(`${x.toFixed(2)} ${yPos.toFixed(2)} Td`);
  }

  function show(text: string) {
    current.ops.push(`(${pdfStringEscape(text)}) Tj`);
  }

  // Start first page content stream with BT
  function beginText() {
    current.ops.push('BT');
  }
  function endText() {
    current.ops.push('ET');
  }

  beginText();
  setFont(defaultFontSize);
  moveTo(M_LEFT, y);

  for (const ln of lines) {
    const size = ln.size ?? defaultFontSize;
    const lh = size + lineGap;

    // If page full, close text block, start new page
    if (y - lh < M_BOTTOM) {
      endText();
      newPage();
      beginText();
      setFont(defaultFontSize);
      moveTo(M_LEFT, y);
    }

    // font size change inline
    setFont(size);

    // crude bold: just slightly larger + same font; no bold font embedding (no deps)
    const text = ln.text ?? '';
    show(text);

    // move down
    current.ops.push(`0 -${lh.toFixed(2)} Td`);
    y -= lh;
  }

  endText();
  pages.push(current);

  // Build PDF objects
  // Object 1: Catalog
  // Object 2: Pages
  // Object 3..: each Page
  // Font object
  // Content stream objects
  const objects: string[] = [];

  const offsets: number[] = [];
  const encoder = new TextEncoder();

  function addObject(body: string): number {
    objects.push(body);
    return objects.length; // 1-based object number
  }

  // Reserve IDs
  const catalogId = 1;
  const pagesId = 2;

  // Font object
  const fontId = 3;

  // We'll assign page objects and content objects after we know counts
  let nextId = 4;

  // Font object body (Helvetica Type1)
  addObject(`<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`);

  // Page + content objects
  const pageIds: number[] = [];
  const contentIds: number[] = [];

  for (const p of pages) {
    const content = p.ops.join('\n');
    const stream = `<< /Length ${encoder.encode(content).length} >>\nstream\n${content}\nendstream`;
    const contentObjId = nextId++;
    addObject(stream);
    contentIds.push(contentObjId);

    const pageObjId = nextId++;
    const pageObj = `<<
/Type /Page
/Parent ${pagesId} 0 R
/MediaBox [0 0 ${PAGE_W.toFixed(2)} ${PAGE_H.toFixed(2)}]
/Resources << /Font << /F1 ${fontId} 0 R >> >>
/Contents ${contentObjId} 0 R
>>`;
    addObject(pageObj);
    pageIds.push(pageObjId);
  }

  // Pages object (must reference all page objects)
  const kids = pageIds.map((id) => `${id} 0 R`).join(' ');
  // Insert Pages object at index 2 (object number 2). We can build final list by placing later.
  // For simplicity, we’ll prepend Catalog/Pages after we gather everything:
  // objects currently: [font, content1, page1, content2, page2, ...]
  // We’ll rebuild with correct ordering.

  const restObjects = [...objects]; // font + page/content objects

  const pagesObj = `<< /Type /Pages /Kids [ ${kids} ] /Count ${pageIds.length} >>`;
  const catalogObj = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

  // Final object list in correct numbering:
  // 1 catalog, 2 pages, 3 font, 4.. restObjects shift? We already used ids based on nextId with font at 3.
  // We built restObjects assuming font is obj #1 in that array, but we already fixed fontId=3.
  // So build finalBodies by explicit mapping:
  const finalBodies: string[] = [];
  finalBodies[0] = catalogObj; // obj 1
  finalBodies[1] = pagesObj;   // obj 2
  finalBodies[2] = restObjects[0]; // font -> obj 3
  for (let i = 1; i < restObjects.length; i++) {
    finalBodies.push(restObjects[i]);
  }

  // Compose PDF
  let pdf = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const chunks: Uint8Array[] = [];
  chunks.push(encoder.encode(pdf));

  let cursor = encoder.encode(pdf).length;
  offsets.push(0); // xref entry for obj 0

  for (let i = 0; i < finalBodies.length; i++) {
    const objNum = i + 1;
    offsets.push(cursor);
    const objStr = `${objNum} 0 obj\n${finalBodies[i]}\nendobj\n`;
    const bytes = encoder.encode(objStr);
    chunks.push(bytes);
    cursor += bytes.length;
  }

  const xrefStart = cursor;
  let xref = `xref\n0 ${finalBodies.length + 1}\n`;
  // obj 0
  xref += `0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    const off = offsets[i];
    xref += `${String(off).padStart(10, '0')} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${finalBodies.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

  chunks.push(encoder.encode(xref));
  chunks.push(encoder.encode(trailer));

  // Concat
  let total = 0;
  for (const c of chunks) total += c.length;
  const out = new Uint8Array(total);
  let pos = 0;
  for (const c of chunks) {
    out.set(c, pos);
    pos += c.length;
  }
  return out;
}

function safeFilename(input: string) {
  return (
    input
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 80) || 'exam-paper'
  );
}

export async function POST(req: Request) {
  let paper: ExamPaper;
  try {
    paper = (await req.json()) as ExamPaper;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (
    !paper ||
    typeof paper.title !== 'string' ||
    typeof paper.subject !== 'string' ||
    !Array.isArray(paper.questions) ||
    paper.questions.length === 0
  ) {
    return new Response(
      JSON.stringify({
        error:
          'Body must include { title: string, subject: string, questions: [{ questionText, options[] }] }',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Build PDF bytes
  const lines = buildPaperLines({
    title: safeText(paper.title, '11+ Exam Paper'),
    subject: safeText(paper.subject, 'Subject'),
    board: safeText(paper.board, 'Standard'),
    timeAllowed: safeText(paper.timeAllowed, 'Not specified'),
    instructions: safeText(paper.instructions, ''),
    passage: safeText(paper.passage, ''),
    questions: paper.questions.map((q) => ({
      questionText: safeText(q.questionText, ''),
      options: Array.isArray(q.options) ? q.options.map((o) => safeText(o, '')) : [],
      correctAnswerIndex: typeof q.correctAnswerIndex === 'number' ? q.correctAnswerIndex : 0,
      explanation: safeText(q.explanation, ''),
    })),
  });

  const pdfBytes = buildPdfFromLines(lines);
  const filename = `${safeFilename(paper.title)}.pdf`;

  return new Response(pdfBytes, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
