import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '11 Plus Guides and Articles | 11 Plus Exam Papers',
  description:
    'Practical 11+ guides: how to plan revision, use mock exams effectively, and choose practice papers. Built for grammar and independent school preparation.',
};

const POSTS = [
  {
    slug: 'how-to-use-mock-exams',
    title: 'How to use 11+ mock exams properly',
    desc: 'A simple structure for timing, marking, and turning mistakes into a plan.',
  },
  {
    slug: 'best-11-plus-practice-routine',
    title: 'A sensible 11+ practice routine for Year 4 and Year 5',
    desc: 'Consistency beats cramming: a weekly plan that builds confidence.',
  },
  {
    slug: 'maths-topics-to-master',
    title: '11+ Maths topics to master before timed mocks',
    desc: 'A checklist of common areas to cover and how to practise them.',
  },
];

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-bold text-sm mb-5 border border-indigo-100">
            <BookOpen size={16} /> Blog
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            11+ guides and articles
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Clear, practical writing for families preparing for grammar and independent school entrance exams. This section is being expanded.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {POSTS.map((p) => (
            <div key={p.slug} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="font-black text-slate-900 mb-2">{p.title}</div>
              <div className="text-sm text-slate-600 leading-relaxed mb-4">{p.desc}</div>
              <div className="text-xs text-slate-500">
                Coming soon
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200">
          <div className="font-black text-slate-900 text-lg mb-2">Start with the resources</div>
          <div className="text-sm text-slate-600 mb-4">
            While we build the article library, you can use the free mock exams and downloadable papers.
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/mock-exams"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-200"
            >
              Mock exams <ArrowRight size={18} />
            </Link>
            <Link
              href="/exam-papers"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-900 font-black"
            >
              Exam papers <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
