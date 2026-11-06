import React from 'react';
import {
  X,
  Share2,
  Download,
  AlertCircle,
  QrCode,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DigitalTicketModal: React.FC = () => {
  const { activeTicket, setActiveTicket, cancelBooking, language, showToast } = useApp();

  if (!activeTicket) return null;

  const ticket = activeTicket;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `تذكرة وصلة طالب - ${ticket.bookingRef}`,
        text: `رحلتي مع وصلة طالب: ${ticket.departureAr} إلى ${ticket.destinationAr} - رقم الحجز: ${ticket.bookingRef}`,
      }).catch(() => {});
    } else {
      showToast(language === 'ar' ? 'تم نسخ تفاصيل التذكرة إلى الحافظة' : 'Détails du billet copiés');
    }
  };

  const handleDownload = () => {
    showToast(language === 'ar' ? 'جاري تحميل التذكرة بصيغة PDF...' : 'Téléchargement du billet PDF...');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-500 text-slate-950 font-bold flex items-center justify-center text-xs">
              وصلة
            </div>
            <div>
              <h3 className="font-bold text-sm">WASLA TALIB BOARDING PASS</h3>
              <p className="text-[10px] text-teal-300 font-mono">{ticket.bookingRef}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTicket(null)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ticket Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800 text-xs font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تذكرة مؤكدة ومدفوعة' : 'Billet confirmé'}</span>
            </span>

            <span className="text-xs font-bold text-teal-600 dark:text-teal-400 font-mono text-base">
              {ticket.priceDzd} دج
            </span>
          </div>

          {/* Passenger & Operator info */}
          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">
                {language === 'ar' ? 'اسم الطالب:' : 'Passager :'}
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {ticket.passengerName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">
                {language === 'ar' ? 'المشغل المعتمد:' : 'Opérateur :'}
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                {ticket.operatorAr}
              </span>
            </div>
            {ticket.seatNumber && (
              <div>
                <span className="text-slate-400 block text-[10px]">
                  {language === 'ar' ? 'رقم المقعد:' : 'Siège :'}
                </span>
                <span className="font-bold text-teal-600 dark:text-teal-400">
                  {ticket.seatNumber}
                </span>
              </div>
            )}
            <div>
              <span className="text-slate-400 block text-[10px]">
                {language === 'ar' ? 'نوع النقل:' : 'Type de transport :'}
              </span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 uppercase">
                {ticket.type}
              </span>
            </div>
          </div>

          {/* Route path */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-600 dark:text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-3 h-3" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">
                  {language === 'ar' ? 'نقطة الانطلاق' : 'Départ'}
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {ticket.departureAr}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <Calendar className="w-3 h-3" />
                  <span>{ticket.date}</span>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{ticket.time}</span>
                </div>
              </div>
            </div>

            <div className="border-r-2 border-dashed border-slate-300 dark:border-slate-700 h-4 mr-2.5" />

            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-3 h-3" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">
                  {language === 'ar' ? 'محطة الوصول' : 'Destination'}
                </span>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  {ticket.destinationAr}
                </p>
              </div>
            </div>
          </div>

          {/* QR Code Container */}
          <div className="p-4 rounded-xl bg-slate-900 text-white text-center flex flex-col items-center">
            {/* Realistic SVG Simulated QR Code */}
            <div className="w-36 h-36 bg-white p-2.5 rounded-lg shadow-sm flex items-center justify-center mb-2">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* QR Finder patterns */}
                <rect x="5" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="8" y="8" width="19" height="19" fill="#ffffff" />
                <rect x="12" y="12" width="11" height="11" fill="#0f172a" />

                <rect x="70" y="5" width="25" height="25" fill="#0f172a" />
                <rect x="73" y="8" width="19" height="19" fill="#ffffff" />
                <rect x="77" y="12" width="11" height="11" fill="#0f172a" />

                <rect x="5" y="70" width="25" height="25" fill="#0f172a" />
                <rect x="8" y="73" width="19" height="19" fill="#ffffff" />
                <rect x="12" y="77" width="11" height="11" fill="#0f172a" />

                {/* Random matrix blocks */}
                <rect x="35" y="10" width="8" height="8" fill="#0f172a" />
                <rect x="48" y="8" width="12" height="6" fill="#0f172a" />
                <rect x="35" y="25" width="25" height="6" fill="#0f172a" />
                <rect x="10" y="38" width="80" height="4" fill="#0f172a" />
                <rect x="10" y="48" width="20" height="12" fill="#0f172a" />
                <rect x="40" y="45" width="18" height="18" fill="#0f172a" />
                <rect x="68" y="45" width="22" height="10" fill="#0f172a" />
                <rect x="40" y="70" width="10" height="20" fill="#0f172a" />
                <rect x="55" y="72" width="35" height="6" fill="#0f172a" />
                <rect x="60" y="84" width="20" height="8" fill="#0f172a" />
              </svg>
            </div>
            <span className="text-[10px] text-teal-300 font-mono tracking-wider">
              {ticket.bookingRef}
            </span>
            <p className="text-[10px] text-slate-400 mt-1">
              {language === 'ar'
                ? 'رمز QR تجريبي لأغراض العرض والمحاكاة - اظهر الرمز لمراقب الحافلة'
                : 'QR Code de démonstration - Présentez ce code au contrôleur'}
            </p>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleDownload}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تحميل التذكرة PDF' : 'Télécharger PDF'}</span>
            </button>
            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'مشاركة الرحلة' : 'Partager'}</span>
            </button>
          </div>

          {ticket.status === 'upcoming' && (
            <button
              onClick={() => {
                cancelBooking(ticket.id);
                setActiveTicket(null);
              }}
              className="w-full py-2 text-rose-600 dark:text-rose-400 hover:text-rose-700 text-xs font-medium hover:underline text-center"
            >
              {language === 'ar' ? 'إلغاء هذا الحجز' : 'Annuler cette réservation'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
