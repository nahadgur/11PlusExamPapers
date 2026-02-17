import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Brain, Trophy, ChevronRight, Sparkles, Target, Zap, Check, Star, Users, ArrowRight, ShieldCheck, Mail, HelpCircle, Gamepad2, GraduationCap, X, Lock, CheckCircle, Phone, User, Calendar, ChevronDown, MapPin, Menu } from 'lucide-react';
import { Button } from './Button';
import { SiteNav } from './SiteNav';
import { SUBJECTS as SITE_SUBJECTS, UK_CITIES as SITE_CITIES } from '@/lib/siteData';

interface LandingPageProps {
  onStart: () => void;
}

export const LeadGenModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean; onClose: () => void; onSubmit: () => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    childName: '',
    childYear: ''
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(formData.email && formData.childName) onSubmit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
                    <Mail size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">Request tutor support</h3>
                  <p className="text-slate-500 text-sm">Send a short enquiry and we’ll connect you with experienced 11+ tutors in your area.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Parent’s email</label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Phone number</label>
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
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Child’s name</label>
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
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">Child’s year group</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                name="childYear"
                                required
                                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-slate-800 appearance-none"
                                value={formData.childYear}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select year group</option>
                                <option value="Year 3">Year 3</option>
                                <option value="Year 4">Year 4</option>
                                <option value="Year 5">Year 5</option>
                                <option value="Year 6">Year 6</option>
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

                  <p className="text-xs text-center text-slate-400 mt-4 flex items-center justify-center gap-1">
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

// ─── NavBar ───────────────────────────────────────────────────────────────────

const SUBJECTS = SITE_SUBJECTS;
const UK_CITIES = SITE_CITIES;

