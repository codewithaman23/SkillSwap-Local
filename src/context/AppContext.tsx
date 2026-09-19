import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Swap,
  Category,
  CurrentUser,
  Chat,
  ImpactStats,
  Review,
  A11ySettings,
  FilterState,
  NotificationItem,
} from '../types';

interface AppContextType {
  // Data
  swaps: Swap[];
  categories: Category[];
  currentUser: CurrentUser | null;
  impactStats: ImpactStats | null;
  reviews: Review[];
  notifications: NotificationItem[];
  isLoading: boolean;
  error: string | null;

  // Filters
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Modals & Panels
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  selectedSwapDetail: Swap | null;
  setSelectedSwapDetail: (swap: Swap | null) => void;
  selectedSmartMatchTarget: Swap | null;
  setSelectedSmartMatchTarget: (swap: Swap | null) => void;
  isImpactModalOpen: boolean;
  setIsImpactModalOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  isDashboardOpen: boolean;
  setIsDashboardOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;

  // Chat
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
  openChatWithNeighbor: (neighborId: string, _swapId?: string) => void;
  sendMessage: (text: string) => Promise<boolean>;
  proposeAgreement: (terms: string, durationHours: number, userProvidedSkill: string, userReceivedSkill: string, scheduledTime: string) => Promise<boolean>;
  acceptAgreement: () => Promise<boolean>;
  completeSwapAndReview: (rating: number, comment: string, badge: string, skillQuality?: number, communicationQuality?: number, reliability?: number) => Promise<boolean>;
  reportUser: (userId: string, reason: string) => Promise<boolean>;
  blockUser: (userId: string) => Promise<boolean>;
  reportListing: (swapId: string, reason: string) => Promise<boolean>;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  refreshData: () => Promise<void>;
}

const defaultA11y: A11ySettings = {
  highContrast: false,
  fontSize: 'normal',
  lowBandwidth: false,
  dyslexicFont: false,
  reducedMotion: false,
};

const defaultFilters: FilterState = {
  type: 'all',
  category: 'all',
  search: '',
  availability: 'all',
  skillLevel: 'all',
  urgentOnly: false,
  minRating: 0,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [swaps, setSwaps] = useState<Swap[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [impactStats, setImpactStats] = useState<ImpactStats | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
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
  const [selectedSmartMatchTarget, setSelectedSmartMatchTarget] = useState<Swap | null>(null);
  const [isImpactModalOpen, setIsImpactModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Accessibility State
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

  // Fetch Data
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.type !== 'all') params.append('type', filters.type);
      if (filters.category !== 'all') params.append('category', filters.category);
      if (filters.availability !== 'all') params.append('availability', filters.availability);
      if (filters.skillLevel !== 'all') params.append('skillLevel', filters.skillLevel);
      if (filters.urgentOnly) params.append('urgentOnly', 'true');
      if (filters.search) params.append('search', filters.search);

      const [swapsRes, catRes, userRes, impactRes, revRes, notifRes, chatsRes] = await Promise.all([
        fetch(`/api/swaps?${params.toString()}`),
        fetch('/api/categories'),
        fetch('/api/current-user'),
        fetch('/api/impact'),
        fetch('/api/reviews'),
        fetch('/api/notifications'),
        fetch('/api/chats'),
      ]);

      if (swapsRes.ok) setSwaps(await swapsRes.json());
      if (catRes.ok) setCategories(await catRes.json());
      if (userRes.ok) setCurrentUser(await userRes.json());
      if (impactRes.ok) setImpactStats(await impactRes.json());
      if (revRes.ok) setReviews(await revRes.json());
      if (notifRes.ok) setNotifications(await notifRes.json());
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
    const timer = setInterval(fetchChat, 2500);
    return () => clearInterval(timer);
  }, [activeChatPartnerId]);

  const resetFilters = () => setFilters(defaultFilters);

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
        // Refresh notifications in case smart match was generated
        fetch('/api/notifications').then(r => r.json()).then(setNotifications);
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
    setSelectedSmartMatchTarget(null);
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

  const proposeAgreement = async (
    terms: string,
    durationHours: number,
    userProvidedSkill: string,
    userReceivedSkill: string,
    scheduledTime: string
  ): Promise<boolean> => {
    if (!activeChatPartnerId) return false;
    try {
      const res = await fetch(`/api/chats/${activeChatPartnerId}/agreement`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ terms, durationHours, userProvidedSkill, userReceivedSkill, scheduledTime }),
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
        // Refresh notifications
        fetch('/api/notifications').then(r => r.json()).then(setNotifications);
        return true;
      }
      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const completeSwapAndReview = async (
    rating: number,
    comment: string,
    badge: string,
    skillQuality: number = 5,
    communicationQuality: number = 5,
    reliability: number = 5
  ): Promise<boolean> => {
    if (!activeChatPartnerId) return false;
    try {
      const res = await fetch(`/api/chats/${activeChatPartnerId}/complete-swap`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating, comment, badge, skillQuality, communicationQuality, reliability }),
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

  const reportUser = async (userId: string, reason: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/users/${userId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const blockUser = async (userId: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/users/${userId}/block`, {
        method: 'POST',
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const reportListing = async (swapId: string, reason: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/swaps/${swapId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason }),
      });
      return res.ok;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const markNotificationRead = async (id: string): Promise<void> => {
    try {
      const res = await fetch(`/api/notifications/${id}/read`, { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const markAllNotificationsRead = async (): Promise<void> => {
    try {
      const res = await fetch('/api/notifications/read-all', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AppContext.Provider
      value={{
        swaps,
        categories,
        currentUser,
        impactStats,
        reviews,
        notifications,
        isLoading,
        error,
        filters,
        setFilters,
        resetFilters,
        isCreateModalOpen,
        setIsCreateModalOpen,
        selectedSwapDetail,
        setSelectedSwapDetail,
        selectedSmartMatchTarget,
        setSelectedSmartMatchTarget,
        isImpactModalOpen,
        setIsImpactModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        isDashboardOpen,
        setIsDashboardOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
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
        reportUser,
        blockUser,
        reportListing,
        markNotificationRead,
        markAllNotificationsRead,
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
