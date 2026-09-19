const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, 'seed.json');
const STORE_FILE = path.join(__dirname, 'store.json');

class DataStore {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    try {
      if (fs.existsSync(STORE_FILE)) {
        const raw = fs.readFileSync(STORE_FILE, 'utf8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('Failed reading store.json, falling back to seed.json:', err.message);
    }

    try {
      const rawSeed = fs.readFileSync(SEED_FILE, 'utf8');
      const parsed = JSON.parse(rawSeed);
      this.saveToFile(parsed);
      return parsed;
    } catch (err) {
      console.error('Failed reading seed.json:', err.message);
      return {
        neighborhoods: [],
        categories: [],
        swaps: [],
        currentUser: null,
        chats: [],
        meetupSpots: [],
        impactStats: {},
        reviews: []
      };
    }
  }

  saveToFile(dataToSave = this.data) {
    try {
      fs.writeFileSync(STORE_FILE, JSON.stringify(dataToSave, null, 2), 'utf8');
    } catch (err) {
      console.warn('Failed writing to store.json:', err.message);
    }
  }

  getNeighborhoods() {
    return this.data.neighborhoods;
  }

  getCategories() {
    return this.data.categories;
  }

  getCurrentUser() {
    return this.data.currentUser;
  }

  updateCurrentUser(updates) {
    this.data.currentUser = { ...this.data.currentUser, ...updates };
    this.saveToFile();
    return this.data.currentUser;
  }

  getSwaps(filters = {}) {
    let result = [...this.data.swaps];

    if (filters.category && filters.category !== 'all') {
      result = result.filter(s => s.category.toLowerCase() === filters.category.toLowerCase());
    }

    if (filters.type && filters.type !== 'all') {
      result = result.filter(s => s.type === filters.type);
    }

    if (filters.neighborhoodId && filters.neighborhoodId !== 'all') {
      const nObj = this.data.neighborhoods.find(n => n.id === filters.neighborhoodId);
      if (nObj) {
        result = result.filter(s => s.author.neighborhood.toLowerCase().includes(nObj.name.toLowerCase()) ||
                                   s.author.neighborhood.toLowerCase().includes(nObj.city.split(',')[0].toLowerCase()));
      }
    }

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.offering.toLowerCase().includes(q) ||
        s.seeking.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
      );
    }

    if (filters.urgency && filters.urgency !== 'all') {
      result = result.filter(s => s.urgency === filters.urgency);
    }

    return result;
  }

  getSwapById(id) {
    return this.data.swaps.find(s => s.id === id);
  }

  createSwap(swapData) {
    const newSwap = {
      id: `swp-${Date.now()}`,
      title: swapData.title,
      type: swapData.type || 'offer',
      category: swapData.category || 'language',
      offering: swapData.offering,
      seeking: swapData.seeking,
      description: swapData.description || '',
      author: {
        id: this.data.currentUser.id,
        name: this.data.currentUser.name,
        neighborhood: swapData.neighborhood || this.data.currentUser.neighborhoodName,
        swapsCompleted: this.data.currentUser.swapsCompleted,
        rating: 5.0,
        avatar: this.data.currentUser.avatar,
        badges: this.data.currentUser.badges
      },
      urgency: swapData.urgency || 'flexible',
      preferredMeeting: swapData.preferredMeeting || 'Public Library or Park',
      mode: swapData.mode || 'in-person',
      createdAt: new Date().toISOString(),
      status: 'open',
      interestedCount: 0
    };

    this.data.swaps.unshift(newSwap);
    this.saveToFile();
    return newSwap;
  }

  getChats() {
    return this.data.chats;
  }

  getChatByPartnerId(partnerId) {
    let chat = this.data.chats.find(c => c.partnerId === partnerId);
    if (!chat) {
      // Find author or fallback
      const swapWithAuthor = this.data.swaps.find(s => s.author.id === partnerId);
      const partnerName = swapWithAuthor ? swapWithAuthor.author.name : 'Neighbor';
      const partnerAvatar = swapWithAuthor ? swapWithAuthor.author.avatar : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80';
      const partnerNeigh = swapWithAuthor ? swapWithAuthor.author.neighborhood : 'Local Neighborhood';

      chat = {
        id: `chat_${partnerId}`,
        partnerId,
        partnerName,
        partnerAvatar,
        partnerNeighborhood: partnerNeigh,
        swapId: swapWithAuthor ? swapWithAuthor.id : null,
        swapTitle: swapWithAuthor ? swapWithAuthor.title : 'Community Skill Exchange',
        agreement: null,
        messages: [
          {
            id: `msg-${Date.now()}`,
            senderId: partnerId,
            text: `Hello neighbor! Thanks for reaching out about this skill swap. When are you free to connect?`,
            timestamp: new Date().toISOString()
          }
        ]
      };
      this.data.chats.unshift(chat);
      this.saveToFile();
    }
    return chat;
  }

  sendMessage(partnerId, text, senderId = 'usr_me') {
    const chat = this.getChatByPartnerId(partnerId);
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      senderId,
      text,
      timestamp: new Date().toISOString()
    };
    chat.messages.push(newMsg);

    this.saveToFile();
    return { chat, message: newMsg };
  }

  proposeAgreement(partnerId, agreementData) {
    const chat = this.getChatByPartnerId(partnerId);
    chat.agreement = {
      status: 'proposed',
      terms: agreementData.terms,
      location: agreementData.location || 'Local Public Library',
      date: agreementData.date || 'Flexible this week',
      proposedBy: agreementData.proposedBy || 'usr_me',
      proposedAt: new Date().toISOString()
    };
    this.saveToFile();
    return chat;
  }

  acceptAgreement(partnerId) {
    const chat = this.getChatByPartnerId(partnerId);
    if (chat && chat.agreement) {
      chat.agreement.status = 'accepted';
      chat.agreement.acceptedAt = new Date().toISOString();
      this.saveToFile();
    }
    return chat;
  }

  completeSwap(partnerId, reviewData = {}) {
    const chat = this.getChatByPartnerId(partnerId);
    if (chat && chat.agreement) {
      chat.agreement.status = 'completed';
      chat.agreement.completedAt = new Date().toISOString();
    }

    // Award karma to current user
    this.data.currentUser.karmaHours = (this.data.currentUser.karmaHours || 0) + 1;
    this.data.currentUser.swapsCompleted = (this.data.currentUser.swapsCompleted || 0) + 1;

    // Update global impact stats
    this.data.impactStats.hoursExchanged += 2;
    this.data.impactStats.moneySavedEstimateUSD += 60;
    this.data.impactStats.neighborsConnected += 1;

    if (reviewData.comment) {
      this.data.reviews.unshift({
        id: `rev-${Date.now()}`,
        fromName: this.data.currentUser.name,
        toName: chat ? chat.partnerName : 'Neighbor',
        swapTitle: chat ? chat.swapTitle : 'Community Swap',
        rating: reviewData.rating || 5,
        comment: reviewData.comment,
        badge: reviewData.badge || 'Helpful Neighbor',
        date: 'Just now'
      });
    }

    this.saveToFile();
    return {
      chat,
      currentUser: this.data.currentUser,
      impactStats: this.data.impactStats
    };
  }

  getMeetupSpots() {
    return this.data.meetupSpots;
  }

  getImpactStats() {
    return this.data.impactStats;
  }

  getReviews() {
    return this.data.reviews;
  }
}

module.exports = new DataStore();

