import React, { useState } from 'react';
import {
  X,
  Bookmark,
  BookmarkCheck,
  Calendar,
  MapPin,
  Building2,
  GraduationCap,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OpportunityDetailsModal: React.FC = () => {
  const {
    selectedOpportunityForDetails,
    setSelectedOpportunityForDetails,
    toggleSaveOpportunity,
    applyOpportunity,
    user,
    language,
    showToast,
  } = useApp();

  const [isApplying, setIsApplying] = useState(false);

  if (!selectedOpportunityForDetails) return null;

  const opp = selectedOpportunityForDetails;

  const handleApply = () => {
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      applyOpportunity(opp.id);
      showToast(
        language === 'ar'
          ? 'تم تسجيل اهتمامك وإرسال ملف الطالب للجهة المنظمة (محاكاة تجريبية)'
          : 'Candidature enregistrée avec succès'
      );
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider block">
                {opp.organizationAr}
              </span>
              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                {opp.titleAr}
              </h3>
            </div>
          </div>
          <button
            onClick={() => setSelectedOpportunityForDetails(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Key specs */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block">
                  {language === 'ar' ? 'الموقع الجغرافي:' : 'Lieu :'}
                </span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {opp.locationAr}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[10px] text-slate-400 block">
                  {language === 'ar' ? 'آخر أجل للترشح:' : 'Date limite :'}
                </span>
                <span className="font-semibold text-rose-600 dark:text-rose-400">
                  {opp.deadline}
                </span>
              </div>
            </div>

            {opp.stipendAr && (
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block">
                    {language === 'ar' ? 'المكافأة / الامتيازات:' : 'Indemnité :'}
                  </span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    {opp.stipendAr}
                  </span>
                </div>
              </div>
            )}

            {opp.durationAr && (
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-slate-400 block">
                    {language === 'ar' ? 'المدة الزمنية:' : 'Durée :'}
                  </span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {opp.durationAr}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              {language === 'ar' ? 'حول الفرصة والمشروع' : 'Description du programme'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              {opp.descriptionAr}
            </p>
          </div>

          {/* Eligibility */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              {language === 'ar' ? 'شروط الأهلية والطلبة المستهدفين' : 'Critères d\'éligibilité'}
            </h4>
            <div className="p-3 rounded-lg bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-800/60 text-xs text-teal-900 dark:text-teal-200">
              {opp.eligibilityAr}
            </div>
          </div>

          {/* Note on prototype application */}
          <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-slate-400" />
            <p>
              {language === 'ar'
                ? 'تنبيه: التقديم عبر هذا النموذج هو محاكاة أولية لتسجيل الاهتمام ببيانات الطالب الموثقة في وصلة.'
                : 'Remarque : Il s\'agit d\'une simulation de candidature basée sur vos informations étudiantes validées.'}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => toggleSaveOpportunity(opp.id)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                opp.isSaved
                  ? 'border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              {opp.isSaved ? <BookmarkCheck className="w-4 h-4 text-teal-600" /> : <Bookmark className="w-4 h-4" />}
              <span>{opp.isSaved ? (language === 'ar' ? 'محفوظة' : 'Enregistrée') : (language === 'ar' ? 'حفظ الفرصة' : 'Enregistrer')}</span>
            </button>

            <button
              disabled={opp.hasApplied || isApplying}
              onClick={handleApply}
              className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm ${
                opp.hasApplied
                  ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isApplying ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : opp.hasApplied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-teal-500" />
                  <span>{language === 'ar' ? 'تم تقديم الملف' : 'Candidature envoyée'}</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>{language === 'ar' ? 'الترشح المباشر بالملف' : 'Postuler maintenant'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
