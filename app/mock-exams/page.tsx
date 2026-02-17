'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  School, Building2, BookOpen, Clock, Target, Brain,
  CheckCircle, ChevronRight, Rocket, ClipboardList,
  Star, Zap, BarChart3, Shield,
} from 'lucide-react';
import Link from 'next/link';
import { SiteNav } from '@/components/SiteNav';
import { SiteFooter } from '@/components/SiteFooter';

type SchoolType = 'grammar' | 'independent' | 'state';
type Step = 'school-type' | 'test-config' | 'confirm';

interface TestConfig {
  schoolType: SchoolType | null;
  duration: number;
  subjects: string[];
  difficulty: 'standard' | 'challenging' | 'exam-ready';
}

// ─── Static data ─────────────────────────────────────────────────────────────

const SCHOOL_TYPES = [
  {
    id: 'grammar' as SchoolType,
    title: 'Grammar School',
    subtitle: 'GL Assessment & CEM Style',
    icon: School,
    desc: 'Tailored to selective grammar school 11+ entrance exams, covering Maths, English, Verbal and Non-Verbal Reasoning in GL and CEM formats.',
    badges: ['GL Assessment', 'CEM Style', 'CSSE'],
    gradient: 'from-indigo-500 to-violet-600',
    // light-theme selected state
    selBg: 'bg-indigo-50',
    selBorder: 'border-indigo-400',
    badgeBg: 'bg-indigo-100 text-indigo-700 border border-indigo-200',
  },
  {
    id: 'independent' as SchoolType,
    title: 'Independent School',
    subtitle: 'Common Entrance & ISEB',
    icon: Building2,
    desc: 'Preparation for private school entrance examinations including Common Entrance, ISEB Pre-Tests, and scholarship assessments.',
    badges: ['ISEB Pre-Test', 'Common Entrance', 'Scholarship'],
    gradient: 'from-emerald-500 to-teal-600',
    selBg: 'bg-emerald-50',
    selBorder: 'border-emerald-400',
    badgeBg: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  },
  {
    id: 'state' as SchoolType,
    title: 'State School',
    subtitle: 'KS2 SATs & Core Curriculum',
    icon: BookOpen,
    desc: 'Comprehensive Key Stage 2 preparation covering the core National Curriculum topics to help your child excel in SATs and beyond.',
    badges: ['KS2 SATs', 'Core Maths', 'Reading'],
    gradient: 'from-amber-500 to-orange-600',
    selBg: 'bg-amber-50',
    selBorder: 'border-amber-400',
    badgeBg: 'bg-amber-100 text-amber-700 border border-amber-200',
  },
];

const SUBJECTS_BY_TYPE: Record<SchoolType, { id: string; label: string; desc: string }[]> = {
  grammar: [
    { id: 'maths',     label: 'Maths',                desc: 'Arithmetic, algebra & problem-solving' },
    { id: 'english',   label: 'English',              desc: 'Comprehension, grammar & vocabulary'   },
    { id: 'verbal',    label: 'Verbal Reasoning',     desc: 'Codes, sequences & word problems'      },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning', desc: 'Patterns, matrices & shapes'           },
  ],
  independent: [
    { id: 'maths',     label: 'Maths',                desc: 'Arithmetic, algebra & geometry'        },
    { id: 'english',   label: 'English',              desc: 'Comprehension, writing & grammar'      },
    { id: 'verbal',    label: 'Verbal Reasoning',     desc: 'Word relationships & logic'            },
    { id: 'nonverbal', label: 'Non-Verbal Reasoning', desc: 'Spatial & abstract reasoning'          },
  ],
  state: [
    { id: 'maths',   label: 'Maths',   desc: 'Number, measurement & geometry'  },
    { id: 'english', label: 'English', desc: 'Reading comprehension & grammar'  },
    { id: 'science', label: 'Science', desc: 'KS2 science topics'               },
  ],
};

const DURATIONS = [
  { mins: 25, label: '25 mins', desc: 'Quick session'  },
  { mins: 45, label: '45 mins', desc: 'Standard test'  },
  { mins: 60, label: '60 mins', desc: 'Full length'    },
  { mins: 90, label: '90 mins', desc: 'Extended exam'  },
];

const DIFFICULTIES = [
  { id: 'standard'    as const, label: 'Standard',   desc: 'Year 5 difficulty',      dot: 'bg-emerald-500' },
  { id: 'challenging' as const, label: 'Challenging', desc: 'Upper Year 5 / Year 6', dot: 'bg-amber-500'   },
  { id: 'exam-ready'  as const, label: 'Exam Ready', desc: 'Full exam difficulty',   dot: 'bg-rose-500'    },
];

