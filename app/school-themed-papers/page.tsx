import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { ClipboardList, School, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'School-Themed 11 Plus Papers | 11 Plus Exam Papers',
  description:
    'School-themed 11+ practice papers inspired by common exam styles. Use them for realistic preparation and confidence building.',
};

export default function SchoolThemedPapersPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            School-themed 11+ papers
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            These are practice papers designed to feel like the kinds of mocks families often search for (for example “Haberdashers-style” formats).
            They are intended for realistic practice and revision planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {[
            {
              icon: ClipboardList,
              title: 'Paper-like structure',
              desc: 'Clear sections and consistent formatting, suitable for printing or timed sessions.',
            },
            {
              icon: School,
              title: 'Common styles',
              desc: 'School-inspired formats that reflect familiar approaches — without claiming to be official papers.',
            },
            {
              icon: ArrowRight,
              title: 'Free access',
              desc: 'Available openly while we build out a larger library.',
            },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-11 h-11 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-4 text-indigo-600">
                <f.icon size={20} />
              </div>
              <div className="font-bold text-slate-900 mb-1">{f.title}</div>
              <div className="text-sm text-slate-600 leading-relaxed">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200">
          <div className="font-black text-slate-900 text-lg mb-2">What you’ll see here next</div>
          <ul className="list-disc pl-5 text-slate-600 text-sm space-y-1">
            <li>School-themed mock papers for Maths, English, Verbal and Non-Verbal Reasoning</li>
            <li>Downloadable PDFs with clear marking guidance</li>
            <li>Short notes explaining the intended paper style and how to use it</li>
          </ul>

          <div className="mt-4 text-sm text-slate-600">
            In the meantime, you can start with our interactive mock exams and free downloadable papers.
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/mock-exams"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-200"
            >
              Explore mock exams <ArrowRight size={18} />
            </Link>
            <Link
              href="/exam-papers"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 text-slate-900 font-black"
            >
              Download exam papers <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
