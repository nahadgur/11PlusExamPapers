export const runtime = 'nodejs';

import { Buffer } from 'node:buffer';

type ExamQuestion = {
  id?: string | number;
  questionText: string;
  options: string[];
  correctAnswerIndex?: number;
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
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

function safeText(input: unknown, fallback = ''): string {
  if (typeof input !== 'string') return fallback;
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

function buildPdfFromLines(lines: Line[]): Uint8Array {
  const PAGE_W = 595.28;
  const PAGE_H = 841.89;

  const M_LEFT = 48;
  const M_TOP = 56;
  const M_BOTTOM = 56;

  const defaultFontSize = 11;
  const lineGap = 3;

  type Page = { ops: string[] };
  const pages: Page[] = [];

  let y = PAGE_H - M_TOP;
  let current: Page = { ops: [] };

  function pushPage() {
    pages.push(current);
    current = { ops: [] };
    y = PAGE_H - M_TOP;
  }

  function setFont(size: number) {
    current.ops.push(`/F1 ${size} Tf`);
  }

  function moveTo(x: number, yPos: number) {
    current.ops.push(`${x.toFixed(2)} ${yPos.toFixed(2)} Td`);
  }

  function show(text: string) {
    current.ops.push(`(${pdfStringEscape(text)}) Tj`);
  }

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

    if (y - lh < M_BOTTOM) {
      endText();
      pushPage();
      beginText();
      setFont(defaultFontSize);
      moveTo(M_LEFT, y);
    }

    setFont(size);
    show(ln.text ?? '');
    current.ops.push(`0 -${lh.toFixed(2)} Td`);
    y -= lh;
  }

  endText();
  pages.push(current);

  const encoder = new TextEncoder();
  const objects: string[] = [];
  const offsets: number[] = [];

  const catalogId = 1;
  const pagesId = 2;
  const fontId = 3;

  // We will build: 1 Catalog, 2 Pages, 3 Font, then content/page pairs.
  const fontObj = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

  const pageIds: number[] = [];
  const bodiesAfterFont: string[] = [];

  let nextObjId = 4; // next object number after font

  for (const p of pages) {
    const content = p.ops.join('\n');
    const stream = `<< /Length ${encoder.encode(content).length} >>\nstream\n${content}\nendstream`;
    bodiesAfterFont.push(stream); // content object body
    const contentObjId = nextObjId++;
    const pageObjId = nextObjId++;

    const pageObj = `<<
/Type /Page
/Parent ${pagesId} 0 R
/MediaBox [0 0 ${PAGE_W.toFixed(2)} ${PAGE_H.toFixed(2)}]
/Resources << /Font << /F1 ${fontId} 0 R >> >>
/Contents ${contentObjId} 0 R
>>`;
    bodiesAfterFont.push(pageObj);
    pageIds.push(pageObjId);
  }

  const kids = pageIds.map((id) => `${id} 0 R`).join(' ');
  const pagesObj = `<< /Type /Pages /Kids [ ${kids} ] /Count ${pageIds.length} >>`;
  const catalogObj = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

  const finalBodies: string[] = [
    catalogObj, // 1
    pagesObj,   // 2
    fontObj,    // 3
    ...bodiesAfterFont, // 4+
  ];

  let header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  const chunks: Uint8Array[] = [];
  const headerBytes = encoder.encode(header);
  chunks.push(headerBytes);

  let cursor = headerBytes.length;
  offsets.push(0);

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
  xref += `0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i++) {
    xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }

  const trailer = `trailer\n<< /Size ${finalBodies.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;
  chunks.push(encoder.encode(xref));
  chunks.push(encoder.encode(trailer));

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

  return new Response(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
