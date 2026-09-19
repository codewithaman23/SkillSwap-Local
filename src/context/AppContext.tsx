import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Swap,
  Neighborhood,
  Category,
  CurrentUser,
  Chat,
  ImpactStats,
  Review,
  MeetupSpot,
  A11ySettings,
  FilterState,
} from '../types';

interface AppContextType {
  // Data
  swaps: Swap[];
  neighborhoods: Neighborhood[];
  categories: Category[];
  currentUser: CurrentUser | null;
  impactStats: ImpactStats | null;
  meetupSpots: MeetupSpot[];
  reviews: Review[];
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Modals & Active Views
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  selectedSwapDetail: Swap | null;
  setSelectedSwapDetail: (swap: Swap | null) => void;
  isImpactModalOpen: boolean;
  setIsImpactModalOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  activeChatPartnerId: string | null;
  setActiveChatPartnerId: (id: string | null) => void;
  activeChat: Chat | null;
  allChats: Chat[];

  // Accessibility
  a11y: A11ySettings;
  toggleHighContrast: () => void;
  setFontSize: (size: 'normal' | 'large' | 'xlarge') => void;
  toggleLowBandwidth: () => void;
  toggleDyslexicFont: () => void;
  resetA11y: () => void;

  // Actions
  createNewSwap: (swapData: Partial<Swap>) => Promise<boolean>;
  openChatWithNeighbor: (neighborId: string, swapId?: string) => void;
  sendMessage: (text: string) => Promise<boolean>;
  proposeAgreement: (terms: string, location: string, date: string) => Promise<boolean>;
  acceptAgreement: () => Promise<boolean>;
  completeSwapAndReview: (rating: number, comment: string, badge: string) => Promise<boolean>;
  switchNeighborhood: (neighborhoodId: string) => void;
  refreshData: () => Promise<void>;
}

const defaultA11y: A11ySettings = {
  highContrast: false,
  fontSize: 'normal',
  lowBandwidth: false,
  dyslexicFont: false,
};

