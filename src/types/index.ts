export type Language = 'ar' | 'fr' | 'en';
export type Theme = 'light' | 'dark';
export type NavigationTab = 'home' | 'mobility' | 'bookings' | 'benefits' | 'profile';

export type TransportType = 'private' | 'taxi' | 'bus' | 'campus' | 'intercity';

export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatar: string;
  wilayaId: string;
  wilayaNameAr: string;
  wilayaNameFr: string;
  municipalityId: string;
  municipalityNameAr: string;
  municipalityNameFr: string;
  universityId: string;
  universityNameAr: string;
  facultyAr: string;
  departmentAr: string;
  studyLevelAr: string;
  studentCardId: string;
  verificationStatus: VerificationStatus;
  verificationRejectReason?: string;
  cardFrontUrl?: string;
  cardBackUrl?: string;
  submissionDate?: string;
  savedLocations: SavedLocation[];
}

export interface SavedLocation {
  id: string;
  titleAr: string;
  titleFr: string;
  titleEn: string;
  addressAr: string;
  type: 'home' | 'university' | 'work' | 'custom';
}

export interface Wilaya {
  code: string;
  nameAr: string;
  nameFr: string;
}

export interface Municipality {
  id: string;
  wilayaCode: string;
  nameAr: string;
  nameFr: string;
}

export interface University {
  id: string;
  wilayaCode: string;
  nameAr: string;
  nameFr: string;
  campusNameAr: string;
  shortName: string;
}

export interface DriverInfo {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  tripsCount: number;
  carModel: string;
  carColor: string;
  licensePlate: string;
  phone: string;
  etaMinutes: number;
}

export type TripStatus =
  | 'idle'
  | 'searching'
  | 'driver_found'
  | 'driver_arriving'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface PrivateRideOption {
  id: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  descriptionAr: string;
  basePriceDzd: number;
  discountedPriceDzd: number;
  capacity: number;
  etaMinutes: number;
  tier: 'wasla_eco' | 'wasla_comfort' | 'wasla_shared';
}

export interface BusRoute {
  id: string;
  lineCode: string;
  departureCityAr: string;
  departureStationAr: string;
  destinationCityAr: string;
  destinationStationAr: string;
  departureTime: string;
  arrivalTime: string;
  durationAr: string;
  operatorAr: string;
  priceDzd: number;
  busTypeAr: string;
  availableSeats: number;
  totalSeats: number;
  amenities: string[];
}

export interface BusSeat {
  seatNumber: number;
  row: number;
  col: number; // 0, 1 = left side, 2 = aisle, 3, 4 = right side
  status: 'available' | 'occupied' | 'selected' | 'accessible';
  priceDzd: number;
}

export interface CampusRoute {
  id: string;
  lineCode: string;
  universityNameAr: string;
  residenceNameAr: string;
  stopsAr: string[];
  departureTimes: string[];
  frequencyMinutes: number;
  nextDepartureMinutes: number;
  status: 'on_time' | 'delayed' | 'offline';
  notesAr: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  type: TransportType;
  departureAr: string;
  destinationAr: string;
  date: string;
  time: string;
  passengerName: string;
  seatNumber?: string;
  operatorAr: string;
  priceDzd: number;
  paymentStatus: 'paid' | 'pending' | 'cancelled';
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
  driverInfo?: DriverInfo;
  createdAt: string;
}

export type BenefitCategory = 'all' | 'food' | 'stationery' | 'tech' | 'telecom' | 'education' | 'sports';

export interface BenefitOffer {
  id: string;
  businessNameAr: string;
  businessNameFr: string;
  category: BenefitCategory;
  titleAr: string;
  discountPercent: number;
  promoCode: string;
  expiryDate: string;
  locationAr: string;
  termsAr: string;
  isSaved: boolean;
  isRedeemed: boolean;
  rating: number;
  image: string;
  badgeAr?: string;
}

export type OpportunityCategory = 'all' | 'scholarship' | 'internship' | 'training' | 'job' | 'competition';

export interface Opportunity {
  id: string;
  titleAr: string;
  titleFr: string;
  organizationAr: string;
  category: OpportunityCategory;
  locationAr: string;
  deadline: string;
  descriptionAr: string;
  eligibilityAr: string;
  isSaved: boolean;
  hasApplied: boolean;
  stipendAr?: string;
  durationAr?: string;
}

export interface NotificationItem {
  id: string;
  category: 'transport' | 'booking' | 'verification' | 'benefit' | 'system';
  titleAr: string;
  titleFr: string;
  bodyAr: string;
  bodyFr: string;
  timestamp: string;
  isRead: boolean;
  actionTab?: NavigationTab;
}
