import React, { useState, useRef } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { Upload, FileText, Check, DollarSign, Loader2, RefreshCw } from 'lucide-react';

interface InquiryFormProps {
  lang: Language;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('solar-grid');
  const [details, setDetails] = useState('');
  const [budgetRange, setBudgetRange] = useState('50k-250k');
  
  // Drag and drop file uploading states
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [refNum, setRefNum] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      setFileSize((file.size / (1024 * 1024)).toFixed(2) + ' MB');
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = () => {
    setFileName(null);
    setFileSize(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert(lang === 'ar' ? 'يرجى إدخال اسم الجهة والبريد الإلكتروني على الأقل.' : 'Please fill in at least the Company Name and Email.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setRefNum(generatedCode);
    }, 1500);
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCategory('solar-grid');
    setDetails('');
    setBudgetRange('50k-250k');
    setFileName(null);
    setFileSize(null);
    setRefNum(null);
  };

  const isRtl = lang === 'ar';

  return (
    <div className="bg-slate-900/60 p-6 md:p-8 rounded-2xl border border-slate-800/80 backdrop-blur-md max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h3 className="text-xl font-bold text-slate-100 flex items-center justify-center gap-2">
          {getTranslation(lang, 'contactTitle')}
        </h3>
        <p className="text-xs text-slate-400 max-w-xl mx-auto mt-2">
          {getTranslation(lang, 'contactSubtitle')}
        </p>
      </div>

      {refNum ? (
        <div className="bg-emerald-500/10 border border-emerald-500/30 p-8 rounded-xl text-center flex flex-col items-center justify-center animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/40">
            <Check size={32} />
          </div>
          <h4 className="text-lg font-bold text-emerald-400 mb-2">
            {getTranslation(lang, 'success')}
          </h4>
          <p className="text-xs text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
            {getTranslation(lang, 'submitSuccess')}{refNum}
          </p>
          <div className="bg-slate-950 font-mono py-2 px-4 rounded text-xs text-emerald-500 border border-slate-800 tracking-wider mb-6">
            REF-{refNum}
          </div>
          <p className="text-[10px] text-slate-500 max-w-xs mx-auto mb-6">
            {isRtl 
              ? "سنقوم بمراجعة المخططات وإرسال الرد الفني الأولي لبريدكم الإلكتروني في غضون ٢٤ ساعة عمل."
              : "Our engineering team will review your attachments and contact your designated email within 24 operational hours."}
          </p>
          <button
            onClick={resetForm}
            className="flex items-center gap-1.5 py-2 px-4 bg-slate-800 hover:bg-slate-700 rounded text-xs text-slate-200 transition-colors"
          >
            <RefreshCw size={12} />
            {isRtl ? "تقديم طلب مستند جديد" : "Submit Another Inquiry"}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Company / Municipality name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {getTranslation(lang, 'formName')} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={isRtl ? "مثال: بلدية جنزور أو شركة الخدمات العامة طرابلس" : "e.g., General Services Company, Misrata"}
                className="w-full bg-slate-950 border border-slate-800 py-2.5 px-4 rounded-lg text-xs leading-normal text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {getTranslation(lang, 'formEmail')} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="eng.contact@company.ly"
                className="w-full bg-slate-950 border border-slate-800 py-2.5 px-4 rounded-lg text-xs leading-normal text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            {/* Mobile line */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {getTranslation(lang, 'formPhone')}
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+218 91-000-0000"
                className="w-full bg-slate-950 border border-slate-800 py-2.5 px-4 rounded-lg text-xs leading-normal text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors font-mono"
              />
            </div>

            {/* Project type / Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                {getTranslation(lang, 'formCategory')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 py-2.5 px-4 rounded-lg text-xs leading-normal text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
              >
                <option value="solar-grid">{isRtl ? "إنارة شمسية مستقلة مستدامة" : "Sustainable Solar Streetlights"}</option>
                <option value="highway-grid">{isRtl ? "شبكات الطرق السريعة والأبراج العالية" : "High-Mast Highway Utility Grids"}</option>
                <option value="maintenance">{isRtl ? "عقود تشغيل وصيانة وتأمين SLA" : "Maintenance, Repair & SLA"}</option>
                <option value="materials">{isRtl ? "توريد مواد الكابلات والمحولات الكهربائية" : "High-Volt Cabling & Electrical Supply"}</option>
              </select>
            </div>
          </div>

          {/* Budget Range estimation slider */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2 flex justify-between">
              <span>{getTranslation(lang, 'formBudget')}</span>
              <span className="text-emerald-400 font-mono text-xs">
                {budgetRange === 'under-50k' && (isRtl ? "أقل من 50,000 دينار" : "Under $50,000 USD Equivalent")}
                {budgetRange === '50k-250k' && (isRtl ? "50,000 - 250,000 دينار" : "$50,000 - $250,000 USD Equivalent")}
                {budgetRange === '250k-1m' && (isRtl ? "250,000 - 1,000,000 دينار" : "$250,000 - $1,000,000 USD Equivalent")}
                {budgetRange === 'above-1m' && (isRtl ? "أكثر من 1,000,000 دينار (مشاريع كبرى)" : "Over $1,000,000+ USD (Major National Infrastructure)")}
              </span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['under-50k', '50k-250k', '250k-1m', 'above-1m'].map((range) => (
                <button
                  key={range}
                  type="button"
                  onClick={() => setBudgetRange(range)}
                  className={`py-2 rounded text-[10px] border font-mono transition-colors text-center ${
                    budgetRange === range
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  {range === 'under-50k' && "< 50K"}
                  {range === '50k-250k' && "50K - 250K"}
                  {range === '250k-1m' && "250K - 1M"}
                  {range === 'above-1m' && "1M+"}
                </button>
              ))}
            </div>
          </div>

          {/* Form details */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {getTranslation(lang, 'formDetails')}
            </label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={4}
              placeholder={isRtl ? "حدد طول المسار المراد إنارته، النطاق البلدي، عدد المعاطف المطلوبة، كفاءة الأعمدة أو مواصفات الكيبلا المستهدفة بالتفصيل..." : "Describe street length, terrain, pole height requirements, or high-volt cabling specifications."}
              className="w-full bg-slate-950 border border-slate-800 py-3 px-4 rounded-lg text-xs leading-relaxed text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>

          {/* DRAG AND DROP FILE UPLOAD CONTAINER */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              {getTranslation(lang, 'formUploadLabel')}
            </label>
            
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={triggerFileSelect}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragging 
                  ? 'border-emerald-500 bg-emerald-500/5 scale-[0.99]' 
                  : fileName
                    ? 'border-emerald-500/40 bg-slate-950'
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".pdf,.dwg,.dxf,.zip,.jpg,.png"
                className="hidden"
              />

              {fileName ? (
                <div className="flex flex-col items-center justify-center animate-fadeIn">
                  <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 mb-2 border border-emerald-500/20">
                    <FileText size={24} />
                  </div>
                  <span className="block text-xs font-medium text-slate-200 truncate max-w-xs">{fileName}</span>
                  <span className="block text-[10px] text-slate-500 font-mono mt-0.5">{fileSize}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile();
                    }}
                    className="mt-3 text-[10px] font-mono hover:underline text-rose-400"
                  >
                    {isRtl ? "إزالة المستند الحالي" : "Remove Attachment"}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Upload className="text-slate-500 group-hover:text-slate-300 mb-2" size={24} />
                  <p className="text-xs font-semibold text-slate-300">
                    {getTranslation(lang, 'formUploadPlaceholder')}
                  </p>
                  <p className="text-[10px] text-slate-500 font-mono mt-1">
                    {isRtl ? "الامتدادات المعتمدة: CAD (.dwg), PDF, ZIP, صور مخطوطات (حجم أقصى 15 ميجابايت)" : "Approved extensions: CAD (.dwg), PDF, ZIP, Images (Max 15MB)"}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto py-3 px-8 bg-emerald-600 hover:bg-emerald-500 text-slate-100 font-semibold rounded-lg text-xs leading-none transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-950/20 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin inline" size={14} />
                  <span>{getTranslation(lang, 'submitting')}</span>
                </>
              ) : (
                <>
                  <DollarSign size={14} />
                  <span>{getTranslation(lang, 'submit')}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
