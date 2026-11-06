import React, { useState } from 'react';
import { X, Check, Shield, Armchair, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BusSeat, Booking } from '../../types';
import { generateBusSeats } from '../../data/mockData';

export const BusSeatPickerModal: React.FC = () => {
  const {
    selectedBusRouteForSeats,
    closeBusSeatPicker,
    addBooking,
    setActiveTicket,
    setActiveTab,
    user,
    language,
    showToast,
  } = useApp();

  const [seats, setSeats] = useState<BusSeat[]>(() => generateBusSeats());
  const [selectedSeatNumber, setSelectedSeatNumber] = useState<number | null>(12);
  const [isConfirming, setIsConfirming] = useState(false);

  if (!selectedBusRouteForSeats) return null;

  const route = selectedBusRouteForSeats;

  const handleSeatClick = (seat: BusSeat) => {
    if (seat.status === 'occupied') {
      showToast(language === 'ar' ? 'عذراً، هذا المقعد محجوز مسبقاً' : 'Ce siège est déjà réservé');
      return;
    }
    setSelectedSeatNumber(seat.seatNumber);
  };

  const selectedSeatObj = seats.find((s) => s.seatNumber === selectedSeatNumber);
  const basePrice = route.priceDzd;
  const studentDiscount = user.verificationStatus === 'verified' ? 150 : 0;
  const finalPrice = Math.max(0, basePrice - studentDiscount);

  const handleConfirmReservation = () => {
    if (!selectedSeatNumber) {
      showToast(language === 'ar' ? 'يرجى تحديد مقعد أولاً' : 'Veuillez sélectionner un siège');
      return;
    }

    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      const newBooking: Booking = {
        id: `bk_bus_${Date.now()}`,
        bookingRef: `WASLA-2026-BUS${Math.floor(100 + Math.random() * 900)}`,
        type: 'bus',
        departureAr: `${route.departureCityAr} (${route.departureStationAr})`,
        destinationAr: `${route.destinationCityAr} (${route.destinationStationAr})`,
        date: 'غداً، 07 نوفمبر 2026',
        time: route.departureTime,
        passengerName: user.fullName,
        seatNumber: `مقعد ${selectedSeatNumber} (${selectedSeatNumber % 2 === 0 ? 'ممر' : 'نافذة'})`,
        operatorAr: route.operatorAr,
        priceDzd: finalPrice,
        paymentStatus: 'paid',
        status: 'upcoming',
        createdAt: 'الآن',
      };

      addBooking(newBooking);
      closeBusSeatPicker();
      setActiveTicket(newBooking);
      setActiveTab('bookings');
    }, 1200);
  };

  // Group seats by row for layout rendering
  const rowsMap = new Map<number, BusSeat[]>();
  seats.forEach((seat) => {
    if (!rowsMap.has(seat.row)) {
      rowsMap.set(seat.row, []);
    }
    rowsMap.get(seat.row)!.push(seat);
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[94vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {language === 'ar' ? 'اختيار مقعد الحافلة' : 'Sélection du siège'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {route.departureCityAr} — {route.destinationCityAr} · {route.departureTime}
            </p>
          </div>
          <button
            onClick={closeBusSeatPicker}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Legend */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center gap-4 text-[11px] text-slate-600 dark:text-slate-300 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700" />
            <span>{language === 'ar' ? 'متاح' : 'Disponible'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-teal-600 text-white flex items-center justify-center text-[9px] font-bold">
              ✓
            </span>
            <span>{language === 'ar' ? 'محدد' : 'Sélectionné'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded bg-slate-300 dark:bg-slate-600 opacity-60" />
            <span>{language === 'ar' ? 'محجوز' : 'Occupé'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded border border-blue-400 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-300 text-[8px] flex items-center justify-center">
              ♿
            </span>
            <span>{language === 'ar' ? 'أولوية' : 'Prioritaire'}</span>
          </div>
        </div>

        {/* Interactive Bus Interior Layout */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="max-w-xs mx-auto bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
            {/* Front of bus / Driver cabin */}
            <div className="pb-4 mb-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-[10px]">
                {language === 'ar' ? 'مدخل الركاب' : 'Entrée'}
              </span>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-900 text-white text-[10px] font-semibold">
                <span>🚌</span>
                <span>{language === 'ar' ? 'مقعد السائق' : 'Chauffeur'}</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="space-y-2">
              {Array.from(rowsMap.entries()).map(([rowNum, rowSeats]) => {
                const leftSeats = rowSeats.filter((s) => s.col < 2);
                const rightSeats = rowSeats.filter((s) => s.col > 2);

                return (
                  <div key={rowNum} className="flex items-center justify-between gap-3">
                    {/* Left seats pair (e.g. window & aisle) */}
                    <div className="flex items-center gap-1.5">
                      {leftSeats.map((seat) => {
                        const isSelected = selectedSeatNumber === seat.seatNumber;
                        const isOccupied = seat.status === 'occupied';
                        const isAccessible = seat.status === 'accessible';

                        return (
                          <button
                            key={seat.seatNumber}
                            type="button"
                            disabled={isOccupied}
                            onClick={() => handleSeatClick(seat)}
                            className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                              isSelected
                                ? 'bg-teal-600 text-white shadow-md scale-105 ring-2 ring-teal-400'
                                : isOccupied
                                ? 'bg-slate-300 dark:bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                                : isAccessible
                                ? 'bg-blue-50 dark:bg-blue-950/70 border border-blue-400 text-blue-700 dark:text-blue-300 hover:border-teal-500'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/40'
                            }`}
                          >
                            <span>{seat.seatNumber}</span>
                            {isAccessible && !isSelected && (
                              <span className="text-[8px] -mt-1">♿</span>
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Central aisle */}
                    <span className="text-[10px] text-slate-400 font-mono w-4 text-center">
                      {rowNum}
                    </span>

                    {/* Right seats pair */}
                    <div className="flex items-center gap-1.5">
                      {rightSeats.map((seat) => {
                        const isSelected = selectedSeatNumber === seat.seatNumber;
                        const isOccupied = seat.status === 'occupied';
                        const isAccessible = seat.status === 'accessible';

                        return (
                          <button
                            key={seat.seatNumber}
                            type="button"
                            disabled={isOccupied}
                            onClick={() => handleSeatClick(seat)}
                            className={`w-9 h-9 rounded-lg flex flex-col items-center justify-center text-xs font-bold transition-all relative ${
                              isSelected
                                ? 'bg-teal-600 text-white shadow-md scale-105 ring-2 ring-teal-400'
                                : isOccupied
                                ? 'bg-slate-300 dark:bg-slate-700 text-slate-400 cursor-not-allowed opacity-50'
                                : isAccessible
                                ? 'bg-blue-50 dark:bg-blue-950/70 border border-blue-400 text-blue-700 dark:text-blue-300 hover:border-teal-500'
                                : 'bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:border-teal-500 hover:bg-teal-50 dark:hover:bg-teal-950/40'
                            }`}
                          >
                            <span>{seat.seatNumber}</span>
                            {isAccessible && !isSelected && (
                              <span className="text-[8px] -mt-1">♿</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Seat Summary & Sticky CTA */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs mb-3">
            <div>
              <span className="text-slate-500 dark:text-slate-400 block">
                {language === 'ar' ? 'المقعد المختار:' : 'Siège choisi :'}
              </span>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {selectedSeatNumber ? `${language === 'ar' ? 'مقعد رقم' : 'Siège'} ${selectedSeatNumber}` : (language === 'ar' ? 'لم يتم الاختيار' : 'Aucun')}
              </span>
            </div>

            <div className="text-right">
              <span className="text-slate-500 dark:text-slate-400 block">
                {language === 'ar' ? 'السعر الطلابي المخفض:' : 'Tarif étudiant :'}
              </span>
              <div className="flex items-center gap-1.5">
                {studentDiscount > 0 && (
                  <span className="line-through text-slate-400 font-mono text-xs">
                    {basePrice} دج
                  </span>
                )}
                <span className="font-extrabold text-teal-600 dark:text-teal-400 text-base font-mono">
                  {finalPrice} دج
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={!selectedSeatNumber || isConfirming}
            onClick={handleConfirmReservation}
            className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isConfirming ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>{language === 'ar' ? 'تأكيد الحجز وإصدار التذكرة' : 'Confirmer et générer le billet'}</span>
                {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
