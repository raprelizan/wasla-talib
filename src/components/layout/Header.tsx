import React from 'react';
import {
  Bell,
  Moon,
  Sun,
  ShieldAlert,
  Smartphone,
  Monitor,
  Globe,
  GraduationCap,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    theme,
    toggleTheme,
    deviceViewMode,
    setDeviceViewMode,
    activeTab,
    setActiveTab,
    unreadCount,
    setIsNotificationsOpen,
    setIsSafetyModalOpen,
    setIsVerificationModalOpen,
    setIsDesignSystemModalOpen,
    user,
  } = useApp();

  const navLinks: { id: NavigationTab; labelAr: string; labelFr: string; labelEn: string }[] = [
    { id: 'home', labelAr: 'الرئيسية', labelFr: 'Accueil', labelEn: 'Home' },
    { id: 'mobility', labelAr: 'التنقل', labelFr: 'Mobilité', labelEn: 'Transit' },
    { id: 'bookings', labelAr: 'حجوزاتي', labelFr: 'Réservations', labelEn: 'Bookings' },
    { id: 'benefits', labelAr: 'المزايا', labelFr: 'Avantages', labelEn: 'Benefits' },
    { id: 'profile', labelAr: 'حسابي', labelFr: 'Mon Profil', labelEn: 'Profile' },
  ];

  const toggleLanguage = () => {
    if (language === 'ar') setLanguage('fr');
    else if (language === 'fr') setLanguage('en');
    else setLanguage('ar');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-teal-700 transition-colors">
              <span className="text-base tracking-tighter">وصلة</span>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
                WASLA TALIB
              </span>
              <span className="text-[10px] text-teal-600 dark:text-teal-400 font-semibold -mt-1 whitespace-nowrap">
                وصلة الطالب · الجزائر
              </span>
            </div>
          </button>

          {/* Verification Status Pill (Interactive trigger) */}
          <button
            onClick={() => setIsVerificationModalOpen(true)}
            className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              user.verificationStatus === 'verified'
                ? 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                : user.verificationStatus === 'pending'
                ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
            title="انقر لإدارة توثيق البطاقة الطلابية"
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>
              {user.verificationStatus === 'verified' && (language === 'ar' ? 'طالب موثق' : 'Étudiant vérifié')}
              {user.verificationStatus === 'pending' && (language === 'ar' ? 'قيد المراجعة' : 'En vérification')}
              {user.verificationStatus === 'unverified' && (language === 'ar' ? 'وثّق بطاقتك' : 'Vérifier')}
              {user.verificationStatus === 'rejected' && (language === 'ar' ? 'أعد التوثيق' : 'Refusé')}
            </span>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line clean text navigation links (Desktop & Tablet) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                  isActive
                    ? 'border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 font-semibold'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                }`}
              >
                {language === 'ar' ? link.labelAr : language === 'fr' ? link.labelFr : link.labelEn}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick primary actions & controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Device Frame View Switcher (Tested for Mobile 390px vs Responsive Desktop) */}
          <button
            onClick={() => setDeviceViewMode(deviceViewMode === 'mobile_frame' ? 'responsive' : 'mobile_frame')}
            className="hidden lg:flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-md transition-colors"
            title={deviceViewMode === 'mobile_frame' ? 'التبديل إلى العرض المستجيب الكامل' : 'التبديل إلى إطار الهاتف المحمول (390px)'}
          >
            {deviceViewMode === 'mobile_frame' ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="text-[11px]">عرض واسع</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span className="text-[11px]">هاتف (390px)</span>
              </>
            )}
          </button>

          {/* Design System & Audit Documentation Viewer Trigger */}
          <button
            onClick={() => setIsDesignSystemModalOpen(true)}
            className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/50 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200 dark:border-teal-800 transition-colors"
            title="نظام التصميم وقائمة الشاشات / Design System & Audit"
          >
            <Layers className="w-3.5 h-3.5" />
            <span className="text-[11px]">نظام التصميم</span>
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="تبديل اللغة / Changer de langue"
          >
            <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span className="uppercase text-[11px] font-mono">
              {language === 'ar' ? 'العربية' : language === 'fr' ? 'FR' : 'EN'}
            </span>
          </button>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-400" />}
          </button>

          {/* Notifications Trigger */}
          <button
            onClick={() => setIsNotificationsOpen(true)}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Student Safety Emergency SOS Button */}
          <button
            onClick={() => setIsSafetyModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95"
            title={language === 'ar' ? 'مركز الأمان والمساعدة الطلابية' : 'Sécurité & SOS Étudiant'}
          >
            <ShieldAlert className="w-3.5 h-3.5 animate-pulse" />
            <span className="hidden sm:inline">
              {language === 'ar' ? 'أمان الطالب' : 'SOS'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
