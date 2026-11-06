import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { DisclaimerBanner } from './components/common/DisclaimerBanner';
import { HomeScreen } from './features/home/HomeScreen';
import { MobilityScreen } from './features/transportation/MobilityScreen';
import { BookingsScreen } from './features/bookings/BookingsScreen';
import { BenefitsScreen } from './features/benefits/BenefitsScreen';
import { ProfileScreen } from './features/profile/ProfileScreen';

// Modals
import { OnboardingModal } from './features/onboarding/OnboardingModal';
import { AuthModal } from './features/auth/AuthModal';
import { StudentVerificationModal } from './features/verification/StudentVerificationModal';
import { BusSeatPickerModal } from './features/transportation/BusSeatPickerModal';
import { DigitalTicketModal } from './features/bookings/DigitalTicketModal';
import { BenefitDetailsModal } from './features/benefits/BenefitDetailsModal';
import { OpportunityDetailsModal } from './features/opportunities/OpportunityDetailsModal';
import { NotificationsModal } from './features/notifications/NotificationsModal';
import { SafetyModal } from './features/safety/SafetyModal';
import { ChangePasswordModal } from './features/profile/ChangePasswordModal';
import { PrivacySettingsModal } from './features/profile/PrivacySettingsModal';
import { TaxiBookingModal } from './features/transportation/TaxiBookingModal';
import { DesignSystemModal } from './features/docs/DesignSystemModal';

import { Wifi, BatteryMedium, Signal, Smartphone, Monitor, Sliders } from 'lucide-react';

const AppContent: React.FC = () => {
  const {
    activeTab,
    deviceViewMode,
    setDeviceViewMode,
    mobileWidth,
    setMobileWidth,
    toastMessage,
    language,
    setIsDesignSystemModalOpen,
  } = useApp();

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />;
      case 'mobility':
        return <MobilityScreen />;
      case 'bookings':
        return <BookingsScreen />;
      case 'benefits':
        return <BenefitsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const widthClasses: Record<string, string> = {
    '360px': 'max-w-[360px]',
    '375px': 'max-w-[375px]',
    '390px': 'max-w-[390px]',
    '412px': 'max-w-[412px]',
    '430px': 'max-w-[430px]',
  };

  const selectedWidthClass = widthClasses[mobileWidth] || 'max-w-[390px]';

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Prototype Disclaimer */}
      <DisclaimerBanner />

      {/* Main Container: Mobile Frame vs Fluid Responsive */}
      {deviceViewMode === 'mobile_frame' ? (
        <div className="flex-1 flex flex-col items-center justify-start py-2 sm:py-6 px-2 sm:px-4">
          {/* External Viewport Bar for Multi-Device Screen Testing */}
          <div className="hidden lg:flex items-center justify-between w-full max-w-[620px] mb-3 px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-sm text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
              <Smartphone className="w-3.5 h-3.5 text-teal-600" />
              <span>فحص أحجام الهواتف:</span>
            </div>

            {/* Quick Width Buttons: 360, 375, 390, 412, 430 */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-mono">
              {(['360px', '375px', '390px', '412px', '430px'] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setMobileWidth(w)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    mobileWidth === w
                      ? 'bg-teal-600 text-white font-bold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDesignSystemModalOpen(true)}
                className="text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:underline"
              >
                وثائق الشاشات
              </button>
              <span className="text-slate-300">|</span>
              <button
                onClick={() => setDeviceViewMode('responsive')}
                className="text-slate-700 dark:text-slate-300 hover:text-teal-600 font-semibold flex items-center gap-1 text-[11px]"
              >
                <Monitor className="w-3 h-3 text-teal-600" />
                <span>عرض واسع</span>
              </button>
            </div>
          </div>

          {/* Smartphone Hardware Frame Mockup */}
          <div
            className={`w-full ${selectedWidthClass} min-h-[780px] bg-white dark:bg-slate-900 rounded-[36px] sm:shadow-2xl sm:border-[8px] sm:border-slate-800 dark:sm:border-slate-800/80 overflow-hidden relative flex flex-col transition-all duration-200`}
          >
            {/* Simulated Phone Status Bar */}
            <div className="hidden sm:flex items-center justify-between px-6 pt-2 pb-1 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-[11px] font-semibold border-b border-slate-100 dark:border-slate-800/60 z-30 select-none">
              <span className="font-mono">12:45</span>
              {/* Dynamic Island / Speaker notch */}
              <div className="w-24 h-4 bg-slate-900 dark:bg-slate-800 rounded-full mx-auto" />
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                <span className="text-[10px] font-mono mr-1">Mobilis 4G</span>
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3" />
                <BatteryMedium className="w-4 h-4" />
              </div>
            </div>

            {/* App Header inside frame */}
            <Header />

            {/* Scrollable Screen Content */}
            <main className="flex-1 overflow-y-auto px-4 pt-4 pb-20">
              {renderActiveScreen()}
            </main>

            {/* Mobile Fixed Bottom Navigation */}
            <BottomNav />
          </div>
        </div>
      ) : (
        /* Full Fluid Responsive Canvas */
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 pb-20">
            {renderActiveScreen()}
          </main>
          <BottomNav />
        </div>
      )}

      {/* Global Interactive Modals */}
      <OnboardingModal />
      <AuthModal />
      <StudentVerificationModal />
      <BusSeatPickerModal />
      <DigitalTicketModal />
      <BenefitDetailsModal />
      <OpportunityDetailsModal />
      <NotificationsModal />
      <SafetyModal />
      <ChangePasswordModal />
      <PrivacySettingsModal />
      <TaxiBookingModal />
      <DesignSystemModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950 px-4 py-2.5 rounded-xl shadow-xl border border-slate-800 dark:border-slate-200 text-xs font-semibold flex items-center justify-center text-center animate-in fade-in slide-in-from-bottom-3 duration-200">
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
