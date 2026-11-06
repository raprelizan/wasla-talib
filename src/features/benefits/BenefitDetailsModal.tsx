import React from 'react';
import {
  X,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Calendar,
  MapPin,
  Sparkles,
  ShieldCheck,
  QrCode,
  Tag,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BenefitDetailsModal: React.FC = () => {
  const {
    selectedBenefitForDetails,
    setSelectedBenefitForDetails,
    toggleSaveBenefit,
    redeemBenefit,
    user,
    language,
    showToast,
  } = useApp();

  const [hasCopied, setHasCopied] = React.useState(false);

  if (!selectedBenefitForDetails) return null;

  const offer = selectedBenefitForDetails;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(offer.promoCode);
    setHasCopied(true);
    showToast(language === 'ar' ? 'تم نسخ رمز القسيمة بنجاح!' : 'Code promo copié !');
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[92vh]">
        {/* Banner Image */}
        <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
          <img
            src={offer.image}
            alt={offer.titleAr}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <button
            onClick={() => setSelectedBenefitForDetails(null)}
            className="absolute top-3 left-3 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="absolute bottom-3 right-4 left-4 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider">
                {offer.businessNameAr}
              </span>
              <h3 className="text-base font-bold text-white leading-tight">
                {offer.titleAr}
              </h3>
            </div>
            <div className="bg-teal-500 text-slate-950 px-2.5 py-1 rounded-lg font-extrabold text-sm shadow-md">
              -{offer.discountPercent}%
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Metadata chips */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-teal-600" />
              <span>{offer.locationAr}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{language === 'ar' ? `ينتهي في ${offer.expiryDate}` : `Expire le ${offer.expiryDate}`}</span>
            </span>
          </div>

          {/* Student Eligibility Callout */}
          <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs text-teal-800 dark:text-teal-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0" />
              <span>
                {user.verificationStatus === 'verified'
                  ? language === 'ar'
                    ? 'هويتك الطلابية موثقة ومؤهلة لهذا الخصم'
                    : 'Statut étudiant validé pour cette offre'
                  : language === 'ar'
                  ? 'يتطلب إظهار بطاقة الطالب الرقمية عند الدفع'
                  : 'Présentation de la carte requise'}
              </span>
            </div>
          </div>

          {/* Voucher Coupon Box */}
          <div className="p-4 rounded-xl bg-slate-900 text-white text-center border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-teal-300 font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3" />
                <span>{language === 'ar' ? 'رمز القسيمة الترويجية' : 'Code Coupon'}</span>
              </span>
              <span className="text-[10px] text-slate-400">
                {offer.isRedeemed ? (language === 'ar' ? 'تم التفعيل' : 'Utilisé') : (language === 'ar' ? 'جاهز للاستخدام' : 'Prêt')}
              </span>
            </div>

            <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-lg border border-slate-800 mb-2">
              <span className="font-mono font-bold text-teal-400 tracking-wider text-base">
                {offer.promoCode}
              </span>
              <button
                onClick={handleCopyCode}
                className="py-1 px-2.5 rounded-md bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                {hasCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{hasCopied ? (language === 'ar' ? 'تم النسخ' : 'Copié') : (language === 'ar' ? 'نسخ' : 'Copier')}</span>
              </button>
            </div>

            <p className="text-[10px] text-slate-400 leading-tight">
              {language === 'ar'
                ? 'قدم هذا الرمز أو أظهر شاشة التطبيق لموظف الصندوق عند الشراء'
                : 'Présentez ce code lors du passage en caisse'}
            </p>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-1.5">
              {language === 'ar' ? 'الشروط والأحكام' : 'Conditions de l\'offre'}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
              {offer.termsAr}
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => toggleSaveBenefit(offer.id)}
              className={`py-2.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                offer.isSaved
                  ? 'border-teal-600 bg-teal-50 text-teal-700 dark:bg-teal-950/50 dark:text-teal-300'
                  : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200'
              }`}
            >
              {offer.isSaved ? <BookmarkCheck className="w-4 h-4 text-teal-600" /> : <Bookmark className="w-4 h-4" />}
              <span>{offer.isSaved ? (language === 'ar' ? 'في المفضلة' : 'Sauvegardé') : (language === 'ar' ? 'حفظ العرض' : 'Sauvegarder')}</span>
            </button>

            <button
              onClick={() => {
                redeemBenefit(offer.id);
                setSelectedBenefitForDetails(null);
              }}
              className="py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1 shadow-sm"
            >
              <Check className="w-4 h-4" />
              <span>{language === 'ar' ? 'استخدام القسيمة الآن' : 'Utiliser le coupon'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
