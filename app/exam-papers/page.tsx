import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Download, FileText, CheckCircle, Star, Clock, Tag,
  BookOpen, Calculator, BrainCircuit, Shapes, ChevronRight,
  Zap, Shield, Users, TrendingUp,
} from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'Free 11+ Exam Papers – Download PDF Practice Papers | 11PlusExamPapers.com',
  description:
    'Download free 11+ practice exam papers for Maths, English, Verbal Reasoning and Non-Verbal Reasoning. Printable PDFs with full answers — no sign-up needed.',
};

// ─── Data ────────────────────────────────────────────────────────────────────

const PAPER_SETS = [
  {
    slug: 'maths-practice',
    title: '11+ Maths Practice Papers',
    description: 'Arithmetic, algebra, fractions, percentages, geometry and data handling. Covers GL & CEM exam styles.',
    subject: 'Maths',
    icon: Calculator,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    papers: 8,
    questions: 320,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'],
    tag: 'Most Popular',
    tagColor: 'bg-indigo-600 text-white',
  },
  {
    slug: 'english-practice',
    title: '11+ English Practice Papers',
    description: 'Comprehension passages, grammar, spelling, punctuation and creative writing prompts.',
    subject: 'English',
    icon: BookOpen,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
    papers: 6,
    questions: 240,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'],
    tag: null,
    tagColor: '',
  },
  {
    slug: 'verbal-reasoning-practice',
    title: '11+ Verbal Reasoning Papers',
    description: 'Codes, analogies, word relationships, odd one out, and letter/number sequences.',
    subject: 'Verbal Reasoning',
    icon: BrainCircuit,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    border: 'border-violet-100',
    badge: 'bg-violet-100 text-violet-700',
    papers: 6,
    questions: 270,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'],
    tag: null,
    tagColor: '',
  },
  {
    slug: 'non-verbal-reasoning-practice',
    title: '11+ Non-Verbal Reasoning Papers',
    description: 'Patterns, matrices, nets, reflections, rotations and 3D spatial reasoning.',
    subject: 'Non-Verbal Reasoning',
    icon: Shapes,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
    badge: 'bg-amber-100 text-amber-700',
    papers: 6,
    questions: 240,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'],
    tag: null,
    tagColor: '',
  },
  {
    slug: 'maths-topic-papers',
    title: '11+ Maths Topic-Focused Papers',
    description: 'Targeted papers on individual topics: fractions, ratios, speed/distance/time, algebra and more.',
    subject: 'Maths',
    icon: Calculator,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: 'bg-blue-100 text-blue-700',
    papers: 10,
    questions: 400,
    difficulty: ['Intermediate', 'Advanced'],
    tag: 'New',
    tagColor: 'bg-emerald-500 text-white',
  },
  {
    slug: 'comprehension-papers',
    title: '11+ Comprehension Test Papers',
    description: 'Fiction and non-fiction passages with inference, retrieval and vocabulary questions.',
    subject: 'English',
    icon: BookOpen,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
    papers: 5,
    questions: 150,
    difficulty: ['Beginner', 'Intermediate', 'Advanced'],
    tag: null,
    tagColor: '',
  },
  {
    slug: 'spag-papers',
    title: '11+ SPaG Practice Papers',
    description: 'Spelling, Punctuation and Grammar — targeted practice for GL and CEM assessments.',
    subject: 'English',
    icon: BookOpen,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    badge: 'bg-emerald-100 text-emerald-700',
    papers: 4,
    questions: 160,
    difficulty: ['Beginner', 'Intermediate'],
    tag: null,
    tagColor: '',
  },
  {
    slug: 'mixed-practice-papers',
    title: '11+ Mixed Full Practice Tests',
    description: 'Timed full-length mock papers combining all four subjects. Ideal for final-stage preparation.',
    subject: 'Mixed',
    icon: FileText,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    badge: 'bg-rose-100 text-rose-700',
    papers: 5,
    questions: 500,
    difficulty: ['Advanced'],
    tag: 'Exam Simulation',
    tagColor: 'bg-rose-600 text-white',
  },
];

