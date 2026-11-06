import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Bus, Compass, Gift, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const OnboardingModal: React.FC = () => {
  const { isOnboardingOpen, setIsOnboardingOpen, openAuthModal, language } = useApp();
  const [currentStep, setCurrentStep] = useState<number>(0); // 0: Splash, 1: Welcome, 2: Slides (0,1,2)
  const [slideIndex, setSlideIndex] = useState<number>(0);

  if (!isOnboardingOpen) return null;

  const slides = [
    {
      titleAr: 'تنقّل ذكي بين الحرم الجامعي والإقامة',
      titleFr: 'Mobilité intelligente vers votre campus',
      descAr: 'شبكة متكاملة تجمع النقل الخاص، حافلات النقل الجامعي ONOU، والتاكسي والرحلات بين الولايات بأفضل الأسعار المخصصة للطلبة.',
      descFr: 'Réseau connecté reliant navettes universitaires, VTC et bus interwilayas à tarifs étudiants.',
      image: '/src/assets/images/wasla_hero_students_1793923860308.jpg',
      badgeAr: 'شبكة مواصلات وطنية',
    },
    {
      titleAr: 'حجز مقاعد الحافلات والرحلات بنقرة واحدة',
      titleFr: 'Réservation instantanée & choix du siège',
      descAr: 'اختر مقعدك المفضل، احصل على تذكرتك الرقمية الفورية بـ QR Code دون الحاجة للانتظار في شبابيك المحطات البرية.',
      descFr: 'Sélectionnez votre siège dans le bus et générez votre titre de transport digital sécurisé.',
      image: '/src/assets/images/wasla_bus_travel_1793923860097.jpg',
      badgeAr: 'تذاكر رقمية معتمدة',
    },
    {
      titleAr: 'عروض ومزايا وفرص تدريب حصرية للطلبة',
      titleFr: 'Bons plans étudiants, stages & bourses',
      descAr: 'استفد من خصومات على المكتبات والمطاعم وباقات الإنترنت، واكتشف فرص التربص ومشاريع التخرج والمنح الدراسية بالجزائر.',
      descFr: 'Profitez de réductions sur la restauration, matériel tech, stages PFE et bourses d\'excellence.',
      image: '/src/assets/images/wasla_student_cafe_1793923860782.jpg',
      badgeAr: 'حياة طلابية متكاملة',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[92vh]">
        {/* Top close button */}
        <button
          onClick={() => setIsOnboardingOpen(false)}
          className="absolute top-3 left-3 z-20 w-8 h-8 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Step 0: Splash Screen Identity */}
        {currentStep === 0 && (
          <div className="p-8 sm:p-10 flex flex-col items-center justify-center text-center min-h-[460px] bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950 text-white">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center p-3 shadow-inner">
                <span className="text-3xl font-extrabold text-teal-400">وصلة</span>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-400 flex items-center justify-center text-slate-950 text-xs font-bold">
                DZ
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
              WASLA TALIB
            </h2>
            <p className="text-teal-300 font-semibold text-sm mb-4">
              وصلة الطالب · المنظومة الوطنية لتنقل الطلبة
            </p>
            <p className="text-xs text-slate-300 max-w-xs leading-relaxed mb-8">
              المنصة الرقمية الموحدة لربط الطلبة الجامعيين بخدمات النقل والفرص في 69 ولاية جزائرية.
            </p>

            <button
              onClick={() => setCurrentStep(1)}
              className="w-full max-w-xs py-3 px-6 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20 active:scale-95"
            >
              {language === 'ar' ? 'ابدأ الاستكشاف' : 'Commencer'}
            </button>
          </div>
        )}

        {/* Step 1: Welcome Screen */}
        {currentStep === 1 && (
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-950">
              <img
                src="/src/assets/images/wasla_hero_students_1793923860308.jpg"
                alt="طلبة جامعة الجزائر"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute bottom-3 right-4 left-4">
                <span className="text-[11px] font-bold text-teal-300 tracking-wider uppercase">
                  وصلة الطالب 2026
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {language === 'ar' ? 'تنقّل أسهل، حياة طلابية أفضل.' : 'Bougez mieux, vivez votre vie étudiante.'}
                </h3>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {language === 'ar'
                  ? 'كل ما تحتاجه للتنقل والاستفادة من حياتك الطلابية، في تطبيق واحد: مواعيد الحافلات الجامعية، سيارات التنقل بأسعار مخفضة، حجز الحافلات بين الولايات، ومزايا حصرية لبطاقتك الجامعية.'
                  : 'Toutes vos solutions de transport universitaire, covoiturage, bus interwilayas et avantages étudiants réunis dans une seule application.'}
              </p>

              <div className="space-y-2.5">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>{language === 'ar' ? 'تعرف على ميزات التطبيق' : 'Découvrir les fonctionnalités'}</span>
                  {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => {
                      setIsOnboardingOpen(false);
                      openAuthModal('register');
                    }}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    {language === 'ar' ? 'إنشاء حساب جديد' : 'Créer un compte'}
                  </button>
                  <button
                    onClick={() => {
                      setIsOnboardingOpen(false);
                      openAuthModal('login');
                    }}
                    className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors"
                  >
                    {language === 'ar' ? 'تسجيل الدخول' : 'Connexion'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: 3 Interactive Slides */}
        {currentStep === 2 && (
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
              <img
                src={slides[slideIndex].image}
                alt={slides[slideIndex].titleAr}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute top-3 right-3">
                <span className="px-2.5 py-1 rounded bg-teal-600/90 text-white text-[10px] font-bold">
                  {slides[slideIndex].badgeAr}
                </span>
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                {/* Dots indicator */}
                <div className="flex items-center gap-1.5 mb-4">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        slideIndex === i ? 'w-6 bg-teal-600 dark:bg-teal-400' : 'w-2 bg-slate-300 dark:bg-slate-700'
                      }`}
                      aria-label={`شريحة ${i + 1}`}
                    />
                  ))}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                  {language === 'ar' ? slides[slideIndex].titleAr : slides[slideIndex].titleFr}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'ar' ? slides[slideIndex].descAr : slides[slideIndex].descFr}
                </p>
              </div>

              <div className="pt-6 flex items-center justify-between gap-3">
                <button
                  onClick={() => {
                    if (slideIndex > 0) setSlideIndex(slideIndex - 1);
                    else setCurrentStep(1);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  {language === 'ar' ? 'السابق' : 'Précédent'}
                </button>

                {slideIndex < slides.length - 1 ? (
                  <button
                    onClick={() => setSlideIndex(slideIndex + 1)}
                    className="py-2.5 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>{language === 'ar' ? 'التالي' : 'Suivant'}</span>
                    {language === 'ar' ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  </button>
                ) : (
                  <button
                    onClick={() => setIsOnboardingOpen(false)}
                    className="py-2.5 px-5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <span>{language === 'ar' ? 'دخول التطبيق' : 'Accéder à l\'app'}</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
