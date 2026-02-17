'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Star, MapPin, ChevronRight, BookOpen, Trophy, Target, CheckCircle, GraduationCap } from 'lucide-react';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

// ─── Pexels image pool ────────────────────────────────────────────────────────
const HERO_IMAGES = [
  'https://images.pexels.com/photos/3768122/pexels-photo-3768122.jpeg',  // glasses girl reading
  'https://images.pexels.com/photos/5303553/pexels-photo-5303553.jpeg',  // boy reading a book
  'https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg',  // books pencils blurred
  'https://images.pexels.com/photos/7520846/pexels-photo-7520846.jpeg',  // writing boy looking at camera
  'https://images.pexels.com/photos/5211478/pexels-photo-5211478.jpeg',  // smiling boy with school bag
  'https://images.pexels.com/photos/3855553/pexels-photo-3855553.jpeg',  // girl writing colour pencil
  'https://images.pexels.com/photos/7054749/pexels-photo-7054749.jpeg',  // clean notebook study items
  'https://images.pexels.com/photos/6958563/pexels-photo-6958563.jpeg',  // boy with glasses reading math
  'https://images.pexels.com/photos/4144221/pexels-photo-4144221.jpeg',  // girl taking notes at computer
  'https://images.pexels.com/photos/8923577/pexels-photo-8923577.jpeg',  // girl at microscope
  'https://images.pexels.com/photos/7722919/pexels-photo-7722919.jpeg',  // anatomy pieces stethoscope
  'https://images.pexels.com/photos/7692464/pexels-photo-7692464.jpeg',  // boy with calculator
];

// Subject-specific image picks for the topics section
const SUBJECT_SECTION_IMAGE: Record<string, string> = {
  maths:               HERO_IMAGES[7],  // boy with glasses reading math book
  english:             HERO_IMAGES[0],  // glasses girl reading
  'verbal-reasoning':  HERO_IMAGES[3],  // writing boy looking at camera
  'non-verbal-reasoning': HERO_IMAGES[9], // girl at microscope
};

// Floating badge copy per subject
const SUBJECT_BADGE: Record<string, { top: string; bottom: string }> = {
  maths:               { top: '1,200+ questions', bottom: 'Full marks!' },
  english:             { top: 'Read & practise', bottom: 'Vocab unlocked!' },
  'verbal-reasoning':  { top: 'Pattern master', bottom: 'Code cracked!' },
  'non-verbal-reasoning': { top: 'Shape genius', bottom: 'Level up!' },
};

