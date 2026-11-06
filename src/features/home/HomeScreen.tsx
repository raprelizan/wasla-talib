import React, { useState } from 'react';
import {
  ArrowLeftRight,
  Search,
  MapPin,
  Calendar,
  Clock,
  Car,
  Bus,
  Compass,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Gift,
  Building,
  CheckCircle2,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TransportType } from '../../types';
import { DemonstrationMap } from '../../components/map/DemonstrationMap';
import { BUS_ROUTES } from '../../data/mockData';

export const HomeScreen: React.FC = () => {
  const {
    user,
    language,
    setActiveTab,
    setSelectedMobilityMode,
    pickupLocation,
    setPickupLocation,
    destinationLocation,
    setDestinationLocation,
    benefits,
    setSelectedBenefitForDetails,
    opportunities,
    setSelectedOpportunityForDetails,
    openBusSeatPicker,
    setIsVerificationModalOpen,
  } = useApp();

  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [passengerCount, setPassengerCount] = useState(1);

  // Time-based greeting in Arabic / French
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'ar') {
      return hour < 12 ? 'صباح الخير 👋' : 'مساء الخير 👋';
    } else if (language === 'fr') {
      return hour < 12 ? 'Bonjour 👋' : 'Bonsoir 👋';
    } else {
      return hour < 12 ? 'Good morning 👋' : 'Good evening 👋';
    }
  };

  const swapLocations = () => {
    const temp = pickupLocation;
    setPickupLocation(destinationLocation);
    setDestinationLocation(temp);
  };

  const handleQuickServiceClick = (mode: TransportType) => {
    setSelectedMobilityMode(mode);
    setActiveTab('mobility');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedMobilityMode('private');
    setActiveTab('mobility');
  };

  const quickServices = [
    {
      id: 'private' as TransportType,
      titleAr: 'النقل الخاص',
      titleFr: 'VTC & Covoiturage',
      descAr: 'سيارات وسائقون معتمدون للطلبة',
      icon: Car,
      color: 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300',
    },
    {
      id: 'campus' as TransportType,
      titleAr: 'النقل الجامعي',
      titleFr: 'Navettes ONOU',
      descAr: 'حافلات الإقامة والحرم مجاناً',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    },
    {
      id: 'bus' as TransportType,
      titleAr: 'الحافلات',
      titleFr: 'Bus & SOGRAL',
      descAr: 'خطوط المحطات البرية الرسمية',
      icon: Bus,
      color: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    },
    {
      id: 'intercity' as TransportType,
      titleAr: 'بين الولايات',
      titleFr: 'Inter-Wilayas',
      descAr: 'سفر المسافات الطويلة والجامعات',
      icon: Compass,
      color: 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300',
    },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12 animate-in fade-in duration-200">
      {/* 1. Student Hero Greeting Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950 text-white p-5 sm:p-6 overflow-hidden shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-teal-400 text-xs font-semibold">{getGreeting()}</span>
              <span className="text-slate-400 text-xs">·</span>
              <span className="text-xs text-slate-300 font-medium">
                {user.universityNameAr}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {language === 'ar' ? `أهلاً بك يا ${user.fullName.split(' ')[0]}` : `Bienvenue, ${user.fullName}`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
              {language === 'ar'
                ? 'إلى أين تريد الذهاب اليوم؟ خطط رحلتك وتنقل بأمان مع زملائك بأفضل الأسعار المخصصة للطلبة.'
                : 'Où souhaitez-vous aller aujourd\'hui ? Réservez votre trajet étudiant au meilleur tarif.'}
            </p>
          </div>

          {/* Student Status Card / Trigger */}
          <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="text-right">
              <span className="text-[10px] text-teal-300 font-semibold block">
                {language === 'ar' ? 'بطاقة الطالب الرقمية' : 'Carte Étudiante'}
              </span>
              <span className="text-xs font-bold text-white block">
                {user.verificationStatus === 'verified'
                  ? language === 'ar' ? 'طالب معتمد وموثق 🎓' : 'Validée 🎓'
                  : language === 'ar' ? 'غير موثقة' : 'Non vérifiée'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Transportation Search Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center justify-between">
          <span>{language === 'ar' ? 'حجز مسار التنقل الطلابي' : 'Rechercher un trajet'}</span>
          <span className="text-[11px] font-normal text-slate-500">
            {language === 'ar' ? 'أسعار تفضيلية للطلبة' : 'Tarifs universitaires'}
          </span>
        </h2>

        <form onSubmit={handleSearchSubmit} className="space-y-3">
          {/* Pickup and Destination inputs with swap button */}
          <div className="relative space-y-2">
            {/* Pickup */}
            <div className="relative">
              <div className="absolute top-3 right-3 text-teal-600 dark:text-teal-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                placeholder={language === 'ar' ? 'من أين؟ (مثال: الإقامة الجامعية درقانة)' : 'Point de départ...'}
                className="w-full pr-9 pl-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-1 relative z-10">
              <button
                type="button"
                onClick={swapLocations}
                className="w-7 h-7 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 flex items-center justify-center shadow-sm transition-transform active:rotate-180"
                aria-label="تبديل المواقع"
                title="تبديل نقطة الانطلاق والوجهة"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Destination */}
            <div className="relative">
              <div className="absolute top-3 right-3 text-blue-600 dark:text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={destinationLocation}
                onChange={(e) => setDestinationLocation(e.target.value)}
                placeholder={language === 'ar' ? 'إلى أين؟ (مثال: الحرم الجامعي USTHB)' : 'Destination...'}
                className="w-full pr-9 pl-3 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>
          </div>

          {/* Quick Dates & Passengers */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedDate('today')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDate === 'today'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {language === 'ar' ? 'اليوم' : 'Aujourd\'hui'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedDate('tomorrow')}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  selectedDate === 'tomorrow'
                    ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {language === 'ar' ? 'غداً' : 'Demain'}
              </button>
            </div>

            <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'الآن' : 'Maintenant'}</span>
              </span>
              <span className="font-semibold text-teal-600 dark:text-teal-400">فوري</span>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center justify-between px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs">
              <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'الركاب' : 'Passager'}</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPassengerCount(Math.max(1, passengerCount - 1))}
                  className="w-5 h-5 rounded bg-white dark:bg-slate-700 flex items-center justify-center font-bold"
                >
                  -
                </button>
                <span className="font-bold text-slate-900 dark:text-white font-mono">{passengerCount}</span>
                <button
                  type="button"
                  onClick={() => setPassengerCount(Math.min(4, passengerCount + 1))}
                  className="w-5 h-5 rounded bg-white dark:bg-slate-700 flex items-center justify-center font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Submit Search CTA */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>{language === 'ar' ? 'البحث عن خيارات النقل المتاحة' : 'Trouver les options de transport'}</span>
          </button>
        </form>
      </div>

      {/* 3. Quick Transportation Services Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'خدمات النقل المعتمدة' : 'Services de transport'}
          </h2>
          <button
            onClick={() => setActiveTab('mobility')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'ar' ? 'عرض الكل' : 'Voir tout'}</span>
            {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {quickServices.map((svc) => {
            const Icon = svc.icon;
            return (
              <button
                key={svc.id}
                onClick={() => handleQuickServiceClick(svc.id)}
                className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 dark:hover:border-teal-500 transition-all text-right group shadow-sm flex flex-col justify-between min-h-[105px]"
              >
                <div className={`w-9 h-9 rounded-lg ${svc.color} flex items-center justify-center mb-2 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                    {language === 'ar' ? svc.titleAr : svc.titleFr}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                    {svc.descAr}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Daily Commute One-Tap Repeat Trip */}
      <div className="bg-slate-100/70 dark:bg-slate-800/40 rounded-2xl p-4 border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>{language === 'ar' ? 'مسار التنقل اليومي المتكرر' : 'Trajet quotidien habituel'}</span>
          </span>
          <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold">
            {language === 'ar' ? 'حجز بضغطة واحدة' : 'En 1 clic'}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl p-3 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <span>الإقامة درقانة 2</span>
                <span className="text-slate-400">←</span>
                <span>الحرم الجامعي USTHB</span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                مسارك الصباحي المعتاد · حافلة ONOU أو وصلة تشاركي مخفض
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setPickupLocation('الإقامة الجامعية درقانة 2');
              setDestinationLocation('جامعة العلوم والتكنولوجيا (USTHB) باب الزوار');
              setSelectedMobilityMode('private');
              setActiveTab('mobility');
            }}
            className="py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors whitespace-nowrap self-end sm:self-center"
          >
            {language === 'ar' ? 'تأكيد وحجز الآن' : 'Réserver'}
          </button>
        </div>
      </div>

      {/* 5. Interactive Map Preview Section */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>{language === 'ar' ? 'شبكة النقل الجامعي المباشرة' : 'Carte du réseau universitaire'}</span>
          </h2>
          <span className="text-[10px] text-slate-500 font-medium">
            {language === 'ar' ? 'الجزائر العاصمة (Bab Ezzouar)' : 'Grand Alger'}
          </span>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
          <DemonstrationMap heightClass="h-48 sm:h-60" />
        </div>
      </div>

      {/* 6. Featured Bus Departures Strip */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'رحلات الحافلات القادمة' : 'Départs de bus'}
            </h2>
            <p className="text-[10px] text-slate-500">
              {language === 'ar' ? 'المحطات البرية المركزية SOGRAL' : 'Gares routières SOGRAL'}
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedMobilityMode('bus');
              setActiveTab('mobility');
            }}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'ar' ? 'جميع الرحلات' : 'Voir tout'}</span>
            {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BUS_ROUTES.slice(0, 2).map((route) => (
            <div
              key={route.id}
              className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-bold text-slate-900 dark:text-white">
                    {route.departureCityAr} — {route.destinationCityAr}
                  </span>
                  <span className="font-extrabold text-teal-600 dark:text-teal-400 font-mono">
                    {route.priceDzd} دج
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-2">
                  <span>انطلاق: {route.departureTime}</span>
                  <span>·</span>
                  <span>{route.durationAr}</span>
                  <span>·</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    {route.availableSeats} مقعد متاح
                  </span>
                </div>
              </div>

              <button
                onClick={() => openBusSeatPicker(route)}
                className="w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-teal-600 hover:text-white text-slate-800 dark:bg-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span>{language === 'ar' ? 'اختيار المقعد وحجز التذكرة' : 'Choisir mon siège'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Student Benefits & Exclusive Offers Spotlight */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Gift className="w-4 h-4 text-teal-600" />
              <span>{language === 'ar' ? 'مزايا وتخفيضات بطاقة الطالب' : 'Bons plans étudiants'}</span>
            </h2>
            <p className="text-[10px] text-slate-500">
              {language === 'ar' ? 'خصومات حصرية لدى شركاء وصلة المعتمدين' : 'Partenaires officiels WASLA'}
            </p>
          </div>
          <button
            onClick={() => setActiveTab('benefits')}
            className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1"
          >
            <span>{language === 'ar' ? 'عرض الكوبونات' : 'Voir tout'}</span>
            {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {benefits.slice(0, 2).map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedBenefitForDetails(item)}
              className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-teal-500 cursor-pointer transition-all flex gap-3"
            >
              <img
                src={item.image}
                alt={item.titleAr}
                referrerPolicy="no-referrer"
                className="w-18 h-18 sm:w-20 sm:h-20 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 line-clamp-1">
                      {item.businessNameAr}
                    </span>
                    <span className="text-[10px] font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 px-1.5 py-0.5 rounded">
                      -{item.discountPercent}%
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                    {item.titleAr}
                  </h3>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                  <span className="truncate">{item.locationAr}</span>
                  <span className="font-semibold text-teal-600 dark:text-teal-400 whitespace-nowrap">
                    كود الخصم ←
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
