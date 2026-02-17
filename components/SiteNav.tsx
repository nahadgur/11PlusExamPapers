'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  MapPin,
  Menu,
  X,
  Calculator,
  BookOpen,
  BrainCircuit,
  Shapes,
  GraduationCap,
  Mail,
  Phone,
  User,
  Calendar,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { SUBJECTS as BASE_SUBJECTS, UK_CITIES } from '@/lib/siteData';

// Add icons client-side only — icons are functions and cannot be passed as props from server components
export const SUBJECTS = BASE_SUBJECTS.map((s, i) => ({
  ...s,
  icon: [Calculator, BookOpen, BrainCircuit, Shapes][i],
}));

export { UK_CITIES };

// ─── SiteNav ──────────────────────────────────────────────────────────────────

interface SiteNavProps {
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

export const SiteNav: React.FC<SiteNavProps> = ({
  ctaLabel = 'Find a tutor',
  ctaHref = '/tutors',
  onCtaClick,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'subjects' | 'tutors' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'subjects' | 'tutors' | null>(null);
  const close = () => setOpenDropdown(null);

  const handleCtaClick = (e: React.MouseEvent) => {
    if (onCtaClick) {
      e.preventDefault();
      onCtaClick();
    }
  };

  return (
    <nav
      className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
      onMouseLeave={close}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md group-hover:scale-105 transition-transform">
            11+
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">
            11 Plus<span className="text-indigo-600">Exam Papers</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {/* Subjects dropdown */}
          <div className="relative" onMouseEnter={() => setOpenDropdown('subjects')}>
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                openDropdown === 'subjects'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Subjects
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${openDropdown === 'subjects' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'subjects' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 overflow-hidden"
                >
                  {SUBJECTS.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/subjects/${s.slug}`}
                      onClick={close}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-left group"
                    >
                      <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                        <s.icon size={16} className={s.color} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {s.label}
                        </div>
                        <div className="text-xs text-slate-400 font-medium truncate">{s.desc}</div>
                      </div>
                      <ChevronRight
                        size={14}
                        className="ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0"
                      />
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mock Exams */}
          <Link
            href="/mock-exams"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Mock Exams
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Blog
          </Link>

          {/* Exam Papers */}
          <Link
            href="/exam-papers"
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Exam Papers
            <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wide leading-none">
              Free
            </span>
          </Link>

          {/* School-Themed Papers */}
          <Link
            href="/school-themed-papers"
            className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            School-Themed Papers
          </Link>

          {/* Tutors dropdown */}
          <div className="relative" onMouseEnter={() => setOpenDropdown('tutors')}>
            <button
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                openDropdown === 'tutors'
                  ? 'bg-slate-100 text-indigo-600'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Tutors
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${openDropdown === 'tutors' ? 'rotate-180' : ''}`}
              />
            </button>
            <AnimatePresence>
              {openDropdown === 'tutors' && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 overflow-hidden"
                >
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">
                    11+ Tutors by City
                  </p>
                  <div className="grid grid-cols-2 gap-0.5">
                    {UK_CITIES.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/tutors/${city.slug}`}
                        onClick={close}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-sm font-semibold transition-colors group"
                      >
                        <MapPin
                          size={12}
                          className="text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0"
                        />
                        {city.label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href={onCtaClick ? '#' : ctaHref}
            onClick={onCtaClick ? handleCtaClick : undefined}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 hover:scale-[1.02] hover:shadow-indigo-300 transition-all"
          >
            {ctaLabel}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-100 bg-white"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Mobile Subjects */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'subjects' ? null : 'subjects')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Subjects
                <ChevronDown size={15} className={`transition-transform ${mobileExpanded === 'subjects' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileExpanded === 'subjects' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-3 space-y-0.5"
                  >
                    {SUBJECTS.map((s) => (
                      <Link
                        key={s.slug}
                        href={`/subjects/${s.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <s.icon size={14} className={s.color} />
                        {s.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Mobile Mock Exams */}
              <Link
                href="/mock-exams"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Mock Exams
              </Link>

              {/* Mobile Blog */}
              <Link
                href="/blog"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Blog
              </Link>

              {/* Mobile Exam Papers */}
              <Link
                href="/exam-papers"
                onClick={() => setMobileOpen(false)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Exam Papers
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-wide">
                  Free
                </span>
              </Link>

              {/* Mobile Tutors */}
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'tutors' ? null : 'tutors')}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Tutors
                <ChevronDown size={15} className={`transition-transform ${mobileExpanded === 'tutors' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {mobileExpanded === 'tutors' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden pl-3 grid grid-cols-2 gap-0.5"
                  >
                    {UK_CITIES.map((city) => (
                      <Link
                        key={city.slug}
                        href={`/tutors/${city.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <MapPin size={11} className="text-slate-300 shrink-0" />
                        {city.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                {onCtaClick ? (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onCtaClick();
                    }}
                    className="w-full py-3 text-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm rounded-xl"
                  >
                    {ctaLabel}
                  </button>
                ) : (
                  <Link
                    href={ctaHref}
                    onClick={() => setMobileOpen(false)}
                    className="w-full py-3 text-center bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm rounded-xl"
                  >
                    {ctaLabel}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// ─── LeadGenModal ─────────────────────────────────────────────────────────────

export const LeadGenModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}) => {
  const [formData, setFormData] = useState({ email: '', phone: '', childName: '', childYear: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.childName) onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100]"
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden pointer-events-auto max-h-[90vh] overflow-y-auto"
            >
              <div className="relative p-6 sm:p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="text-center mb-6">
                  <div className="w-14 h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <GraduationCap size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">Request tutor support</h3>
                  <p className="text-slate-500 text-sm">
                    Send a short enquiry and we'll connect you with experienced 11+ tutors in your area.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Your email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800"
                        placeholder="name@example.com"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Your phone number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        type="tel"
                        name="phone"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800"
                        placeholder="07xxx xxxxxx"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Child's name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                          type="text"
                          name="childName"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800"
                          placeholder="Noah"
                          value={formData.childName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Year group
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <select
                          name="childYear"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800 appearance-none"
                          value={formData.childYear}
                          onChange={handleChange}
                        >
                          <option value="" disabled>
                            Select year
                          </option>
                          <option>Year 3</option>
                          <option>Year 4</option>
                          <option>Year 5</option>
                          <option>Year 6</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                  >
                    Send enquiry <ArrowRight size={20} />
                  </button>

                  <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1">
                    <Lock size={12} /> Your details are kept private.
                  </p>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