const SUBJECT_CONTENT: Record<string, {
  topics: string[];
  heroStat: string;
  heroStatLabel: string;
  faqs: { q: string; a: string }[];
  gradient: string;
  color: string;
  lightBg: string;
  dot: string;
  shadowColor: string;
}> = {
  maths: {
    topics: ['Number & Place Value', 'Addition & Subtraction', 'Multiplication & Division', 'Fractions, Decimals & Percentages', 'Ratio & Proportion', 'Algebra & Sequences', 'Geometry & Shapes', 'Measurement', 'Data Handling & Statistics', 'Problem Solving'],
    heroStat: '1,200+', heroStatLabel: 'Maths practice questions',
    gradient: 'from-blue-600 to-cyan-500', color: 'text-blue-600', lightBg: 'bg-blue-50', dot: 'bg-blue-500',
    shadowColor: 'shadow-blue-200/50',
    faqs: [
      { q: 'What maths topics appear in 11+ exams?', a: 'The 11+ maths syllabus covers number, fractions, decimals, algebra, geometry, measurement and data. GL Assessment and CEM exams both test these areas, often in multi-step word problems.' },
      { q: 'What level is 11+ maths?', a: 'Questions typically go beyond the standard Year 6 curriculum. Top-scoring children are comfortable with Year 7 concepts including basic algebra, advanced fractions and speed-distance-time calculations.' },
      { q: 'How many maths questions are in the 11+ exam?', a: 'GL Assessment maths papers usually have 50 questions in 50 minutes. CEM exams combine maths with reasoning and vary by region, typically 45–60 questions.' },
      { q: 'How do I help my child with 11+ maths?', a: 'Daily 15-minute practice sessions beat occasional long sessions. Focus on weak topics, use timed practice to build speed, and review mistakes carefully.' },
    ],
  },
  english: {
    topics: ['Reading Comprehension', 'Synonyms & Antonyms', 'Grammar & Punctuation', 'Spelling', 'Vocabulary in Context', 'Cloze Passages', 'Shuffled Sentences', 'Creative Writing', 'Persuasive Writing', 'Inference & Deduction'],
    heroStat: '900+', heroStatLabel: 'English practice questions',
    gradient: 'from-emerald-600 to-teal-500', color: 'text-emerald-600', lightBg: 'bg-emerald-50', dot: 'bg-emerald-500',
    shadowColor: 'shadow-emerald-200/50',
    faqs: [
      { q: 'What English skills does the 11+ test?', a: 'Reading comprehension is the largest section — inference, vocabulary and retrieval. Grammar, punctuation, spelling and creative writing also feature depending on your target school.' },
      { q: "How do I improve my child's vocabulary for the 11+?", a: 'Wide reading is the most effective long-term strategy. Supplement with daily word learning (10 new words per week), and practise using words in sentences rather than just memorising definitions.' },
      { q: 'Is creative writing in the 11+ exam?', a: 'Independent schools almost always include a writing task. Grammar school exams vary — GL Assessment usually has a shorter writing component, while some schools set a full creative writing paper.' },
      { q: 'How long should 11+ English preparation take?', a: 'Most families start 12–18 months before the exam. Six months of consistent practice is a reasonable minimum if your child is already a confident reader.' },
    ],
  },
  'verbal-reasoning': {
    topics: ['Letter Codes', 'Number Codes', 'Word Analogies', 'Odd One Out', 'Word Relationships', 'Alphabetical Order', 'Hidden Words', 'Compound Words', 'Logical Deduction', 'Sequences'],
    heroStat: '800+', heroStatLabel: 'Verbal Reasoning questions',
    gradient: 'from-violet-600 to-purple-500', color: 'text-violet-600', lightBg: 'bg-violet-50', dot: 'bg-violet-500',
    shadowColor: 'shadow-violet-200/50',
    faqs: [
      { q: 'What is verbal reasoning in the 11+ exam?', a: 'Verbal reasoning tests the ability to understand and reason using words and language. Question types include codes, analogies, odd-one-out, word sequences and logical deduction.' },
      { q: 'Is verbal reasoning hard to learn?', a: 'Most children can improve significantly with practice because the question types follow predictable patterns. Spotting the pattern quickly is the core skill, which comes with repetition.' },
      { q: 'Do all 11+ exams include verbal reasoning?', a: 'GL Assessment exams always include a verbal reasoning paper. CEM exams blend verbal reasoning with English comprehension rather than separating them.' },
      { q: 'How long does it take to prepare for verbal reasoning?', a: 'Most children need 6–12 months of regular practice. Start with understanding each question type, then build speed through timed practice.' },
    ],
  },
  'non-verbal-reasoning': {
    topics: ['Matrices', 'Series & Sequences', 'Analogies', 'Similarities & Differences', 'Reflections & Rotations', 'Nets & 3D Shapes', 'Codes', 'Odd Shape Out', 'Spatial Reasoning', 'Pattern Completion'],
    heroStat: '750+', heroStatLabel: 'Non-Verbal Reasoning questions',
    gradient: 'from-amber-500 to-orange-500', color: 'text-amber-600', lightBg: 'bg-amber-50', dot: 'bg-amber-500',
    shadowColor: 'shadow-amber-200/50',
    faqs: [
      { q: 'What is non-verbal reasoning?', a: 'Non-verbal reasoning uses shapes and patterns rather than words or numbers. It tests abstract thinking and spatial awareness.' },
      { q: 'Can you improve at non-verbal reasoning?', a: 'Yes — consistent practice with each question type dramatically improves speed and accuracy. Most children find certain question types much harder than others, so targeted practice helps.' },
      { q: 'Which schools test non-verbal reasoning?', a: 'GL Assessment grammar school exams almost always include NVR. Some CEM regions include it. Independent schools increasingly use NVR as part of their own assessments.' },
      { q: 'My child struggles with shapes and patterns — what should I do?', a: 'Start with one question type at a time. Use physical shapes and paper folding to build spatial intuition before moving to printed questions.' },
    ],
  },
};

