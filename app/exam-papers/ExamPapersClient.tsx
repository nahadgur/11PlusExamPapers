'use client';

import React, { useMemo, useState } from 'react';
import {
  Download,
  FileText,
  CheckCircle,
  Star,
  Clock,
  Tag,
  BookOpen,
  Calculator,
  BrainCircuit,
  Shapes,
  X,
  Loader2,
} from 'lucide-react';

type PaperSet = {
  slug: string;
  title: string;
  description: string;
  subject: string;
  icon: any;
  color: string;
  bg: string;
  border: string;
  badge: string;
  papers: number;
  questions: number;
  difficulty: string[];
  tag: string | null;
  tagColor: string;
};

type Props = {
  paperSets: PaperSet[];
};

type FormState = {
  subject: string;
  paperTitle: string;

  schoolName: string;
  yearGroup: string;
  examBoard: string;

  difficulty: string;
  focusAreas: string;
  questionCount: number;

  includePassage: boolean;
};

function slugToSubjectKey(slug: string) {
  if (slug.includes('math')) return 'maths';
  if (slug.includes('english') || slug.includes('spag') || slug.includes('comprehension')) return 'english';
  if (slug.includes('non-verbal')) return 'non-verbal-reasoning';
  if (slug.includes('verbal')) return 'verbal-reasoning';
  if (slug.includes('mixed')) return 'mixed';
  return 'maths';
}

