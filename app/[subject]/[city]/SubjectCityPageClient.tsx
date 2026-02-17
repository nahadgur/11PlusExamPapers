'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Star,
  MapPin,
  ChevronRight,
  CheckCircle,
  Trophy,
  Users,
  Clock,
  Zap,
  Shield,
} from 'lucide-react';
import { SiteNav, LeadGenModal } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

const TOPICS_BY_SUBJECT: Record<string, string[]> = {
  maths: [
    'Number & Place Value',
    'Fractions & Decimals',
    'Algebra & Sequences',
    'Geometry & Shapes',
    'Data Handling',
    'Problem Solving',
    'Measurement',
    'Percentages & Ratio',
  ],
  english: [
    'Reading Comprehension',
    'Grammar & Punctuation',
    'Vocabulary',
    'Spelling',
    'Synonyms & Antonyms',
    'Cloze Passages',
    'Inference & Deduction',
    'Creative Writing',
  ],
  'verbal-reasoning': [
    'Letter Codes',
    'Word Analogies',
    'Odd One Out',
    'Number Sequences',
    'Logical Deduction',
    'Hidden Words',
    'Compound Words',
    'Alphabetical Order',
  ],
  'non-verbal-reasoning': [
    'Matrices',
    'Shape Sequences',
    'Reflections & Rotations',
    'Nets & 3D Shapes',
    'Pattern Codes',
    'Odd Shape Out',
    'Spatial Reasoning',
    'Analogies',
  ],
};

const SUBJECT_STYLE: Record<
  string,
  { gradient: string; light: string; dot: string; accent: string }
> = {
  maths: {
    gradient: 'from-blue-600 to-cyan-500',
    light: 'bg-blue-50',
    dot: 'bg-blue-500',
    accent: 'text-blue-600',
  },
  english: {
    gradient: 'from-emerald-600 to-teal-500',
    light: 'bg-emerald-50',
    dot: 'bg-emerald-500',
    accent: 'text-emerald-600',
  },
  'verbal-reasoning': {
    gradient: 'from-violet-600 to-purple-500',
    light: 'bg-violet-50',
    dot: 'bg-violet-500',
    accent: 'text-violet-600',
  },
  'non-verbal-reasoning': {
    gradient: 'from-amber-500 to-orange-500',
    light: 'bg-amber-50',
    dot: 'bg-amber-500',
    accent: 'text-amber-600',
  },
};

interface SubjectData {
  slug: string;
  label: string;
  desc: string;
  color: string;
  bg: string;
  dot: string;
  icon?: React.ElementType;
}
interface CityData {
  slug: string;
  label: string;
}

