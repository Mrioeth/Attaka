import React, { useState, useEffect } from 'react';
import { Language, Project } from './types';
import { projectsData, blogPostsData, tendersData } from './data';
import { translations, getTranslation } from './translations';

// Subcomponents import
import { InteractiveMap } from './components/InteractiveMap';
import { Calculator } from './components/Calculator';
import { InquiryForm } from './components/InquiryForm';
import { TendersPortal } from './components/TendersPortal';
import { ClientPortal } from './components/ClientPortal';
import { ProjectVideoPlayer } from './components/ProjectVideoPlayer';

// Lucide Icons
import {
  Sun,
  Moon,
  Globe,
  MapPin,
  Activity,
  CheckCircle2,
  Zap,
  ChevronRight,
  Info,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  Layers,
  Award,
  FileText,
  AlertTriangle,
  Menu,
  ChevronDown,
  X,
  Plus
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lang');
      if (saved === 'en' || saved === 'ar') return saved as Language;
    }
    return 'ar'; // Default to Arabic as requested!
  });

  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'light' || saved === 'dark') return saved;
      return 'light'; // Default to light mode as requested!
    }
    return 'light';
  });

  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'solutions' | 'projects' | 'sustainability' | 'media' | 'contact'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(projectsData[0]);
  
  // Custom interactive comparison helper
  const [comparisonState, setComparisonState] = useState<'sodium' | 'led'>('led');
  
  // Interactive newsletter sub
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Sync document language state
  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  // Sync document root class with selected theme state
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Scroll to top when activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  }, [activeTab]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  const isRtl = lang === 'ar';
  
  // Custom before-after simulation
  const beforeAfterText = comparisonState === 'sodium' 
    ? getTranslation(lang, 'beforeText')
    : getTranslation(lang, 'afterText');

  return (
    <div className={`min-h-screen bg-brand-bg text-slate-100 flex flex-col justify-between ${isRtl ? 'font-arabic text-right' : 'font-sans text-left'}`} dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* PROFESSIONAL MULTI-TIER HEADER */}
      <header className="sticky top-0 z-40 bg-brand-bg/95 border-b border-slate-900 backdrop-blur-md">
        
        {/* Superior tiny info tier */}
        <div className="bg-slate-950/40 border-b border-slate-900/60 py-2 px-4">
          <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center text-[10px] sm:text-xs text-slate-400 font-mono gap-2">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <ShieldCheck size={11} className="text-emerald-500" />
                <span>Tripoli General Procurement Registry: ATK-LY-902</span>
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-slate-500">
                <span>●</span>
                <span>SLA Grade Peak uptime: 99.8%</span>
              </span>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-flex items-center gap-1">
                <Phone size={11} className="text-slate-500" />
                <span>+218 91 123-4567</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1">
                <Mail size={11} className="text-slate-500" />
                <span>info@attaka.ly</span>
              </span>
            </div>
          </div>
        </div>

        {/* Main Nav Tier */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          
          {/* Logo Brand Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-amber-500 p-[1.5px] shadow-lg shadow-emerald-950/25">
              <div className="w-full h-full bg-brand-bg rounded-[7px] flex items-center justify-center font-bold text-slate-100 tracking-widest text-lg font-mono">
                AT
              </div>
            </div>
            <div>
              <span className="block text-lg font-extrabold tracking-wider text-slate-100">
                {getTranslation(lang, 'brand')}
              </span>
              <span className="block text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-emerald-400">
                {getTranslation(lang, 'tagline')}
              </span>
            </div>
          </div>

          {/* Nav Items Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {(['home', 'about', 'solutions', 'projects', 'sustainability', 'media', 'contact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-1.5 px-3 xl:px-4 rounded-md text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === tab 
                    ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20 shadow-inner'
                    : 'text-slate-300 hover:text-slate-100 hover:bg-slate-900/40'
                }`}
              >
                {getTranslation(lang, tab)}
              </button>
            ))}
          </nav>

          {/* Quick Language Toggle, Theme Toggle, and Request button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors font-semibold"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={13} className="text-amber-500 animate-[spin_12s_linear_infinite]" /> : <Moon size={13} className="text-indigo-500" />}
              <span>{theme === 'dark' ? getTranslation(lang, 'lightMood') : getTranslation(lang, 'darkMood')}</span>
            </button>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 py-1.5 px-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-colors font-semibold"
            >
              <Globe size={13} className="text-emerald-500" />
              <span>{lang === 'en' ? translations.en.arabic : translations.ar.english}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('contact')}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-100 font-bold text-xs rounded transition-all flex items-center gap-1 cursor-pointer shadow-md shadow-emerald-950/20"
            >
              <Zap size={11} />
              <span>{getTranslation(lang, 'requestQuote')}</span>
            </button>
          </div>

          {/* Quick Mobile actions */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-1.5 bg-slate-900 border border-slate-800 rounded text-slate-300 hover:text-slate-100 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={15} className="text-amber-500 animate-[spin_12s_linear_infinite]" /> : <Moon size={15} className="text-indigo-500" />}
            </button>
            <button
              onClick={toggleLanguage}
              className="py-1.5 px-2 bg-slate-900 border border-slate-800 rounded text-xs text-slate-300 font-mono"
            >
              {lang === 'en' ? 'AR' : 'EN'}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 text-slate-300 hover:text-white bg-slate-900 rounded border border-slate-800 cursor-pointer"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>

        {/* Mobile menu container */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-900 bg-brand-bg/98 py-4 px-6 space-y-3 animate-fadeIn">
            {(['home', 'about', 'solutions', 'projects', 'sustainability', 'media', 'contact'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full text-right py-2 px-3 rounded text-xs font-semibold ${
                  activeTab === tab 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-300 hover:bg-slate-900/40'
                }`}
              >
                {getTranslation(lang, tab)}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-900">
              <button
                onClick={() => {
                  setActiveTab('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-2.5 bg-emerald-600 text-slate-100 text-xs font-bold rounded text-center block"
              >
                {getTranslation(lang, 'requestQuote')}
              </button>
            </div>
          </div>
        )}

      </header>

      {/* CORE CONTENT LAYOUT SWITCHER */}
      <main className="flex-grow">
        
        {/* TAB 1: HOME (THE MAJESTIC PORTAL) */}
        {activeTab === 'home' && (
          <div className="space-y-16">
            
            {/* HERO SECTION WITH SIMULATED AERIAL HIGH-RESOLUTION VIEW */}
            <section className="relative min-h-[500px] lg:min-h-[600px] flex items-center overflow-hidden bg-slate-950 py-16 px-4 md:px-8">
              
              {/* Dynamic Simulated Highway and High-Mast Node Vector Visualizer */}
              <div className="absolute inset-0 z-0 opacity-40 select-none overflow-hidden">
                {/* Simulated twilight sky gradient */}
                <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-b from-slate-900/10 via-brand-bg to-brand-bg" />
                
                {/* SVG Vector Roads with glowing illumination nodes */}
                <svg viewBox="0 0 1000 600" className="w-full h-full min-w-[1200px] object-cover filter blur-[0.4px]">
                  {/* Highway Curve A */}
                  <path
                    d="M -100,500 C 300,450 600,200 1100,100"
                    fill="none"
                    stroke="#101827"
                    strokeWidth="38"
                  />
                  <path
                    d="M -100,500 C 300,450 600,200 1100,100"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="32"
                  />
                  <path
                    d="M -100,500 C 300,450 600,200 1100,100"
                    fill="none"
                    stroke="#ffd700"
                    strokeWidth="1.5"
                    strokeDasharray="12,12"
                    className="opacity-50"
                  />

                  {/* Intersecting Ramp */}
                  <path
                    d="M 500,650 C 550,400 400,280 -50,220"
                    fill="none"
                    stroke="#111c25"
                    strokeWidth="24"
                  />
                  <path
                    d="M 500,650 C 550,400 400,280 -50,220"
                    fill="none"
                    stroke="#ffd700"
                    strokeWidth="1"
                    strokeDasharray="6,6"
                    className="opacity-40"
                  />

                  {/* HIGH-MAST LIGHT HOVER NODES */}
                  {/* Glowing sodium lights on left curve */}
                  <circle cx="200" cy="460" r="1.5" fill="#f59e0b" className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle cx="200" cy="460" r="4" fill="#f59e0b" className="opacity-90 blur-sm neon-glow-amber" />
                  
                  <circle cx="350" cy="400" r="1.5" fill="#f59e0b" className="animate-ping" style={{ animationDuration: '4s' }} />
                  <circle cx="350" cy="400" r="4.5" fill="#f59e0b" className="opacity-95 blur-sm neon-glow-amber" />
                  
                  {/* Modern Emerald-LED light node transition on right curve */}
                  <circle cx="500" cy="310" r="2" fill="#10b981" className="animate-ping" style={{ animationDuration: '2.5s' }} />
                  <circle cx="500" cy="310" r="5" fill="#10b981" className="opacity-95 blur-sm neon-glow-emerald" />
                  
                  <circle cx="680" cy="225" r="2" fill="#10b981" className="animate-ping" style={{ animationDuration: '3.5s' }} />
                  <circle cx="680" cy="225" r="5" fill="#10b981" className="opacity-95 blur-sm neon-glow-emerald" />

                  <circle cx="850" cy="160" r="2" fill="#10b981" className="animate-ping" style={{ animationDuration: '3.2s' }} />
                  <circle cx="850" cy="160" r="5.5" fill="#10b981" className="opacity-95 blur-sm neon-glow-emerald" />
                  
                  {/* Quick secondary lines */}
                  <line x1="500" y1="310" x2="500" y2="350" stroke="#334155" strokeWidth="1" />
                  <line x1="680" y1="225" x2="680" y2="265" stroke="#334155" strokeWidth="1" />
                </svg>
              </div>

              {/* Foreground Hero Pitch */}
              <div className="max-w-7xl mx-auto px-4 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                {/* Left side text */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="inline-flex items-center gap-2 p-1 px-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>{getTranslation(lang, 'verifiedGECOL')}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-100 max-w-4xl">
                    {getTranslation(lang, 'heroMainTitle')}
                  </h1>
                  
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {getTranslation(lang, 'heroSubtitle')}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-4">
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="py-3 px-6 bg-emerald-600 hover:bg-emerald-500 text-slate-100 font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-950/20"
                    >
                      <span>{getTranslation(lang, 'exploreProjects')}</span>
                      <ArrowRight size={14} className={isRtl ? 'rotate-180' : ''} />
                    </button>
                    
                    <button
                      onClick={() => setActiveTab('contact')}
                      className="py-3 px-6 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-bold text-xs rounded-lg transition-all border border-slate-800 hover:border-slate-700 cursor-pointer"
                    >
                      {getTranslation(lang, 'tabContactForm')}
                    </button>
                  </div>

                  {/* Tiny Trust Badges Grid */}
                  <div className="pt-8 border-t border-slate-900 max-w-xl">
                    <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-3.5">
                      {getTranslation(lang, 'b2bCertifications')}
                    </span>
                    <div className="grid grid-cols-3 gap-4 text-[10px] font-semibold text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-amber-500" />
                        <span>{getTranslation(lang, 'iso9001')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Award size={14} className="text-emerald-500" />
                        <span>{getTranslation(lang, 'iso14001')}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 size={14} className="text-sky-500" />
                        <span>GECOL Approved</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side interactive project screenshot & technical specs */}
                <div className="lg:col-span-4 hidden lg:flex flex-col gap-4 items-center justify-center relative">
                  
                  {/* Real Highway Lighting Picture Frame with Play Button overlay */}
                  <div 
                    onClick={() => {
                      setActiveTab('projects');
                      setTimeout(() => {
                        const videoSection = document.getElementById('video-performance-monitor');
                        if (videoSection) videoSection.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="group relative w-full max-w-xs aspect-video rounded-xl overflow-hidden border border-slate-800/80 cursor-pointer shadow-lg shadow-black/40 hover:border-emerald-500/30 transition-all duration-300 bg-slate-950"
                  >
                    <img 
                      src="/src/assets/images/libya_highway_lighting_1779468396076.png" 
                      alt="Tripoli Highway lighting"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    
                    {/* Live indicator sticker */}
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-rose-600 border border-slate-900 border-opacity-40 text-[8px] font-mono font-bold tracking-wider text-slate-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-100 animate-ping" />
                      LIVE SURVEY CAM
                    </span>

                    {/* Quick navigation hint */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center pointer-events-none">
                      <div>
                        <span className="block text-[8px] font-mono text-emerald-400 font-semibold tracking-wider uppercase">DRONE SURFACE SURVEY</span>
                        <strong className="block text-[11px] font-semibold text-slate-200 mt-0.5">{isRtl ? "مراقبة مسار طرابلس" : "Tripoli Corridor Inspect"}</strong>
                      </div>
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center shadow transition-all duration-300 transform group-hover:scale-110">
                        <ArrowRight size={12} className={isRtl ? 'rotate-180' : ''} />
                      </div>
                    </div>
                  </div>

                  {/* Standard technical specifications spec sheet */}
                  <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 backdrop-blur-md w-full max-w-xs relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full filter blur-md pointer-events-none" />
                    
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                      <span className="text-[10px] font-mono text-emerald-400 uppercase">SYSTEM SPEC ATK-HI5</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-slate-400">
                      <div>
                        <span className="block text-[9px] text-slate-500">{isRtl ? "الارتفاع القياسي" : "Standard Height"}</span>
                        <strong className="text-slate-200 font-bold block mt-0.5">12 Meters</strong>
                      </div>
                      <div>
                        <span className="block text-[9px] text-slate-500">{isRtl ? "مقاومة الغبار والرمال" : "Ingress Rating"}</span>
                        <strong className="text-amber-400 font-bold block mt-0.5">IP66 / Sandproof</strong>
                      </div>
                    </div>

                    <div className="mt-3 bg-slate-950 p-2 rounded text-center border border-slate-900">
                      <span className="block text-[9px] text-slate-500 uppercase tracking-widest font-mono">
                        {isRtl ? "صنف الفئة الحرارية" : "Thermal Vault Specification"}
                      </span>
                      <strong className="block text-[11px] font-semibold text-slate-300 mt-0.5">
                        {isRtl ? "بطارية ليثيوم LiFePO4 مستقلة" : "Deep-Gel Climate Vault Solar"}
                      </strong>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* PERFORMANCE METRICS SECTION */}
            <section className="max-w-7xl mx-auto px-4 md:px-8">
              <div className="text-center mb-10">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">
                  {getTranslation(lang, 'metricsTitle')}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* Total Kilometers */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                      <Zap size={18} />
                    </div>
                    <span className="block text-3xl font-mono font-bold text-slate-100 mb-2">
                      1,842 {isRtl ? "كم" : "KM"}
                    </span>
                    <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      {getTranslation(lang, 'metricKmTitle')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {getTranslation(lang, 'metricKmDesc')}
                  </p>
                </div>

                {/* Solar Units */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500 mb-4 border border-amber-500/20">
                      <Sun size={18} />
                    </div>
                    <span className="block text-3xl font-mono font-bold text-slate-100 mb-2">
                      24,500+
                    </span>
                    <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      {getTranslation(lang, 'metricSolarTitle')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {getTranslation(lang, 'metricSolarDesc')}
                  </p>
                </div>

                {/* CO2 Emissions */}
                <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700/80 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 mb-4 border border-teal-500/20">
                      <CheckCircle2 size={18} />
                    </div>
                    <span className="block text-3xl font-mono font-bold text-slate-100 mb-2">
                      12,450 Tons
                    </span>
                    <h4 className="text-xs font-bold text-slate-300 mb-2 uppercase tracking-wide">
                      {getTranslation(lang, 'metricCo2Title')}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-normal">
                    {getTranslation(lang, 'metricCo2Desc')}
                  </p>
                </div>

              </div>
            </section>

            {/* INTERACTIVE GEOGRAPHIC PROJECTS MAP OF LIBYA */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-200">
                  {getTranslation(lang, 'mapTitle')}
                </h2>
                <p className="text-xs text-slate-400 mt-2">
                  {getTranslation(lang, 'mapSubtitle')}
                </p>
              </div>

              <InteractiveMap
                projects={projectsData}
                lang={lang}
                onSelectProject={(proj) => setSelectedProject(proj)}
              />
            </section>

            {/* TRUST BUILDING: GECOL & MINISTRY PARTNERS PANEL */}
            <section className="max-w-7xl mx-auto px-4 md:px-8 border-t border-slate-900 pt-16 pb-8">
              <div className="text-center mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                  {isRtl ? "الهيئات والشركاء المتعاقدون معنا في ليبيا وعالمياً" : "Official B2B Contracting Partners & Distributors"}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center text-center opacity-65 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  GECOL
                  <span className="block text-[8px] text-slate-600 font-normal">{isRtl ? "الكهرباء العامة" : "National Grid Auth"}</span>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Min. of Transport
                  <span className="block text-[8px] text-slate-600 font-normal">{isRtl ? "وزارة المواصلات" : "Infrastructure Dept"}</span>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Philips Professional
                  <span className="block text-[8px] text-slate-600 font-normal">{isRtl ? "حلول الإضاءة المعتمدة" : "Authorized LED Partner"}</span>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Schneider Electric
                  <span className="block text-[8px] text-slate-600 font-normal">{isRtl ? "مكونات السلامة" : "Substation Components"}</span>
                </div>
                <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-lg font-mono text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Nexans Cabling
                  <span className="block text-[8px] text-slate-600 font-normal">{isRtl ? "توريد كابلات" : "Armored High-Volt"}</span>
                </div>
              </div>
            </section>

          </div>
        )}

        {/* TAB 2: ABOUT US (LEADERSHIP & COMPLIANCE) */}
        {activeTab === 'about' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-16 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                {isRtl ? "تعرف على الهيكل الهندسي لشركة الطاقة" : "WHO WE ARE & OUR CAPABILITIES"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {getTranslation(lang, 'aboutHeading')}
              </h2>
            </div>

            {/* Grid Text and Quality badging */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              <div className="md:col-span-7 space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
                <p>{getTranslation(lang, 'aboutBodyP1')}</p>
                <p>{getTranslation(lang, 'aboutBodyP2')}</p>
                
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-slate-100 flex items-center gap-2">
                    <ShieldCheck className="text-emerald-500" size={16} />
                    <span>{isRtl ? "الهوية المؤسسية المعتمدة" : "B2B Operational Integrity"}</span>
                  </h4>
                  <p className="text-xs text-slate-400 leading-normal">
                    {isRtl 
                      ? "كافة الأعمدة وحوامل مصابيح الجهد العالي التي يتم توريدها بواسطة شركة الطاقة تخضع لاختبارات توازن ومقاومة رياح تصل لـ ١٥٠ كم/ساعة ومقاومة أكسدة بنظام الجلفنة الحارة تزيد عن ٣٠ عاماً."
                      : "We establish continuous technical alignment with local grid regulations. All high-mast structures provide hot-dip galvanized protection against offshore salt elements, supporting up to 150km/h structural wind survival thresholds."}
                  </p>
                </div>
              </div>

              {/* Sidebar: B2B certifications details */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-6">
                  <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest border-b border-slate-900 pb-3">
                    {isRtl ? "أنظمة التدقيق الإداري والفني" : "Quality Standards Board"}
                  </h4>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20">
                        <Award size={16} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-200">ISO 9001:2015</span>
                        <span className="block text-[10px] text-slate-500 leading-normal">{isRtl ? "شهادة مراقبة الجودة الإنشائية والهندسة الكهرو-مدنية" : "Quality assurance verified for civil and electromechanical design."}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
                        <Award size={16} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-200">ISO 14001:2015</span>
                        <span className="block text-[10px] text-slate-500 leading-normal">{isRtl ? "نظام إدارة البيئة للأعمال الكهروضوئية وسولار الطرق" : "Environmental parameters certified for solar lithium safety levels."}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400 border border-indigo-500/20">
                        <CheckCircle2 size={16} />
                      </div>
                      <div>
                        <span className="block text-xs font-bold text-slate-200">GECOL Registry Permit</span>
                        <span className="block text-[10px] text-slate-500 leading-normal">{isRtl ? "تصريح وتصنيف أول لدى حكومة طرابلس العامة ودرجة الامتثال" : "Class-A licensed utility infrastructure engineering EPC permit."}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic Leadership Profile Grid */}
            <div className="space-y-8 pt-6 border-t border-slate-900">
              <h3 className="text-lg font-bold text-slate-200 text-center">
                {getTranslation(lang, 'leadershipTitle')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: getTranslation(lang, 'leadership1Name'), role: getTranslation(lang, 'leadership1Role'), dept: "Tripoli Executive" },
                  { name: getTranslation(lang, 'leadership2Name'), role: getTranslation(lang, 'leadership2Role'), dept: "Renewable Center" },
                  { name: getTranslation(lang, 'leadership3Name'), role: getTranslation(lang, 'leadership3Role'), dept: "Operations Control" }
                ].map((lead, index) => (
                  <div key={index} className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 text-center">
                    <span className="inline-block py-1 px-2.5 bg-slate-900 border border-slate-800 rounded font-mono text-[9px] text-emerald-400 mb-3">{lead.dept}</span>
                    <h4 className="text-sm font-bold text-slate-100">{lead.name}</h4>
                    <p className="text-[11px] text-slate-400 mt-1">{lead.role}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: SOLUTIONS (DETAILED SECTOR DROPDOWN/PORTALS) */}
        {activeTab === 'solutions' && (
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-16 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                {isRtl ? "محفظة الحلول والتطوير التقني لأجهزة الطرق" : "ENGINEERING SPECIFICITY CATALOGUE"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {getTranslation(lang, 'solutionsTitle')}
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                {getTranslation(lang, 'solutionsSubtitle')}
              </p>
            </div>

            {/* Comprehensive Interactive Solutions Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Solution 1: Public Grid */}
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 w-fit">
                  <Layers size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  {getTranslation(lang, 'solution1')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {getTranslation(lang, 'solution1Desc')}
                </p>
                <div className="pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 space-y-1">
                  <div>- Double-arm hot galvanized steel (10m - 18m poles)</div>
                  <div>- Advanced surge suppressors and earthing grid specs</div>
                  <div>- Under-cabinet high volt relay controls</div>
                </div>
              </div>

              {/* Solution 2: Solar */}
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="p-3 bg-amber-500/10 rounded-xl text-amber-500 border border-amber-500/20 w-fit">
                  <Sun size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  {getTranslation(lang, 'solution2')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {getTranslation(lang, 'solution2Desc')}
                </p>
                <div className="pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 space-y-1">
                  <div>- Monocrystalline high conversion solar arrays (&gt;22.5% efficiency)</div>
                  <div>- Desert underground battery climate chambers</div>
                  <div>- Auto twilight and dual induction microwave movement triggers</div>
                </div>
              </div>

              {/* Solution 3: Maintenance */}
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/20 w-fit">
                  <Activity size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  {getTranslation(lang, 'solution3')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {getTranslation(lang, 'solution3Desc')}
                </p>
                <div className="pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 space-y-1">
                  <div>- GECOL certified rapid troubleshooting teams</div>
                  <div>- SCADA integrated telemetry sensor arrays</div>
                  <div>- 24/7/365 emergency response contracts for national toll-roads</div>
                </div>
              </div>

              {/* Solution 4: Cabling & Procurement */}
              <div className="bg-slate-950/60 p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20 w-fit">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-sm font-bold text-slate-100 uppercase tracking-wider">
                  {getTranslation(lang, 'solution4')}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {getTranslation(lang, 'solution4Desc')}
                </p>
                <div className="pt-3 border-t border-slate-900 text-[10px] font-mono text-slate-500 space-y-1">
                  <div>- Multi-core copper armored/unarmored utility cabling (600V/1000V)</div>
                  <div>- High lumen smart LED retrofitting arrays</div>
                  <div>- Official imported hardware parts inventory (Philips Professional, Siemens)</div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 4: PROJECTS SHOWCASE (PROOF OF REAL IMPACT) */}
        {activeTab === 'projects' && (
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 space-y-16 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                {isRtl ? "الهندسة والملاحة الجيولوجية المنجزة" : "PROOF OF GEOGRAPHICAL CAPABILITY"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100">
                {getTranslation(lang, 'projectsHeading')}
              </h2>
              <p className="text-xs text-slate-400 mt-2">
                {getTranslation(lang, 'projectsSubheading')}
              </p>
            </div>

            {/* Dynamic Comparison Streetlight Slider view */}
            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-6 max-w-4xl mx-auto">
              <div>
                <h3 className="text-sm font-bold text-slate-200">
                  {getTranslation(lang, 'beforeAfterTitle')}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">
                  {isRtl ? "اضغط على الأزرار لاختبار الكفاءة البصرية وتأثير المصابيح الشديد للـ LED مقارنة بنظام الصوديوم القديم" : "Toggle states below to test visual efficiency and glare reduction vectors between outdated HPS sodium and Attaka high-lumen solid fixtures."}
                </p>
              </div>

              {/* Slider comparative visual pane */}
              <div className="relative h-48 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
                
                {/* Simulated Street Layout */}
                <div className={`absolute inset-0 transition-all duration-700 ${
                  comparisonState === 'sodium'
                    ? 'bg-amber-950/20 shadow-inner'
                    : 'bg-emerald-950/10'
                }`} />

                {/* Road strip */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-900 border-t border-slate-800 flex items-center justify-center">
                  <div className="w-full h-1 bg-dashed border-t border-dashed border-slate-700 opacity-50" />
                </div>

                {/* Comparative glow visual representation */}
                <div className="relative z-10 text-center space-y-3">
                  <span className={`inline-block py-1 px-3 text-[10px] leading-relaxed font-mono rounded-full border tracking-wide uppercase font-medium ${
                    comparisonState === 'sodium'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {comparisonState === 'sodium' ? "Sodium Vapor (250W HPS)" : "Attaka Smart LED (120W / Zero Grid Draw)"}
                  </span>
                  
                  <p className="text-xs text-slate-300 max-w-sm mx-auto font-mono">
                    {beforeAfterText}
                  </p>
                </div>

                {/* Light beams simulated vectors */}
                <div className={`absolute top-0 w-32 h-36 bg-gradient-to-b rounded-full filter blur-xl transition-all duration-700 ${
                  comparisonState === 'sodium'
                    ? 'from-amber-500/40 to-transparent left-[35%] opacity-100'
                    : 'from-emerald-400/35 to-transparent left-[45%] opacity-100'
                }`} />
              </div>

              {/* Control buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setComparisonState('sodium')}
                  className={`py-1.5 px-4 rounded text-xs leading-none font-semibold transition-all ${
                    comparisonState === 'sodium'
                      ? 'bg-amber-600 text-slate-100 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {isRtl ? "لمبات الصوديوم القديمة" : "Traditional HPS Core"}
                </button>
                <button
                  onClick={() => setComparisonState('led')}
                  className={`py-1.5 px-4 rounded text-xs leading-none font-semibold transition-all ${
                    comparisonState === 'led'
                      ? 'bg-emerald-600 text-slate-100 font-bold'
                      : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                  }`}
                >
                  {isRtl ? "إضاءات الطاقة المتطورة" : "Attaka Solid LED Fixture"}
                </button>
              </div>
            </div>

            {/* LIVE DRONE FIELD MONITOR & TELEMETRY PLAYER */}
            <ProjectVideoPlayer lang={lang} />

            {/* Filterable gallery mapping of the projects */}
            <div className="space-y-6 pt-8 border-t border-slate-900">
              <h3 className="text-md font-bold text-slate-200">
                {getTranslation(lang, 'projectFilterAll')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projectsData.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950/60 p-5 rounded-xl border border-slate-800 flex flex-col justify-between group overflow-hidden"
                  >
                    <div>
                      {item.image && (
                        <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg border border-slate-800/80 bg-slate-900">
                          <img
                            src={item.image}
                            alt={isRtl ? item.titleAr : item.titleEn}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-90" />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <span className={`px-2 py-0.5 rounded text-[8px] font-mono tracking-wider uppercase font-bold text-slate-100 ${
                              item.status === 'completed'
                                ? 'bg-emerald-600/80 border border-emerald-500/30'
                                : 'bg-amber-600/80 border border-amber-500/30'
                            }`}>
                              {item.status === 'completed' ? (isRtl ? "مكتمل" : "Completed") : (isRtl ? "جاري" : "Ongoing")}
                            </span>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-3.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase font-medium ${
                          item.type === 'solar'
                            ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          {item.type === 'solar' ? (isRtl ? "طاقة شمسية" : "Solar Pole") : (isRtl ? "شبكة كهرباء" : "Main Grid")}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {isRtl ? item.locationAr : item.locationEn}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-200 mb-2">
                        {isRtl ? item.titleAr : item.titleEn}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        {isRtl ? item.descriptionAr : item.descriptionEn}
                      </p>

                      {/* Technical Spec List */}
                      <div className="p-3 bg-slate-900 rounded border border-slate-800/80 space-y-1.5 text-[11px] font-mono text-slate-400">
                        <div className="flex justify-between">
                          <span>{isRtl ? "طول المسار:" : "Sector Length:"}</span>
                          <span className="text-slate-200 font-bold">{item.specs.kilometers} km</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isRtl ? "وحدات الأعمدة مثبتة:" : "Assembled Poles:"}</span>
                          <span className="text-slate-200 font-bold">{item.specs.poles} Units</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{isRtl ? "الوفر الكربوني للتوليد:" : "CO2 Displaced Value:"}</span>
                          <span className="text-emerald-400 font-bold">{item.specs.co2Saved} Tons/Yr</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-900 flex justify-end">
                      <button
                        onClick={() => {
                          setActiveTab('contact');
                          setTimeout(() => {
                            const mapElem = document.getElementById('cooperation-section');
                            if (mapElem) mapElem.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }}
                        className="py-1 px-2.5 rounded hover:bg-slate-900 text-[10px] leading-relaxed text-slate-300 font-semibold border border-transparent hover:border-slate-800 transition-all font-mono"
                      >
                        {isRtl ? "طلب استشارة للمشروع" : "Inquire for design specs"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 5: SUSTAINABILITY & DEEP CO2 EQUIVALENT IMPACT */}
        {activeTab === 'sustainability' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 uppercase tracking-widest block mb-2">
                {isRtl ? "مسؤوليتنا البيئية لتقليل فترات القطع" : "RESPONSIBLE SUSTAINABILITY REPORT"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {getTranslation(lang, 'sustHeading')}
              </h2>
            </div>

            {/* Description and carbon values stacked vertically */}
            <div className="space-y-10">
              <div className="space-y-6 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed max-w-4xl mx-auto">
                <p>{getTranslation(lang, 'sustBody1')}</p>
                <p>{getTranslation(lang, 'sustBody2')}</p>

                <div className="space-y-4 pt-8 border-t border-slate-200 dark:border-slate-800">
                  <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                    <Activity className="text-emerald-500" size={16} />
                    <span>{getTranslation(lang, 'environmentalTargets')}</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 transition-all">
                      <span className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 mt-0.5">01</span>
                      <div>
                        <strong className="block text-slate-800 dark:text-slate-200 font-semibold text-xs">{getTranslation(lang, 'metricT1')}</strong>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal mt-1">{getTranslation(lang, 'metricT1Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 transition-all">
                      <span className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 mt-0.5">02</span>
                      <div>
                        <strong className="block text-slate-800 dark:text-slate-200 font-semibold text-xs">{getTranslation(lang, 'metricT2')}</strong>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal mt-1">{getTranslation(lang, 'metricT2Desc')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-slate-200 dark:border-slate-900 hover:border-slate-300 dark:hover:border-slate-800 transition-all">
                      <span className="text-xs font-mono font-bold text-emerald-500 dark:text-emerald-400 mt-0.5">03</span>
                      <div>
                        <strong className="block text-slate-800 dark:text-slate-200 font-semibold text-xs">{getTranslation(lang, 'metricT3')}</strong>
                        <p className="text-slate-500 dark:text-slate-400 text-xs leading-normal mt-1">{getTranslation(lang, 'metricT3Desc')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator centered below */}
              <div className="pt-10 border-t border-slate-200 dark:border-slate-900 max-w-2xl mx-auto w-full">
                <Calculator lang={lang} />
              </div>
            </div>

          </div>
        )}

        {/* TAB 6: MEDIA CENTER (NEWS & ARTICLE INSIGHTS) */}
        {activeTab === 'media' && (
          <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 space-y-12 animate-fadeIn">
            
            {/* Header */}
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-2">
                {isRtl ? "المقالات الهندسية ونشرات التوعية" : "THOUGHT LEADERSHIP BLOG"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-100 animate-slideDown">
                {getTranslation(lang, 'mediaHeading')}
              </h2>
              <p className="text-xs text-slate-400 mt-2 max-w-xl mx-auto">
                {getTranslation(lang, 'mediaSubheading')}
              </p>
            </div>

            {/* Articles vertical collection */}
            <div className="space-y-8 max-w-4xl mx-auto">
              {blogPostsData.map((post) => (
                <article
                  key={post.id}
                  className="bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-800/80 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center text-xs text-slate-500 font-mono mb-4 border-b border-slate-900 pb-3">
                    <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-emerald-400 font-semibold uppercase text-[10px] tracking-widest">
                      {isRtl ? post.categoryAr : post.categoryEn}
                    </span>
                    <div className="flex gap-4">
                      <span>{post.date}</span>
                      <span>{isRtl ? post.readTimeAr : post.readTimeEn} {getTranslation(lang, 'minutesRead')}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-100 mb-2">
                    {isRtl ? post.titleAr : post.titleEn}
                  </h3>

                  <p className="text-xs text-slate-400 leading-normal font-mono mb-4">
                    {isRtl ? post.summaryAr : post.summaryEn}
                  </p>

                  <p className={`text-xs text-slate-300 leading-relaxed mb-6 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {isRtl ? post.contentAr : post.contentEn}
                  </p>

                  <div className="flex justify-start">
                    <button
                      onClick={() => alert(`Registered reference for article [${post.id}] - Comprehensive PDF content loaded.`)}
                      className="text-xs text-emerald-400 font-bold hover:underline cursor-pointer flex items-center gap-1.5 font-mono"
                    >
                      <FileText size={12} />
                      <span>{getTranslation(lang, 'readArticle')}</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        )}

        {/* TAB 7: CONTACT AND INTEGRATED PORTALS (THE B2B MECHANICS) */}
        {activeTab === 'contact' && (
          <div id="cooperation-section" className="max-w-7xl mx-auto px-4 md:px-8 py-12 space-y-12 animate-fadeIn">
            
            <div className="text-center">
              <span className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 uppercase tracking-widest block mb-2">
                {isRtl ? "مخاطبة المهندسين والبوابات الإدارية" : "B2B COOPERATION PORTALS"}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-slate-100">
                {getTranslation(lang, 'coopSectionHeading')}
              </h2>
            </div>

            {/* Sub router tabs specifically inside the B2B Area */}
            <div className="space-y-8">
              
              {/* Client and Careers components side-by-side or stacked logically */}
              <div className="space-y-16">
                
                {/* 1. Quotes Inquiry Frame */}
                <div id="quote-form-anchor" className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 max-w-4xl mx-auto px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <h4 className="text-xs font-mono text-emerald-400 uppercase">
                      [PORTAL 01] - {getTranslation(lang, 'tabContactForm')}
                    </h4>
                  </div>
                  <InquiryForm lang={lang} />
                </div>

                {/* 2. Live Telemetries SCADA Portal */}
                <div id="gecol-portal-anchor" className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 max-w-7xl mx-auto px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <h4 className="text-xs font-mono text-emerald-400 uppercase">
                      [PORTAL 02] - {getTranslation(lang, 'tabClientPortal')}
                    </h4>
                  </div>
                  <ClientPortal lang={lang} />
                </div>

                {/* 3. Tenders & Subcontracts panel */}
                <div id="tenders-portal-anchor" className="space-y-4">
                  <div className="flex items-center gap-2 mb-2 max-w-7xl mx-auto px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <h4 className="text-xs font-mono text-emerald-400 uppercase">
                      [PORTAL 03] - {getTranslation(lang, 'tabTenders')}
                    </h4>
                  </div>
                  <TendersPortal tenders={tendersData} lang={lang} />
                </div>

              </div>

            </div>

          </div>
        )}

      </main>

      {/* COMPREHENSIVE B2B STRUCTURAL FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-20 pt-16 pb-8 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 border-b border-slate-900 pb-12 items-start">
          
          {/* Brand outline column */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-lg font-bold text-slate-100 block">
              {getTranslation(lang, 'brand')}
            </span>
            <p className="text-xs text-slate-500 leading-relaxed">
              {getTranslation(lang, 'footerDesc')}
            </p>
            
            <div className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
              <span>National EPC Partner to GECOL since 2012</span>
            </div>
          </div>

          {/* Regional locations catalogs */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-slate-400 leading-normal">
            
            {/* National Central Office */}
            <div className="space-y-2">
              <strong className="block text-slate-200 font-semibold">{getTranslation(lang, 'headOffice')}</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {getTranslation(lang, 'headOfficeAddress')}
              </p>
              <span className="block text-[11px] text-slate-500 font-mono">TL: +218 21 444-2020</span>
            </div>

            {/* Benghazi Office */}
            <div className="space-y-2">
              <strong className="block text-slate-200 font-semibold">{getTranslation(lang, 'benghaziOffice')}</strong>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                {getTranslation(lang, 'benghaziOfficeAddress')}
              </p>
              <span className="block text-[11px] text-slate-500 font-mono">TL: +218 61 909-1414</span>
            </div>

          </div>

          {/* Quick Newsletter sub box */}
          <div className="lg:col-span-3 space-y-3">
            <span className="block text-xs font-semibold text-slate-200">
              {isRtl ? "نشرة المستجدات الهندسية" : "Engineering Newsletter"}
            </span>
            <p className="text-[11px] text-slate-500 leading-normal">
              {isRtl ? "اشترك لاستلام تقارير دورية حول كفاءة الألواح والشبكات بليبيا" : "Subscribe to receive technical bulletins regarding utility pole efficiency parameters in Libya."}
            </p>

            {isSubscribed ? (
              <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded text-[11px] text-center font-semibold animate-fadeIn">
                {getTranslation(lang, 'newsletterSubStatus')}
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5 flex-wrap sm:flex-nowrap">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="name@business.ly"
                  className="w-full bg-slate-900 border border-slate-800 py-1.5 px-3 rounded text-xs text-slate-300 focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="submit"
                  className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-500 rounded text-xs text-slate-100 font-semibold transition-colors cursor-pointer block w-full sm:w-auto text-center"
                >
                  {isRtl ? "سجل" : "Register"}
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Small copyrights bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 font-mono gap-4">
          <span>
            © {new Date().getFullYear()} {getTranslation(lang, 'rights')}
          </span>
          <div className="flex gap-4">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Approved for domestic ministerial storage protocol."); }} className="hover:underline hover:text-slate-400">GECOL Compliance</a>
            <span className="text-slate-800">|</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Approved for road utility contracting terms."); }} className="hover:underline hover:text-slate-400">Terms of Bid Operations</a>
          </div>
        </div>

      </footer>

    </div>
  );
}
