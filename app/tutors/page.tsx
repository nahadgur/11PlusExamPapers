import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';
import { UK_CITIES } from '@/lib/siteData';
import { MapPin, ArrowRight, Shield, BookOpen, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: '11 Plus Tutors by City | 11 Plus Exam Papers',
  description:
    'Browse 11+ tutor support pages by city. Each guide includes local grammar school context and a simple tutor enquiry form.',
};

export default function TutorsIndexPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteNav />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            11 Plus tutor support by city
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            These pages are designed for families looking for targeted help. You’ll find a short overview of local 11+ context,
            plus a quick enquiry form if you’d like to speak to a tutor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
          {[
            {
              icon: Shield,
              title: 'Exam-focused',
              desc: 'Guidance centred on realistic exam practice and topic coverage — not gimmicks.',
            },
            {
              icon: BookOpen,
              title: 'Local context',
              desc: 'City guides with practical pointers for preparing for grammar and selective schools.',
            },
            {
              icon: Users,
              title: 'Tutor enquiries',
              desc: 'A simple enquiry form to request tutor support in your area.',
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

        <h2 className="text-2xl font-black text-slate-900 mt-14 mb-4">Choose your city</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {UK_CITIES.map((city) => (
            <Link
              key={city.slug}
              href={`/tutors/${city.slug}`}
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-sm font-semibold transition-all group"
            >
              <MapPin size={13} className="text-slate-300 group-hover:text-indigo-400 shrink-0" />
              {city.label}
              <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-indigo-400 shrink-0" />
            </Link>
          ))}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
