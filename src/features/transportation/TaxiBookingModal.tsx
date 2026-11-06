import React, { useState } from 'react';
import {
  X,
  MapPin,
  Clock,
  Phone,
  Shield,
  Star,
  CheckCircle2,
  AlertCircle,
  Car,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';

export const TaxiBookingModal: React.FC = () => {
  const {
    isTaxiBookingModalOpen,
    setIsTaxiBookingModalOpen,
    pickupLocation,
    destinationLocation,
    language,
    showToast,
    addBooking,
    user,
    setIsSafetyModalOpen,
  } = useApp();

  const [taxiType, setTaxiType] = useState<'metered' | 'campus_radio'>('metered');
  const [taxiStatus, setTaxiStatus] = useState<'idle' | 'searching' | 'assigned' | 'arriving'>('idle');

  if (!isTaxiBookingModalOpen) return null;

  const mockTaxiDriver = {
    name: 'كمال مزياني (سائق تاكسي معتمد)',
    license: 'تاكسي حضري رقم 1420 / ولاية الجزائر',
    plate: '09812 - 116 - 16',
    model: 'بيجو 301 صفراء (Jaune)',
    phone: '0662 89 14 30',
    rating: 4.88,
    etaMin: 5,
  };

  const handleConfirmRequest = () => {
    setTaxiStatus('searching');
    showToast(language === 'ar' ? 'جاري توجيه طلب التاكسي لأقرب سيارة أجرة مرخصة...' : 'Recherche de taxi...');

    setTimeout(() => {
      setTaxiStatus('assigned');
      setTimeout(() => {
        setTaxiStatus('arriving');
        // Add to bookings
        const newBooking: Booking = {
          id: `bk_taxi_${Date.now()}`,
          bookingRef: `WASLA-2026-TAX${Math.floor(100 + Math.random() * 900)}`,
          type: 'taxi',
          departureAr: pickupLocation,
          destinationAr: destinationLocation,
          date: 'اليوم',
          time: 'الآن',
          passengerName: user.fullName,
          operatorAr: taxiType === 'metered' ? 'تاكسي حضري معتمد' : 'راديو تاكسي جامعي',
          priceDzd: 380,
          paymentStatus: 'pending',
          status: 'upcoming',
          createdAt: 'الآن',
        };
        addBooking(newBooking);
      }, 2500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-amber-500 text-slate-950">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-950 text-amber-400 flex items-center justify-center font-bold text-sm">
              🚕
            </div>
            <div>
              <h3 className="font-bold text-base">
                {language === 'ar' ? 'طلب تاكسي الطلبة المعتمد' : 'Taxi Étudiant Agréé'}
              </h3>
              <p className="text-[11px] text-slate-900 font-medium">
                {language === 'ar' ? 'عداد موحد وتسعيرة مخفضة لحاملي بطاقة الطالب' : 'Tarifs réglementés'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsTaxiBookingModalOpen(false);
              setTaxiStatus('idle');
            }}
            className="p-1.5 rounded-lg text-slate-900 hover:bg-amber-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-4">
          {taxiStatus === 'idle' && (
            <>
              {/* Route Summary */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs space-y-2">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'نقطة الركوب:' : 'Départ :'}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{pickupLocation}</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'الوجهة:' : 'Destination :'}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{destinationLocation}</span>
                  </div>
                </div>
              </div>

              {/* Taxi Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {language === 'ar' ? 'اختر نوع خدمة التاكسي:' : 'Option de taxi :'}
                </label>

                <div
                  onClick={() => setTaxiType('metered')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    taxiType === 'metered'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-500'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'تاكسي حضري بالعداد الموحد' : 'Taxi Urbain au Compteur'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {language === 'ar' ? 'تسعيرة دقيقة حسب المسافة المقطوعة' : 'Tarif selon compteur officiel'}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-amber-600 font-mono">
                    350 - 450 دج
                  </span>
                </div>

                <div
                  onClick={() => setTaxiType('campus_radio')}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    taxiType === 'campus_radio'
                      ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 ring-1 ring-amber-500'
                      : 'border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'راديو تاكسي جامعي سريع' : 'Radio-Taxi Universitaire'}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {language === 'ar' ? 'توصيل مباشر وباب بباب مع تأكيد الأجرة مسبقاً' : 'Tarif forfaitaire convenu'}
                    </p>
                  </div>
                  <span className="text-xs font-extrabold text-amber-600 font-mono">
                    420 دج
                  </span>
                </div>
              </div>

              {/* Estimate Details */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>المسافة: 11.4 كم</span>
                <span>·</span>
                <span>الوقت التقديري: 18 دقيقة</span>
                <span>·</span>
                <span className="text-emerald-600 font-semibold">متاح الآن</span>
              </div>

              <button
                type="button"
                onClick={handleConfirmRequest}
                className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>{language === 'ar' ? 'تأكيد طلب التاكسي بالعداد' : 'Commander le Taxi'}</span>
              </button>
            </>
          )}

          {taxiStatus === 'searching' && (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center mx-auto text-2xl animate-bounce">
                🚕
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'ar' ? 'جاري توجيه التاكسي الأقرب لجامعتك...' : 'Recherche de taxi à proximité...'}
              </h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                {language === 'ar' ? 'يتم التنسيق مع سيارات الأجرة في نطاق 2 كم' : 'Coordination en cours...'}
              </p>
            </div>
          )}

          {(taxiStatus === 'assigned' || taxiStatus === 'arriving') && (
            <div className="space-y-3.5">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold">
                    {language === 'ar' ? 'تم تأكيد حجز التاكسي والسائق في الطريق' : 'Taxi assigné en approche'}
                  </span>
                </div>
                <span className="font-mono font-bold">5 د</span>
              </div>

              {/* Taxi Driver Card */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 dark:text-white">{mockTaxiDriver.name}</h5>
                    <p className="text-[11px] text-slate-500">{mockTaxiDriver.license}</p>
                    <p className="text-[11px] text-slate-500">{mockTaxiDriver.model}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">اللوحة</span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {mockTaxiDriver.plate}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => showToast(`جاري الاتصال بسائق التاكسي: ${mockTaxiDriver.phone}`)}
                    className="py-1.5 px-3 rounded-lg bg-teal-600 text-white font-semibold text-xs flex items-center justify-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>اتصال</span>
                  </button>
                  <button
                    onClick={() => setIsSafetyModalOpen(true)}
                    className="py-1.5 px-3 rounded-lg border border-rose-300 text-rose-600 text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>أمان</span>
                  </button>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsTaxiBookingModalOpen(false);
                  setTaxiStatus('idle');
                  showToast(language === 'ar' ? 'تمت إضافة تذكرة التاكسي في قائمة حجوزاتي' : 'Ajouté à vos trajets');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold transition-colors"
              >
                {language === 'ar' ? 'إغلاق ومتابعة الرحلة' : 'Fermer et suivre la course'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