const FEATURES = [
  {
    icon: CheckCircle,
    title: 'Detailed Answer Sheets',
    desc: 'Every paper comes with a full worked-answer PDF so children and parents can see exactly where marks are won.',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    icon: Tag,
    title: 'Topic-Tagged Questions',
    desc: 'Each question is labelled by topic, making it easy to identify and plug gaps in knowledge.',
    color: 'text-violet-600',
    bg: 'bg-violet-50',
  },
  {
    icon: Clock,
    title: 'Timed Exam Conditions',
    desc: 'Papers are formatted to mirror real 11+ timings — helping your child practise under proper exam conditions.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Star,
    title: 'Difficulty Graded',
    desc: "Beginner, Intermediate and Advanced tiers let you match practice to your child's current level.",
    color: 'text-amber-600',
    bg: 'bg-amber-50',
  },
  {
    icon: Shield,
    title: 'GL & CEM Aligned',
    desc: 'Papers are designed to match the question styles and formats used by GL Assessment and CEM.',
    color: 'text-slate-600',
    bg: 'bg-slate-100',
  },
  {
    icon: Zap,
    title: 'Printable PDFs',
    desc: 'Clean, printer-friendly layouts — no wasted ink, no awkward page breaks.',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50',
  },
];

const FAQS = [
  {
    q: 'Are all the papers really free?',
    a: 'Yes — 100% free, no sign-up required, no credit card. Just click Download and get the PDF.',
  },
  {
    q: 'Are the papers suitable for GL and CEM exams?',
    a: 'Yes. We cover both GL Assessment and CEM formats. Each paper is clearly labelled so you know which style it targets.',
  },
  {
    q: 'What year groups are the papers aimed at?',
    a: 'Our papers are written for Years 4, 5 and 6 — children preparing for the 11+ exam taken in Year 6.',
  },
  {
    q: 'Do the papers come with answers?',
    a: 'Every paper set includes a full worked-answer sheet as a separate PDF download.',
  },
  {
    q: 'How do the PDF papers complement the 11 Plus Exam Papers app?',
    a: 'The papers are great for timed, paper-based practice — exactly like the real exam. Use them alongside our interactive practice questions for a complete preparation plan.',
  },
  {
    q: 'How often are new papers added?',
    a: 'We release new papers regularly throughout the academic year. Check back each term for fresh sets.',
  },
];

// ─── Components ──────────────────────────────────────────────────────────────

