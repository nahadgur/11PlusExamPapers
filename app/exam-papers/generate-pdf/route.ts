export const runtime = 'nodejs';

import chromium from '@sparticuz/chromium';
import puppeteer from 'puppeteer-core';

type ExamBoard = 'GL' | 'CEM' | 'ISEB' | 'Standard' | string;

type ExamQuestion = {
  id: string | number;
  questionText: string;
  options: string[];
  correctAnswerIndex: number; // 0..3 (or more, but template assumes A..)
  explanation?: string;
};

type ExamPaper = {
  title: string;
  subject: string;
  board: ExamBoard;
  timeAllowed: string;
  instructions: string;
  passage?: string;
  questions: ExamQuestion[];
};

function escapeHtml(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function safeFilename(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || 'exam-paper';
}

function renderExamPaperHtml(paper: ExamPaper): string {
  const title = escapeHtml(paper.title);
  const subject = escapeHtml(paper.subject);
  const board = escapeHtml(String(paper.board ?? ''));
  const instructions = escapeHtml(paper.instructions ?? '');
  const timeAllowed = escapeHtml(paper.timeAllowed ?? '');
  const qCount = paper.questions?.length ?? 0;

  const passageHtml = paper.passage
    ? `
      <div class="avoid-break-inside section">
        <div class="passageBox">
          <div class="passageTitle">Reading Passage</div>
          <div class="passageText">
            ${escapeHtml(paper.passage)
              .split('\n')
              .map((p) => `<p class="passagePara">${p.trim() ? escapeHtml(p) : '&nbsp;'}</p>`)
              .join('')}
          </div>
        </div>
      </div>
    `
    : '';

  const questionsHtml = (paper.questions || [])
    .map((q, idx) => {
      const qText = escapeHtml(q.questionText ?? '');
      const options = Array.isArray(q.options) ? q.options : [];
      const optionsHtml = options
        .map((opt, optIdx) => {
          const letter = String.fromCharCode(65 + optIdx);
          return `
            <div class="option">
              <div class="checkbox"></div>
              <div class="optionText"><span class="optLetter">${letter}</span> ${escapeHtml(opt ?? '')}</div>
            </div>
          `;
        })
        .join('');

      return `
        <div class="question avoid-break-inside">
          <div class="qRow">
            <div class="qNum">${idx + 1}</div>
            <div class="qBody">
              <div class="qText">${qText}</div>
              <div class="optionsGrid">
                ${optionsHtml}
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join('');

  const answerKeyHtml = (paper.questions || [])
    .map((q, idx) => {
      const letter = String.fromCharCode(65 + (q.correctAnswerIndex ?? 0));
      const explanation = escapeHtml(q.explanation ?? '');
      return `
        <div class="answerRow avoid-break-inside">
          <div class="aNum">${idx + 1}</div>
          <div class="aLetter">${letter}</div>
          <div class="aExpl"><span class="aExplLabel">Explanation:</span> ${explanation || '-'}</div>
        </div>
      `;
    })
    .join('');

  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  <style>
    @page { size: A4; margin: 0; }
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; background: #fff; font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif; color: #000; }

    .sheet { width: 210mm; min-height: 297mm; margin: 0 auto; }
    .page { width: 210mm; min-height: 297mm; padding: 12mm; }
    .pageBreakAfter { page-break-after: always; }
    .pageBreakBefore { page-break-before: always; }
    .avoid-break-inside { break-inside: avoid; page-break-inside: avoid; }

    /* Cover */
    .coverWrap { min-height: 273mm; display: flex; align-items: center; justify-content: center; }
    .coverCard {
      position: relative;
      width: 100%;
      min-height: 273mm;
      border: 4px double #111;
      border-radius: 8px;
      padding: 18mm 14mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    .corner { position:absolute; width: 16mm; height: 16mm; }
    .corner.tl { top: 10mm; left: 10mm; border-top: 2px solid #000; border-left: 2px solid #000; }
    .corner.tr { top: 10mm; right: 10mm; border-top: 2px solid #000; border-right: 2px solid #000; }
    .corner.bl { bottom: 10mm; left: 10mm; border-bottom: 2px solid #000; border-left: 2px solid #000; }
    .corner.br { bottom: 10mm; right: 10mm; border-bottom: 2px solid #000; border-right: 2px solid #000; }

    .brand { font-size: 12px; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 8mm; }
    .coverTitle { font-size: 36px; font-weight: 800; margin: 0 0 5mm 0; }
    .divider { width: 24mm; height: 1.5mm; background: #000; margin: 0 0 8mm 0; }
    .coverSubject { font-size: 18px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2mm; }
    .coverSub { font-size: 13px; color: #444; margin-bottom: 10mm; }

    .infoBox { width: 100%; max-width: 110mm; border: 2px solid #000; padding: 6mm; }
    .infoRow { display:flex; justify-content: space-between; font-size: 12px; padding: 2mm 0; border-bottom: 1px solid #bbb; }
    .infoRow:last-child { border-bottom: 0; }

    .instructions { width: 100%; max-width: 130mm; text-align: left; margin-top: 12mm; }
    .instructions h4 { margin: 0 0 2mm 0; font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; border-bottom: 2px solid #000; padding-bottom: 2mm; }
    .instructions p { margin: 0; font-size: 11px; font-style: italic; line-height: 1.45; color: #111; }
    .instructions .note { margin-top: 2mm; }

    /* Content */
    .section { margin-bottom: 8mm; }
    .passageBox { background: #f3f4f6; border: 1px solid #d1d5db; border-radius: 6px; padding: 6mm; }
    .passageTitle { text-align:center; font-size: 14px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4mm; }
    .passageText { font-family: ui-serif, Georgia, "Times New Roman", Times, serif; font-size: 12px; line-height: 1.65; text-align: justify; }
    .passagePara { margin: 0 0 4mm 0; text-indent: 6mm; }
    .passagePara:last-child { margin-bottom: 0; }

    .question { border-bottom: 1px solid #f1f5f9; padding-bottom: 6mm; margin-bottom: 3mm; }
    .question:last-child { border-bottom: 0; padding-bottom: 0; margin-bottom: 0; }

    .qRow { display:flex; gap: 4mm; }
    .qNum {
      width: 8mm; height: 8mm;
      border-radius: 999px;
      background: #000;
      color: #fff;
      display:flex; align-items:center; justify-content:center;
      font-weight: 800;
      font-size: 10px;
      flex: 0 0 auto;
      margin-top: 1mm;
    }
    .qBody { flex: 1 1 auto; }
    .qText { font-size: 13px; font-weight: 600; margin-bottom: 4mm; }

    .optionsGrid { display: grid; grid-template-columns: 1fr 1fr; column-gap: 10mm; row-gap: 3mm; }
    .option { display:flex; gap: 3mm; align-items:flex-start; }
    .checkbox { width: 6mm; height: 6mm; border: 2px solid #9ca3af; border-radius: 2px; flex: 0 0 auto; margin-top: 0.5mm; }
    .optionText { font-size: 12px; line-height: 1.25; }
    .optLetter { font-weight: 800; color: #6b7280; margin-right: 2mm; }

    .footer { text-align:center; font-size: 9px; color: #9ca3af; padding: 6mm 0 2mm 0; }

    /* Answer Key */
    .akHeader { text-align:center; border-bottom: 2px solid #000; padding-bottom: 4mm; margin-bottom: 8mm; }
    .akHeader h2 { margin: 0; font-size: 24px; font-weight: 900; }
    .akHeader p { margin: 2mm 0 0 0; font-size: 11px; color: #666; }

    .answerRow { display:grid; grid-template-columns: 10mm 10mm 1fr; gap: 4mm; padding-bottom: 3mm; margin-bottom: 3mm; border-bottom: 1px solid #e5e7eb; }
    .answerRow:last-child { border-bottom: 0; }

    .aNum { font-weight: 900; text-align:center; background:#f3f4f6; border-radius: 4px; height: 8mm; display:flex; align-items:center; justify-content:center; }
    .aLetter { font-weight: 900; text-align:center; background:#000; color:#fff; border-radius: 4px; height: 8mm; display:flex; align-items:center; justify-content:center; }
    .aExpl { font-size: 10.5px; color: #374151; display:flex; align-items:center; line-height: 1.35; }
    .aExplLabel { font-weight: 800; margin-right: 2mm; }

    /* Make it more print-stable */
    img { max-width: 100%; }
  </style>
</head>
<body>
  <div class="sheet">

    <!-- Cover Page -->
    <div class="page pageBreakAfter">
      <div class="coverWrap">
        <div class="coverCard">
          <div class="corner tl"></div><div class="corner tr"></div><div class="corner bl"></div><div class="corner br"></div>

          <div class="brand">11 Plus Exam Papers</div>
          <h1 class="coverTitle">${title}</h1>

          <div class="divider"></div>

          <div class="coverSubject">${subject}</div>
          <div class="coverSub">${board} Style Assessment</div>

          <div class="infoBox">
            <div class="infoRow"><span><b>Time Allowed:</b></span><span>${timeAllowed}</span></div>
            <div class="infoRow"><span><b>Total Questions:</b></span><span>${qCount}</span></div>
          </div>

          <div class="instructions">
            <h4>Instructions</h4>
            <p>${instructions}</p>
            <p class="note">Do not open this booklet until told to do so.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Content Pages -->
    <div class="page">
      ${passageHtml}
      <div class="section">
        ${questionsHtml}
      </div>
      <div class="footer">End of Paper • 11 Plus Exam Papers</div>
    </div>

    <!-- Answer Key -->
    <div class="page pageBreakBefore">
      <div class="akHeader">
        <h2>Answer Key</h2>
        <p>Teachers & Parents Use Only</p>
      </div>
      ${answerKeyHtml}
    </div>

  </div>
</body>
</html>`;
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
    typeof paper.instructions !== 'string' ||
    typeof paper.timeAllowed !== 'string' ||
    !Array.isArray(paper.questions) ||
    paper.questions.length === 0
  ) {
    return new Response(
      JSON.stringify({
        error:
          'Body must be an ExamPaper with title, subject, instructions, timeAllowed, and a non-empty questions[] array.',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const html = renderExamPaperHtml(paper);

  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
    });

    const filename = `${safeFilename(paper.title)}.pdf`;

    return new Response(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    });
  } finally {
    await browser.close();
  }
}
