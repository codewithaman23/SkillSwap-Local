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
  const { category, type, neighborhoodId, search, urgency } = req.query;
  const swaps = store.getSwaps({ category, type, neighborhoodId, search, urgency });
  res.json(swaps);
});

app.get('/api/swaps/:id', (req, res) => {
  const swap = store.getSwapById(req.params.id);
  if (!swap) return res.status(404).json({ error: 'Swap not found' });
  res.json(swap);
});

app.post('/api/swaps', (req, res) => {
  const { title, type, category, offering, seeking, description, neighborhood, urgency, preferredMeeting, mode } = req.body;
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
    neighborhood,
    urgency,
    preferredMeeting,
    mode
  });
  res.status(201).json(newSwap);
});

// 2. Neighborhoods & Metadata
app.get('/api/neighborhoods', (req, res) => {
  res.json(store.getNeighborhoods());
});

app.get('/api/categories', (req, res) => {
  res.json(store.getCategories());
});

app.get('/api/meetup-spots', (req, res) => {
  res.json(store.getMeetupSpots());
});

// 3. Current User
app.get('/api/current-user', (req, res) => {
  res.json(store.getCurrentUser());
});

app.put('/api/current-user', (req, res) => {
  const updated = store.updateCurrentUser(req.body);
  res.json(updated);
});

// 4. In-App Chat & Meetup Agreements
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

  // Record user's sent message
  const result = store.sendMessage(partnerId, text.trim(), 'usr_me');

  // Smart neighborhood neighbor auto-response simulation for realistic hackathon demos!
  const simulatedResponses = [
    "That sounds perfect! What time of day works best for you?",
    "Great! Shall we meet at the local public library or the community garden?",
    "Sounds like a plan! I can bring all the materials we need.",
    "Awesome. I'll propose a SkillSwap agreement so we can formalize the swap terms.",
    "Thanks for reaching out! Looking forward to connecting and swapping skills."
  ];

  setTimeout(() => {
    // Check if we should reply
    const randomReply = simulatedResponses[Math.floor(Math.random() * simulatedResponses.length)];
    store.sendMessage(partnerId, randomReply, partnerId);
  }, 1200);

  res.json(result);
});

app.post('/api/chats/:partnerId/agreement', (req, res) => {
  const { terms, location, date } = req.body;
  if (!terms) return res.status(400).json({ error: 'Terms are required for swap agreement' });

  const chat = store.proposeAgreement(req.params.partnerId, {
    terms,
    location,
    date,
    proposedBy: 'usr_me'
  });
  res.json(chat);
});

app.post('/api/chats/:partnerId/accept-agreement', (req, res) => {
  const chat = store.acceptAgreement(req.params.partnerId);
  res.json(chat);
});

app.post('/api/chats/:partnerId/complete-swap', (req, res) => {
  const { rating, comment, badge } = req.body;
  const outcome = store.completeSwap(req.params.partnerId, { rating, comment, badge });
  res.json(outcome);
});

// 5. Community Impact & Reviews
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

