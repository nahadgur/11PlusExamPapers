'use client';

import React, { useMemo, useState } from 'react';
import { MapPin, School, CheckCircle, Mail, Phone, User, BookOpen, Shield, Users } from 'lucide-react';

type City = { slug: string; label: string };

export default function TutorCityPageClient({ city }: { city: City }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    childYear: '',
    notes: '',
  });

  const title = useMemo(() => `11 Plus Tutor in ${city.label}`, [city.label]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-bold text-sm mb-5 border border-indigo-100">
            <MapPin size={16} /> {city.label}
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">{title}</h1>

          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            Looking for targeted 11+ support in {city.label}? This page is designed to help families understand local exam context and to request tutor support.
            We focus on structured practice, realistic exam conditions, and clear explanations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              { icon: School, title: 'Exam context', desc: 'Grammar / selective school focus' },
              { icon: BookOpen, title: 'Core subjects', desc: 'Maths, English, VR & NVR' },
              { icon: Shield, title: 'Practical guidance', desc: 'Clear steps to plan revision' },
            ].map((c) => (
              <div key={c.title} className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center mb-3 text-indigo-600">
                  <c.icon size={18} />
                </div>
                <div className="font-bold text-slate-900">{c.title}</div>
                <div className="text-sm text-slate-600 mt-1">{c.desc}</div>
              </div>
            ))}
          </div>

          <section className="mt-12">
            <h2 className="text-2xl font-black text-slate-900 mb-3">Local 11+ overview for {city.label}</h2>
            <div className="prose prose-slate max-w-none">
              <p>
                11+ arrangements vary by area. In and around {city.label}, families may be preparing for grammar school tests, selective academies,
                or independent school entrance assessments. The best starting point is to confirm which schools you are targeting and the test style they use
                (for example GL Assessment-style multiple choice, CEM-style formats, or school-set papers).
              </p>
              <p>
                A sensible plan usually includes: consistent practice in core topics, timed mock exams to build stamina, and focused review of mistakes to close gaps.
              </p>
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-black text-slate-900 mb-3">What to look for in an 11+ tutor</h2>
            <ul className="space-y-3">
              {[
                'Experience with the specific schools / test style you are targeting',
                'A structured plan: diagnostics → practice → timed mocks → review',
                'Clear explanations and good communication with parents',
                'Regular, manageable homework rather than last-minute cramming',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle size={14} />
                  </div>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm sticky top-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Users size={20} />
              </div>
              <div>
                <div className="font-black text-slate-900 text-lg">Tutor enquiry</div>
                <div className="text-sm text-slate-500">Request support in {city.label}</div>
              </div>
            </div>

            {!submitted ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!form.email || !form.name) return;
                  setSubmitted(true);
                }}
                className="space-y-3"
              >
                <label className="block">
                  <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Your name</div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="Parent / guardian"
                    />
                  </div>
                </label>

                <label className="block">
                  <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Email</div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </label>

                <label className="block">
                  <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Phone (optional)</div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
                      placeholder="07..."
                    />
                  </div>
                </label>

                <label className="block">
                  <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Child’s year (optional)</div>
                  <input
                    value={form.childYear}
                    onChange={(e) => setForm({ ...form, childYear: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none"
                    placeholder="Year 4 / Year 5"
                  />
                </label>

                <label className="block">
                  <div className="text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Notes (optional)</div>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-200 outline-none min-h-[96px]"
                    placeholder="Schools you’re targeting, topics to focus on, time until exam…"
                  />
                </label>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black shadow-lg shadow-indigo-200 transition-colors"
                >
                  Send enquiry
                </button>

                <div className="text-xs text-slate-500 leading-relaxed">
                  This form is for enquiries only. We don’t lock resources behind sign-up.
                </div>
              </form>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                <div className="font-black mb-1">Thanks — we’ve received your enquiry.</div>
                <div className="text-sm text-emerald-800">
                  We’ll be in touch using the details you provided.
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
