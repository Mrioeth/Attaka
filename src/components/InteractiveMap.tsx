import React, { useState } from 'react';
import { Project, Language } from '../types';
import { MapPin, Activity, CheckCircle2, Ruler, Sun, Info } from 'lucide-react';
import { getTranslation } from '../translations';

interface InteractiveMapProps {
  projects: Project[];
  lang: Language;
  onSelectProject?: (project: Project) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ projects, lang, onSelectProject }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(projects[0] || null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const handleSelect = (project: Project) => {
    setSelectedProject(project);
    if (onSelectProject) {
      onSelectProject(project);
    }
  };

  const isRtl = lang === 'ar';

  return (
    <div id="interactive-map-section" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white/60 dark:bg-slate-900/40 p-6 md:p-8 rounded-2xl border border-slate-250 dark:border-slate-800/80 backdrop-blur-md">
      {/* Map column */}
      <div className="lg:col-span-7 flex flex-col justify-between relative min-h-[350px] lg:min-h-[450px]">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="text-sm font-mono tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
              {isRtl ? "النظام الجغرافي التفاعلي لليبيا" : "Interactive Geographic System"}
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isRtl ? "اضغط على نقاط المشاريع النشطة لاستعراض المواصفات والمدى الجغرافي" : "Click on active project nodes for immediate structural diagnostics and scale details."}
          </p>
        </div>

        {/* Vector Map Container using the exact Libya district outline map requested */}
        <div className="relative w-full h-[280px] sm:h-[350px] bg-slate-100 dark:bg-slate-950/60 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center p-2 overflow-hidden">
          {/* Subtle grid background pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#94a3b8_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-20 dark:opacity-30 pointer-events-none" />

          {/* New Map aspect frame */}
          <div className="relative w-full h-full max-w-[420px] max-h-[320px] flex items-center justify-center">
            {/* The Libya Map Image based on the exact district outline uploaded by the client */}
            <img
              src="/src/assets/images/libya_geographic_map_1779477984209.png"
              alt="Libya Administrative Map"
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain select-none transition-all duration-300 dark:invert dark:hue-rotate-180 dark:brightness-90 dark:contrast-125 select-none"
            />

            {/* Absolute SVG overlay with same aspect ratio for perfect point mapping */}
            <svg
              className="absolute top-0 left-0 w-full h-full select-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
            >
              {projects.map((proj) => {
                const isSelected = selectedProject?.id === proj.id;
                const isHovered = hoveredProjectId === proj.id;
                const color = proj.type === 'solar' ? '#f59e0b' : '#10b981'; // Solar is amber, traditional grid is emerald

                return (
                  <g
                    key={proj.id}
                    onClick={() => handleSelect(proj)}
                    onMouseEnter={() => setHoveredProjectId(proj.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    className="cursor-pointer group"
                  >
                    {/* Outer pulsating aura */}
                    <circle
                      cx={`${proj.coords.x}%`}
                      cy={`${proj.coords.y}%`}
                      r={isSelected || isHovered ? "5" : "3.5"}
                      fill={proj.type === 'solar' ? 'rgba(245,158,11,0.25)' : 'rgba(16,185,129,0.25)'}
                      className="transition-all duration-300 animate-pulse"
                    />
                    
                    {/* Pulsing ring */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx={`${proj.coords.x}%`}
                        cy={`${proj.coords.y}%`}
                        r="4"
                        fill="none"
                        stroke={color}
                        strokeWidth="0.3"
                        className="animate-ping"
                        style={{ transformOrigin: `${proj.coords.x}% ${proj.coords.y}%` }}
                      />
                    )}

                    {/* Point pin */}
                    <circle
                      cx={`${proj.coords.x}%`}
                      cy={`${proj.coords.y}%`}
                      r={isSelected ? "1.8" : "1.2"}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth="0.3"
                      className="transition-all duration-300 drop-shadow-[0_1.5px_3px_rgba(0,0,0,0.45)]"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Quick instructions in corner */}
          <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-white/95 dark:bg-slate-900/90 py-1.5 px-2.5 rounded border border-slate-200 dark:border-slate-800 backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-sm shadow-[#f59e0b]/50" />
              <span>{isRtl ? "سولار شمسى مستقل" : "Photovoltaic"}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-sm shadow-[#10b981]/50" />
              <span>{isRtl ? "شبكة وطنية" : "National Grid"}</span>
            </div>
          </div>
        </div>

        {/* Legend Panel */}
        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300 justify-center sm:justify-start">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{isRtl ? "شبكة مترابطة GECOL" : "GECOL Interconnected System"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{isRtl ? "سولار مغلق مستقل" : "Off-Grid Lithium Vault Solar"}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500/15 border border-emerald-500" />
            <span>{isRtl ? "طريق دائرى رئيسي" : "Major Expressway Route"}</span>
          </div>
        </div>
      </div>

      {/* Description Dynamic sidebar */}
      <div className="lg:col-span-5 flex flex-col justify-between bg-white/55 dark:bg-slate-950/50 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
        {selectedProject ? (
          <div className="flex flex-col h-full justify-between">
            {/* Header / Meta */}
            <div>
              {selectedProject.image && (
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 mb-4 relative group bg-slate-100 dark:bg-slate-900">
                  <img
                    src={selectedProject.image}
                    alt={isRtl ? selectedProject.titleAr : selectedProject.titleEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              <div className="flex justify-between items-start gap-2 mb-3">
                <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase ${
                  selectedProject.type === 'solar'
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                }`}>
                  {selectedProject.type === 'solar' 
                    ? (isRtl ? "طاقة شمسية مستقلة" : "Smart Solar") 
                    : (isRtl ? "الشبكة الإنشائية العامة" : "National Grid")}
                </span>

                <span className={`flex items-center gap-1 text-[11px] font-medium ${
                  selectedProject.status === 'completed' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                }`}>
                  {selectedProject.status === 'completed' ? <CheckCircle2 size={12} /> : <Activity size={12} />}
                  {selectedProject.status === 'completed' 
                    ? getTranslation(lang, 'completed') 
                    : getTranslation(lang, 'ongoing')}
                </span>
              </div>

              {/* Title & Location */}
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {isRtl ? selectedProject.titleAr : selectedProject.titleEn}
              </h3>
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-4 font-mono">
                <MapPin size={12} className="text-slate-400 dark:text-slate-500" />
                {isRtl ? selectedProject.locationAr : selectedProject.locationEn}
              </p>

              {/* Styled mini statistics indicators */}
              <div className="grid grid-cols-3 gap-2.5 my-5">
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg text-center">
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5">{isRtl ? "المسار" : "Distance"}</span>
                  <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {selectedProject.specs.kilometers} {isRtl ? "كم" : "KM"}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg text-center">
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5">{isRtl ? "الأعمدة" : "Poles"}</span>
                  <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-200">
                    {selectedProject.specs.poles}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 rounded-lg text-center">
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mb-0.5">{isRtl ? "الوفر CO2" : "CO2 Saved"}</span>
                  <span className="font-mono text-xs font-semibold text-amber-600 dark:text-amber-400">
                    {selectedProject.specs.co2Saved} Tons
                  </span>
                </div>
              </div>

              {/* Main Body Description */}
              <p className={`text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 ${isRtl ? 'line-clamp-6 text-right' : 'line-clamp-6'}`}>
                {isRtl ? selectedProject.descriptionAr : selectedProject.descriptionEn}
              </p>
            </div>

            {/* Visual simulation card of lighting patterns */}
            <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-lg border border-slate-150 dark:border-slate-800 flex items-center gap-3">
              <div className="w-12 h-12 rounded bg-slate-200 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 flex-shrink-0">
                <Sun className={`text-amber-500 ${selectedProject.status === 'completed' ? 'animate-pulse' : ''}`} size={18} />
              </div>
              <div>
                <span className="block text-[10px] font-mono text-slate-450 dark:text-slate-500">
                  {isRtl ? "مخطط التوزيع البصري" : "Optic Beam Integration"}
                </span>
                <span className="block text-xs font-medium text-slate-600 dark:text-slate-300">
                  {selectedProject.type === 'solar' 
                    ? (isRtl ? "شعاع 120lm/W مائل مخروطي" : "120lm/W Wide Beam Angle") 
                    : (isRtl ? "أبراج عالية 1800K LED متراكبة" : "Solid 1800K Anti-glare High-mast")}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500 h-full">
            <Info size={32} className="mb-2 text-slate-600" />
            <p className="text-sm">
              {getTranslation(lang, 'selectProject')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
