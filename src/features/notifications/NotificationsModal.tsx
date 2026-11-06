import React from 'react';
import {
  X,
  Bell,
  CheckCheck,
  Compass,
  Ticket,
  GraduationCap,
  Gift,
  Info,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationItem } from '../../types';

export const NotificationsModal: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    setActiveTab,
    language,
  } = useApp();

  if (!isNotificationsOpen) return null;

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'transport':
        return <Compass className="w-4 h-4 text-teal-600 dark:text-teal-400" />;
      case 'booking':
        return <Ticket className="w-4 h-4 text-blue-600 dark:text-blue-400" />;
      case 'verification':
        return <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
      case 'benefit':
        return <Gift className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
      default:
        return <Info className="w-4 h-4 text-slate-600 dark:text-slate-400" />;
    }
  };

  const handleNotificationClick = (item: NotificationItem) => {
    markNotificationAsRead(item.id);
    if (item.actionTab) {
      setActiveTab(item.actionTab);
      setIsNotificationsOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 transition-all flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              {language === 'ar' ? 'مركز التنبيهات والإشعارات' : 'Notifications'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsAsRead}
              className="text-[11px] text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-1 font-semibold"
              title={language === 'ar' ? 'تحديد الكل كمقروء' : 'Tout marquer comme lu'}
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {language === 'ar' ? 'تحديد الكل' : 'Tout lire'}
              </span>
            </button>
            <button
              onClick={() => setIsNotificationsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notifications list */}
        <div className="p-3 overflow-y-auto space-y-2 flex-1 divide-y divide-slate-100 dark:divide-slate-800">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => handleNotificationClick(item)}
              className={`p-3 rounded-xl transition-all cursor-pointer flex items-start gap-3 pt-3 ${
                !item.isRead
                  ? 'bg-teal-50/50 dark:bg-teal-950/20 hover:bg-teal-50 dark:hover:bg-teal-950/40'
                  : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className={`text-xs truncate ${!item.isRead ? 'font-bold text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>
                    {language === 'ar' ? item.titleAr : item.titleFr}
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
                  {language === 'ar' ? item.bodyAr : item.bodyFr}
                </p>
              </div>

              {!item.isRead && (
                <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0 mt-1.5" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
