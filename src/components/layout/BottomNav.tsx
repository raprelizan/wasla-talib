import React from 'react';
import { Home, Compass, Ticket, Gift, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, language, bookings, user } = useApp();

  interface TabItem {
    id: NavigationTab;
    labelAr: string;
    labelFr: string;
    labelEn: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }

  const tabs: TabItem[] = [
    {
      id: 'home',
      labelAr: 'الرئيسية',
      labelFr: 'Accueil',
      labelEn: 'Home',
      icon: Home,
    },
    {
      id: 'mobility',
      labelAr: 'التنقل',
      labelFr: 'Mobilité',
      labelEn: 'Transit',
      icon: Compass,
    },
    {
      id: 'bookings',
      labelAr: 'حجوزاتي',
      labelFr: 'Trajets',
      labelEn: 'Bookings',
      icon: Ticket,
      badge: bookings.filter((b) => b.status === 'upcoming' || b.status === 'active').length,
    },
    {
      id: 'benefits',
      labelAr: 'المزايا',
      labelFr: 'Avantages',
      labelEn: 'Benefits',
      icon: Gift,
    },
    {
      id: 'profile',
      labelAr: 'حسابي',
      labelFr: 'Compte',
      labelEn: 'Profile',
      icon: User,
    },
  ];

  return (
    <nav
      aria-label="التنقل الرئيسي"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe md:hidden shadow-lg"
    >
      <div className="grid grid-cols-5 items-center h-16 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 transition-colors relative ${
                isActive
                  ? 'text-teal-600 dark:text-teal-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-150 ${
                    isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="absolute -top-1 -right-2.5 w-4 h-4 rounded-full bg-teal-600 text-white text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {language === 'ar' ? tab.labelAr : language === 'fr' ? tab.labelFr : tab.labelEn}
              </span>
              {isActive && (
                <span className="absolute top-0 w-8 h-0.5 bg-teal-600 dark:bg-teal-400 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
