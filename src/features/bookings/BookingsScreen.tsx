import React, { useState } from 'react';
import {
  Ticket,
  Calendar,
  Clock,
  MapPin,
  QrCode,
  Share2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Car,
  Bus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Booking } from '../../types';

export const BookingsScreen: React.FC = () => {
  const { bookings, cancelBooking, setActiveTicket, setIsSafetyModalOpen, language, showToast } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all');

  const filteredBookings = bookings.filter((b) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'upcoming') return b.status === 'upcoming' || b.status === 'active';
    return b.status === activeFilter;
  });

  return (
    <div className="space-y-5 pb-24 md:pb-12 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Ticket className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>{language === 'ar' ? 'سجل الرحلات والتذاكر الرقمية' : 'Mes Réservations & Billets'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === 'ar' ? 'تذاكر الحافلات ورحلات النقل الطلابي مع إمكانية إظهار رمز QR' : 'Historique et titres de transport'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveFilter('all')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            activeFilter === 'all'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {language === 'ar' ? 'جميع الرحلات' : 'Toutes'}
        </button>
        <button
          onClick={() => setActiveFilter('upcoming')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            activeFilter === 'upcoming'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {language === 'ar' ? 'القادمة والنشطة' : 'À venir'}
        </button>
        <button
          onClick={() => setActiveFilter('completed')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            activeFilter === 'completed'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {language === 'ar' ? 'المكتملة' : 'Terminées'}
        </button>
        <button
          onClick={() => setActiveFilter('cancelled')}
          className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
            activeFilter === 'cancelled'
              ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          {language === 'ar' ? 'الملغاة' : 'Annulées'}
        </button>
      </div>

      {/* Bookings List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-3.5">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
            >
              {/* Card Header: Type, Status, Reference */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    {b.type === 'bus' || b.type === 'intercity' ? <Bus className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                  </div>
                  <div>
                    <span className="font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200">
                      {b.bookingRef}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {b.operatorAr}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      b.status === 'upcoming'
                        ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300'
                        : b.status === 'completed'
                        ? 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                    }`}
                  >
                    {b.status === 'upcoming' && (language === 'ar' ? 'حجز مؤكد' : 'Confirmé')}
                    {b.status === 'completed' && (language === 'ar' ? 'مكتملة' : 'Terminé')}
                    {b.status === 'cancelled' && (language === 'ar' ? 'ملغاة' : 'Annulé')}
                  </span>
                  <span className="font-extrabold text-teal-600 dark:text-teal-400 font-mono text-sm">
                    {b.priceDzd} دج
                  </span>
                </div>
              </div>

              {/* Route Itinerary */}
              <div className="space-y-2 text-xs">
                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'نقطة الانطلاق:' : 'Départ :'}</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{b.departureAr}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block">{language === 'ar' ? 'محطة الوصول:' : 'Arrivée :'}</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{b.destinationAr}</p>
                  </div>
                </div>
              </div>

              {/* Time, Seat & Passenger Info */}
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>{b.date} · {b.time}</span>
                </div>
                {b.seatNumber && (
                  <span className="font-semibold text-teal-600 dark:text-teal-400">
                    {b.seatNumber}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => setActiveTicket(b)}
                  className="py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm col-span-2 sm:col-span-1"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'عرض التذكرة وQR' : 'Voir le billet'}</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `تذكرة وصلة - ${b.bookingRef}`,
                        text: `رحلتي مع وصلة طالب: ${b.departureAr} إلى ${b.destinationAr}`,
                      }).catch(() => {});
                    } else {
                      showToast(language === 'ar' ? 'تم نسخ تفاصيل الرحلة إلى الحافظة' : 'Détails copiés');
                    }
                  }}
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'مشاركة' : 'Partager'}</span>
                </button>

                <button
                  onClick={() => setIsSafetyModalOpen(true)}
                  className="py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'مساعدة' : 'Assistance'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Ticket className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
            {language === 'ar' ? 'لا توجد رحلات في هذا التبويب' : 'Aucune réservation trouvée'}
          </h3>
          <p className="text-xs text-slate-500">
            {language === 'ar' ? 'يمكنك حجز رحلتك القادمة من قسم التنقل' : 'Planifiez un trajet depuis l\'onglet Mobilité'}
          </p>
        </div>
      )}
    </div>
  );
};