const defaultFilters: FilterState = {
  type: 'all',
  category: 'all',
  neighborhoodId: 'all',
  search: '',
  urgency: 'all',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [impactStats, setImpactStats] = useState<ImpactStats | null>(null);
  const [meetupSpots, setMeetupSpots] = useState<MeetupSpot[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [allChats, setAllChats] = useState<Chat[]>([]);
  const [activeChatPartnerId, setActiveChatPartnerId] = useState<string | null>(null);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filters
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSwapDetail, setSelectedSwapDetail] = useState<Swap | null>(null);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Accessibility State (persisted in localStorage)
  const [a11y, setA11y] = useState<A11ySettings>(() => {
    try {
      const saved = localStorage.getItem('skillswap_a11y');
      return saved ? JSON.parse(saved) : defaultA11y;
    } catch {
      return defaultA11y;
    }
  });

  // Apply HTML classes when a11y changes
  useEffect(() => {
    const root = document.documentElement;
    try {
      localStorage.setItem('skillswap_a11y', JSON.stringify(a11y));
    } catch (e) {
      console.warn(e);
    }

    // High Contrast
    if (a11y.highContrast) root.classList.add('high-contrast');
    else root.classList.remove('high-contrast');

    // Font Scaling
    root.classList.remove('font-scale-large', 'font-scale-xlarge');
    if (a11y.fontSize === 'large') root.classList.add('font-scale-large');
    if (a11y.fontSize === 'xlarge') root.classList.add('font-scale-xlarge');

    // Low Bandwidth
    if (a11y.lowBandwidth) root.classList.add('low-bandwidth');
    else root.classList.remove('low-bandwidth');

    // Dyslexic Font
    if (a11y.dyslexicFont) root.classList.add('font-dyslexic');
    else root.classList.remove('font-dyslexic');
  }, [a11y]);

  const toggleHighContrast = () => setA11y(prev => ({ ...prev, highContrast: !prev.highContrast }));
  const setFontSize = (size: 'normal' | 'large' | 'xlarge') => setA11y(prev => ({ ...prev, fontSize: size }));
  const toggleLowBandwidth = () => setA11y(prev => ({ ...prev, lowBandwidth: !prev.lowBandwidth }));
  const toggleDyslexicFont = () => setA11y(prev => ({ ...prev, dyslexicFont: !prev.dyslexicFont }));
  const resetA11y = () => setA11y(defaultA11y);

  // Fetch Initial Data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Build query string
      const params = new URLSearchParams();
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.type !== 'all') params.append('type', filters.type);
      if (filters.neighborhoodId !== 'all') params.append('neighborhoodId', filters.neighborhoodId);
      if (filters.search) params.append('search', filters.search);
      if (filters.urgency !== 'all') params.append('urgency', filters.urgency);

      const [swapsRes, neighRes, catRes, userRes, impactRes, meetupRes, revRes, chatsRes] = await Promise.all([
        fetch(`/api/swaps?${params.toString()}`),
        fetch('/api/neighborhoods'),
        fetch('/api/categories'),
        fetch('/api/current-user'),
        fetch('/api/impact'),
        fetch('/api/meetup-spots'),
        fetch('/api/reviews'),
        fetch('/api/chats'),
      ]);

      if (swapsRes.ok) setSwaps(await swapsRes.json());
      if (neighRes.ok) setNeighborhoods(await neighRes.json());
      if (catRes.ok) setCategories(await catRes.json());
      if (userRes.ok) setCurrentUser(await userRes.json());
      if (impactRes.ok) setImpactStats(await impactRes.json());
      if (meetupRes.ok) setMeetupSpots(await meetupRes.json());
      if (revRes.ok) setReviews(await revRes.json());
      if (chatsRes.ok) setAllChats(await chatsRes.json());
    } catch (err: any) {
      console.error('Data fetch error:', err);
      setError('Could not connect to local server. Please ensure server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  // Keep active chat in sync
  useEffect(() => {
    if (!activeChatPartnerId) {
      setActiveChat(null);
      return;
    }

    const fetchChat = async () => {
      try {
        const res = await fetch(`/api/chats/${activeChatPartnerId}`);
        if (res.ok) {
          const chat = await res.json();
          setActiveChat(chat);
        }
      } catch (err) {
        console.error('Chat fetch error:', err);
      }
    };

    fetchChat();
    // Poll chat every 3 seconds for instant responsive chatter during demos
    const timer = setInterval(fetchChat, 3000);
    return () => clearInterval(timer);
  }, [activeChatPartnerId]);

  const resetFilters = () => setFilters(defaultFilters);

  const switchNeighborhood = (neighborhoodId: string) => {
    setFilters(prev => ({ ...prev, neighborhoodId }));
  };

  const createNewSwap = async (swapData: Partial<Swap>): Promise<boolean> => {
    try {
      const res = await fetch('/api/swaps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(swapData),
      });
      if (res.ok) {
        const created = await res.json();
        setSwaps(prev => [created, ...prev]);
        setIsCreateModalOpen(false);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const openChatWithNeighbor = (neighborId: string, _swapId?: string) => {
    setSelectedSwapDetail(null);
    setActiveChatPartnerId(neighborId);
  };

  const sendMessage = async (text: string): Promise<boolean> => {
    if (!activeChatPartnerId || !text.trim()) return false;
    try {
      const res = await fetch(`/api/chats/${activeChatPartnerId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
      if (res.ok) {
        const data = await res.json();
        setActiveChat(data.chat);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const proposeAgreement = async (terms: string, location: string, date: string): Promise<boolean> => {
    if (!activeChatPartnerId) return false;
    try {
      const res = await fetch(`/api/chats/${activeChatPartnerId}/agreement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ terms, location, date }),
      });
      if (res.ok) {
        const updatedChat = await res.json();
        setActiveChat(updatedChat);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const acceptAgreement = async (): Promise<boolean> => {
    if (!activeChatPartnerId) return false;
    try {
      const res = await fetch(`/api/chats/${activeChatPartnerId}/accept-agreement`, {
        method: 'POST',
      });
      if (res.ok) {
        const updatedChat = await res.json();
        setActiveChat(updatedChat);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const completeSwapAndReview = async (rating: number, comment: string, badge: string): Promise<boolean> => {
    if (!activeChatPartnerId) return false;
    try {
      const res = await fetch(`/api/chats/${activeChatPartnerId}/complete-swap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, badge }),
      });
      if (res.ok) {
        const data = await res.json();
        setActiveChat(data.chat);
        setCurrentUser(data.currentUser);
        setImpactStats(data.impactStats);
        fetchData();
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <AppContext.Provider
      value={{
        swaps,
        neighborhoods,
        categories,
        currentUser,
        impactStats,
        meetupSpots,
        reviews,
        isLoading,
        error,
        filters,
        setFilters,
        resetFilters,
        isCreateModalOpen,
        setIsCreateModalOpen,
        selectedSwapDetail,
        setSelectedSwapDetail,
        isImpactModalOpen,
        setIsImpactModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        activeChatPartnerId,
        setActiveChatPartnerId,
        activeChat,
        allChats,
        a11y,
        toggleHighContrast,
        setFontSize,
        toggleLowBandwidth,
        toggleDyslexicFont,
        resetA11y,
        createNewSwap,
        openChatWithNeighbor,
        sendMessage,
        proposeAgreement,
        acceptAgreement,
        completeSwapAndReview,
        switchNeighborhood,
        refreshData: fetchData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};

