import React, { useState } from 'react';
import {
  Car,
  Bus,
  Compass,
  GraduationCap,
  MapPin,
  Clock,
  Phone,
  Shield,
  Star,
  Users,
  CheckCircle2,
  X,
  Search,
  Calendar,
  AlertCircle,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransportType, PrivateRideOption } from '../../types';
import { DemonstrationMap } from '../../components/map/DemonstrationMap';
import { PRIVATE_RIDE_OPTIONS, BUS_ROUTES, CAMPUS_ROUTES } from '../../data/mockData';
import { ALGERIA_WILAYAS } from '../../data/algeriaGeo';

export const MobilityScreen: React.FC = () => {
  const {
    language,
    selectedMobilityMode,
    setSelectedMobilityMode,
    pickupLocation,
    setPickupLocation,
    destinationLocation,
    setDestinationLocation,
    selectedRideOption,
    tripStatus,
    driverInfo,
    tripProgressPercent,
    startTripSearch,
    cancelActiveTrip,
    completeActiveTrip,
    openBusSeatPicker,
    setIsSafetyModalOpen,
    setIsTaxiBookingModalOpen,
    user,
    showToast,
  } = useApp();

  // Mode tabs
  const transportTabs: { id: TransportType; labelAr: string; labelFr: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'private', labelAr: 'النقل الخاص', labelFr: 'VTC & Covoiturage', icon: Car },
    { id: 'campus', labelAr: 'النقل الجامعي', labelFr: 'Navettes ONOU', icon: GraduationCap },
    { id: 'bus', labelAr: 'حافلات السفر', labelFr: 'Lignes Bus SOGRAL', icon: Bus },
    { id: 'taxi', labelAr: 'تاكسي طلبة', labelFr: 'Taxi Étudiant', icon: Car },
    { id: 'intercity', labelAr: 'بين الولايات', labelFr: 'Inter-Wilayas', icon: Compass },
  ];

  // Intercity search states
  const [intercityDeparture, setIntercityDeparture] = useState('16'); // Alger
  const [intercityDestination, setIntercityDestination] = useState('31'); // Oran
  const [intercitySearchFilter, setIntercitySearchFilter] = useState('');

  // Rating review modal state
  const [ratingScore, setRatingScore] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [hasSubmittedRating, setHasSubmittedRating] = useState(false);

  return (
    <div className="space-y-5 pb-24 md:pb-12 animate-in fade-in duration-200">
      {/* Top Mobility Sub-Navigation Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
        {transportTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = selectedMobilityMode === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedMobilityMode(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? tab.labelAr : tab.labelFr}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Map Visualizer */}
      <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
        <DemonstrationMap heightClass="h-56 sm:h-72" />
      </div>

      {/* ======================================================== */}
      {/* MODE A: النقل الخاص (Private Ride / VTC & Covoiturage) */}
      {/* ======================================================== */}
      {selectedMobilityMode === 'private' && (
        <div className="space-y-4">
          {/* If Trip is Idle, show options and booking form */}
          {tripStatus === 'idle' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'اختر فئة النقل الطلابي المناسبة' : 'Choisissez votre catégorie'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'ar'
                    ? 'أسعار مخفضة لحاملي بطاقة الطالب الجامعية في الجزائر'
                    : 'Tarifs préférentiels étudiants garantis'}
                </p>
              </div>

              {/* Ride tier cards */}
              <div className="space-y-2.5 mb-4">
                {PRIVATE_RIDE_OPTIONS.map((opt) => {
                  const isSelected = selectedRideOption?.id === opt.id;
                  return (
                    <div
                      key={opt.id}
                      onClick={() => startTripSearch(opt)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-teal-500 bg-teal-50/40 dark:bg-teal-950/30 ring-1 ring-teal-500'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold">
                          <Car className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                              {language === 'ar' ? opt.nameAr : opt.nameFr}
                            </h4>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {opt.etaMinutes} {language === 'ar' ? 'دقائق' : 'min'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {opt.descriptionAr}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-sm font-extrabold text-teal-600 dark:text-teal-400 font-mono">
                          {opt.discountedPriceDzd} دج
                        </div>
                        <div className="line-through text-[10px] text-slate-400 font-mono">
                          {opt.basePriceDzd} دج
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Confirm & Request Ride CTA */}
              <button
                type="button"
                onClick={() => startTripSearch(selectedRideOption || PRIVATE_RIDE_OPTIONS[0])}
                className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <Car className="w-4 h-4" />
                <span>
                  {language === 'ar'
                    ? `طلب ${selectedRideOption?.nameAr || 'السيارة'} الآن (${selectedRideOption?.discountedPriceDzd || 320} دج)`
                    : 'Confirmer la commande de course'}
                </span>
              </button>
            </div>
          )}

          {/* ACTIVE TRIP SIMULATION: Searching */}
          {tripStatus === 'searching' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm text-center">
              <div className="w-16 h-16 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto mb-3 animate-pulse">
                <Car className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                {language === 'ar' ? 'جاري البحث عن أقرب سائق طالب معتمد...' : 'Recherche de chauffeur...'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                {language === 'ar'
                  ? 'نقوم بمطابقة موقعك في باب الزوار مع السائقين المتاحين في شبكة وصلة.'
                  : 'Connexion avec les chauffeurs à proximité de votre campus...'}
              </p>
              <button
                onClick={cancelActiveTrip}
                className="py-2 px-4 rounded-xl border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors"
              >
                {language === 'ar' ? 'إلغاء الطلب' : 'Annuler'}
              </button>
            </div>
          )}

          {/* ACTIVE TRIP SIMULATION: Driver Assigned / Arriving / In Progress */}
          {(tripStatus === 'driver_found' || tripStatus === 'driver_arriving' || tripStatus === 'in_progress') && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              {/* Trip Stage Status Banner */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping" />
                  <span className="text-xs font-bold text-teal-900 dark:text-teal-100">
                    {tripStatus === 'driver_found' && (language === 'ar' ? 'تم العثور على سائق معتمد' : 'Chauffeur confirmé')}
                    {tripStatus === 'driver_arriving' && (language === 'ar' ? 'السائق في الطريق إليك (الوصول خلال 4 د)' : 'Chauffeur en approche (4 min)')}
                    {tripStatus === 'in_progress' && (language === 'ar' ? 'الرحلة جارية نحو الوجهة' : 'Trajet en cours')}
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-teal-700 dark:text-teal-300">
                  {selectedRideOption?.discountedPriceDzd || 320} دج
                </span>
              </div>

              {/* Driver Information Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={driverInfo.avatar}
                      alt={driverInfo.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-teal-500"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {driverInfo.name}
                        </h4>
                        <div className="flex items-center text-amber-500 text-xs font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 mr-0.5" />
                          <span>{driverInfo.rating}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {driverInfo.carModel} · {driverInfo.carColor}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">
                      رقم اللوحة (Matricule)
                    </span>
                    <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono text-xs font-bold text-slate-800 dark:text-slate-100">
                      {driverInfo.licensePlate}
                    </span>
                  </div>
                </div>

                {/* Driver Contact & SOS Actions */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => showToast(`جاري الاتصال بالسائق: ${driverInfo.phone}`)}
                    className="py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'اتصال بالسائق' : 'Appeler'}</span>
                  </button>

                  <button
                    onClick={() => setIsSafetyModalOpen(true)}
                    className="py-2 px-3 rounded-lg border border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-50 dark:hover:bg-rose-950 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'مشاركة الرحلة / أمان' : 'Sécurité'}</span>
                  </button>
                </div>
              </div>

              {/* Trip Progress Bar if in progress */}
              {tripStatus === 'in_progress' && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                    <span>{language === 'ar' ? 'تقدم الرحلة الميدانية' : 'Progression'}</span>
                    <span className="font-mono font-bold text-teal-600">{tripProgressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal-600 transition-all duration-500 rounded-full"
                      style={{ width: `${tripProgressPercent}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Fast Forward / Cancel triggers for prototype evaluation */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={cancelActiveTrip}
                  className="text-xs text-slate-500 hover:text-rose-600 underline"
                >
                  {language === 'ar' ? 'إلغاء الرحلة' : 'Annuler'}
                </button>
                <button
                  onClick={completeActiveTrip}
                  className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline"
                >
                  {language === 'ar' ? 'إنهاء الرحلة مباشرة (تجربة)' : 'Terminer la course'}
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE TRIP SIMULATION: Completed & Rating */}
          {tripStatus === 'completed' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {language === 'ar' ? 'وصلت إلى وجهتك بسلام! 🎓' : 'Course terminée avec succès !'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ar'
                  ? 'تم دفع 320 دج نقداً للسائق بالسعر المخفض للطلبة. كيف كانت تجربة رحلتك اليوم؟'
                  : 'Paiement effectué au tarif étudiant réduit.'}
              </p>

              {/* Star Rating */}
              {!hasSubmittedRating ? (
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRatingScore(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            ratingScore >= star ? 'fill-amber-400' : 'text-slate-300 dark:text-slate-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={ratingComment}
                    onChange={(e) => setRatingComment(e.target.value)}
                    placeholder={language === 'ar' ? 'أضف ملاحظة أو شكر للسائق (اختياري)...' : 'Laissez un commentaire...'}
                    className="w-full max-w-sm mx-auto py-2 px-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />

                  <button
                    onClick={() => {
                      setHasSubmittedRating(true);
                      showToast(language === 'ar' ? 'شكراً لتقييمك! نسعد بخدمتكم دائماً.' : 'Merci pour votre évaluation !');
                      setTimeout(() => {
                        cancelActiveTrip();
                        setHasSubmittedRating(false);
                      }, 2000);
                    }}
                    className="py-2.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors"
                  >
                    {language === 'ar' ? 'إرسال التقييم' : 'Envoyer mon avis'}
                  </button>
                </div>
              ) : (
                <div className="p-3 bg-teal-50 dark:bg-teal-950/60 rounded-xl text-teal-800 dark:text-teal-200 text-xs font-semibold">
                  {language === 'ar' ? 'تم تسجيل تقييمك بنجاح! شكراً لك.' : 'Évaluation enregistrée.'}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE B: التاكسي (Student Taxi) */}
      {/* ======================================================== */}
      {selectedMobilityMode === 'taxi' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              🚕
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                {language === 'ar' ? 'خدمة تاكسي الطلبة المعتمد' : 'Taxi Étudiant Agréé'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ar' ? 'سيارات أجرة معتمدة بعدادات موحدة وتسعيرة مدعومة' : 'Taxis urbains partenaires'}
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{language === 'ar' ? 'المسافة التقديرية:' : 'Distance estimée :'}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">11.4 كم</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">{language === 'ar' ? 'الوقت التقديري:' : 'Durée estimée :'}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">18 دقيقة</span>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-700 dark:text-slate-300">{language === 'ar' ? 'الأجرة التقديرية بالعداد:' : 'Tarif estimé :'}</span>
              <span className="text-base font-extrabold text-teal-600 dark:text-teal-400 font-mono">350 - 450 دج</span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsTaxiBookingModalOpen(true);
            }}
            className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <span>{language === 'ar' ? 'طلب تاكسي بالعداد الطلابي' : 'Commander un Taxi'}</span>
          </button>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE C: حافلات السفر الرسمية (SOGRAL Buses & Seats) */}
      {/* ======================================================== */}
      {selectedMobilityMode === 'bus' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'حافلات السفر بين المدن والمحطات البرية (SOGRAL)' : 'Lignes Interurbaines SOGRAL'}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === 'ar' ? 'حجز مسبق مع اختيار رقم المقعد وتذكرة رقمية مؤكدة' : 'Réservation avec choix du siège'}
                </p>
              </div>
            </div>

            {/* List of Bus Routes */}
            <div className="space-y-3">
              {BUS_ROUTES.map((route) => (
                <div
                  key={route.id}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-teal-500 transition-all bg-white dark:bg-slate-800/40 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                        <span>{route.departureCityAr}</span>
                        <span className="text-teal-600">←</span>
                        <span>{route.destinationCityAr}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {route.departureStationAr} — {route.destinationStationAr}
                      </p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-sm font-extrabold text-teal-600 dark:text-teal-400 font-mono">
                        {route.priceDzd} دج
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        {route.availableSeats} مقعد متاح
                      </span>
                    </div>
                  </div>

                  {/* Route details chips */}
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 flex-wrap pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-teal-600" />
                      <span>انطلاق: {route.departureTime}</span>
                    </span>
                    <span>·</span>
                    <span>المدة: {route.durationAr}</span>
                    <span>·</span>
                    <span className="text-slate-700 dark:text-slate-300 font-medium">{route.busTypeAr}</span>
                  </div>

                  <button
                    onClick={() => openBusSeatPicker(route)}
                    className="w-full py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <span>{language === 'ar' ? 'عرض مخطط الحافلة واختيار المقعد' : 'Choisir mon siège'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE D: النقل الجامعي ONOU (Campus Navettes) */}
      {/* ======================================================== */}
      {selectedMobilityMode === 'campus' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-2.5">
            <GraduationCap className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {language === 'ar'
                ? 'خدمة النقل الجامعي (حافلات ONOU الزرقاء) مجانية لجميع الطلبة المقيمين حاملي بطاقة النقل المعتمدة. المواعيد التالية محدثة بالتنسيق مع ديوان الخدمات الجامعية.'
                : 'Les navettes universitaires ONOU sont gratuites sur présentation de la carte de transport.'}
            </p>
          </div>

          <div className="space-y-3">
            {CAMPUS_ROUTES.map((line) => (
              <div
                key={line.id}
                className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold font-mono">
                      {line.lineCode}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                      {line.residenceNameAr}
                    </h4>
                  </div>

                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>منتظم</span>
                  </span>
                </div>

                {/* Stops list */}
                <div className="space-y-1 text-xs">
                  <span className="text-[10px] text-slate-400 block">
                    {language === 'ar' ? 'محطات التوقف:' : 'Arrêts :'}
                  </span>
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300 flex-wrap text-[11px]">
                    {line.stopsAr.map((stop, sIdx) => (
                      <React.Fragment key={sIdx}>
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                          {stop}
                        </span>
                        {sIdx < line.stopsAr.length - 1 && <span className="text-slate-400">←</span>}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Timetable row */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-blue-600" />
                    <span>{language === 'ar' ? `الانطلاق القادم بعد ${line.nextDepartureMinutes} دقائق` : `Prochain départ dans ${line.nextDepartureMinutes} min`}</span>
                  </div>

                  <span className="text-[10px] text-slate-400">
                    {language === 'ar' ? `تواتر كل ${line.frequencyMinutes} دقيقة` : `Toutes les ${line.frequencyMinutes} min`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODE E: النقل بين الولايات (Intercity) */}
      {/* ======================================================== */}
      {selectedMobilityMode === 'intercity' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'السفر والتنقل بين ولايات الجزائر (69 ولاية)' : 'Voyages Inter-Wilayas'}
            </h3>
            <p className="text-xs text-slate-500">
              {language === 'ar' ? 'ابحث عن رحلات التنقل الطلابي المباشرة بين المدن والجامعات' : 'Liaisons régulières'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'ولاية الانطلاق' : 'Wilaya de départ'}
              </label>
              <select
                value={intercityDeparture}
                onChange={(e) => setIntercityDeparture(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {ALGERIA_WILAYAS.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.code} - {w.nameAr} ({w.nameFr})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {language === 'ar' ? 'ولاية الوصول' : 'Wilaya de destination'}
              </label>
              <select
                value={intercityDestination}
                onChange={(e) => setIntercityDestination(e.target.value)}
                className="w-full py-2 px-3 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                {ALGERIA_WILAYAS.map((w) => (
                  <option key={w.code} value={w.code}>
                    {w.code} - {w.nameAr} ({w.nameFr})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedMobilityMode('bus');
              showToast(language === 'ar' ? 'عرض الرحلات المتاحة لهذا المسار' : 'Affichage des trajets');
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'ar' ? 'عرض الرحلات المتوفرة بين الولايتين' : 'Rechercher les départs'}</span>
          </button>
        </div>
      )}
    </div>
  );
};
