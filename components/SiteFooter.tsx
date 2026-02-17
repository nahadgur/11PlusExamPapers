import React from 'react';
import Link from 'next/link';
import { SUBJECTS, UK_CITIES } from '@/lib/siteData';

export const SiteFooter: React.FC = () => (
  <footer className="bg-slate-900 text-slate-400 pt-16 pb-10 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4 text-white">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center font-black text-sm">11+</div>
            <span className="font-extrabold text-lg">11 Plus Exam Papers</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">Helping children feel confident for the 11+.</p>
          <div className="text-xs text-slate-500">© {new Date().getFullYear()} 11 Plus Exam Papers. All rights reserved.</div>
        </div>
        <div>
          <h4 className="font-black text-white text-sm mb-4 uppercase tracking-wide">Subjects</h4>
          <ul className="space-y-2 text-sm">
            {SUBJECTS.map((s) => (
              <li key={s.slug}><Link href={`/subjects/${s.slug}`} className="hover:text-white transition-colors">{s.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black text-white text-sm mb-4 uppercase tracking-wide">Tutors</h4>
          <ul className="space-y-2 text-sm">
            {UK_CITIES.slice(0, 10).map((c) => (
              <li key={c.slug}><Link href={`/tutors/${c.slug}`} className="hover:text-white transition-colors">{c.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-black text-white text-sm mb-4 uppercase tracking-wide">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/mock-exams" className="hover:text-white transition-colors">Mock Exams</Link></li>
            <li><Link href="/exam-papers" className="hover:text-white transition-colors">Exam Papers</Link></li>
            <li><Link href="/school-themed-papers" className="hover:text-white transition-colors">School-Themed Papers</Link></li>
            <li><Link href="/tutors" className="hover:text-white transition-colors">Tutor Support</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-black text-white text-sm mb-4 uppercase tracking-wide">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><span>Privacy Policy</span></li>
            <li><span>Terms of Use</span></li>
            <li><span>Contact</span></li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-slate-800">
        <p className="text-xs text-slate-600 mb-3 font-bold uppercase tracking-wide">11+ prep across the UK</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          {UK_CITIES.map((c) => (
            <Link key={c.slug} href={`/tutors/${c.slug}`} className="text-xs text-slate-600 hover:text-slate-300 transition-colors">{c.label}</Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);