const STATS = [
  { icon: ClipboardList, value: 'Exam-style',  label: 'Structured papers' },
  { icon: Shield,        value: 'GL & CEM',    label: 'Style coverage' },
  { icon: Clock,         value: '25–90',       label: 'Timed sessions' },
  { icon: CheckCircle,   value: 'Free',        label: 'Access (for now)' },
];

const FEATURES = [
  { icon: ClipboardList, title: 'Exam-style structure',   desc: 'Clear sections, realistic pacing, and a paper-like flow — using our current QuizArea engine.', bg: 'bg-violet-50',  color: 'text-violet-600' },
  { icon: Clock,         title: 'Timed conditions',       desc: 'Optional timers help children practise under proper exam conditions and build confidence.',           bg: 'bg-emerald-50', color: 'text-emerald-600' },
  { icon: BarChart3,     title: 'Instant results',        desc: 'See scores and topic-level feedback to guide what to practise next.',                              bg: 'bg-blue-50',    color: 'text-blue-600'    },
  { icon: Target,        title: 'Syllabus coverage',      desc: 'Maths, English, Verbal Reasoning and Non-Verbal Reasoning in familiar 11+ formats.',              bg: 'bg-amber-50',   color: 'text-amber-600'   },
  { icon: CheckCircle,   title: 'Clear explanations',     desc: 'Review answers with straightforward explanations so children learn from mistakes.',                 bg: 'bg-indigo-50',  color: 'text-indigo-600'  },
  { icon: Shield,        title: 'Built for 11+ prep',     desc: 'Created for families preparing for grammar and independent school entrance exams.',                 bg: 'bg-slate-100',  color: 'text-slate-600'   },
];

