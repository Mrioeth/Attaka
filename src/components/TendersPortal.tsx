import React, { useState } from 'react';
import { Tender, Language } from '../types';
import { getTranslation } from '../translations';
import { Briefcase, Calendar, MapPin, CheckCircle, FileText, X, ChevronRight, Send, AlertTriangle } from 'lucide-react';

interface TendersPortalProps {
  tenders: Tender[];
  lang: Language;
}

export const TendersPortal: React.FC<TendersPortalProps> = ({ tenders, lang }) => {
  const [selectedTender, setSelectedTender] = useState<Tender | null>(null);
  
  // Apply submission flow
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantNotes, setApplicantNotes] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRef, setSuccessRef] = useState<string | null>(null);

  const handleApplyClick = (tender: Tender) => {
    setSelectedTender(tender);
    setSuccessRef(null);
    setApplicantName('');
    setApplicantEmail('');
    setApplicantNotes('');
    setFileName(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail || !fileName) {
      alert(lang === 'ar' ? 'يرجى ملىء كافة الحقول الأساسية وإرفاق الملف المطلوب.' : 'Please enter your name, email, and attach the required document.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const randNum = Math.floor(100 + Math.random() * 900).toString();
      setSuccessRef(`BID-2026-${randNum}`);
    }, 1200);
  };

  const isRtl = lang === 'ar';

  return (
    <div className="space-y-6">
      <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/60">
          <div>
            <h3 className="text-lg font-bold text-slate-100">
              {getTranslation(lang, 'tendersTitle')}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {getTranslation(lang, 'tendersSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500/5 rounded-lg border border-amber-500/10 text-amber-400 text-[11px] font-mono">
            <AlertTriangle size={14} />
            <span>{isRtl ? "مطابقة تامة لشروط GECOL" : "Strict GECOL Compliance"}</span>
          </div>
        </div>

        {/* Tenders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenders.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950/40 p-5 rounded-xl border border-slate-800 flex flex-col justify-between hover:border-slate-700/80 transition-all group"
            >
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-mono tracking-wider uppercase font-medium ${
                    item.type === 'tender'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {item.type === 'tender' 
                      ? (isRtl ? "مناقصة بضائع" : "Contract Bid") 
                      : (isRtl ? "وظيفة هندسية" : "Engineering Job")}
                  </span>
                  
                  <span className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Calendar size={10} />
                    {getTranslation(lang, 'deadlineLabel')}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-200 group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {isRtl ? item.titleAr : item.titleEn}
                </h4>

                <p className="text-[11px] text-slate-400 mt-2 font-mono">
                  {isRtl ? item.departmentAr : item.departmentEn}
                </p>

                <div className="flex flex-col gap-1.5 mt-4 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={11} className="text-slate-600" />
                    <span>{isRtl ? item.locationAr : item.locationEn}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={11} className="text-slate-600" />
                    <span className="font-mono text-amber-500">{isRtl ? item.deadlineAr : item.deadlineEn}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-900 flex justify-end">
                <button
                  onClick={() => handleApplyClick(item)}
                  className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-200 rounded font-semibold transition-all border border-slate-800 hover:border-slate-700"
                >
                  {isRtl ? "الاطلاع والشروط والتقديم" : "View & Apply"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP MODAL DRAWER FOR DETAILED VIEW & DOCUMENT SUBMISSION */}
      {selectedTender && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/30">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block mb-1">
                  {selectedTender.type === 'tender' ? (isRtl ? "مواصفة العطاء المفتوح" : "Tender Bid Specifications") : (isRtl ? "متطلبات شاغر هندسي" : "Career Profile Requirements")}
                </span>
                <h3 className="text-md font-bold text-slate-100">
                  {isRtl ? selectedTender.titleAr : selectedTender.titleEn}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTender(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Requirements specifications block */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 mb-3 flex items-center gap-1.5">
                  <Briefcase size={12} className="text-emerald-400" />
                  <span>{isRtl ? "المتطلبات الإجبارية والامتثال" : "Eligibility & Technical Compliance"}</span>
                </h4>
                
                <ul className="space-y-2 text-xs text-slate-300 leading-relaxed pl-5 list-disc marker:text-emerald-400">
                  {(isRtl ? selectedTender.requirementsAr : selectedTender.requirementsEn).map((req, index) => (
                    <li key={index} className="pl-1 text-slate-300">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Form Submission Segment inside modal */}
              {successRef ? (
                <div className="p-5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mx-auto mb-3">
                    <CheckCircle size={24} />
                  </div>
                  <h5 className="text-sm font-bold text-emerald-300 mb-1">
                    {isRtl ? "تم استلام المقترح المبدئي بنجاح" : "Proposal Successfully Processed"}
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-normal mb-3">
                    {isRtl 
                      ? "تم تسجيل طلبكم في نظام مناقصات الغرب والشرق. كود المراجعة السري الخاص بكم هو:"
                      : "Registered securely in Attaka National Procurement Hub. Your reference:"}
                  </p>
                  <span className="inline-block font-mono bg-slate-950 px-3 py-1 border border-slate-800 rounded text-xs text-emerald-400 font-bold mb-2">
                    {successRef}
                  </span>
                  <p className="text-[10px] text-slate-500">
                    {isRtl 
                      ? "سيقوم ممثل قطاع التوريد والامتثال بالتواصل معكم فوراً بعد المطابقة مع المهندسين الاستشاريين."
                      : "Our compliance team will review specifications against GECOL requirements and respond soon."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 pt-4 border-t border-slate-800/60">
                  <h4 className="text-xs font-semibold text-slate-200">
                    {getTranslation(lang, 'applyModalTitle')}
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    {getTranslation(lang, 'applyModalDesc')}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">{isRtl ? "اسم الجهة / مقدم الطلب" : "Applicant Name"}</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 mb-1">{isRtl ? "البريد الإلكتروني المهني" : "Business Email"}</label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">{isRtl ? "ملاحظات إضافية وهندسة الفرض" : "Technical Scope Summary"}</label>
                    <textarea
                      value={applicantNotes}
                      onChange={(e) => setApplicantNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-slate-950 border border-slate-800 p-2 text-xs rounded text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Attachment input selector inside modal */}
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1.5">{isRtl ? "إرفاق مستند العطاء / السيرة الذاتية (PDF/ZIP)" : "Attach Procurement Bid Dossier / CV (PDF/ZIP)"}</label>
                    <div className="relative border border-dashed border-slate-800 bg-slate-950 p-4 rounded text-center">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.zip,.doc,.docx"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required
                      />
                      <div className="flex flex-col items-center justify-center gap-1">
                        <FileText size={18} className="text-slate-500" />
                        <span className="text-[11px] text-slate-400 font-medium">
                          {fileName ? fileName : (isRtl ? "اختر ملفاً من جهازك..." : "Browse file from system...")}
                        </span>
                        <span className="text-[9px] text-slate-600 font-mono">PDF, ZIP (Max 12MB)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="py-2.5 px-6 bg-emerald-600 hover:bg-emerald-500 text-slate-100 font-semibold text-xs rounded transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-55"
                    >
                      <Send size={12} />
                      {isSubmitting ? "Processing..." : getTranslation(lang, 'applyButton')}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
