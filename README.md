# SkillSwap Local 🤝🌱

> **A Hyperlocal, Accessible & Privacy-First Web App Connecting Neighbors to Exchange Skills and Services Without Money.**
>
> *Built for the Community Resilience Hackathon.*

---

## 🌟 The Problem
1. **Financial Barriers to Everyday Help**: Commercial gig platforms (TaskRabbit, Thumbtack, Upwork) impose heavy commissions, subscription paywalls, and high hourly rates that place simple help out of reach for working-class families and underserved communities.
2. **The Modern Loneliness Epidemic**: Despite living in densely populated neighborhoods, over 58% of urban residents report feeling isolated from their immediate neighbors.
3. **Loss of Mutual Aid & Barter Culture**: Every community has untapped wealth—a retired mechanic who needs smartphone help, an immigrant who teaches conversational language in exchange for bike repairs, or a student who tutors math for help hemming clothes.

---

## 💡 The Solution: SkillSwap Local
**SkillSwap Local** revives the power of hyperlocal mutual aid. Neighbors connect 1-to-1 to trade skills and services without cash.

- **Zero-Money Direct Barter**: Exchange skill-for-skill directly (e.g., *"I'll teach you Spanish for help fixing my bike"*).
- **TimeBank & Community Karma Ledger**: Earn 1 hour of Karma for every hour gifted to your neighborhood, redeemable for skills you need later.
- **Accessibility for Everyone**: Dedicated Low-Bandwidth Mode (disables heavy media and transitions for 2G/3G networks and older phones), dynamic font scaling ($A$, $A+$, $A++$), high-contrast mode, and dyslexia-friendly typography.
- **Privacy by Design**: No fine-grained GPS tracking. Users select city/neighborhood districts only. Zero commercial tracking pixels, zero ads, and pseudonymous profiles protect neighbor safety.
- **In-App Meetup Coordinator & Handshake**: Chat without sharing phone numbers, choose vetted safe public meetup locations (libraries, community centers), and formalize terms with a digital **Swap Agreement Handshake**.

---

## 🚀 Quick Start (Judge / Demo Setup)

### Prerequisites
- **Node.js** (v18, v20, or v22)
- **npm** (v9+)

### Installation & Run in 2 Steps:
```bash
# 1. Install dependencies
npm install

# 2. Run both the React Vite frontend and the Express backend simultaneously:
npm run dev
```

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend Express API**: [http://localhost:5000](http://localhost:5000)

*(Alternatively, run `npm run build && npm start` to run the fully optimized production bundle on port 5000).*

---

## 🧭 Judge Demo Walkthrough (Step-by-Step)

To experience the complete flow of **SkillSwap Local** in under 3 minutes:

1. **Explore the Hyperlocal Feed & Filter System**:
   - Filter by **"Offers (Giving)"** vs. **"Requests (Seeking Help)"**.
   - Switch between sample neighborhoods via the top location selector (*Mission District SF*, *Bed-Stuy Brooklyn*, *East Austin*, *Connaught Delhi*, *Kensington Toronto*).
   - Filter by categories: *Languages*, *Home & Repair*, *Digital Literacy*, *Gardening*, *Arts*, etc.
2. **Experience Accessibility & Low-Bandwidth Mode**:
   - In the top accessibility toolbar, click **"Low-Bandwidth (2G/3G)"** to see how the interface seamlessly strips heavy imagery and animations for users on constrained mobile plans.
   - Toggle **"High Contrast"** or click **"A++"** to test WCAG AAA readable font scaling.
3. **Inspect a Listing & View Neighbor Trust Badges**:
   - Click on the listing: *"Teach Spanish (Intermediate/Conversational) for Help Fixing Bike Brakes"*.
   - Notice the breakdown of terms, the neighbor's verified trust rating (5.0 ★, 8 verified swaps), and safe meetup tips.
4. **Chat, Swap Agreement Handshake & Completion**:
   - Click **"Connect"** or tap the message icon in the navbar.
   - Chat with **Mateo R.**: type a reply and receive a realistic neighbor response.
   - View the active **SkillSwap Agreement**: click **"Accept Agreement Handshake"**.
   - Once agreed, click **"Mark Swap as Completed"** to leave a neighbor endorsement (e.g. *Patient Teacher* badge).
   - Notice your **TimeBank Karma balance immediately increases** by +1 hour!
5. **Post a New Skill Swap**:
   - Click the **"+ Post a Swap"** button in the header.
   - Post your skill (e.g., *"Teach beginner chess in exchange for garden herb clippings"*).
   - Select your neighborhood and submit: your post immediately appears at the top of the feed!
6. **Inspect Community Resilience Metrics**:
   - Click **"Impact"** in the navbar to open the Community Resilience Dashboard: view total hours exchanged, estimated dollars saved from avoided gig-worker costs, and the neighborhood trust score.

---

## 🛠️ Architecture & Tech Stack

```
SkillSwap Local
├── client (React 18 + Vite + TypeScript)
│   ├── Context: AppContext.tsx (Global state, filters, a11y, persistence)
│   ├── Components:
│   │   ├── AccessibilityBar.tsx  (Font scaling, high contrast, low-bandwidth mode)
│   │   ├── Navbar.tsx            (Neighborhood switcher, Karma balance, Post CTA)
│   │   ├── HeroBanner.tsx        (Mission statement, search, impact ticker)
│   │   ├── FilterBar.tsx         (Category chips, urgency, active filters)
│   │   ├── SwapCard.tsx          (Barter terms, neighbor trust profile)
│   │   ├── SwapDetailModal.tsx   (Detailed description, safe meetup spots)
│   │   ├── CreateSwapModal.tsx   (Privacy guardrails, skill offer/request form)
│   │   ├── ChatDrawer.tsx        (In-app chat, Swap Agreement Handshake, review)
│   │   ├── ImpactModal.tsx       (Community Resilience Index & TimeBank ledger)
│   │   └── PrivacyModal.tsx      (Zero-tracking & safety pledge)
│   └── Styles: index.css + Tailwind CSS (WCAG AA/AAA colors, dyslexia font support)
│
└── server (Node.js + Express)
    ├── index.js                  (REST API endpoints for swaps, chats, agreements)
    ├── data/store.js             (In-memory + JSON store with full CRUD)
    └── data/seed.json            (Diverse sample listings & neighborhoods)
```

---

## 🔒 Privacy & Safety Framework

| Feature | How SkillSwap Local Protects You |
| :--- | :--- |
| **No GPS Tracking** | Locations are restricted to broad neighborhood districts; zero coordinates stored. |
| **No Required Phone Numbers** | All arrangements and chat communication occur in-app. |
| **Zero Ad Trackers** | No Google Analytics, no Facebook Pixels, no data brokerage. |
| **Safe Public Spots** | Suggested meetups prioritize staffed public places (Libraries, Community Centers). |
| **Digital Handshake** | Clear agreements prevent misunderstandings before meeting. |

---

## ♿ Accessibility (A11y) Features
- **WCAG 2.1 AA / AAA compliant** color contrast ratios.
- **Visible focus rings** and **Skip to content** link for keyboard-only navigation.
- **Low-Bandwidth Mode**: Drops network weight by stripping unnecessary decorative images and heavy animations.
- **Scalable text**: Dynamic font scaling without breaking responsive grid containers.
- **Dyslexia-friendly mode**: Enhanced letter spacing and open font rendering.

---

## 📜 License
Open source under the [MIT License](LICENSE). Built for civic good and community empowerment.