interface SubjectData { slug: string; label: string; desc: string; color: string; bg: string; dot: string; icon?: React.ElementType }
interface CityData { slug: string; label: string }

export default function SubjectPageClient({ subject, cities }: { subject: SubjectData; cities: CityData[] }) {
    const content = SUBJECT_CONTENT[subject.slug];
  const handleModalSubmit = () => { setShowModal(false); window.location.href = '/'; };
  const sectionImg = SUBJECT_SECTION_IMAGE[subject.slug] || HERO_IMAGES[1];
  const badge = SUBJECT_BADGE[subject.slug] || { top: 'Practice now', bottom: 'Great work!' };

  return (
    <div className="min-h-screen bg-white">
      <SiteNav ctaLabel="Start Free" ctaHref="/" />

      {/* ─── Hero (unchanged) ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 pt-20 pb-28 px-4 sm:px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-gradient-to-r ${content.gradient}`} />
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-6 ${content.lightBg} ${content.color}`}>
            {subject.icon && <subject.icon size={15} />} Free 11+ {subject.label} Practice
          </div>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 leading-[1.1]">
            Free 11+ <span className={`text-transparent bg-clip-text bg-gradient-to-r ${content.gradient}`}>{subject.label}</span> Practice Questions
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Hundreds of exam-style questions, instant explanations and progress tracking. Aligned to GL Assessment, CEM and independent school formats.
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[{ val: content.heroStat, label: content.heroStatLabel }, { val: '4 exam', label: 'question formats' }, { val: 'Instant', label: 'explanations' }].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-black text-white">{s.val}</div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => router.push('/mock-exams')} className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 font-black text-lg rounded-2xl shadow-2xl hover:scale-105 transition-all">
            Start practising free <ArrowRight size={20} />
          </button>
          <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm font-semibold text-slate-400">
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> Free access</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> Instant access</span>
            <span className="flex items-center gap-1.5"><Check size={14} className="text-emerald-400" /> Free practice questions</span>
          </div>
        </div>
      </section>

      {/* ─── Topics section ───────────────────────────────────────────────── */}
      {/* Mobile: image as section background with dark gradient overlay      */}
      {/* Desktop: image card left (landing style) + topics grid right        */}
      <section className="relative overflow-hidden border-b border-slate-200">
        {/* Mobile-only background image */}
        <div className="absolute inset-0 lg:hidden">
          <img src={sectionImg} alt="" className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/85 via-slate-900/80 to-slate-900/90" />
        </div>

        <div className="relative py-20 px-4 sm:px-6 lg:bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Image card – desktop only (landing page style) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative order-2 lg:order-1 hidden lg:block"
              >
                <div className={`relative rounded-[2.5rem] overflow-hidden shadow-2xl ${content.shadowColor} border-4 border-white transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-[1.02]`}>
                  <img
                    src={sectionImg}
                    alt={`11+ ${subject.label} practice questions`}
                    className="w-full h-[420px] object-cover"
                  />
                  {/* Floating badge – top left */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 animate-pulse">
                    <div className={`flex items-center gap-2 font-black ${content.color}`}>
                      <GraduationCap size={18} />
                      <span className="text-sm">{badge.top}</span>
                    </div>
                  </div>
                  {/* Floating badge – bottom right */}
                  <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3 animate-bounce-slow">
                    <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                      <Check size={18} strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">{subject.label}</p>
                      <p className="text-emerald-600 text-xs font-bold">{badge.bottom}</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Topics grid */}
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl sm:text-4xl font-black mb-3 text-white lg:text-slate-900">{subject.label} topics covered</h2>
                <p className="text-lg mb-8 max-w-md text-slate-300 lg:text-slate-500">Every topic that appears in the 11+ exam, with questions at the right level of difficulty.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {content.topics.map((topic, i) => (
                    <motion.button
                      key={topic}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      onClick={() => router.push('/mock-exams')}
                      className="flex items-center gap-3 p-4 bg-white/10 lg:bg-white rounded-2xl border border-white/20 lg:border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all group text-left backdrop-blur-sm lg:backdrop-blur-none"
                    >
                      <div className={`w-8 h-8 rounded-xl ${content.lightBg} flex items-center justify-center shrink-0`}>
                        <div className={`w-2 h-2 rounded-full ${content.dot}`} />
                      </div>
                      <span className="font-semibold text-white lg:text-slate-700 group-hover:text-indigo-200 lg:group-hover:text-indigo-700 transition-colors text-sm flex-1">{topic}</span>
                      <ChevronRight size={16} className="text-white/50 lg:text-slate-300 group-hover:text-indigo-400 shrink-0" />
                    </motion.button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── Why 11 Plus Exam Papers ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3">Why 11 Plus Exam Papers for 11+ {subject.label}?</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Target, title: 'Exam-aligned questions', desc: `Every ${subject.label} question is written to match the style and difficulty of GL Assessment, CEM and independent school papers.`, color: 'bg-indigo-100 text-indigo-600' },
              { icon: Trophy, title: 'Instant explanations', desc: 'After every answer, your child sees a clear step-by-step explanation — building understanding, not just marking answers right or wrong.', color: 'bg-amber-100 text-amber-600' },
              { icon: BookOpen, title: 'Progress tracking', desc: `See exactly which ${subject.label} topics your child has mastered and which need more work, so practice time is never wasted.`, color: 'bg-emerald-100 text-emerald-600' },
            ].map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="p-7 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
                <div className={`w-12 h-12 rounded-2xl ${f.color} flex items-center justify-center mb-5`}><f.icon size={22} /></div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA band ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Ready to practise 11+ {subject.label}?</h2>
          <p className="text-indigo-100 text-lg mb-8">Join thousands of families preparing for grammar and independent school entrance exams.</p>
          <button onClick={() => router.push('/mock-exams')} className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 font-black text-lg rounded-2xl shadow-xl hover:scale-[1.02] transition-all">
            Explore mock exams <ArrowRight size={20} />
          </button>
          <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm font-semibold text-indigo-200">
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Free access</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Downloadable papers</span>
            <span className="flex items-center gap-1.5"><CheckCircle size={14} /> Instant access</span>
          </div>
        </div>
      </section>

      {/* ─── FAQs ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12"><h2 className="text-3xl font-black text-slate-900 mb-3">11+ {subject.label} — common questions</h2></div>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-slate-800 mb-2">{faq.q}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── City links ───────────────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-3">11+ {subject.label} prep by city</h2>
            <p className="text-slate-500">Find local resources and connect with tutors in your area.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {cities.map((city) => (
              <Link key={city.slug} href={`/${subject.slug}/${city.slug}`} className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-sm font-semibold transition-all group">
                <MapPin size={13} className="text-slate-300 group-hover:text-indigo-400 shrink-0" />{city.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-6 bg-white border-t border-slate-100">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10"><h2 className="text-2xl font-black text-slate-900">What parents say</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Sarah M.', role: 'Mother of Year 5 student', text: `My daughter went from dreading ${subject.label} practice to actually asking to do it. The explanations make everything click.` },
              { name: 'James T.', role: 'Father, Leeds', text: `We tried several resources and the ${subject.label} questions are the closest to the actual exam style.` },
              { name: 'Priya K.', role: 'Mother, London', text: 'The progress tracking showed us exactly where to focus. We stopped wasting time on topics he already knew.' },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="flex text-amber-400 mb-3">{[...Array(5)].map((_, j) => <Star key={j} size={14} fill="currentColor" />)}</div>
                <p className="text-slate-700 text-sm mb-4 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-xs">{t.name.charAt(0)}</div>
                  <div><div className="font-bold text-slate-800 text-sm">{t.name}</div><div className="text-xs text-slate-400">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
