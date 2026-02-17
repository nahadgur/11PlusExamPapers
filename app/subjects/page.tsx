import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { SUBJECTS } from '@/lib/siteData';
import { BookOpen, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: '11 Plus Subjects | 11 Plus Exam Papers',
  description:
    'Explore 11+ subjects: Maths, English, Verbal Reasoning and Non-Verbal Reasoning. Topic guides and resources for realistic preparation.',
};

export default function SubjectsIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-bold text-sm mb-5 border border-indigo-100">
            <BookOpen size={16} /> Subjects
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            11+ subjects
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Select a subject to view topic coverage and related resources. These pages are designed for clear, exam-focused preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
          {SUBJECTS.map((s) => (
            <Link
              key={s.slug}
              href={`/subjects/${s.slug}`}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-10 h-10 rounded-2xl ${s.bg} flex items-center justify-center shrink-0`}>
                  <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                </div>
                <div className="font-black text-slate-900 text-lg group-hover:text-indigo-700 transition-colors">
                  {s.label}
                </div>
                <ArrowRight size={18} className="ml-auto text-slate-300 group-hover:text-indigo-400" />
              </div>
              <div className="text-sm text-slate-600 leading-relaxed">{s.desc}</div>
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
