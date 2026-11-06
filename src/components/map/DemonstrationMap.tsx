import React, { useState } from 'react';
import { MapPin, Navigation, ZoomIn, ZoomOut, Compass, Bus, Shield, Car } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface DemonstrationMapProps {
  interactive?: boolean;
  heightClass?: string;
  showStops?: boolean;
}

export const DemonstrationMap: React.FC<DemonstrationMapProps> = ({
  interactive = true,
  heightClass = 'h-64 sm:h-80',
  showStops = true,
}) => {
  const { language, tripStatus, pickupLocation, destinationLocation, tripProgressPercent } = useApp();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isCentered, setIsCentered] = useState(true);

  // Key campus transit points in Algiers East (USTHB / Dergana / Bab Ezzouar / El Harrach)
  const stops = [
    { id: 'usthb', nameAr: 'جامعة USTHB (باب الزوار)', nameFr: 'Campus USTHB', x: 260, y: 150, type: 'university' },
    { id: 'dergana', nameAr: 'إقامة درقانة 2 (ONOU)', nameFr: 'Résidence Dergana', x: 420, y: 80, type: 'dorm' },
    { id: 'kharouba', nameAr: 'المحطة البرية الخروبة', nameFr: 'Gare Kharouba', x: 120, y: 190, type: 'bus' },
    { id: 'harrach', nameAr: 'محطة الحراش المركزية', nameFr: 'El Harrach Hub', x: 190, y: 220, type: 'tram' },
    { id: 'airport', nameAr: 'مطار هواري بومدين', nameFr: 'Aéroport d\'Alger', x: 380, y: 240, type: 'airport' },
  ];

  // Interpolate car position based on trip progress
  const startX = 420;
  const startY = 80;
  const endX = 260;
  const endY = 150;
  const currentCarX = startX + (endX - startX) * (tripProgressPercent / 100);
  const currentCarY = startY + (endY - startY) * (tripProgressPercent / 100);

  return (
    <div className={`relative w-full ${heightClass} bg-slate-900 overflow-hidden select-none border border-slate-200 dark:border-slate-800`}>
      {/* SVG Map Canvas */}
      <svg
        className="w-full h-full transition-transform duration-300"
        viewBox="0 0 500 300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          </pattern>
          {/* Road gradient */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Background Landmass & Mediterranean Coastline hint */}
        <rect width="100%" height="100%" fill="#0f172a" />
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Coastal sea contour (Bay of Algiers) */}
        <path
          d="M 0 60 Q 150 110 320 60 T 500 30 L 500 0 L 0 0 Z"
          fill="#082f49"
          opacity="0.8"
        />
        <text x="70" y="35" fill="#38bdf8" fontSize="9" opacity="0.4" className="font-mono">
          خليج الجزائر · Baie d'Alger (Mer Méditerranée)
        </text>

        {/* Major highway / Route network */}
        {/* Autoroute de l'Est / Rocade Sud */}
        <path
          d="M 20 180 Q 160 210 280 180 T 480 130"
          stroke="#334155"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M 20 180 Q 160 210 280 180 T 480 130"
          stroke="#475569"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6,4"
        />

        {/* University Tramway Line (Tramway d'Alger - Bab Ezzouar) */}
        <path
          d="M 120 190 Q 210 170 260 150 T 420 80"
          stroke="#0e7490"
          strokeWidth="3.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Active Route Polyline if searching or in trip */}
        {(tripStatus === 'driver_arriving' || tripStatus === 'in_progress' || tripStatus === 'driver_found') && (
          <path
            d="M 420 80 Q 330 110 260 150"
            stroke="url(#routeGradient)"
            strokeWidth="4"
            fill="none"
            strokeDasharray="8,4"
            className="animate-pulse"
          />
        )}

        {/* Campus Stops & Landmarks */}
        {showStops &&
          stops.map((stop) => (
            <g key={stop.id} transform={`translate(${stop.x}, ${stop.y})`} className="cursor-pointer group">
              <circle r="7" fill={stop.type === 'university' ? '#0d9488' : '#1e293b'} stroke="#38bdf8" strokeWidth="2" />
              <circle r="3" fill="#ffffff" />
              <text
                y="-11"
                textAnchor="middle"
                fill="#e2e8f0"
                fontSize="8.5"
                fontWeight="600"
                className="pointer-events-none drop-shadow"
              >
                {language === 'ar' ? stop.nameAr : stop.nameFr}
              </text>
            </g>
          ))}

        {/* Pickup Pin */}
        <g transform="translate(420, 80)">
          <circle r="14" fill="#0d9488" opacity="0.25" className="animate-ping" />
          <circle r="8" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
          <text y="20" textAnchor="middle" fill="#5eead4" fontSize="8" fontWeight="bold">
            {language === 'ar' ? 'نقطة الانطلاق (درقانة)' : 'Départ'}
          </text>
        </g>

        {/* Destination Pin */}
        <g transform="translate(260, 150)">
          <circle r="14" fill="#3b82f6" opacity="0.25" />
          <circle r="8" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
          <text y="20" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">
            {language === 'ar' ? 'الوجهة (USTHB)' : 'Destination'}
          </text>
        </g>

        {/* Animated Moving Vehicle during active trip */}
        {tripStatus === 'in_progress' && (
          <g transform={`translate(${currentCarX}, ${currentCarY})`} className="transition-all duration-1000 ease-linear">
            <circle r="16" fill="#14b8a6" opacity="0.3" className="animate-ping" />
            <circle r="10" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
            <path
              d="M -4 -2 L 4 -2 L 3 3 L -3 3 Z"
              fill="#5eead4"
            />
          </g>
        )}
      </svg>

      {/* Top Overlay Badge — Clear Demonstration Notice */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
        <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-slate-700/80 text-[10px] text-slate-300 flex items-center gap-1.5 shadow-sm">
          <Shield className="w-3 h-3 text-teal-400 shrink-0" />
          <span className="font-medium">
            {language === 'ar'
              ? 'خريطة تنقل جامعي تجريبية — الجزائر العاصمة (USTHB · درقانة · الخروبة)'
              : 'Carte interactive de démonstration — Alger Est'}
          </span>
        </div>
      </div>

      {/* Map Controls */}
      {interactive && (
        <div className="absolute bottom-3 left-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={() => setZoomLevel((z) => Math.min(z + 0.25, 2))}
            aria-label="Zoom in"
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center transition-colors shadow-md"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoomLevel((z) => Math.max(z - 0.25, 0.8))}
            aria-label="Zoom out"
            className="w-8 h-8 rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center transition-colors shadow-md"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoomLevel(1);
              setIsCentered(true);
            }}
            aria-label="Recenter location"
            className="w-8 h-8 rounded-lg bg-teal-600 hover:bg-teal-500 text-white flex items-center justify-center transition-colors shadow-md"
            title={language === 'ar' ? 'إعادة التمركز' : 'Recentrer'}
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Real-time Status Floating Chip */}
      <div className="absolute bottom-3 right-3 z-10">
        {tripStatus === 'idle' ? (
          <div className="bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-700/80 text-[11px] text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>{language === 'ar' ? 'شبكة النقل الجامعي تعمل بانتظام' : 'Lignes ONOU & VTC actives'}</span>
          </div>
        ) : tripStatus === 'searching' ? (
          <div className="bg-amber-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-600/50 text-[11px] text-amber-200 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>{language === 'ar' ? 'جاري مطابقة السائق الأقرب...' : 'Recherche de chauffeur...'}</span>
          </div>
        ) : (
          <div className="bg-teal-950/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-teal-600/50 text-[11px] text-teal-200 flex items-center gap-2">
            <Car className="w-3.5 h-3.5 text-teal-300" />
            <span>
              {tripStatus === 'driver_found' && (language === 'ar' ? 'تم تعيين السائق أمين' : 'Chauffeur assigné')}
              {tripStatus === 'driver_arriving' && (language === 'ar' ? 'السائق في الطريق (3 د)' : 'Chauffeur en approche')}
              {tripStatus === 'in_progress' && (language === 'ar' ? `الرحلة جارية (${tripProgressPercent}%)` : `En route (${tripProgressPercent}%)`)}
              {tripStatus === 'completed' && (language === 'ar' ? 'اكتملت الرحلة' : 'Course terminée')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