const STEP_ORDER: Step[] = ['school-type', 'test-config', 'confirm'];
const STEP_LABELS = ['School Type', 'Test Setup', 'Confirm'];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function MockExamsPage() {
  const router = useRouter();
  const [step, setStep]           = useState<Step>('school-type');
  const [config, setConfig]       = useState<TestConfig>({ schoolType: null, duration: 45, subjects: [], difficulty: 'standard' });

  const selectedType   = SCHOOL_TYPES.find(s => s.id === config.schoolType);
  const availableSubjs = config.schoolType ? SUBJECTS_BY_TYPE[config.schoolType] : [];
  const currentIdx     = STEP_ORDER.indexOf(step);

  const toggleSubject = (id: string) =>
    setConfig(prev => ({
      ...prev,
      subjects: prev.subjects.includes(id) ? prev.subjects.filter(s => s !== id) : [...prev.subjects, id],
    }));

  const canProceed = () => {
    if (step === 'school-type') return !!config.schoolType;
    if (step === 'test-config') return config.subjects.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step === 'school-type') {
      const allSubjects = config.schoolType ? SUBJECTS_BY_TYPE[config.schoolType].map(s => s.id) : [];
      setConfig(prev => ({ ...prev, subjects: allSubjects }));
      setStep('test-config');
    } else if (step === 'test-config') {
      setStep('confirm');
    }
  };

  const handleStartTest = () => {
    // Free access: start an interactive mock exam using the existing quiz engine
    const params = new URLSearchParams();
    params.set('start', 'mock');
    if (config.schoolType) params.set('schoolType', config.schoolType);
    router.push(`/?${params.toString()}`);
  };
  
  return (
    <>
      <SiteNav ctaLabel="Find a tutor" ctaHref="/tutors" />

      <main className="bg-white">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-50 pt-20 pb-14 px-4">
          {/* Decorative blobs */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-[500px] h-[500px] bg-violet-200 opacity-20 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-200 opacity-15 rounded-full blur-3xl" />

          <div className="relative max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                <ClipboardList size={12} /> Interactive Mock Exams
              </div>

              <h1 className="text-4xl sm:text-6xl font-black text-slate-900 mb-5 tracking-tight leading-tight">
                Sit a<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  realistic 11+ mock exam
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Choose an exam style and sit a structured mock using our existing interactive question engine. Designed to mirror real 11+ papers and timings.
              </p>
            </motion.div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto mb-12"
            >
              {STATS.map((item, i) => (
                <div key={i} className="text-center p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                  <item.icon size={20} className="text-indigo-500 mx-auto mb-2" />
                  <div className="text-2xl font-black text-slate-900">{item.value}</div>
                  <div className="text-xs text-slate-500 font-medium">{item.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Step progress */}
            <div className="flex items-center justify-center gap-3 mb-10">
              {STEP_ORDER.map((s, i) => {
                const isActive = step === s;
                const isPast   = currentIdx > i;
                return (
                  <React.Fragment key={s}>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                        isPast
                          ? 'bg-indigo-600 text-white'
                          : isActive
                          ? 'bg-white border-2 border-indigo-500 text-indigo-600 shadow-sm'
                          : 'bg-white border border-slate-200 text-slate-400'
                      }`}>
                        {isPast ? <CheckCircle size={16} /> : i + 1}
                      </div>
                      <span className={`text-xs font-bold hidden sm:block ${
                        isActive ? 'text-slate-900' : isPast ? 'text-indigo-600' : 'text-slate-400'
                      }`}>
                        {STEP_LABELS[i]}
                      </span>
                    </div>
                    {i < 2 && <div className={`w-8 h-px transition-colors ${isPast ? 'bg-indigo-500' : 'bg-slate-200'}`} />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Step content ─────────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
          <AnimatePresence mode="wait">

            {/* ── STEP 1: School type ── */}
            {step === 'school-type' && (
              <motion.div
                key="school-type"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-black text-slate-900 text-center mb-2">
                  Which type of school are you preparing for?
                </h2>
                <p className="text-slate-500 text-center mb-10">
                  We'll tailor the mock test format to match real entrance exam styles.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                  {SCHOOL_TYPES.map((type, idx) => {
                    const isSelected = config.schoolType === type.id;
                    return (
                      <motion.button
                        key={type.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ y: -4 }}
                        onClick={() => setConfig(prev => ({ ...prev, schoolType: type.id }))}
                        className={`relative flex flex-col text-left p-6 rounded-3xl border-2 transition-all group overflow-hidden ${
                          isSelected
                            ? `${type.selBg} ${type.selBorder} shadow-lg`
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                        }`}
                      >
                        {/* Top gradient accent bar */}
                        <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${type.gradient} transition-opacity ${isSelected ? 'opacity-100' : 'opacity-30 group-hover:opacity-60'}`} />

                        {/* Selected checkmark */}
                        {isSelected && (
                          <div className="absolute top-4 right-4 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        )}

                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${type.gradient} flex items-center justify-center text-white mb-5 shadow-md`}>
                          <type.icon size={28} />
                        </div>

                        <h3 className="text-xl font-black text-slate-900 mb-1">{type.title}</h3>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-4">{type.subtitle}</p>
                        <p className="text-sm text-slate-500 leading-relaxed mb-5">{type.desc}</p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {type.badges.map(b => (
                            <span key={b} className={`px-2.5 py-1 text-[10px] font-bold rounded-full uppercase tracking-wide ${type.badgeBg}`}>
                              {b}
                            </span>
                          ))}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:scale-[1.02] hover:shadow-indigo-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                  >
                    Continue to Test Setup <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: Test config ── */}
            {step === 'test-config' && (
              <motion.div
                key="test-config"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              >
                <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Customise your mock test</h2>
                <p className="text-slate-500 text-center mb-10">
                  Select the subjects, duration, and difficulty that match your child's current level.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">

                  {/* Subjects panel */}
                  <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                    <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1">Subjects</h3>
                    <p className="text-xs text-slate-400 mb-5">Select one or more subjects to include</p>
                    <div className="space-y-3">
                      {availableSubjs.map((subject) => {
                        const selected = config.subjects.includes(subject.id);
                        return (
                          <button
                            key={subject.id}
                            onClick={() => toggleSubject(subject.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                              selected ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                              selected ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'
                            }`}>
                              {selected && <CheckCircle size={12} className="text-white" />}
                            </div>
                            <div>
                              <div className={`text-sm font-bold ${selected ? 'text-indigo-700' : 'text-slate-700'}`}>{subject.label}</div>
                              <div className="text-xs text-slate-400">{subject.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Duration + Difficulty */}
                  <div className="space-y-6">

                    {/* Duration */}
                    <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Clock size={14} className="text-indigo-500" /> Duration
                      </h3>
                      <p className="text-xs text-slate-400 mb-5">Choose how long the mock test should be</p>
                      <div className="grid grid-cols-2 gap-3">
                        {DURATIONS.map((d) => {
                          const sel = config.duration === d.mins;
                          return (
                            <button
                              key={d.mins}
                              onClick={() => setConfig(prev => ({ ...prev, duration: d.mins }))}
                              className={`p-3 rounded-xl border-2 transition-all text-left ${
                                sel ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className={`text-sm font-black ${sel ? 'text-indigo-700' : 'text-slate-700'}`}>{d.label}</div>
                              <div className="text-xs text-slate-400">{d.desc}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Difficulty */}
                    <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm">
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-1 flex items-center gap-2">
                        <Target size={14} className="text-indigo-500" /> Difficulty
                      </h3>
                      <p className="text-xs text-slate-400 mb-5">Match difficulty to your child's preparation stage</p>
                      <div className="space-y-3">
                        {DIFFICULTIES.map((d) => {
                          const sel = config.difficulty === d.id;
                          return (
                            <button
                              key={d.id}
                              onClick={() => setConfig(prev => ({ ...prev, difficulty: d.id }))}
                              className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                                sel ? 'bg-indigo-50 border-indigo-400' : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <div className={`w-4 h-4 rounded-full border-2 shrink-0 ${sel ? 'bg-indigo-600 border-indigo-600' : 'border-slate-300'}`} />
                              <div className="text-left">
                                <span className={`text-sm font-bold ${sel ? 'text-indigo-700' : 'text-slate-700'}`}>{d.label}</span>
                                <span className="text-xs text-slate-400 ml-2">— {d.desc}</span>
                              </div>
                              <div className={`w-2 h-2 rounded-full ml-auto ${d.dot}`} />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep('school-type')}
                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-700 transition-colors border border-slate-200 hover:border-slate-300 bg-white"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-lg bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 hover:scale-[1.02] hover:shadow-indigo-300 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
                  >
                    Review your test <ChevronRight size={20} />
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3: Confirm ── */}
            {step === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <h2 className="text-2xl font-black text-slate-900 text-center mb-2">Your mock test is ready</h2>
                <p className="text-slate-500 text-center mb-10">Review the details below and start when you're ready.</p>

                {/* Summary card */}
                <div className="rounded-3xl border border-slate-200 shadow-sm mb-8 overflow-hidden bg-white">
                  {selectedType && (
                    <div className={`p-6 ${selectedType.selBg} border-b border-slate-100`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${selectedType.gradient} flex items-center justify-center text-white shadow-md`}>
                          <selectedType.icon size={28} />
                        </div>
                        <div>
                          <div className="text-xl font-black text-slate-900">{selectedType.title}</div>
                          <div className="text-sm text-slate-500">{selectedType.subtitle}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-6 divide-y divide-slate-100">
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <BookOpen size={16} className="text-indigo-500" /> Subjects
                      </div>
                      <div className="flex flex-wrap gap-1.5 justify-end">
                        {config.subjects.map(s => {
                          const subj = availableSubjs.find(sub => sub.id === s);
                          return (
                            <span key={s} className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700">
                              {subj?.label}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <Clock size={16} className="text-indigo-500" /> Duration
                      </div>
                      <span className="text-slate-900 font-black">{config.duration} minutes</span>
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-2 text-slate-500 text-sm font-bold">
                        <Target size={16} className="text-indigo-500" /> Difficulty
                      </div>
                      <span className="text-slate-900 font-black capitalize">{config.difficulty.replace('-', ' ')}</span>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { icon: Brain,     text: 'Exam-style questions'       },
                    { icon: BarChart3, text: 'Instant results & analysis' },
                    { icon: Shield,    text: 'Aligned to real exam formats'},
                  ].map((b, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl text-center bg-slate-50 border border-slate-200">
                      <b.icon size={20} className="text-indigo-500" />
                      <span className="text-xs font-bold text-slate-500">{b.text}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setStep('test-config')}
                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-700 transition-colors border border-slate-200 hover:border-slate-300 bg-white"
                  >
                    ← Back
                  </button>
                  <button
                      onClick={handleStartTest}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-lg text-white bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-200 hover:scale-[1.02] hover:shadow-indigo-300 transition-all"
                    >
                      <Rocket size={22} /> Start mock exam now
                    </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </section>

        {/* ── Why our mock tests work ───────────────────────────────────────── */}
        <section className="bg-slate-50 border-t border-slate-100 py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Why our mock tests work</h2>
              <p className="text-slate-500 max-w-xl mx-auto">
                Built around the real question formats used in 11+ entrance exams across the UK.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className={`w-12 h-12 ${f.bg} rounded-2xl flex items-center justify-center mb-5`}>
                    <f.icon size={24} className={f.color} />
                  </div>
                  <h3 className="text-base font-black text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </>
  );
}