const NavBar: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [openDropdown, setOpenDropdown] = useState<'subjects' | 'locations' | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<'subjects' | 'locations' | null>(null);

  const close = () => setOpenDropdown(null);

  return (
    <>
      <nav
        className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
        onMouseLeave={close}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-black text-base shadow-md">
              11+
            </div>
            <span className="text-xl font-extrabold text-slate-800 tracking-tight leading-none">
              Whiz<span className="text-indigo-600">Prep</span>
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">

            {/* Subjects dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('subjects')}>
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  openDropdown === 'subjects' ? 'bg-slate-100 text-indigo-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Subjects
                <ChevronDown size={15} className={`transition-transform duration-200 ${openDropdown === 'subjects' ? 'rotate-180' : ''}`} />
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
                          <div className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{s.label}</div>
                          <div className="text-xs text-slate-400 font-medium">{s.desc}</div>
                        </div>
                        <ChevronRight size={14} className="ml-auto text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mock Tests */}
            <Link
              href="/mock-tests"
              className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Mock Tests
            </Link>

            {/* Exam Papers */}
            <Link
              href="/exam-papers"
              className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              Exam Papers
            </Link>

            {/* Blog */}
            <button className="px-4 py-2 rounded-lg text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors">
              Blog
            </button>

            {/* Locations dropdown */}
            <div className="relative" onMouseEnter={() => setOpenDropdown('locations')}>
              <button
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                  openDropdown === 'locations' ? 'bg-slate-100 text-indigo-600' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Locations
                <ChevronDown size={15} className={`transition-transform duration-200 ${openDropdown === 'locations' ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {openDropdown === 'locations' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 overflow-hidden"
                  >
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-2">11+ Prep by City</p>
                    <div className="grid grid-cols-2 gap-0.5">
                      {UK_CITIES.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/locations/${city.slug}`}
                          onClick={close}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-700 text-slate-600 text-sm font-semibold transition-colors text-left group"
                        >
                          <MapPin size={12} className="text-slate-300 group-hover:text-indigo-400 transition-colors shrink-0" />
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
            <button onClick={onStart} className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors px-3 py-2">
              Log in
            </button>
            <Button onClick={onStart} size="md">Get Started</Button>
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
                          className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Mobile Mock Tests */}
                <Link
                  href="/mock-tests"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Mock Tests
                </Link>

                {/* Mobile Exam Papers */}
                <Link
                  href="/exam-papers"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Exam Papers
                </Link>

                {/* Mobile Blog */}
                <button className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                  Blog
                </button>

                {/* Mobile Locations */}
                <button
                  onClick={() => setMobileExpanded(mobileExpanded === 'locations' ? null : 'locations')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Locations
                  <ChevronDown size={15} className={`transition-transform ${mobileExpanded === 'locations' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'locations' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden pl-3 grid grid-cols-2 gap-0.5"
                    >
                      {UK_CITIES.map((city) => (
                        <Link
                          key={city.slug}
                          href={`/locations/${city.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className="text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                        >
                          {city.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      onStart();
                    }}
                    className="w-full py-2.5 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    Log in
                  </button>
                  <Button
                    onClick={() => {
                      setMobileOpen(false);
                      onStart();
                    }}
                    className="w-full justify-center"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

// ─── LandingPage ──────────────────────────────────────────────────────────────
export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-inter">
      {/* Navbar */}
      <SiteNav ctaLabel="Explore resources" ctaHref="/mock-exams" />

      {/* Hero Section (White) */}
      <div className="relative pt-8 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center lg:items-start text-center lg:text-left z-10"
            >
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 rounded-full text-indigo-700 font-bold text-sm mb-6 border border-indigo-100 shadow-sm">
                <Sparkles size={16} /> Mock exams, practice papers and tutor support
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl font-black text-slate-900 tracking-tight mb-6 leading-[1.1]">
                11+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">exam preparation</span> built for real exam conditions.
              </motion.h1>

              <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-500 font-medium mb-10 max-w-xl leading-relaxed">
                High-quality 11+ practice for grammar and independent schools. Build confidence in Maths, English, Verbal and Non-Verbal Reasoning — with clear explanations and structured practice.
              </motion.p>

              {/* Call to Action Button */}
              <motion.div variants={itemVariants} className="w-full max-w-lg mb-10 flex flex-col items-center lg:items-start">
                <button
                    onClick={onStart}
                    className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-xl sm:text-2xl rounded-full shadow-xl shadow-indigo-200 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40 overflow-hidden"
                >
                    {/* Shine Effect */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                    
                    {/* Pulse Ring */}
                    <span className="absolute inset-0 rounded-full ring-2 ring-white/30 animate-pulse"></span>
                    
                    <span className="relative flex items-center gap-2">
                        Explore mock exams <ArrowRight className="w-6 h-6" strokeWidth={3} />
                    </span>
                </button>
                
                {/* Benefits */}
                <div className="mt-6 flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 px-2 text-sm font-bold text-slate-500">
                  <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" strokeWidth={3} /> Free access</span>
                  <span className="flex items-center gap-2"><Check size={16} className="text-emerald-500" strokeWidth={3} /> No sign-up required</span>
                </div>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i*13}`} alt="User" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col text-sm">
                   <div className="flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                      </div>
                      <span className="font-bold text-slate-800">Trusted approach</span>
                   </div>
                   <span className="font-medium text-slate-500">Used by families preparing for the 11+</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column: Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="relative hidden lg:block"
            >
                {/* Decorative blobs */}
                <div className="absolute top-10 -right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute -bottom-10 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
                
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50 border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500 hover:scale-[1.02]">
                    <img 
                        src="https://images.unsplash.com/photo-1610484826967-09c5720778c7?q=80&w=2070&auto=format&fit=crop" 
                        alt="Happy student studying with tablet" 
                        className="w-full h-auto object-cover"
                    />
                    
                    {/* Floating Cards */}
                    <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex items-center gap-3 animate-bounce-slow">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                            <Check size={20} strokeWidth={3} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-800 text-sm">Maths Quiz</p>
                            <p className="text-emerald-600 text-xs font-bold">Full marks!</p>
                        </div>
                    </div>

                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 animate-bounce-slow animation-delay-2000">
                         <div className="flex items-center gap-1 text-amber-500 font-bold">
                            <Zap size={16} fill="currentColor" />
                            <span>Timed practice</span>
                         </div>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>

      {/* Feature Section 1: Mock Exams (Slate-50) */}
<div className="py-24 bg-slate-50 overflow-hidden border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

       {/* Image Left */}
       <motion.div 
         initial={{ opacity: 0, x: -50 }}
         whileInView={{ opacity: 1, x: 0 }}
         viewport={{ once: true }}
         transition={{ duration: 0.8 }}
         className="relative order-2 lg:order-1"
       >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-200/30 rounded-full blur-3xl -z-10" />
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/40 border-4 border-white transform -rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-[1.02]">
             <img 
                src="https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2069&auto=format&fit=crop" 
                alt="Exam-style practice" 
                className="w-full h-auto object-cover"
             />
          </div>
       </motion.div>

       {/* Text Right */}
       <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="order-1 lg:order-2"
       >
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
             <Target size={24} />
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">Mock exams that reflect real exam structure</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
             Our mock exams are built to feel like the real thing: clear sections, realistic timing, and familiar 11+ question formats.
          </p>
          <ul className="space-y-4 mb-8">
             {[
               "Structured, timed mock exams using our existing quiz engine",
               "Clear marking and explanations to support focused revision",
               "Designed for common 11+ formats across the UK"
             ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                   <div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div>
                   {item}
                </li>
             ))}
          </ul>
          <Link href="/mock-exams" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">Explore mock exams</Link>
       </motion.div>
    </div>
  </div>
</div>

{/* Feature Section 2: Tutor Support (White) */}
      <div className="py-24 bg-white overflow-hidden border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
             
             {/* Text Left */}
             <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="order-1"
             >
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6">
                   <Brain size={24} />
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-slate-900 mb-6 tracking-tight">Tutor support when you want 1:1 guidance</h2>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                   Use our tutor pages to learn about local grammar schools and send a tutor enquiry when you want individual support alongside structured practice.
                </p>
                <ul className="space-y-4 mb-8">
                   {[
                     "Local tutor enquiry pages (e.g. “11 Plus Tutor in London”)",
                     "Grammar school context for each area",
                     "A simple enquiry form to request help"
                   ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-bold text-slate-700">
                         <div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-700 flex items-center justify-center shrink-0"><Check size={14} strokeWidth={3} /></div>
                         {item}
                      </li>
                   ))}
                </ul>
                <Link href="/tutors" className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200">Find tutor support</Link>
             </motion.div>

             {/* Image Right */}
             <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="relative order-2"
             >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-200/30 rounded-full blur-3xl -z-10" />
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-200/50 border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-[1.02]">
                   <img 
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1000&auto=format&fit=crop" 
                      alt="Girl studying with focus" 
                      className="w-full h-auto object-cover"
                   />
                   <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50 flex flex-col gap-1">
                        <div className="text-xs font-bold text-slate-400 uppercase">Current topic</div>
                        <div className="font-black text-slate-800 flex items-center gap-2">
                           <GraduationCap className="text-indigo-600" size={18} /> Verbal Reasoning
                        </div>
                   </div>
                </div>
             </motion.div>

          </div>
        </div>
      </div>

      {/* Grid Features Section (Slate-50) */}
      <div className="relative z-10 bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Everything your child needs for the 11+</h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">A complete 11+ curriculum aligned to the topics and question styles used in entrance exams.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-indigo-100 transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Smart progress tracking</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                See what to focus on next with clear progress and topic insights.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-emerald-100 transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Trophy size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Extensive 11+ practice</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                A large set of 11+ practice questions across Maths, English, Verbal and Non-Verbal Reasoning.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white border border-slate-100 hover:border-amber-100 transition-all group shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Exam-board aligned</h3>
              <p className="text-slate-500 font-medium leading-relaxed">
                Practice tailored to GL Assessment, CEM-style, ISEB Pre-Test and CSSE formats.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works (White) */}
      <div className="relative z-10 py-24 bg-white border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-500">Three simple steps to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-slate-100 -z-10 rounded-full" />

            {[
              { title: "Choose a resource", desc: "Start with mock exams, downloadable papers, or school-themed packs.", icon: Target, color: "blue" },
              { title: "Practise with structure", desc: "Use timed, exam-style practice and review clear explanations.", icon: ShieldCheck, color: "purple" },
              { title: "Get tutor support", desc: "If you want 1:1 help, use our tutor pages to send an enquiry.", icon: Mail, color: "emerald" },
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className={`w-24 h-24 rounded-3xl bg-white border-4 border-slate-100 flex items-center justify-center text-${step.color}-600 mb-6 shadow-xl relative z-10`}>
                  <step.icon size={36} />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold border-4 border-white">
                    {idx + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{step.title}</h3>
                <p className="text-slate-500 font-medium max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials (Slate-50) */}
      <div className="relative z-10 bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Parent Testimonials</h2>
            <p className="text-lg text-slate-500">Real results from real families</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
               { name: "Sarah J.", role: "Mother of 2", text: "My daughter actually asks to do her 11+ practice now. The structured practice made such a difference.", bg: "bg-white" },
               { name: "David P.", role: "Father of Tom", text: "We were struggling with Non-Verbal Reasoning until we found 11 Plus Exam Papers. The explanations are brilliant.", bg: "bg-white" },
               { name: "Emily R.", role: "Parent", text: "Clear, exam-style questions and explanations made it much easier to plan our child’s preparation.", bg: "bg-white" },
             ].map((t, idx) => (
               <div key={idx} className={`p-8 rounded-3xl ${t.bg} border border-slate-100 shadow-sm hover:scale-105 transition-transform duration-300`}>
                 <div className="flex text-amber-400 mb-4">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                 </div>
                 <p className="text-slate-700 font-medium mb-6 text-lg">"{t.text}"</p>
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 uppercase">
                     {t.name.charAt(0)}
                   </div>
                   <div>
                     <div className="font-bold text-slate-900">{t.name}</div>
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">{t.role}</div>
                   </div>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* FAQ (White) */}
      <div className="relative z-10 py-24 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "Is 11 Plus Exam Papers suitable for GL and CEM-style 11+ exams?", a: "Yes. You can choose your target exam style during onboarding, and practice questions will match the format and difficulty." },
              { q: "What year groups is this for?", a: "Designed for Year 3 to Year 6 (roughly ages 7–11), including focused Year 5 and Year 6 11+ preparation." },
              { q: "Does it work on iPads and tablets?", a: "Yes — 11 Plus Exam Papers works smoothly on iPad, Android tablets, laptops and phones." },
              { q: "How much does it cost?", a: "Access is free for now. In future, we may add optional gated resources, but the core library will remain focused on high-quality 11+ preparation." }
            ].map((faq, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl shadow-sm border border-slate-100">
                <h3 className="font-bold text-lg text-slate-800 mb-2 flex items-start gap-3">
                  <HelpCircle className="text-indigo-500 shrink-0 mt-1" size={20} />
                  {faq.q}
                </h3>
                <p className="text-slate-600 pl-8">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA Redesign */}
      <div className="relative py-24 bg-slate-900 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl sm:text-7xl font-black text-white mb-8 tracking-tight leading-tight">
                Take the stress out of 11+ preparation. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">Start with confidence.</span>
            </h2>
            <p className="text-lg sm:text-2xl text-slate-300 mb-10 max-w-2xl mx-auto">
                Access free 11+ mock-style practice, downloadable papers, and tutor support resources in one place.
            </p>
            
            <button 
                onClick={onStart}
                className="group relative inline-flex items-center gap-3 px-8 py-4 sm:px-12 sm:py-6 bg-white text-indigo-900 rounded-2xl font-black text-xl sm:text-2xl shadow-2xl shadow-indigo-900/50 hover:scale-[1.02] hover:shadow-white/20 transition-all duration-300"
            >
                Explore mock exams
                <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight size={20} strokeWidth={3} />
                </span>
            </button>

            <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-bold text-slate-400">
                 <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Free access</span>
                 <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> 1,000+ questions</span>
                 <span className="flex items-center gap-2"><CheckCircle size={16} className="text-emerald-400" /> Tutor support resources</span>
            </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold">11+</div>
              <span className="font-extrabold text-xl">11 Plus Exam Papers</span>
            </div>
            <p className="text-sm">Helping children feel confident for the 11+.</p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>Features</li>
              <li>Pricing</li>
              <li>Schools</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>Blog</li>
              <li>Exam Dates</li>
              <li>Parent Guide</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>Privacy</li>
              <li>Terms of use</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          <p>&copy; 2024 11 Plus Exam Papers. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
