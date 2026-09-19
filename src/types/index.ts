export type SwapType = 'offer' | 'request';
export type UrgencyLevel = 'normal' | 'urgent';
export type AvailabilityLevel = 'now' | 'today' | 'this-week' | 'unavailable';
export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export type SwapStatus = 'open' | 'in-progress' | 'completed';
export type AgreementStatus = 'pending' | 'connected' | 'agreement_accepted' | 'in_progress' | 'completed';

export interface Author {
  id: string;
  name: string;
  swapsCompleted: number;
  hoursExchanged: number;
  rating: number;
  avatar: string;
  badges: string[];
  verifiedMember: boolean;
  endorsementsCount: number;
  availability: AvailabilityLevel;
  preferredTime: string;
  skillsOffered: string[];
  skillsLearned: string[];
}

export interface Swap {
  id: string;
  title: string;
  type: SwapType;
  category: string;
  offering: string;
  seeking: string;
  description: string;
  author: Author;
  urgency: UrgencyLevel;
  availability: AvailabilityLevel;
  preferredTime: string;
  skillLevel: SkillLevel;
  mode: 'in-person' | 'remote' | 'flexible';
  safeMeetingPreference: string;
  createdAt: string;
  status: SwapStatus;
  interestedCount: number;
  matchScore?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: string[];
}

export interface CurrentUser {
  id: string;
  name: string;
  avatar: string;
  karmaHours: number;
  totalLifetimeHours: number;
  swapsCompleted: number;
  hoursExchanged: number;
  skillsOfferedCount: number;
  skillsLearnedCount: number;
  rating: number;
  memberSince: string;
  badges: string[];
  endorsementsCount: number;
  availability: AvailabilityLevel;
  preferredTime: string;
  estimatedMoneySavedINR: number;
}

export interface TimeBankTransaction {
  id: string;
  amount: number;
  type: 'earned' | 'spent';
  description: string;
  timestamp: string;
  partnerName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'match' | 'agreement' | 'message' | 'karma' | 'system';
  read: boolean;
  timestamp: string;
  actionData?: {
    partnerId?: string;
    swapId?: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface SwapAgreement {
  status: AgreementStatus;
  terms: string;
  durationHours: number;
  userProvidedSkill: string;
  userReceivedSkill: string;
  scheduledTime?: string;
  proposedBy: string;
  proposedAt?: string;
  acceptedAt?: string;
  completedAt?: string;
}

export interface Chat {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string;
  swapId?: string | null;
  swapTitle?: string;
  status: AgreementStatus;
  agreement?: SwapAgreement | null;
  messages: Message[];
}

export interface SmartMatch {
  swap: Swap;
  matchPercentage: number;
  matchedSkill: string;
  reasons: string[];
}

export interface ImpactStats {
  communityMembers: number;
  successfulSwaps: number;
  hoursExchanged: number;
  moneySavedEstimateINR: number;
  positiveReviewsPercentage: number;
  skillsShared: number;
  communityConnections: number;
  communityResilienceScore: string;
  topCategories: { name: string; percentage: number; count: number }[];
}

export interface Review {
  id: string;
  fromName: string;
  toName: string;
  swapTitle: string;
  rating: number;
  comment: string;
  badge: string;
  date: string;
  skillQuality: number;
  communicationQuality: number;
  reliability: number;
}

export interface A11ySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  lowBandwidth: boolean;
  dyslexicFont: boolean;
  reducedMotion: boolean;
}

export interface FilterState {
  type: 'all' | 'offer' | 'request';
  category: string;
  search: string;
  availability: string;
  skillLevel: string;
  urgentOnly: boolean;
  minRating: number;
}
