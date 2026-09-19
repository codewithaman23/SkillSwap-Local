export type SwapType = 'offer' | 'request';
export type UrgencyLevel = 'flexible' | 'this-week' | 'this-weekend' | 'urgent';

export interface Author {
  id: string;
  name: string;
  neighborhood: string;
  swapsCompleted: number;
  rating: number;
  avatar: string;
  badges: string[];
}

export interface Swap {
  id: string;
  title: string;
  type: SwapType;
  category: string;
  offering: string;
  seeking: string;
  description: string;
  neighborhood?: string;
  author: Author;
  urgency: UrgencyLevel;
  preferredMeeting: string;
  mode: 'in-person' | 'remote' | 'hybrid';
  createdAt: string;
  status: 'open' | 'in-progress' | 'completed';
  interestedCount: number;
}

export interface Neighborhood {
  id: string;
  name: string;
  city: string;
  activeCount: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  neighborhoodId: string;
  neighborhoodName: string;
  avatar: string;
  karmaHours: number;
  swapsCompleted: number;
  memberSince: string;
  badges: string[];
  privacySetting: string;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface SwapAgreement {
  status: 'proposed' | 'accepted' | 'completed';
  terms: string;
  location: string;
  date: string;
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
  partnerNeighborhood: string;
  swapId?: string | null;
  swapTitle?: string;
  agreement?: SwapAgreement | null;
  messages: Message[];
}

export interface ImpactStats {
  hoursExchanged: number;
  moneySavedEstimateUSD: number;
  neighborsConnected: number;
  activeNeighborhoods: number;
  communityResilienceScore: string;
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
}

export interface MeetupSpot {
  name: string;
  type: string;
  badge: string;
}

export interface A11ySettings {
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'xlarge';
  lowBandwidth: boolean;
  dyslexicFont: boolean;
}

export interface FilterState {
  type: 'all' | 'offer' | 'request';
  category: string;
  neighborhoodId: string;
  search: string;
  urgency: string;
}

