import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { Leaf, Info, ShieldCheck, HelpCircle } from 'lucide-react';

interface CalculatorProps {
  lang: Language;
}

export const Calculator: React.FC<CalculatorProps> = ({ lang }) => {
  const [kilometers, setKilometers] = useState<number>(25);
  const [traditionalWattage, setTraditionalWattage] = useState<number>(250); // Sodium bulbs are usually 250W or 400W
  const [operatingHours, setOperatingHours] = useState<number>(11); // Average Libyan night hours

  // Calculate results based on standard formula
  // Traditional grid usage: poles spaced every 35 meters = ~28 poles per km
  const totalPoles = Math.ceil(kilometers * 28.5);
  
  // Traditional energy draw: poles * traditionalWattage * operatingHours * 365 days / 1000 = kWh per year
  const traditionalKwhPerYear = (totalPoles * traditionalWattage * operatingHours * 365) / 1000;
  
  // LED + Solar takes 0 grid energy.
  const kwhSaved = Math.round(traditionalKwhPerYear);
  
  // CO2 conversion: ~0.65 kg CO2 per kWh of thermal gas generation in Libya
  const co2SavedTons = Math.round((kwhSaved * 0.65) / 1000);

  // Maintenance dispatch savings: traditional Sodium bulbs fail every 1.5 years on average.
  // LED solar lasts up to 5-8 years without maintenance.
  // Estimating bucket-truck dispatch costs (simulated saving of trips)
  const truckTripsAvoided = Math.round(totalPoles * 0.6);

  const isRtl = lang === 'ar';

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-900/95 to-emerald-950/20 rounded-2xl border border-slate-800 p-6 md:p-8 relative overflow-hidden">
      {/* Background glow shadow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col lg:flex-row gap-8 items-stretch">
        
        {/* Input parameters panel */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="text-emerald-400" size={18} />
              <h3 className="text-lg font-bold text-slate-100">
                {getTranslation(lang, 'calcTitle')}
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              {getTranslation(lang, 'calcSubtitle')}
            </p>

            <div className="space-y-6">
              {/* Range: Kilometers */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300">
                    {getTranslation(lang, 'calcKilometers')}
                  </label>
                  <span className="font-mono text-sm font-bold text-emerald-400">
                    {kilometers} {isRtl ? "كم" : "KM"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="150"
                  value={kilometers}
                  onChange={(e) => setKilometers(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>1 {isRtl ? "كم" : "KM"}</span>
                  <span>75 {isRtl ? "كم" : "KM"}</span>
                  <span>150 {isRtl ? "كم" : "KM"}</span>
                </div>
              </div>

              {/* Grid Bulb Wattage Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300">
                    {getTranslation(lang, 'calcTraditionalWattage')}
                  </label>
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {traditionalWattage}W
                  </span>
                </div>
                <select
                  value={traditionalWattage}
                  onChange={(e) => setTraditionalWattage(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 py-2 px-3.5 rounded-lg text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
                >
                  <option value={150}>150W (Standard Municipal Streetlamp)</option>
                  <option value={250}>250W (High-Pressure Sodium Highway Arm)</option>
                  <option value={400}>400W (Heavy High-Mast Intersection Grid)</option>
                </select>
              </div>

              {/* Operating Hours per night */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-slate-300">
                    {getTranslation(lang, 'calcOperatingHours')}
                  </label>
                  <span className="font-mono text-sm font-bold text-slate-200">
                    {operatingHours} {isRtl ? "ساعة" : "Hours"}
                  </span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="14"
                  value={operatingHours}
                  onChange={(e) => setOperatingHours(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-slate-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                  <span>8 {isRtl ? "برق صيفي" : "Summer Peak"}</span>
                  <span>11 {isRtl ? "متوسط سنوي" : "Annual Avg"}</span>
                  <span>14 {isRtl ? "طويل شتوي" : "Winter Deep"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-start gap-2.5">
            <ShieldCheck className="text-emerald-400 flex-shrink-0 mt-0.5" size={14} />
            <p className="text-[10px] text-slate-400 leading-normal">
              {isRtl 
                ? "تقارير الصيانة والوفر تعتمد على معايير تشغيل معهد بحوث الطاقة وحسابات الأحمال الدورية للشركة العامة للكهرباء بجودة طاقة 0.65 كجم/كيلوواط."
                : "Operational parameters validated against GECOL electrical grids & regional load emission vectors for North-African solar insulation index."}
            </p>
          </div>
        </div>

        {/* Calculation results displays */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between bg-slate-950/40 p-6 rounded-xl border border-slate-800/80">
          <div>
            <h4 className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4">
              {isRtl ? "المحاكاة المالية والبيئية التقديرية" : "Projected Environmental Impact"}
            </h4>

            <div className="space-y-5">
              
              {/* Kilowatts Saved */}
              <div>
                <div className="text-xs text-slate-400 mb-1">{getTranslation(lang, 'calcEstCostTitle')}</div>
                <div className="flex items-baseline gap-2">
                  <div className="font-mono text-2xl font-bold text-slate-100 tracking-tight">
                    {kwhSaved.toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-400 font-mono">
                    {getTranslation(lang, 'calcEstCostVal')}
                  </div>
                </div>
              </div>

              {/* CO2 tons Saved */}
              <div>
                <div className="text-xs text-slate-400 mb-1">{getTranslation(lang, 'calcEstMetricCO2')}</div>
                <div className="flex items-baseline gap-2">
                  <div className="font-mono text-2xl font-bold text-emerald-400 tracking-tight">
                    {co2SavedTons.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-300 font-medium">
                    {isRtl ? "طن كربون سنوياً" : "Tons CO2 / Year Saved"}
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 leading-normal">
                  {getTranslation(lang, 'calcEstMetricCO2Desc')}
                </p>
              </div>

              {/* Total infrastructure components required */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                <div>
                  <span className="block text-[10px] text-slate-500">{isRtl ? "الأعمدة الشمسية المطلوبة" : "Total Poles Required"}</span>
                  <span className="font-mono font-bold text-sm text-slate-200">{totalPoles} {isRtl ? "وحدة" : "Units"}</span>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-500">{isRtl ? "أعطال تم تفاديها" : "Avoided Maintenance Trips"}</span>
                  <span className="font-mono font-bold text-sm text-amber-500">~{truckTripsAvoided} {isRtl ? "رحلة/سنة" : "Trips / Year"}</span>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800">
            <h5 className="text-xs font-bold text-slate-200 mb-2.5">
              {getTranslation(lang, 'calcSolarRecommendation')}
            </h5>
            <div className="p-3 bg-slate-900 border border-slate-800 rounded text-[11px] leading-relaxed text-slate-300">
              <strong className="text-emerald-400 font-medium block mb-1">
                {isRtl ? "طراز الطاقة الشمسي عالي الأداء ATK-S4" : "Attaka Smart High-Performance ATK-S4"}
              </strong>
              {getTranslation(lang, 'calcSolarRecommendationDesc')}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
