import React, { useState } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DisclaimerBanner: React.FC = () => {
  const { language, setIsOnboardingOpen, setIsDesignSystemModalOpen } = useApp();
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  return (
    <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-sky-950 text-white text-xs px-4 py-2 border-b border-teal-800/40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 animate-ping"></span>
          <p className="truncate text-[11px] text-slate-200">
            {language === 'ar' ? (
              <span>
                <strong className="text-teal-300 font-semibold ml-1">نسخة تجريبية أولية (Prototype Preview):</strong>
                بيانات النقل الجامعي والولايات والعروض معروضة لأغراض المحاكاة والتصميم التفاعلي لمنظومة وصلة طالب.
              </span>
            ) : language === 'fr' ? (
              <span>
                <strong className="text-teal-300 font-semibold mr-1">Prototype WASLA TALIB :</strong>
                Données de mobilité et universités algériennes présentées à titre de démonstration interactive.
              </span>
            ) : (
              <span>
                <strong className="text-teal-300 font-semibold mr-1">WASLA TALIB Prototype:</strong>
                Simulated Algerian student mobility ecosystem with verified interactive workflows.
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setIsDesignSystemModalOpen(true)}
            className="text-[11px] text-teal-300 hover:text-white underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            {language === 'ar' ? 'قائمة الشاشات والتدقيق' : 'Inventaire & Audit'}
          </button>
          <button
            onClick={() => setIsOnboardingOpen(true)}
            className="text-[11px] text-teal-300 hover:text-white underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            {language === 'ar' ? 'جولة في التطبيق' : 'Guide'}
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white transition-colors"
            aria-label="إغلاق التنبيه"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
