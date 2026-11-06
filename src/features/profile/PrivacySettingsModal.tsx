import React, { useState } from 'react';
import { X, MapPin, Eye, Shield, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrivacySettingsModal: React.FC = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen, language, showToast } = useApp();

  const [shareLocation, setShareLocation] = useState(true);
  const [anonymousRides, setAnonymousRides] = useState(false);
  const [allowPartnerOffers, setAllowPartnerOffers] = useState(true);
  const [deleteConfirmationStep, setDeleteConfirmationStep] = useState(false);

  if (!isPrivacyModalOpen) return null;

  const handleDeleteRequest = () => {
    showToast(
      language === 'ar'
        ? 'تم استلام طلب حذف الحساب. سيتم التواصل معك عبر البريد الجامعي للتأكيد.'
        : 'Demande de suppression enregistrée.'
    );
    setIsPrivacyModalOpen(false);
    setDeleteConfirmationStep(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {language === 'ar' ? 'الخصوصية وحماية البيانات' : 'Confidentialité & Données'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {language === 'ar' ? 'تحكم في أذونات الموقع ومشاركة المسارات' : 'Contrôle des autorisations'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsPrivacyModalOpen(false);
              setDeleteConfirmationStep(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* Permission 1: GPS Location */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تحديد الموقع الجغرافي (GPS)' : 'Localisation GPS'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'ar' ? 'لاقتراح أقرب محطات النقل الجامعي والسيارات المتاحة' : 'Pour localiser les arrêts et chauffeurs'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setShareLocation(!shareLocation);
                showToast(shareLocation ? (language === 'ar' ? 'تم تعطيل الموقع' : 'Localisation désactivée') : (language === 'ar' ? 'تم تفعيل الموقع' : 'Localisation activée'));
              }}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                shareLocation ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow-md transition-transform transform ${
                  shareLocation ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Permission 2: Anonymous ride sharing */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-start gap-2.5">
              <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'إظهار المسار لزملاء الجامعة (Covoiturage)' : 'Partage de trajet campus'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'ar' ? 'لتسهيل مشاركة الرحلات الجماعية مع طلبة نفس كليتك' : 'Pour le covoiturage étudiant'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAnonymousRides(!anonymousRides)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                anonymousRides ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow-md transition-transform transform ${
                  anonymousRides ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Permission 3: Partner Student Offers */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
            <div className="flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تخصيص العروض الأكاديمية' : 'Offres personnalisées'}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {language === 'ar' ? 'تنبيهات بالعروض القريبة من ولايتك وجامعتك' : 'Selon votre campus et wilaya'}
                </p>
              </div>
            </div>
            <button
              onClick={() => setAllowPartnerOffers(!allowPartnerOffers)}
              className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
                allowPartnerOffers ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`block w-4 h-4 rounded-full bg-white shadow-md transition-transform transform ${
                  allowPartnerOffers ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Account Deletion Request */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            {!deleteConfirmationStep ? (
              <button
                onClick={() => setDeleteConfirmationStep(true)}
                className="w-full py-2.5 px-3 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center gap-2 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'طلب حذف الحساب والبيانات نهائياً' : 'Demander la suppression du compte'}</span>
              </button>
            ) : (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/50 rounded-xl border border-rose-200 dark:border-rose-800 space-y-2 text-xs">
                <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-200 font-bold">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>{language === 'ar' ? 'هل أنت متأكد من رغبتك في حذف الحساب؟' : 'Confirmer la suppression ?'}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-tight">
                  {language === 'ar'
                    ? 'سيتم إلغاء تفعيل اشتراك النقل وتخفيضات الطالب الرقمية المرتبطة ببطاقتك الجامعية.'
                    : 'Cette action révoquera vos réductions de transport étudiant.'}
                </p>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setDeleteConfirmationStep(false)}
                    className="py-1 px-3 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded text-xs"
                  >
                    {language === 'ar' ? 'تراجع' : 'Annuler'}
                  </button>
                  <button
                    onClick={handleDeleteRequest}
                    className="py-1 px-3 bg-rose-600 text-white rounded text-xs font-bold"
                  >
                    {language === 'ar' ? 'تأكيد الحذف' : 'Confirmer'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
