import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { Server, Activity, ShieldCheck, AlertCircle, Send, Wifi, Download, Compass, Loader2 } from 'lucide-react';

interface ClientPortalProps {
  lang: Language;
}

interface Incident {
  id: string;
  sector: string;
  issue: string;
  eta: string;
  status: 'pending' | 'dispatched' | 'repaired';
}

export const ClientPortal: React.FC<ClientPortalProps> = ({ lang }) => {
  const [accessKey, setAccessKey] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Custom dashboard state
  const [efficiency, setEfficiency] = useState(98.4);
  const [incidents, setIncidents] = useState<Incident[]>([
    { id: "INC-982", sector: "Third Ring Rd - Tripoli (KM 14)", issue: lang === 'ar' ? "صدمة سيارة - كسر عامود" : "Pole struck by truck - Structural failure", eta: "45 mins", status: "dispatched" },
    { id: "INC-971", sector: "Coastal Road - Tajoura Cut", issue: lang === 'ar' ? "تراكم الرمال على الخلايا" : "Sand accumulation on solar PV array", eta: "2 hours", status: "pending" },
    { id: "INC-904", sector: "Benghazi Expressway Bypass", issue: lang === 'ar' ? "خلل قاطع فرعي بمغذي 4" : "Breaker trip in substation feeder 4", eta: "COMPLETED", status: "repaired" }
  ]);

  // SLA Outage reporter state
  const [newRoad, setNewRoad] = useState('');
  const [newIssue, setNewIssue] = useState('bulb-failure');
  const [customDescription, setCustomDescription] = useState('');
  const [isReporting, setIsReporting] = useState(false);

  // Random fluctuation simulator to make the dashboard look live and real
  useEffect(() => {
    if (!isLoggedIn) return;
    const interval = setInterval(() => {
      setEfficiency(prev => {
        const delta = (Math.random() - 0.5) * 0.2;
        return parseFloat(Math.min(100, Math.max(92, prev + delta)).toFixed(2));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey.trim()) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsLoggedIn(true);
    }, 1200);
  };

  const handleDemoLogin = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setIsLoggedIn(true);
      setAccessKey('GECOL-NATIONAL-ADMIN');
    }, 800);
  };

  const handleReportOutage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoad.trim()) {
      alert(lang === 'ar' ? 'يرجى تحديد الطريق أو المقطع لغرفة التوجيه.' : 'Please enter the road or sector division.');
      return;
    }

    setIsReporting(true);
    setTimeout(() => {
      setIsReporting(false);
      
      const categoryText = newIssue === 'bulb-failure' 
        ? (lang === 'ar' ? 'تلف الإضاءات الفرعية LED' : 'LED module failure')
        : newIssue === 'battery-low'
          ? (lang === 'ar' ? 'ضعف تفريغ البطارية الشمسية' : 'PV charge control low efficiency')
          : (lang === 'ar' ? 'طلب مراجعة وقاية وقواعد' : 'Substation protection tripped');

      const item: Incident = {
        id: `INC-${Math.floor(100 + Math.random() * 900)}`,
        sector: newRoad,
        issue: customDescription ? `${categoryText} (${customDescription})` : categoryText,
        eta: "25 mins (RAPID DISPATCH)",
        status: "dispatched"
      };

      setIncidents(prev => [item, ...prev]);
      setNewRoad('');
      setCustomDescription('');
      alert(lang === 'ar' ? 'تم توجيه البلاغ وحجز فرقة صيانة شركة الطاقة في التو.' : 'Emergency work-order logged. Rapid dispatch team assigned.');
    }, 1500);
  };

  const handleDownloadSLA = () => {
    alert(lang === 'ar' 
      ? "تنزيل تقرير الالتزام الوطني رقم ATK-GECOL-2026.pdf ... تم إعداد الوثيقة بنجاح وجاهزة للتداول الحكومي." 
      : "Downloading official compliance report 'ATK-GECOL-2026.pdf' ... Government-authorized document export successful.");
  };

  const isRtl = lang === 'ar';

  return (
    <div className="bg-white/70 dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 backdrop-blur-md text-slate-800 dark:text-slate-100">
      
      {!isLoggedIn ? (
        // Login Form Frame
        <div className="max-w-md mx-auto py-8 text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 dark:text-emerald-400 mx-auto mb-4 border border-emerald-500/20 shadow">
            <Server size={24} />
          </div>
          
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            {getTranslation(lang, 'portalTitle')}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 mb-6">
            {getTranslation(lang, 'portalSubtitle')}
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-2 truncate">
                {getTranslation(lang, 'portalAccessKey')}
              </label>
              <input
                type="text"
                value={accessKey}
                onChange={(e) => setAccessKey(e.target.value)}
                placeholder="e.g., GECOL-WEST-TRIPOLI"
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-205 dark:border-slate-800 p-3 rounded text-xs leading-normal font-mono text-slate-800 dark:text-slate-200 text-center tracking-wider focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded text-xs font-semibold transition-all border border-slate-200 dark:border-slate-700 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{getTranslation(lang, 'portalBtnDemo')}</span>
              </button>
              
              <button
                type="submit"
                disabled={isVerifying}
                className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-slate-100 rounded text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                {isVerifying && <Loader2 className="animate-spin" size={12} />}
                <span>{getTranslation(lang, 'portalBtnSubmit')}</span>
              </button>
            </div>
          </form>

          <p className="text-[10px] text-slate-500 dark:text-slate-550 mt-6 leading-relaxed font-semibold">
            {getTranslation(lang, 'portalNoKey')}
          </p>
        </div>
      ) : (
        // Logged-in Dashboard Frame
        <div className="space-y-8 animate-fadeIn">
          
          {/* Dashboard Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Wifi className="text-emerald-500 dark:text-emerald-400 animate-pulse" size={16} />
                <span className="text-[10px] font-mono tracking-wider text-emerald-600 dark:text-emerald-400 uppercase font-semibold font-bold">
                  {isRtl ? "نظام مراقبة الطاقة والشبكات النشط" : "LIVE SCADA TELEMETRY NETWORK"}
                </span>
              </div>
              <h3 className="text-md font-bold text-slate-800 dark:text-slate-100">
                {getTranslation(lang, 'portalDistrictTitle')}
                <span className="text-slate-600 dark:text-slate-300 font-mono text-sm ml-1 mr-1">{getTranslation(lang, 'portalDistrictVal')}</span>
              </h3>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded">
                ● {getTranslation(lang, 'portalSystemNormal')}
              </span>
              <button
                onClick={handleDownloadSLA}
                className="p-1.5 md:p-2 bg-slate-100 hover:bg-slate-205 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-705 dark:text-slate-300 flex items-center gap-1.5 text-xs transition-colors cursor-pointer border border-slate-200 dark:border-slate-700"
              >
                <Download size={13} />
                <span className="hidden sm:inline">{isRtl ? "تصدير تقرير الصيانة" : "Export SLA Log"}</span>
              </button>
            </div>
          </div>

          {/* Core telemetries */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-200 dark:border-slate-800/80 rounded-xl relative overflow-hidden">
              <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">{getTranslation(lang, 'portalActiveGrids')}</span>
              <span className="text-2xl font-mono font-bold text-slate-805 dark:text-slate-100 tracking-tight">1,842</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-1">100% {isRtl ? "تغطية الطرق السريعة" : "Expressway coverage"}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-205 dark:border-slate-800/80 rounded-xl relative overflow-hidden">
              <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">{getTranslation(lang, 'portalOutagesReported')}</span>
              <span className="text-2xl font-mono font-bold text-amber-600 dark:text-amber-500 tracking-tight">
                {incidents.filter(i => i.status !== 'repaired').length}
              </span>
              <span className="text-[10px] text-slate-500 block mt-1">{isRtl ? "خفيفة جاري معالجتها" : "Minor active dispatches in queue"}</span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-205 dark:border-slate-800/80 rounded-xl relative overflow-hidden">
              <span className="text-slate-500 dark:text-slate-400 text-xs block mb-1">{getTranslation(lang, 'portalEstEfficiency')}</span>
              <span className="text-2xl font-mono font-bold text-emerald-650 dark:text-emerald-400 tracking-tight">{efficiency}%</span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block mt-1">{isRtl ? "الأعلى تشغيلياً بالمنطقة" : "+1.2% versus national index"}</span>
            </div>
          </div>

          {/* Ticker & Outage submission split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Table of active dispatch incidents */}
            <div className="lg:col-span-7 space-y-4">
              <h4 className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                {getTranslation(lang, 'portalGridFailsTable')}
              </h4>

              <div className="bg-slate-50 dark:bg-slate-950/40 rounded-xl border border-slate-200 dark:border-slate-800/80 overflow-hidden">
                <table className="w-full text-xs text-slate-600 dark:text-slate-350">
                  <header className="bg-slate-100 dark:bg-slate-950 p-3 grid grid-cols-4 font-bold border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-[10px] uppercase font-mono tracking-wider">
                    <div>{getTranslation(lang, 'portalGridFailsH1')}</div>
                    <div className="col-span-2">{getTranslation(lang, 'portalGridFailsH2')}</div>
                    <div className="text-right">{getTranslation(lang, 'portalGridFailsH4')}</div>
                  </header>
                  <main className="divide-y divide-slate-200 dark:divide-slate-800">
                    {incidents.map((inc) => (
                      <div key={inc.id} className="p-3.5 grid grid-cols-4 items-center hover:bg-slate-100/40 dark:hover:bg-slate-900/40 transition-colors">
                        <div className="font-mono text-[11px] text-slate-700 dark:text-slate-202 break-words pr-2">
                          <span className="block font-bold text-[10px] text-slate-500 dark:text-slate-400">{inc.id}</span>
                          {inc.sector}
                        </div>
                        <div className="col-span-2 text-slate-600 dark:text-slate-300 pr-2 leading-relaxed">
                          {inc.issue}
                          <span className="block text-[10px] text-slate-500 font-mono mt-0.5">ETA: {inc.eta}</span>
                        </div>
                        <div className="text-right">
                          <span className={`inline-block py-0.5 px-2 rounded font-mono text-[9px] font-semibold ${
                            inc.status === 'dispatched' 
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                              : inc.status === 'pending'
                                ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                          }`}>
                            {inc.status === 'dispatched' ? (isRtl ? "منطلق" : "En Route") : inc.status === 'pending' ? (isRtl ? "معلّق" : "Assigned") : (isRtl ? "تم الحل" : "Resolved")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </main>
                </table>
              </div>
            </div>

            {/* SLA Incident Reporter */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 p-5 rounded-xl border border-slate-205 dark:border-slate-800/80">
              <h4 className="text-xs font-bold text-slate-705 dark:text-slate-202 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                <AlertCircle className="text-rose-550 dark:text-rose-400" size={13} />
                <span>{getTranslation(lang, 'portalReportIssue')}</span>
              </h4>

              <form onSubmit={handleReportOutage} className="space-y-4">
                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-1">{isRtl ? "قطاع الموقف أو الكيلومتر" : "Target Sector Division / KM Marker"}</label>
                  <input
                    type="text"
                    required
                    value={newRoad}
                    onChange={(e) => setNewRoad(e.target.value)}
                    placeholder="e.g., Highway Coast Rd (KM 42)"
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 text-xs rounded text-slate-800 dark:text-slate-202 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-slate-400 mb-1">{isRtl ? "التصنيف الهندسي للخلل" : "SLA Deficit Code"}</label>
                  <select
                    value={newIssue}
                    onChange={(e) => setNewIssue(e.target.value)}
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 text-xs rounded text-slate-850 dark:text-slate-200 focus:outline-none focus:border-rose-500"
                  >
                    <option value="bulb-failure">{isRtl ? "انطفاء المصباح أو عطل الخلية" : "Pole Luminaire Failure"}</option>
                    <option value="battery-low">{isRtl ? "عجز البطارية / إنذار تيار مستمر" : "Battery / PV Controller Alarm"}</option>
                    <option value="breaker-tripped">{isRtl ? "افريل مفصلات لوحة التوزيع الفرعية" : "Local Feeder Box Open Outage"}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 dark:text-slate-404 mb-1">{isRtl ? "تفاصيل إضافية للفرقة" : "Details for Dispatch Room"}</label>
                  <textarea
                    value={customDescription}
                    onChange={(e) => setCustomDescription(e.target.value)}
                    rows={2}
                    placeholder="e.g., Extreme sandstorm tripped phase B, pole 14 to 19 unresponsive."
                    className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 text-xs rounded text-slate-800 dark:text-slate-202 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isReporting}
                  className="w-full py-2 bg-rose-50 dark:bg-rose-950/40 border border-rose-205 dark:border-rose-900 text-rose-600 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-55"
                >
                  <Send size={12} className="text-rose-500 dark:text-rose-400" />
                  <span>{isReporting ? "Loging telemetry..." : getTranslation(lang, 'portalReportBtn')}</span>
                </button>

                <p className="text-[9px] text-slate-550 dark:text-slate-500 block leading-normal">
                  {getTranslation(lang, 'portalReportHelp')}
                </p>
              </form>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
