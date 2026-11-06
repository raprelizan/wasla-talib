import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  Share2,
  AlertTriangle,
  HelpCircle,
  PhoneCall,
  CheckCircle2,
  FileText,
  LifeBuoy,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SafetyModal: React.FC = () => {
  const { isSafetyModalOpen, setIsSafetyModalOpen, language, showToast, user } = useApp();
  const [activeTab, setActiveTab] = useState<'emergency' | 'report' | 'faq'>('emergency');
  const [sosConfirmed, setSosConfirmed] = useState(false);
  const [reportType, setReportType] = useState('driver');
  const [reportText, setReportText] = useState('');
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);

  if (!isSafetyModalOpen) return null;

  const handleTriggerSOS = () => {
    setSosConfirmed(true);
    showToast(
      language === 'ar'
        ? 'تم إرسال إشعار الطوارئ وموقعك الحالي إلى جهات اتصالك الموثوقة وفريق دعم وصلة طالب'
        : 'Alerte d\'urgence transmise à vos contacts de confiance'
    );
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportText.trim()) return;
    setIsSubmittingReport(true);
    setTimeout(() => {
      setIsSubmittingReport(false);
      setReportText('');
      showToast(
        language === 'ar'
          ? 'تم تسجيل البلاغ وسيتواصل معك مشرف الأمان الطلابي خلال 15 دقيقة'
          : 'Signalement enregistré par le support de sécurité'
      );
    }, 1200);
  };

  const faqs = [
    {
      qAr: 'كيف أستفيد من تسعيرة النقل الطلابي المخفضة؟',
      qFr: 'Comment bénéficier des tarifs étudiants réduits ?',
      aAr: 'يجب توثيق بطاقة الطالب الجامعية عبر قسم "حسابي". بمجرد اعتمادها تظهر التخفيضات آلياً في جميع وسائل النقل.',
      aFr: 'Validez votre carte d\'étudiant dans l\'onglet profil pour appliquer automatiquement les remises.',
    },
    {
      qAr: 'هل حافلات النقل الجامعي ONOU مجانية؟',
      qFr: 'Les navettes universitaires ONOU sont-elles gratuites ?',
      aAr: 'نعم، خطوط النقل الجامعي الرسمية ONOU مجانية لجميع الطلبة المقيمين والجامعيين حاملي بطاقة النقل.',
      aFr: 'Oui, les lignes officielles de l\'ONOU sont entièrement gratuites avec la carte de transport.',
    },
    {
      qAr: 'ماذا أفعل إذا نسيت غرضاً في السيارة أو الحافلة؟',
      qFr: 'Que faire en cas d\'objet oublié ?',
      aAr: 'يمكنك تقديم تقرير فوري من تبويب "الإبلاغ عن مشكلة" وتحديد رقم الرحلة للاتصال المباشر بالسائق.',
      aFr: 'Signalez l\'objet perdu via l\'onglet d\'assistance pour contacter directement le chauffeur.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-rose-950 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {language === 'ar' ? 'مركز أمان وسلامة الطالب' : 'Sécurité & Assistance Étudiante'}
              </h3>
              <p className="text-[11px] text-rose-200">
                {language === 'ar' ? 'فريق الدعم والحماية المباشرة 24/7' : 'Assistance étudiante 24h/24'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsSafetyModalOpen(false)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-rose-900/50"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-3 p-1 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('emergency')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'emergency'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'طوارئ SOS' : 'Urgence SOS'}
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'report'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'إبلاغ أو غرض ضائع' : 'Signalement'}
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-2 rounded-lg transition-colors ${
              activeTab === 'faq'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {language === 'ar' ? 'الأسئلة والدعم' : 'FAQ & Aide'}
          </button>
        </div>

        {/* Tab 1: Emergency SOS */}
        {activeTab === 'emergency' && (
          <div className="p-5 overflow-y-auto space-y-4">
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-xs text-amber-800 dark:text-amber-200 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
              <p className="leading-relaxed">
                {language === 'ar'
                  ? 'تنبيه: زر الطوارئ مخصص للحالات الأمنية والطبية المستعجلة أثناء تنقلاتك. هذا نظام تجريبي لا يتصل مباشرة بالرقم 14 أو 17 للحماية المدنية والشرطة.'
                  : 'Avis : Le bouton d\'urgence est dédié aux situations prioritaires lors de vos déplacements étudiants.'}
              </p>
            </div>

            <div className="text-center py-4">
              {!sosConfirmed ? (
                <div>
                  <button
                    onClick={handleTriggerSOS}
                    className="w-28 h-28 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-lg shadow-xl shadow-rose-600/30 flex flex-col items-center justify-center mx-auto transition-transform active:scale-90 ring-8 ring-rose-100 dark:ring-rose-950/80 mb-3"
                  >
                    <span>SOS</span>
                    <span className="text-[10px] font-normal">
                      {language === 'ar' ? 'طلب نجدة' : 'Alerte'}
                    </span>
                  </button>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'انقر لتفعيل تنبيه الأمان الفوري' : 'Appuyez pour déclencher l\'alerte'}
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 text-xs space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-teal-600 mx-auto" />
                  <p className="font-bold text-sm">
                    {language === 'ar' ? 'تم إرسال إشعار الأمان بنجاح' : 'Alerte de sécurité activée'}
                  </p>
                  <p>
                    {language === 'ar'
                      ? 'تمت مشاركة مسارك المباشر مع جهات الاتصال المسجلة وإشعار غرفة مساعدة وصلة.'
                      : 'Vos coordonnées et itinéraire sont partagés avec vos contacts d\'urgence.'}
                  </p>
                  <button
                    onClick={() => setSosConfirmed(false)}
                    className="text-teal-700 dark:text-teal-300 underline font-semibold text-xs pt-1"
                  >
                    {language === 'ar' ? 'إلغاء حالة الطوارئ' : 'Désactiver l\'alerte'}
                  </button>
                </div>
              )}
            </div>

            {/* Quick Emergency Contacts */}
            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                {language === 'ar' ? 'أرقام الطوارئ الوطنية الرسمية في الجزائر:' : 'Numéros d\'urgence nationaux en Algérie :'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span>{language === 'ar' ? 'الحماية المدنية (Pompiers)' : 'Protection Civile'}</span>
                  <span className="font-bold font-mono text-rose-600">14</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span>{language === 'ar' ? 'الشرطة الوطنية (Police)' : 'Police Nationale'}</span>
                  <span className="font-bold font-mono text-blue-600">17 / 1548</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span>{language === 'ar' ? 'الدرك الوطني (Gendarmerie)' : 'Gendarmerie'}</span>
                  <span className="font-bold font-mono text-emerald-600">1055</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                  <span>{language === 'ar' ? 'دعم وصلة الطلابي' : 'Support WASLA'}</span>
                  <span className="font-bold font-mono text-teal-600">023 50 11 00</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Report an issue / Lost Item */}
        {activeTab === 'report' && (
          <form onSubmit={handleSubmitReport} className="p-5 overflow-y-auto space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'نوع البلاغ' : 'Type de signalement'}
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="driver">{language === 'ar' ? 'شكوى بخصوص سائق أو سلوك مركبة' : 'Comportement du chauffeur'}</option>
                <option value="lost_item">{language === 'ar' ? 'غرض مفقود أثناء الرحلة (محفظة، بطاقة، هاتف)' : 'Objet égaré'}</option>
                <option value="fare">{language === 'ar' ? 'اعتراض على قيمة الأجرة أو الدفع' : 'Différend tarifaire'}</option>
                <option value="bus_route">{language === 'ar' ? 'تأخر أو مسار غير مطابق لحافلة النقل' : 'Retard ou itinéraire de bus'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'تفاصيل البلاغ أو وصف الغرض المفقود' : 'Description du problème'}
              </label>
              <textarea
                rows={4}
                value={reportText}
                onChange={(e) => setReportText(e.target.value)}
                placeholder={
                  language === 'ar'
                    ? 'يرجى كتابة التفاصيل مثل رقم الرحلة، التوقيت، أو وصف الشيء المفقود...'
                    : 'Précisez les détails, numéro de course ou description de l\'objet...'
                }
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingReport || !reportText.trim()}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmittingReport ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <span>{language === 'ar' ? 'إرسال البلاغ لمسؤول الأمان' : 'Envoyer le signalement'}</span>
              )}
            </button>
          </form>
        )}

        {/* Tab 3: FAQ & Help */}
        {activeTab === 'faq' && (
          <div className="p-5 overflow-y-auto space-y-3">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs"
              >
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">
                  {language === 'ar' ? item.qAr : item.qFr}
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'ar' ? item.aAr : item.aFr}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