export default function SubjectCityPageClient({
  subject,
  city,
  allSubjects,
  allCities,
}: {
  subject: SubjectData;
  city: CityData;
  allSubjects: SubjectData[];
  allCities: CityData[];
}) {
  const [showModal, setShowModal] = useState(false);
  const style = SUBJECT_STYLE[subject.slug] || SUBJECT_STYLE.maths;
  const topics = TOPICS_BY_SUBJECT[subject.slug] || [];

  const handleModalSubmit = () => {
    setShowModal(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-white">
      <SiteNav ctaLabel="Mock Exams" ctaHref="/mock-exams" />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-16 pb-24 px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute -top-32 left-1/3 w-[600px] h-[600px] rounded-full blur-[140px] opacity-20 bg-gradient-to-r ${style.gradient}`}
          />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-8">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/subjects/${subject.slug}`}
              className="hover:text-white transition-colors"
            >
              {subject.label}
            </Link>
            <span>/</span>
            <Link
              href={`/tutors/${city.slug}`}
              className="hover:text-white transition-colors"
            >
              {city.label}
            </Link>
            <span>/</span>
            <span className="text-slate-300">
              {subject.label} in {city.label}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 ${style.light} ${style.accent}`}
              >
                <MapPin size={14} /> {city.label} · 11+ {subject.label}
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-[1.1] mb-5">
                11+{' '}
                <span
                  className={`text-transparent bg-clip-text bg-gradient-to-r ${style.gradient}`}
                >
                  {subject.label}
                </span>{' '}
                Practice for {city.label}
              </h1>

              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Build confidence for grammar and independent school entrance
                exams with exam-style {subject.label} questions, clear
                explanations, and timed practice.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {[
                  { icon: Shield, text: 'Exam-style practice' },
                  { icon: Zap, text: 'Instant feedback' },
                  { icon: Clock, text: 'Timed sessions' },
                ].map((t) => (
                  <div
                    key={t.text}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg text-sm font-semibold text-white border border-white/10"
                  >
                    <t.icon size={13} className="text-indigo-300" />
                    {t.text}
                  </div>
                ))}
              </div>

              <Link
                href="/mock-exams"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all"
              >
                Start practice
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={18} strokeWidth={3} />
                </span>
              </Link>

              <div className="mt-5 flex flex-wrap gap-4 text-sm font-semibold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-400" /> Free access
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-400" /> Downloadable
                  papers
                </span>
                <span className="flex items-center gap-1.5">
                  <Check size={13} className="text-emerald-400" /> Instant access
                </span>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-6 space-y-4">
                <div className="bg-white rounded-2xl p-5 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-black uppercase tracking-widest ${style.accent}`}
                    >
                      {subject.label}
                    </span>
                    <span className="text-xs font-bold text-slate-400">
                      Q3 / 10
                    </span>
                  </div>

                  <p className="font-bold text-slate-800 text-sm mb-4 leading-relaxed">
                    {subject.slug === 'maths' && 'What is 3/4 of 120?'}
                    {subject.slug === 'english' &&
                      'Choose the word most similar in meaning to "vivid"'}
                    {subject.slug === 'verbal-reasoning' &&
                      'If CAT = 3120, what does DOG equal?'}
                    {subject.slug === 'non-verbal-reasoning' &&
                      'Which shape comes next in the sequence?'}
                  </p>

                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D'].map((opt, i) => (
                      <div
                        key={opt}
                        className={`flex items-center gap-3 p-2.5 rounded-xl text-sm font-semibold ${
                          i === 0
                            ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                            : 'bg-slate-50 text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                            i === 0
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {opt}
                        </span>
                        {i === 0 ? '✓ Correct answer' : `Option ${opt}`}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '87%', label: 'Accuracy' },
                    { val: '12', label: 'Days active' },
                    { val: 'Exam', label: 'Mode' },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="bg-white/10 rounded-xl p-3 text-center"
                    >
                      <div className="text-white font-black text-lg">
                        {s.val}
                      </div>
                      <div className="text-slate-400 text-xs font-semibold">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="bg-slate-50 border-y border-slate-200 py-5 px-4">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-8 text-sm font-bold text-slate-500">
          <span className="flex items-center gap-2">
            <Users size={16} className="text-indigo-400" /> UK-focused resources
          </span>
          <span className="flex items-center gap-2">
            <Star size={16} className="text-amber-400 fill-amber-400" /> Built
            for parents
          </span>
          <span className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-500" /> Exam-style
            questions
          </span>
          <span className="flex items-center gap-2">
            <Trophy size={16} className="text-violet-500" /> Structured practice
          </span>
        </div>
      </div>

      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">
              {subject.label} topics commonly assessed in 11+
            </h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">
              Topic coverage designed for realistic practice and revision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {topics.map((topic, i) => (
              <motion.div
                key={topic}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-0 rounded-2xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 hover:shadow-lg transition-all group text-left"
              >
                <Link href="/mock-exams" className="flex items-center gap-3 p-4">
                  <div
                    className={`w-7 h-7 rounded-lg ${style.light} flex items-center justify-center shrink-0`}
                  >
                    <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-700 transition-colors flex-1">
                    {topic}
                  </span>
                  <ChevronRight
                    size={14}
                    className="text-slate-300 group-hover:text-indigo-400 shrink-0"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 mb-3">
              A simple preparation approach
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[17%] right-[17%] h-px bg-slate-200" />
            {[
              {
                step: '01',
                title: 'Choose a resource',
                desc: 'Start with mock exams and exam-style practice sessions.',
              },
              {
                step: '02',
                title: `Practise ${subject.label}`,
                desc: `Focus on key topics and build speed and accuracy over time.`,
              },
              {
                step: '03',
                title: 'Review and improve',
                desc: 'Use results to target weaker areas and repeat with confidence.',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center relative z-10"
              >
                <div className="w-20 h-20 rounded-3xl bg-white border-4 border-slate-100 flex items-center justify-center font-black text-slate-300 text-2xl mb-5 shadow-xl">
                  {s.step}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">
                  {s.title}
                </h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 sm:px-6 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-96 bg-gradient-to-r ${style.gradient} rounded-full blur-[120px] opacity-15`}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            Prepare with structured 11+ practice.
          </h2>
          <p className="text-slate-300 text-xl mb-10 max-w-xl mx-auto">
            Free access to mock exams and practice resources. Start in under a
            minute.
          </p>

          <Link
            href="/mock-exams"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-black text-xl rounded-2xl shadow-2xl hover:scale-[1.03] transition-all"
          >
            Explore mock exams
            <span className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight size={20} strokeWidth={3} />
            </span>
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm font-semibold text-slate-400">
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" /> Free access
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" /> Downloadable
              papers
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle size={15} className="text-emerald-400" /> All subjects
              included
            </span>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-lg font-black text-slate-800 mb-4">
                Other subjects in {city.label}
              </h3>
              <div className="space-y-2">
                {allSubjects
                  .filter((s) => s.slug !== subject.slug)
                  .map((s) => (
                    <Link
                      key={s.slug}
                      href={`/${s.slug}/${city.slug}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-sm font-semibold transition-all group"
                    >
                      <div
                        className={`w-7 h-7 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}
                      >
                        {s.icon && <s.icon size={14} className={s.color} />}
                      </div>
                      11+ {s.label} in {city.label}
                      <ChevronRight
                        size={14}
                        className="ml-auto text-slate-300 group-hover:text-indigo-400"
                      />
                    </Link>
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-800 mb-4">
                11+ {subject.label} in other cities
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {allCities
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 10)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/${subject.slug}/${c.slug}`}
                      className="flex items-center gap-2 px-3 py-2.5 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 text-slate-600 hover:text-indigo-700 text-xs font-semibold transition-all group"
                    >
                      <MapPin
                        size={11}
                        className="text-slate-300 group-hover:text-indigo-400 shrink-0"
                      />
                      {c.label}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
      <LeadGenModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
}
