import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Radio, Eye, Volume2, VolumeX, RefreshCw, Layers, Compass, BarChart, ArrowRight } from 'lucide-react';
import { Language } from '../types';

interface ProjectVideoPlayerProps {
  lang: Language;
}

interface VideoStream {
  id: string;
  nameEn: string;
  nameAr: string;
  locationEn: string;
  locationAr: string;
  image: string;
  coords: string;
  windResistance: string;
  solarCapacity: string;
  illuminance: string;
  gridLoad: string;
}

export const ProjectVideoPlayer: React.FC<ProjectVideoPlayerProps> = ({ lang }) => {
  const isRtl = lang === 'ar';

  const streams: VideoStream[] = [
    {
      id: 'coast',
      nameEn: 'Tripoli-Misrata Coastal Highway',
      nameAr: 'طريق الساحل السريع - ممر السولار',
      locationEn: 'Al-Khoms Segment',
      locationAr: 'قطاع الخمس الساحلي',
      image: '/src/assets/images/solar_street_pole_1779468414277.png',
      coords: '32.6501° N, 14.2612° E',
      windResistance: '150 km/h [Nominal]',
      solarCapacity: '2.4 kW [Active]',
      illuminance: '135 lm/W [Target]',
      gridLoad: '0.0 kW [Pure Off-Grid]'
    },
    {
      id: 'ring3',
      nameEn: 'Tripoli Third Ring Road Grid',
      nameAr: 'شبكة الطريق الدائري الثالث بالكامل',
      locationEn: 'Al-Jaraba Intersection Approach',
      locationAr: 'أعمدة تقاطع شارع الجرابة',
      image: '/src/assets/images/libya_highway_lighting_1779468396076.png',
      coords: '32.8752° N, 13.1904° E',
      windResistance: '145 km/h [Nominal]',
      solarCapacity: 'N/A [Main Grid Fed]',
      illuminance: '142 lm/W [Standard]',
      gridLoad: '45.8 kW [Regulated Grid]'
    },
    {
      id: 'sebha',
      nameEn: 'Sebha Sahara Solar Expressway',
      nameAr: 'ممر سبها الصحراوي الأخضر بمقاطعة الجنوب',
      locationEn: 'Ghadduwah Sand Dune Sector',
      locationAr: 'قطاع كثبان غدوة الرملية',
      image: '/src/assets/images/sebha_desert_solar_1779468456252.png',
      coords: '27.0321° N, 14.4310° E',
      windResistance: '160 km/h [Sandstorm Max]',
      solarCapacity: '1.9 kW [Storing]',
      illuminance: '128 lm/W [Eco Mode]',
      gridLoad: '0.0 kW [Pure Off-Grid]'
    },
    {
      id: 'benghazi',
      nameEn: 'Benghazi Bypass Industrial Grid',
      nameAr: 'إنارة التفاف بنغازي الشمالي ومخرج المرفأ',
      locationEn: 'Port Access Road Corridor',
      locationAr: 'ممر مدخل ميناء بنغازي البحري',
      image: '/src/assets/images/high_mast_grid_poles_1779468435475.png',
      coords: '32.1287° N, 20.0815° E',
      windResistance: '150 km/h [Nominal]',
      solarCapacity: 'N/A [GECOL Substation B]',
      illuminance: '145 lm/W [Target]',
      gridLoad: '28.4 kW [Opti-Regulated]'
    }
  ];

  const [activeStream, setActiveStream] = useState<VideoStream>(streams[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showHUD, setShowHUD] = useState<boolean>(true);
  const [showThermal, setShowThermal] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(35);
  const [altitude, setAltitude] = useState<number>(45);
  const [speed, setSpeed] = useState<number>(42);
  const [timestamp, setTimestamp] = useState<string>('');
  
  // Create simulated video playback timers
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        // Drifting parameters to simulate movement
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.3));
        setAltitude(prev => {
          const drift = Math.random() > 0.5 ? 0.2 : -0.2;
          const newVal = prev + drift;
          return newVal > 70 ? 70 : newVal < 30 ? 30 : Number(newVal.toFixed(1));
        });
        setSpeed(prev => {
          const drift = Math.random() > 0.5 ? 1 : -1;
          const newVal = prev + drift;
          return newVal > 60 ? 60 : newVal < 25 ? 25 : newVal;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Handle dynamic UTC time ticks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimestamp(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newProgress = (clickX / width) * 100;
    setProgress(newProgress);
  };

  return (
    <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-6 space-y-6 max-w-6xl mx-auto" id="video-performance-monitor">
      {/* Upper Title Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-900 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono mb-2 uppercase tracking-wide">
            <Radio size={12} className="animate-pulse" />
            <span>{isRtl ? 'بث حي للاستطلاع الهندسي' : 'LIVE EPC SITE SURVEY MONITOR'}</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-100">
            {isRtl ? 'عرض استقصاء طائرات الدرون ومطابقة المواصفات لعام ٢٠٢٦' : 'Drone Survey Loop & SLA Specification Audit'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isRtl 
              ? 'بث مراقبة جوية عالي الدقة لتقييم الكفاءة البصرية، الإنارة المركزة، وتخفيف وهج الشوارع تحت عقود الصيانة المستمرة.'
              : 'Interactive 4K drone oversight simulation, tracking glare attenuation, structural anchors, and photovolatic cell output under live municipal SLAs.'}
          </p>
        </div>

        {/* Video stream selector tabs */}
        <div className="flex flex-wrap gap-2">
          {streams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => {
                setActiveStream(stream);
                setProgress(Math.random() * 80);
              }}
              className={`p-1.5 px-3 rounded text-[10px] sm:text-xs font-semibold font-mono transition-all border ${
                activeStream.id === stream.id
                  ? 'bg-emerald-600 text-slate-100 border-emerald-500 shadow-md shadow-emerald-950/30'
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {isRtl ? stream.locationAr : stream.locationEn}
            </button>
          ))}
        </div>
      </div>

      {/* Main Container splits between video player & live feed telemetry statistics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: THE SIMULATED VIDEO PLAYER (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-3">
          {/* Main Monitor Display Box */}
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 select-none group">
            
            {/* Real Assets Background Photo */}
            <img
              src={activeStream.image}
              alt={isRtl ? activeStream.nameAr : activeStream.nameEn}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-all duration-1000 ${
                isPlaying ? 'scale-105 saturate-[1.05] brightness-[0.85]' : 'scale-100 saturate-[0.8] brightness-[0.6]'
              } ${showThermal ? 'hue-rotate-180 invert brightness-[1.1] contrast-[1.2] saturate-200 blur-[0.5px]' : ''}`}
            />

            {/* Drone Scanning Matrix Grid & Ambient Color Gradients overlaying the visual */}
            <div className="absolute inset-0 pointer-events-none bg-radial-gradient-overlay" />
            
            {/* Atmospheric scanline effect if playing */}
            {isPlaying && (
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat-y bg-[linear-gradient(rgba(18,24,38,0)_95%,rgba(0,0,0,1)_95%)] bg-[length:100%_4px] animate-scanline" />
            )}

            {/* Glowing Spotlight Overlay representing actual light beam coverage map */}
            <div 
              className={`absolute top-0 w-72 h-72 rounded-full pointer-events-none mix-blend-screen filter blur-[24px] transition-all duration-[2000ms] ${
                showThermal 
                  ? 'bg-rose-500/40 left-[25%] opacity-100 scale-125' 
                  : isPlaying 
                    ? activeStream.id.includes('sebha') || activeStream.id.includes('coast')
                      ? 'bg-amber-500/15 left-[35%] opacity-100 scale-100'
                      : 'bg-emerald-500/15 left-[40%] opacity-100 scale-100'
                    : 'opacity-0 scale-75'
              }`}
              style={{
                transform: `translate(${(progress - 50) * 1.5}px, ${Math.sin(progress / 10) * 15}px)`
              }}
            />

            {/* Live Camera Reticle / Target System Crosshair */}
            {isPlaying && showHUD && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50 font-mono text-[9px] text-emerald-400">
                <div className="w-16 h-16 border border-emerald-400/30 rounded-full flex items-center justify-center relative">
                  <span className="w-2 h-[1px] bg-emerald-400 absolute" />
                  <span className="h-2 w-[1px] bg-emerald-400 absolute" />
                  {/* Dynamic flight compass markers */}
                  <span className="absolute top-1 font-bold">N</span>
                  <span className="absolute bottom-1 font-bold">S</span>
                  <span className="absolute right-1.5 font-bold">E</span>
                  <span className="absolute left-1.5 font-bold">W</span>
                </div>
              </div>
            )}

            {/* Dynamic Telemetry HUD overlay */}
            {showHUD && (
              <div className="absolute inset-0 p-4 flex flex-col justify-between font-mono text-[9px] sm:text-[10px] text-emerald-400/90 pointer-events-none select-none z-10 transition-all duration-300">
                
                {/* HUD Top bar */}
                <div className="flex justify-between items-start bg-slate-950/60 p-2 rounded border border-slate-900/45 backdrop-blur-sm">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      <span>FEEDS REC: DSN-4K [1080P/60FPS]</span>
                    </div>
                    <div className="text-slate-400 text-[8px] sm:text-[9px]">
                      LOC: {activeStream.coords}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="font-bold text-slate-200">
                      {timestamp}
                    </div>
                    <div className="text-emerald-400/70 text-[8px] sm:text-[9px]">
                      SYS-TEMP: +34.2°C [OK]
                    </div>
                  </div>
                </div>

                {/* HUD Corner Elements to represent high-tech optics */}
                <div className="flex justify-between items-center my-auto px-1 sm:px-3 text-[9px]">
                  {/* Left Side: Optical stats */}
                  <div className="space-y-2 bg-slate-950/40 p-1.5 rounded border border-slate-900/30">
                    <div>ZOOM: {(1.5 + (progress / 100)).toFixed(1)}X</div>
                    <div>PAN: {Math.round(progress - 50)}°</div>
                    <div>TILT: -14.2°</div>
                  </div>
                  {/* Right Side: Drone flight telemetry parameters */}
                  <div className="space-y-2 bg-slate-950/40 p-1.5 rounded border border-slate-900/30 text-right">
                    <div>ALTITUDE: {altitude} m</div>
                    <div>SPD VALUE: {speed} km/h</div>
                    <div>SLA TRACKING: AUT</div>
                  </div>
                </div>

                {/* HUD Bottom Status bar */}
                <div className="flex justify-between items-center bg-slate-950/60 p-1.5 rounded border border-slate-900/40 backdrop-blur-sm">
                  <div>
                    {isRtl ? 'مؤشر الكفاءة البصرية:' : 'OPTICAL SPECTRUM ASSESSMENT:'} <span className="text-emerald-300 font-bold">96.8% [NOMINAL]</span>
                  </div>
                  <div>
                    {isRtl ? 'الوهج المتشتت:' : 'LUMINAIRE BEAM DRIFT:'} <span className="text-teal-400 font-bold">0.02%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Large Pause screen overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center transition-all duration-300 z-10">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 flex items-center justify-center transition-all hover:scale-110 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                  <Play size={24} className={isRtl ? 'mr-0 ml-1' : 'ml-1'} />
                </button>
                <span className="font-mono text-slate-300 text-[10px] uppercase font-semibold tracking-wider mt-3">
                  {isRtl ? 'البث موقوف مؤقتاً لمراجعة المقطع' : 'Survey PAUSED — Press to Resume Telemetry'}
                </span>
                <span className="font-mono text-slate-500 text-[9px] mt-1">
                  SYS FEED OK: frame standby
                </span>
              </div>
            )}
          </div>

          {/* Interactive Player controls bar (Timeline scrubbing, toggles) */}
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 space-y-3 font-mono">
            {/* Timeline slider row */}
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-slate-500 w-8 text-center">{Math.floor((progress / 100) * 24)}s</span>
              <div
                onClick={handleTimelineClick}
                className="flex-1 h-1.5 bg-slate-900 hover:bg-slate-800/80 rounded-full overflow-hidden cursor-pointer relative"
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[9px] text-slate-500 w-8 text-center">24s</span>
            </div>

            {/* Controls row */}
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 hover:text-slate-200 text-slate-400 rounded flex items-center gap-1.5 text-[10px] font-bold cursor-pointer transition-all"
                >
                  {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isPlaying ? (isRtl ? 'إيقاف' : 'PAUSE') : (isRtl ? 'تشغيل' : 'LIVE')}</span>
                </button>

                {/* Restart Loop Button */}
                <button
                  onClick={() => setProgress(0)}
                  className="p-1 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded cursor-pointer transition-all"
                  title={isRtl ? 'إعادة تشغيل البث' : 'Restream drone flight'}
                >
                  <RefreshCw size={12} />
                </button>

                <div className="h-4 w-[1px] bg-slate-900" />

                {/* HUD Overlay toggle */}
                <button
                  onClick={() => setShowHUD(!showHUD)}
                  className={`p-1 px-2 border rounded flex items-center gap-1 text-[10px] font-bold cursor-pointer transition-all ${
                    showHUD
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                >
                  <Eye size={12} />
                  <span>{showHUD ? (isRtl ? 'إخفاء التقارير' : 'SLA HUD ACTIVE') : (isRtl ? 'عرض التقارير' : 'SLA HUD MUTED')}</span>
                </button>

                {/* Optical Thermal Overlay toggle */}
                <button
                  onClick={() => setShowThermal(!showThermal)}
                  className={`p-1 px-2 border rounded flex items-center gap-1 text-[10px] font-bold cursor-pointer transition-all ${
                    showThermal
                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/20 font-bold'
                      : 'bg-slate-900 text-slate-500 border-slate-800'
                  }`}
                  title={isRtl ? 'عرض بصري حراري لتشتت الضوء البصري' : 'Toggle optical energy dissipation layer'}
                >
                  <Layers size={12} />
                  <span>{showThermal ? (isRtl ? 'طيف حراري' : 'THERMAL SCALE') : (isRtl ? 'طيف طبيعي' : 'OPTICAL MODE')}</span>
                </button>
              </div>

              {/* Sound/Atmosphere toggle & Telemetry diagnostics details */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1 text-slate-500 hover:text-slate-300 cursor-pointer flex items-center gap-1.5 text-[10px]"
                >
                  {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                  <span>{isMuted ? (isRtl ? 'كتم الرياح' : 'WIND MUTED') : (isRtl ? 'صوت الرياح' : 'WIND LIVE')}</span>
                </button>
                <div className="hidden sm:flex items-center gap-1 text-[9px] text-slate-500">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span>DSN GRID CONNECTIVITY: ONLINE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILED SURVEY TECHNICAL PROFILE (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-4 h-full">
            <h4 className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest border-b border-slate-900 pb-2.5">
              {isRtl ? 'الخصائص التقنية لمسار المراقبة' : 'AUDITED CORRIDOR METRICS'}
            </h4>

            {/* Stats block layout */}
            <div className="space-y-3 text-xs">
              <div className="space-y-1 bg-slate-900/35 p-3 rounded border border-slate-900">
                <span className="text-[10px] text-slate-500 uppercase tracking-wide block font-mono">
                  {isRtl ? 'المشروع المرصود حالياً:' : 'Active Monitored Infrastructure:'}
                </span>
                <strong className="text-slate-200 block text-sm font-semibold">
                  {isRtl ? activeStream.nameAr : activeStream.nameEn}
                </strong>
                <span className="text-slate-400 block font-mono text-[10px]">
                  {isRtl ? activeStream.locationAr : activeStream.locationEn}
                </span>
              </div>

              {/* Specific Engineering Metrics */}
              <div className="grid grid-cols-2 gap-3.5 pt-1">
                <div className="bg-slate-900/10 p-2.5 rounded border border-slate-900">
                  <span className="text-[9px] text-slate-500 block font-mono uppercase">{isRtl ? 'مقاومة الرياح الشديدة' : 'Wind Threshold'}</span>
                  <strong className="text-slate-300 block font-mono text-[11px] mt-0.5">{activeStream.windResistance}</strong>
                </div>
                <div className="bg-slate-900/10 p-2.5 rounded border border-slate-900">
                  <span className="text-[9px] text-slate-500 block font-mono uppercase">{isRtl ? 'سعة التوليد اليومية' : 'PV Solar Capacity'}</span>
                  <strong className="text-slate-300 block font-mono text-[11px] mt-0.5">{activeStream.solarCapacity}</strong>
                </div>
                <div className="bg-slate-900/10 p-2.5 rounded border border-slate-900">
                  <span className="text-[9px] text-slate-500 block font-mono uppercase">{isRtl ? 'كفاءة توزيع المصابيح' : 'Optical Attenuation'}</span>
                  <strong className="text-emerald-400 block font-mono text-[11px] mt-0.5">{activeStream.illuminance}</strong>
                </div>
                <div className="bg-slate-900/10 p-2.5 rounded border border-slate-900">
                  <span className="text-[9px] text-slate-500 block font-mono uppercase">{isRtl ? 'الطلب من الشبكة العامة' : 'Grid Load Draw'}</span>
                  <strong className="text-slate-300 block font-mono text-[11px] mt-0.5">{activeStream.gridLoad}</strong>
                </div>
              </div>

              {/* General Technical Observations */}
              <div className="pt-3 border-t border-slate-900 space-y-2 text-[10px] text-slate-400 font-mono leading-relaxed">
                <h5 className="font-bold text-slate-200 uppercase tracking-wide text-[9px] flex items-center gap-1.5">
                  <Compass size={12} className="text-emerald-500" />
                  <span>{isRtl ? 'المشاهدات الفنية والامتثال اللحظي' : 'SLA Technical Observations:'}</span>
                </h5>
                <ul className="list-disc pl-3.5 space-y-1.5">
                  <li>{isRtl ? 'هيكل القواعد الإسمنتية صامد بالكامل بدون أي اهتزازات.' : 'Structural anchors verified drift-free under moderate crosswinds.'}</li>
                  <li>{isRtl ? 'حساسات الغبار الذاتية في السولار تعتمد مسار المسح الذاتي كل ٤٨ ساعة.' : 'Solar self-cleaning automation loops reporting 99.4% optical clarity.'}</li>
                  <li>{isRtl ? 'نظام النبض الموفر للطاقة (PWM) نشط حالياً للحد من تبديد الشحنة.' : 'Pulse-width modulation active in battery vaults to prevent heat stress.'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