function PaperCard({ paper }: { paper: typeof PAPER_SETS[0] }) {
  return (
    <div className={`relative bg-white rounded-2xl border-2 ${paper.border} hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 overflow-hidden group flex flex-col`}>
      {/* Tag badge */}
      {paper.tag && (
        <div className={`absolute top-4 right-4 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wide ${paper.tagColor}`}>
          {paper.tag}
        </div>
      )}

      <div className="p-6 flex-1">
        {/* Subject pill */}
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${paper.badge} text-xs font-bold mb-4`}>
          <paper.icon size={12} />
          {paper.subject}
        </div>

        <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug group-hover:text-indigo-600 transition-colors">
          {paper.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed mb-5">
          {paper.description}
        </p>

        {/* Stats row */}
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

      {/* CTA */}
      <div className="px-6 pb-6">
        <Link
          href={`/exam-papers/${paper.slug}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-100 hover:shadow-indigo-200 hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          <Download size={16} />
          Download Free PDF
        </Link>
        <p className="text-center text-xs text-slate-400 mt-2 font-medium">
          Includes answer sheet · No sign-up needed
        </p>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ExamPapersPage() {
  return (
    <>
      <SiteNav />

      <main className="bg-white">

        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-16 pb-20 px-4">
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-violet-200 opacity-20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-72 h-72 bg-indigo-200 opacity-20 rounded-full blur-3xl" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              <Download size={12} />
              Free Printable PDFs — No Sign‑up
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-5">
              11+ Exam Papers{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                Free to Download
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
              Practice papers for Maths, English, Verbal and Non-Verbal Reasoning — all with full
              worked answers. Print them out, time your child, and track real progress.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-emerald-500" /> GL & CEM formats
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-emerald-500" /> Full worked answers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-emerald-500" /> 1,200+ questions
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle size={16} className="text-emerald-500" /> Completely free
              </span>
            </div>
          </div>
        </section>

        {/* ── Paper grid ── */}
        <section id="papers" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">All Practice Paper Sets</h2>
              <p className="text-slate-500 mt-1">Click any set to see individual papers and download them.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500 font-semibold">
              <FileText size={16} className="text-indigo-500" />
              {PAPER_SETS.reduce((a, b) => a + b.papers, 0)} papers total
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PAPER_SETS.map((paper) => (
              <PaperCard key={paper.slug} paper={paper} />
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="bg-slate-50 py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                What makes our papers different?
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Every paper is written by 11+ specialists with a single goal: making sure your child walks into the exam feeling prepared.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f) => (
                <div key={f.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-11 h-11 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                    <f.icon size={22} className={f.color} />
                  </div>
                  <h3 className="font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Cross-sell: practice app ── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row items-center gap-8 shadow-2xl shadow-indigo-200">
              <div className="flex-1 text-center sm:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 text-white rounded-full text-xs font-black uppercase tracking-widest mb-4">
                  <Zap size={12} /> Also free
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                  Want instant feedback too?
                </h2>
                <p className="text-indigo-200 leading-relaxed mb-6 max-w-lg">
                  Our interactive practice app marks answers in real time, gives hints, and tracks your child's progress across every topic — all free, no account needed.
                </p>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-indigo-700 font-black rounded-xl hover:bg-indigo-50 transition-colors shadow-lg"
                  >
                    Try the practice app <ChevronRight size={16} />
                  </Link>
                  <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-semibold">
                    <span className="flex items-center gap-1.5"><Users size={14} />Trusted by 12,000+ families</span>
                    <span className="flex items-center gap-1.5"><TrendingUp size={14} />Avg. 18% score improvement</span>
                  </div>
                </div>
              </div>
              {/* Decorative icon grid */}
              <div className="hidden lg:grid grid-cols-2 gap-3 shrink-0">
                {[
                  { icon: Calculator, label: 'Maths',   color: 'bg-blue-400/30'    },
                  { icon: BookOpen,   label: 'English', color: 'bg-emerald-400/30' },
                  { icon: BrainCircuit, label: 'VR',    color: 'bg-violet-400/30'  },
                  { icon: Shapes,     label: 'NVR',     color: 'bg-amber-400/30'   },
                ].map(({ icon: Icon, label, color }) => (
                  <div key={label} className={`w-20 h-20 ${color} rounded-2xl flex flex-col items-center justify-center gap-1.5 backdrop-blur-sm`}>
                    <Icon size={24} className="text-white" />
                    <span className="text-white text-xs font-bold">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="bg-slate-50 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">
                Frequently asked questions
              </h2>
              <p className="text-slate-500">Everything you need to know about our free exam papers.</p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq) => (
                <div key={faq.q} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
                  <h3 className="font-black text-slate-900 mb-2">{faq.q}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="py-16 px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              Ready to start practising?
            </h2>
            <p className="text-slate-500 mb-8">
              Download any paper set above — completely free, no account, no limits.
            </p>
            <Link
              href="#papers"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black rounded-2xl shadow-lg shadow-indigo-200 hover:scale-[1.02] hover:shadow-indigo-300 transition-all text-lg"
            >
              <Download size={20} />
              Browse all papers
            </Link>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