function ExamPaperModal({
  open,
  onClose,
  paper,
}: {
  open: boolean;
  onClose: () => void;
  paper: PaperSet | null;
}) {
  const initial: FormState = useMemo(() => {
    const subjectKey = paper ? slugToSubjectKey(paper.slug) : 'maths';
    const baseTitle = paper?.title || '11+ Practice Paper';

    return {
      subject: subjectKey,
      paperTitle: baseTitle,
      schoolName: '',
      yearGroup: 'Year 5',
      examBoard: 'GL',
      difficulty: 'intermediate',
      focusAreas: '',
      questionCount: 20,
      includePassage: subjectKey === 'english' || paper?.slug?.includes('comprehension') || false,
    };
  }, [paper]);

  const [form, setForm] = useState<FormState>(initial);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  React.useEffect(() => {
    setForm(initial);
    setError('');
    setLoading(false);
  }, [initial, open]);

  if (!open || !paper) return null;

  const onChange = (k: keyof FormState, v: any) => setForm((p) => ({ ...p, [k]: v }));

  async function submit() {
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/exam-papers/generate-ai-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: form.subject,
          paperTitle: form.paperTitle,
          schoolName: form.schoolName,
          yearGroup: form.yearGroup,
          examBoard: form.examBoard,
          difficulty: form.difficulty,
          focusAreas: form.focusAreas,
          questionCount: form.questionCount,
          includePassage: form.includePassage,
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j?.error || 'PDF generation failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `${(form.paperTitle || '11-plus-paper').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      onClose();
    } catch (e: any) {
      setError(e?.message || 'Something went wrong');
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[200]">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={() => (!loading ? onClose() : null)}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-6 sm:p-8 relative">
            <button
              onClick={() => (!loading ? onClose() : null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors disabled:opacity-50"
              disabled={loading}
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="flex items-start gap-3 mb-6">
              <div className={`w-11 h-11 rounded-2xl ${paper.bg} flex items-center justify-center`}>
                <paper.icon size={18} className={paper.color} />
              </div>
              <div className="flex-1">
                <div className="text-sm font-black text-slate-900">Generate a tailored paper</div>
                <div className="text-xs text-slate-500 font-medium">
                  Answer a few questions and we’ll generate a printable paper with answers & explanations.
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">
                  School name (optional)
                </label>
                <input
                  value={form.schoolName}
                  onChange={(e) => onChange('schoolName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  placeholder="e.g. Haberdashers (optional)"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">
                  Year group
                </label>
                <select
                  value={form.yearGroup}
                  onChange={(e) => onChange('yearGroup', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  disabled={loading}
                >
                  <option>Year 4</option>
                  <option>Year 5</option>
                  <option>Year 6</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">
                  Exam board style
                </label>
                <select
                  value={form.examBoard}
                  onChange={(e) => onChange('examBoard', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  disabled={loading}
                >
                  <option>GL</option>
                  <option>CEM</option>
                  <option>ISEB</option>
                  <option>Standard</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">
                  Difficulty
                </label>
                <select
                  value={form.difficulty}
                  onChange={(e) => onChange('difficulty', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  disabled={loading}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">
                  Focus areas (optional)
                </label>
                <input
                  value={form.focusAreas}
                  onChange={(e) => onChange('focusAreas', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  placeholder="e.g. fractions, percentages, word problems"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase tracking-widest text-slate-500 mb-1">
                  Questions
                </label>
                <select
                  value={String(form.questionCount)}
                  onChange={(e) => onChange('questionCount', Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
                  disabled={loading}
                >
                  <option value="10">10</option>
                  <option value="15">15</option>
                  <option value="20">20</option>
                  <option value="25">25</option>
                  <option value="30">30</option>
                </select>
              </div>

              <div className="flex items-center gap-3 pt-6">
                <input
                  id="includePassage"
                  type="checkbox"
                  checked={form.includePassage}
                  onChange={(e) => onChange('includePassage', e.target.checked)}
                  className="w-4 h-4"
                  disabled={loading}
                />
                <label htmlFor="includePassage" className="text-sm font-semibold text-slate-700">
                  Include comprehension passage (English)
                </label>
              </div>
            </div>

            {error ? (
              <div className="mt-4 text-sm font-semibold text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3">
                {error}
              </div>
            ) : null}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => (!loading ? onClose() : null)}
                className="sm:flex-1 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-black text-slate-700"
                disabled={loading}
              >
                Cancel
              </button>

              <button
                onClick={submit}
                disabled={loading}
                className="sm:flex-1 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black shadow-md shadow-indigo-100 hover:shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:hover:scale-100"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    Generate & Download PDF
                  </>
                )}
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-400 font-medium">
              This generates a printable paper with an answer key and explanations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaperCard({
  paper,
  onDownload,
}: {
  paper: PaperSet;
  onDownload: (paper: PaperSet) => void;
}) {
  return (
    <div
      className={`relative bg-white rounded-2xl border-2 ${paper.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group flex flex-col`}
    >
      {paper.tag && (
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wide ${paper.tagColor}`}>
          {paper.tag}
        </div>
      )}

      <div className="p-6 flex-1">
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${paper.badge} text-xs font-bold mb-4`}>
          <paper.icon size={12} />
          {paper.subject}
        </div>

        <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
          {paper.title}
        </h3>

        <p className="text-sm text-slate-500 leading-relaxed mb-5">{paper.description}</p>

        <div className="flex items-center gap-4 mb-5">
          <div className="text-center">
            <div className="text-xl font-black text-slate-900">{paper.papers}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Papers</div>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div className="text-center">
            <div className="text-xl font-black text-slate-900">{paper.questions}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Questions</div>
          </div>
          <div className="w-px h-8 bg-slate-100" />
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide mb-1">Levels</div>
            <div className="flex gap-1 flex-wrap">
              {paper.difficulty.map((d) => (
                <span key={d} className="text-[10px] font-bold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md">
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          type="button"
          onClick={() => onDownload(paper)}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 hover:shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          <Download size={16} />
          Download Free PDF
        </button>
        <p className="text-center text-xs text-slate-400 mt-2 font-medium">
          Includes answer sheet · No sign-up needed
        </p>
      </div>
    </div>
  );
}

export default function ExamPapersClient({ paperSets }: Props) {
  const [selected, setSelected] = useState<PaperSet | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paperSets.map((paper) => (
          <PaperCard
            key={paper.slug}
            paper={paper}
            onDownload={(p) => {
              setSelected(p);
              setOpen(true);
            }}
          />
        ))}
      </div>

      <ExamPaperModal
        open={open}
        paper={selected}
        onClose={() => {
          setOpen(false);
          setSelected(null);
        }}
      />
    </>
  );
}
