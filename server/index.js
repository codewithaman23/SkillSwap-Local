const express = require('express');
const cors = require('cors');
const path = require('path');
const store = require('./data/store');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 1. Swaps API
app.get('/api/swaps', (req, res) => {
  const { category, type, search, availability, skillLevel, urgentOnly } = req.query;
  const swaps = store.getSwaps({ category, type, search, availability, skillLevel, urgentOnly });
  res.json(swaps);
});

app.get('/api/swaps/:id', (req, res) => {
  const swap = store.getSwapById(req.params.id);
  if (!swap) return res.status(404).json({ error: 'Swap not found' });
  res.json(swap);
});

app.post('/api/swaps', (req, res) => {
  const {
    title,
    type,
    category,
    offering,
    seeking,
    description,
    urgency,
    availability,
    preferredTime,
    skillLevel,
    mode,
    safeMeetingPreference
  } = req.body;

  if (!title || !offering || !seeking) {
    return res.status(400).json({ error: 'Title, offering, and seeking are required' });
  }

  const newSwap = store.createSwap({
    title,
    type,
    category,
    offering,
    seeking,
    description,
    urgency,
    availability,
    preferredTime,
    skillLevel,
    mode,
    safeMeetingPreference
  });

  res.status(201).json(newSwap);
});

// 2. Smart Skill Matching API
app.get('/api/smart-match/:swapId', (req, res) => {
  const swap = store.getSwapById(req.params.swapId);
  if (!swap) return res.status(404).json({ error: 'Target swap not found' });
  const matches = store.getSmartMatchesForSwap(swap);
  res.json(matches);
});

// 3. Notifications API
app.get('/api/notifications', (req, res) => {
  res.json(store.getNotifications());
});

app.post('/api/notifications/:id/read', (req, res) => {
  res.json(store.markNotificationRead(req.params.id));
});

app.post('/api/notifications/read-all', (req, res) => {
  res.json(store.markAllNotificationsRead());
});

// 4. TimeBank Transactions API
app.get('/api/timebank/transactions', (req, res) => {
  res.json(store.getTimeBankTransactions());
});

// 5. Categories & Metadata
app.get('/api/categories', (req, res) => {
  res.json(store.getCategories());
});

// 6. Current User
app.get('/api/current-user', (req, res) => {
  res.json(store.getCurrentUser());
});

app.put('/api/current-user', (req, res) => {
  const updated = store.updateCurrentUser(req.body);
  res.json(updated);
});

// 7. Chats, Digital Handshake & Swap Lifecycle
app.get('/api/chats', (req, res) => {
  res.json(store.getChats());
});

app.get('/api/chats/:partnerId', (req, res) => {
  const chat = store.getChatByPartnerId(req.params.partnerId);
  res.json(chat);
});

app.post('/api/chats/:partnerId/messages', (req, res) => {
  const { text } = req.body;
  const partnerId = req.params.partnerId;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Message text cannot be empty' });
  }

  const result = store.sendMessage(partnerId, text.trim(), 'usr_me');

  // Realistic responsive reply simulation for hackathon demo!
  const simulatedResponses = [
    "Hi Jordan! That sounds great. I'm available today around 5:30 PM with all required tools.",
    "Perfect! I've accepted our 1-Hour SkillSwap agreement so we can get started right away.",
    "Awesome! Let's meet at the community center or connect via in-app video.",
    "Sounds like a plan! Looking forward to helping you with the repair and learning from you."
  ];

  setTimeout(() => {
    const randomReply = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
    store.sendMessage(partnerId, randomReply, partnerId);
  }, 1000);

  res.json(result);
});

app.post('/api/chats/:partnerId/agreement', (req, res) => {
  const { terms, durationHours, userProvidedSkill, userReceivedSkill, scheduledTime } = req.body;
  const chat = store.proposeAgreement(req.params.partnerId, {
    terms,
    durationHours,
    userProvidedSkill,
    userReceivedSkill,
    scheduledTime
  });
  res.json(chat);
});

app.post('/api/chats/:partnerId/accept-agreement', (req, res) => {
  const chat = store.acceptAgreement(req.params.partnerId);
  res.json(chat);
});

app.post('/api/chats/:partnerId/complete-swap', (req, res) => {
  const { rating, comment, badge, skillQuality, communicationQuality, reliability } = req.body;
  const outcome = store.completeSwap(req.params.partnerId, {
    rating,
    comment,
    badge,
    skillQuality,
    communicationQuality,
    reliability
  });
  res.json(outcome);
});

// 8. Safety & Trust Actions
app.post('/api/users/:id/report', (req, res) => {
  const { reason } = req.body;
  res.json(store.reportUser(req.params.id, reason));
});

app.post('/api/users/:id/block', (req, res) => {
  res.json(store.blockUser(req.params.id));
});

app.post('/api/swaps/:id/report', (req, res) => {
  const { reason } = req.body;
  res.json(store.reportListing(req.params.id, reason));
});

// 9. Community Impact & Reviews
app.get('/api/impact', (req, res) => {
  res.json(store.getImpactStats());
});

app.get('/api/reviews', (req, res) => {
  res.json(store.getReviews());
});

// Serve frontend build if exists in production
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

app.get('*', (req, res) => {
  if (req.url.startsWith('/api')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }
  const indexHtml = path.join(distPath, 'index.html');
  if (require('fs').existsSync(indexHtml)) {
    res.sendFile(indexHtml);
  } else {
    res.send('SkillSwap Local API Server is running on port ' + PORT);
  }
});

app.listen(PORT, () => {
  console.log(`[SkillSwap Server] Running on http://localhost:${PORT}`);
});
