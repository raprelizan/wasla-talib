import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Theme,
  NavigationTab,
  TransportType,
  UserProfile,
  TripStatus,
  Booking,
  BenefitOffer,
  Opportunity,
  NotificationItem,
  PrivateRideOption,
  BusRoute,
} from '../types';
import {
  INITIAL_USER,
  BENEFIT_OFFERS,
  OPPORTUNITIES,
  NOTIFICATIONS,
  MOCK_BOOKINGS,
  MOCK_DRIVER,
  PRIVATE_RIDE_OPTIONS,
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  deviceViewMode: 'mobile_frame' | 'responsive';
  setDeviceViewMode: (mode: 'mobile_frame' | 'responsive') => void;

  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;

  selectedMobilityMode: TransportType;
  setSelectedMobilityMode: (mode: TransportType) => void;

  user: UserProfile;
  updateUser: (updated: Partial<UserProfile>) => void;
  submitVerification: (data: {
    universityId: string;
    universityNameAr: string;
    facultyAr: string;
    departmentAr: string;
    studyLevelAr: string;
    studentCardId: string;
    wilayaId: string;
    wilayaNameAr: string;
    municipalityId: string;
    municipalityNameAr: string;
    cardFrontUrl?: string;
    cardBackUrl?: string;
  }) => void;
  resetVerificationStatus: () => void;

  // Active Ride Simulator
  tripStatus: TripStatus;
  selectedRideOption: PrivateRideOption | null;
  pickupLocation: string;
  setPickupLocation: (loc: string) => void;
  destinationLocation: string;
  setDestinationLocation: (loc: string) => void;
  driverInfo: typeof MOCK_DRIVER;
  tripProgressPercent: number;
  startTripSearch: (option: PrivateRideOption) => void;
  cancelActiveTrip: () => void;
  completeActiveTrip: () => void;

  // Bookings
  bookings: Booking[];
  activeTicket: Booking | null;
  setActiveTicket: (b: Booking | null) => void;
  addBooking: (b: Booking) => void;
  cancelBooking: (id: string) => void;

  // Seat Picker Modal
  selectedBusRouteForSeats: BusRoute | null;
  openBusSeatPicker: (route: BusRoute) => void;
  closeBusSeatPicker: () => void;

  // Benefits & Opportunities
  benefits: BenefitOffer[];
  toggleSaveBenefit: (id: string) => void;
  redeemBenefit: (id: string) => void;
  selectedBenefitForDetails: BenefitOffer | null;
  setSelectedBenefitForDetails: (b: BenefitOffer | null) => void;

  opportunities: Opportunity[];
  toggleSaveOpportunity: (id: string) => void;
  applyOpportunity: (id: string) => void;
  selectedOpportunityForDetails: Opportunity | null;
  setSelectedOpportunityForDetails: (opp: Opportunity | null) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  unreadCount: number;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // Modals & Flows
  isOnboardingOpen: boolean;
  setIsOnboardingOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  openAuthModal: (mode: 'login' | 'register') => void;
  closeAuthModal: () => void;
  isVerificationModalOpen: boolean;
  setIsVerificationModalOpen: (open: boolean) => void;
  isSafetyModalOpen: boolean;
  setIsSafetyModalOpen: (open: boolean) => void;

  // Mobile frame width presets (360px, 375px, 390px, 412px, 430px)
  mobileWidth: '360px' | '375px' | '390px' | '412px' | '430px';
  setMobileWidth: (width: '360px' | '375px' | '390px' | '412px' | '430px') => void;

  // Design System & Audit Documentation Modal
  isDesignSystemModalOpen: boolean;
  setIsDesignSystemModalOpen: (open: boolean) => void;

  // Password & Privacy Modals
  isPasswordModalOpen: boolean;
  setIsPasswordModalOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;

  // Taxi Flow
  isTaxiBookingModalOpen: boolean;
  setIsTaxiBookingModalOpen: (open: boolean) => void;
  taxiTripStatus: 'idle' | 'searching' | 'driver_assigned' | 'completed';
  setTaxiTripStatus: (status: 'idle' | 'searching' | 'driver_assigned' | 'completed') => void;

  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [theme, setThemeState] = useState<Theme>('light');
  const [deviceViewMode, setDeviceViewMode] = useState<'mobile_frame' | 'responsive'>('mobile_frame');
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');
  const [selectedMobilityMode, setSelectedMobilityMode] = useState<TransportType>('private');

  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [activeTicket, setActiveTicket] = useState<Booking | null>(null);

  // Transportation search & state
  const [pickupLocation, setPickupLocation] = useState('الإقامة الجامعية درقانة 2، برج الكيفان');
  const [destinationLocation, setDestinationLocation] = useState('جامعة العلوم والتكنولوجيا (USTHB) باب الزوار');
  const [tripStatus, setTripStatus] = useState<TripStatus>('idle');
  const [selectedRideOption, setSelectedRideOption] = useState<PrivateRideOption | null>(PRIVATE_RIDE_OPTIONS[0]);
  const [driverInfo] = useState(MOCK_DRIVER);
  const [tripProgressPercent, setTripProgressPercent] = useState(0);

  // Benefits & Opportunities
  const [benefits, setBenefits] = useState<BenefitOffer[]>(BENEFIT_OFFERS);
  const [selectedBenefitForDetails, setSelectedBenefitForDetails] = useState<BenefitOffer | null>(null);

  const [opportunities, setOpportunities] = useState<Opportunity[]>(OPPORTUNITIES);
  const [selectedOpportunityForDetails, setSelectedOpportunityForDetails] = useState<Opportunity | null>(null);

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Bus seat modal
  const [selectedBusRouteForSeats, setSelectedBusRouteForSeats] = useState<BusRoute | null>(null);

  // Modals
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Mobile frame width presets (360px, 375px, 390px, 412px, 430px)
  const [mobileWidth, setMobileWidth] = useState<'360px' | '375px' | '390px' | '412px' | '430px'>('390px');

  // Documentation / Design System Modal
  const [isDesignSystemModalOpen, setIsDesignSystemModalOpen] = useState(false);

  // Password & Privacy Modals
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Taxi Flow
  const [isTaxiBookingModalOpen, setIsTaxiBookingModalOpen] = useState(false);
  const [taxiTripStatus, setTaxiTripStatus] = useState<'idle' | 'searching' | 'driver_assigned' | 'completed'>('idle');

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Sync RTL / LTR and Language attribute on document
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  // Sync Theme attribute on document
  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (t === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Initial RTL and Theme setup
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Update profile
  const updateUser = (updated: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updated }));
    showToast(language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profil mis à jour');
  };

  // Submit verification
  const submitVerification = (data: {
    universityId: string;
    universityNameAr: string;
    facultyAr: string;
    departmentAr: string;
    studyLevelAr: string;
    studentCardId: string;
    wilayaId: string;
    wilayaNameAr: string;
    municipalityId: string;
    municipalityNameAr: string;
    cardFrontUrl?: string;
    cardBackUrl?: string;
  }) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      verificationStatus: 'pending',
      submissionDate: 'اليوم، نوفمبر 2026',
    }));
    setIsVerificationModalOpen(false);
    showToast(
      language === 'ar'
        ? 'تم إرسال طلب التحقق من البطاقة الطلابية للمراجعة الأكاديمية'
        : 'Demande de vérification soumise'
    );

    // Simulate auto-approval for preview testability after 5 seconds if desired
    setTimeout(() => {
      setUser((prev) => ({
        ...prev,
        verificationStatus: 'verified',
      }));
      showToast(
        language === 'ar'
          ? 'تم تأكيد هويتك الطلابية بنجاح 🎓'
          : 'Identité étudiante validée avec succès 🎓'
      );
    }, 7000);
  };

  const resetVerificationStatus = () => {
    setUser((prev) => ({
      ...prev,
      verificationStatus: 'unverified',
    }));
    showToast(language === 'ar' ? 'تمت إعادة تعيين حالة التوثيق' : 'Statut réinitialisé');
  };

  // Ride simulator logic
  const startTripSearch = (option: PrivateRideOption) => {
    setSelectedRideOption(option);
    setTripStatus('searching');
    showToast(language === 'ar' ? 'جاري البحث عن أقرب سائق معتمد...' : 'Recherche de chauffeur...');

    // Phase 1: Driver found after 2.5s
    setTimeout(() => {
      setTripStatus('driver_found');
      // Phase 2: Driver arriving
      setTimeout(() => {
        setTripStatus('driver_arriving');
        // Phase 3: In progress
        setTimeout(() => {
          setTripStatus('in_progress');
          setTripProgressPercent(15);
        }, 4000);
      }, 3000);
    }, 2500);
  };

  // Simulate progress when trip is active
  useEffect(() => {
    if (tripStatus !== 'in_progress') return;
    const interval = setInterval(() => {
      setTripProgressPercent((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTripStatus('completed');
          // Add to bookings
          const newBooking: Booking = {
            id: `bk_${Date.now()}`,
            bookingRef: `WASLA-2026-VTC${Math.floor(100 + Math.random() * 900)}`,
            type: 'private',
            departureAr: pickupLocation,
            destinationAr: destinationLocation,
            date: 'اليوم',
            time: 'الآن',
            passengerName: user.fullName,
            operatorAr: selectedRideOption?.nameAr || 'وصلة اقتصادي',
            priceDzd: selectedRideOption?.discountedPriceDzd || 320,
            paymentStatus: 'paid',
            status: 'completed',
            driverInfo: driverInfo,
            createdAt: 'الآن',
          };
          setBookings((prev) => [newBooking, ...prev]);
          showToast(language === 'ar' ? 'وصلت إلى وجهتك بسلام! رحلة موفقة.' : 'Vous êtes arrivé à destination !');
          return 100;
        }
        return p + 20;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [tripStatus, pickupLocation, destinationLocation, selectedRideOption, driverInfo, user.fullName, language]);

  const cancelActiveTrip = () => {
    setTripStatus('idle');
    setTripProgressPercent(0);
    showToast(language === 'ar' ? 'تم إلغاء طلب الرحلة' : 'Course annulée');
  };

  const completeActiveTrip = () => {
    setTripStatus('completed');
    setTripProgressPercent(100);
  };

  // Bus seat modal
  const openBusSeatPicker = (route: BusRoute) => {
    setSelectedBusRouteForSeats(route);
  };

  const closeBusSeatPicker = () => {
    setSelectedBusRouteForSeats(null);
  };

  // Bookings
  const addBooking = (booking: Booking) => {
    setBookings((prev) => [booking, ...prev]);
    showToast(language === 'ar' ? 'تم تأكيد حجزك بنجاح! التذكرة متوفرة في حجوزاتي.' : 'Réservation confirmée !');
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled', paymentStatus: 'cancelled' } : b))
    );
    showToast(language === 'ar' ? 'تم إلغاء الحجز' : 'Réservation annulée');
  };

  // Benefits
  const toggleSaveBenefit = (id: string) => {
    setBenefits((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isSaved: !b.isSaved } : b))
    );
    const item = benefits.find((b) => b.id === id);
    if (item) {
      showToast(
        !item.isSaved
          ? language === 'ar'
            ? 'تم حفظ العرض في المفضلة'
            : 'Offre enregistrée'
          : language === 'ar'
          ? 'تمت إزالة العرض من المفضلة'
          : 'Offre retirée'
      );
    }
  };

  const redeemBenefit = (id: string) => {
    setBenefits((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isRedeemed: true } : b))
    );
    showToast(language === 'ar' ? 'تم تفعيل كود الخصم الطلابي بنجاح' : 'Code promo activé avec succès');
  };

  // Opportunities
  const toggleSaveOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, isSaved: !opp.isSaved } : opp))
    );
    const opp = opportunities.find((o) => o.id === id);
    if (opp) {
      showToast(
        !opp.isSaved
          ? language === 'ar'
            ? 'تم حفظ الفرصة في قائمتك'
            : 'Opportunité sauvegardée'
          : language === 'ar'
          ? 'تمت إزالة الفرصة'
          : 'Opportunité retirée'
      );
    }
  };

  const applyOpportunity = (id: string) => {
    setOpportunities((prev) =>
      prev.map((opp) => (opp.id === id ? { ...opp, hasApplied: true } : opp))
    );
    showToast(
      language === 'ar'
        ? 'تم إرسال ملف الترشح المبدئي للمؤسسة المنظمة بنجاح'
        : 'Candidature enregistrée avec succès'
    );
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    showToast(language === 'ar' ? 'تم تحديد كل الإشعارات كمقروءة' : 'Toutes les notifications marquées comme lues');
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Auth modal
  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        toggleTheme,
        deviceViewMode,
        setDeviceViewMode,
        activeTab,
        setActiveTab,
        selectedMobilityMode,
        setSelectedMobilityMode,
        user,
        updateUser,
        submitVerification,
        resetVerificationStatus,
        tripStatus,
        selectedRideOption,
        pickupLocation,
        setPickupLocation,
        destinationLocation,
        setDestinationLocation,
        driverInfo,
        tripProgressPercent,
        startTripSearch,
        cancelActiveTrip,
        completeActiveTrip,
        bookings,
        activeTicket,
        setActiveTicket,
        addBooking,
        cancelBooking,
        selectedBusRouteForSeats,
        openBusSeatPicker,
        closeBusSeatPicker,
        benefits,
        toggleSaveBenefit,
        redeemBenefit,
        selectedBenefitForDetails,
        setSelectedBenefitForDetails,
        opportunities,
        toggleSaveOpportunity,
        applyOpportunity,
        selectedOpportunityForDetails,
        setSelectedOpportunityForDetails,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        unreadCount,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isOnboardingOpen,
        setIsOnboardingOpen,
        isAuthModalOpen,
        authMode,
        openAuthModal,
        closeAuthModal,
        isVerificationModalOpen,
        setIsVerificationModalOpen,
        isSafetyModalOpen,
        setIsSafetyModalOpen,
        mobileWidth,
        setMobileWidth,
        isDesignSystemModalOpen,
        setIsDesignSystemModalOpen,
        isPasswordModalOpen,
        setIsPasswordModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        isTaxiBookingModalOpen,
        setIsTaxiBookingModalOpen,
        taxiTripStatus,
        setTaxiTripStatus,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
