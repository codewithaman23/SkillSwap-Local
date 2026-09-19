# 🤝 SkillSwap Local

<div align="center">

![SkillSwap Banner](https://img.shields.io/badge/SkillSwap-Local-2563eb?style=for-the-badge&logo=handshake&logoColor=white)

**"People exchange skills, not just money."**

*A hyper-accessible, privacy-first mutual aid web platform connecting neighbors to exchange skills and services without financial barriers.*

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[Explore Features](#-key-features) • [Quick Start](#-quick-start) • [3-Minute Demo Script](#-3-minute-hackathon-demo-script) • [Architecture](#-system-architecture) • [Privacy Guarantee](#-privacy-by-design)

</div>

---

## 📖 Table of Contents

- [💡 Problem Statement & Solution](#-problem-statement--solution)
- [✨ Key Features](#-key-features)
- [🏗️ System Architecture](#️-system-architecture)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [⏱️ 3-Minute Hackathon Demo Script](#️-3-minute-hackathon-demo-script)
- [♿ Accessibility Suite](#-accessibility-suite)
- [🔒 Privacy By Design](#-privacy-by-design)
- [📡 REST API Reference](#-rest-api-reference)
- [📂 Project Structure](#-project-structure)
- [📜 License](#-license)

---

## 💡 Problem Statement & Solution

### ⚠️ The Problem
Traditional gig economy platforms monetize human cooperation:
- **Steep platform commissions** (up to 20–30%) and surge pricing lock out lower-income households.
- **Invasive location tracking** forces users to broadcast precise home addresses and GPS coordinates.
- **Heavy web apps** fail entirely on low-bandwidth rural connections (2G/3G) or affordable smartphones.
- **Social isolation & loneliness** thrive in disconnected neighborhoods where residents lack organic avenues to help each other.

### 💡 The Solution: SkillSwap Local
**SkillSwap Local** eliminates financial barriers by transforming time and skill into community currency:
- **1 Hour of Help = 1 TimeBank Hour**: Teach someone Spanish for an hour, earn +1 TimeBank Hour, and spend it having your bicycle repaired. Zero money changes hands.
- **Zero Location Dependencies**: Absolutely no GPS, addresses, or city surveillance. Matches are made via **Availability** and **Skill Compatibility**.
- **Universal Accessibility**: First-class Low-Bandwidth Mode (text-first, strips heavy assets for 2G/3G), High Contrast, Dynamic Font Scaling, and OpenDyslexic typography.

```
┌─────────────────┐          Teaches Spanish (1 Hr)          ┌─────────────────┐
│     Jordan      │ ───────────────────────────────────────> │    Priya S.     │
│   (You / User)  │ <─────────────────────────────────────── │                 │
└─────────────────┘        Receives +1 TimeBank Hour         └─────────────────┘
         │
         │  Redeems 1 TimeBank Hour for Bicycle Repair
         ▼
┌─────────────────┐
│    Mateo R.     │
│ (Bicycle Tech)  │
└─────────────────┘
```

---

## ✨ Key Features

### 🔄 Pure Skill Barter & TimeBank Engine
- **No Cash, No Commission**: All exchanges are peer-to-peer mutual aid.
- **Auditable TimeBank Ledger**: Every completed swap automatically updates Jordan's balance and records an immutable transaction entry in the member dashboard.

### 🤖 Smart Matchmaking Engine (Algorithmic Compatibility)
- Intelligent scoring algorithm calculates compatibility between what you offer and what other members seek.
- Highlights high-confidence matches (e.g., **92% Compatibility with Mateo R.**) with explicit algorithmic breakdown:
  - Skill overlap (Bicycle Repair $\leftrightarrow$ Web Basics / Spanish)
  - Time availability alignment (Available Today, 5:00 PM – 7:00 PM)
  - Community trust score (4.9/5.0 with 17 verified swaps)

### 🛡️ Trust & Safety Cards
- Public profile trust cards with verified member badges, community endorsements, average ratings, and completed swap counters.
- Built-in one-click **Report** and **Block** actions for immediate safety enforcement.

### 💬 In-App Chat & Digital Handshake Agreement
- Turn-by-turn interactive chat drawer with simulated real-time neighbor responses.
- Explicit **Swap Agreement Card**:
  - Clear breakdown of: *"You provide"* vs *"You receive"*.
  - Handshake confirmation button moving swap state: `Requested` $\rightarrow$ `Connected` $\rightarrow$ `Agreement Accepted` $\rightarrow$ `In Progress` $\rightarrow$ `Completed`.
- Interactive 5-Star quality review modal that automatically triggers the **+1 TimeBank Hour** reward.

### ⚡ AI-Assisted Request Creation
- Smart real-time keyword parsing in the "+ Post a Swap" modal.
- Typing *"Need someone to fix my cycle brake"* auto-detects:
  - Category: `Repair & Practical Skills`
  - Type: `Request`
  - Priority: `🚨 Urgent`
  - Suggested Skill Tags: `Bicycle Repair`, `Brake Repair`, `Cycle Maintenance`

### 🔔 Notification Center
- Real-time notification drawer with unread counters for swap agreements, messages, and TimeBank credits.

### 📊 Community Impact Dashboard
- Live community metrics showing **1,248 members**, **3,426 swaps completed**, **5,820 hours banked**, and **₹8.4 Lakh estimated financial savings**.
- Category distribution charts and verified member reviews wall.

---

## 🏗️ System Architecture

```mermaid
flowchart TD
    subgraph Client ["Frontend (React 18 + Vite + TypeScript)"]
        UI["Accessible Responsive UI (Tailwind CSS)"]
        CTX["Global AppContext"]
        A11Y["Accessibility Controller (2G/3G, High Contrast, Dyslexic)"]
        COMP["Hero, FilterBar, SwapCard, ChatDrawer, Modals"]
        UI --> CTX
        A11Y --> UI
        COMP --> UI
    end

    subgraph Server ["Backend API (Node.js + Express)"]
        ROUTER["Express REST Routes (/api/*)"]
        STORE["Store Engine (JSON / In-Memory Store)"]
        SMART["Smart Matching Algorithm"]
        LEDGER["TimeBank Ledger Engine"]
        ROUTER --> STORE
        STORE --> SMART
        STORE --> LEDGER
    end

    subgraph Data ["Data Persistence Layer"]
        SEED["seed.json (Preloaded Verified Users & Swaps)"]
        RUNTIME["store.json (Auto-generated Persistent State)"]
        STORE <--> SEED
        STORE <--> RUNTIME
    end

    Client <-->|REST API + CORS (JSON)| Server
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/codewithaman23/skillswap-local.git

# Navigate into project directory
cd skillswap-local

# Install dependencies
npm install
```

### 2. Run the Application

#### Development Mode (Concurrent Client & Server)
```bash
npm run dev
```
- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

#### Production Build & Serve
```bash
# Build React bundle
npm run build

# Start Express server serving production dist/
npm start
```
- **Live App**: [http://localhost:5000](http://localhost:5000)

---

## ⏱️ 3-Minute Hackathon Demo Script

Follow this step-by-step presentation flow during your hackathon demo:

| Step | Action | What to Highlight |
| :---: | :--- | :--- |
| **1** | Open `http://localhost:3000` | Point to the Hero Banner: *"People exchange skills, not just money."* Highlight live community stats (3,400+ swaps, ₹8.4L saved). |
| **2** | Filter & Search | Type `Bicycle` into search bar or filter by `Available Today` and `Repair & Practical`. Show Mateo R.'s listing. |
| **3** | Smart Matching | Click **"92% Match"** on Mateo's card. Explain how the algorithm calculated mutual skill reciprocity. |
| **4** | Trust & Safety | Open the listing to inspect Mateo's verified trust card (4.9 rating, 17 swaps, 8 endorsements). |
| **5** | Chat & Handshake | Click **"Connect"** $\rightarrow$ review reciprocal terms ("You provide" / "You receive") $\rightarrow$ click **"Accept Agreement"**. |
| **6** | Complete Swap | Click **"Mark Swap as Completed"** $\rightarrow$ submit a 5-star review $\rightarrow$ observe **+1 TimeBank Hour** notification! |
| **7** | Personal Dashboard | Open **Dashboard** to show Jordan's balance updated to **8 Hours** and view the auditable transaction ledger. |
| **8** | Accessibility Bar | Toggle **Low-Bandwidth (2G/3G)** (strips heavy graphics) and **High Contrast** modes. |
| **9** | AI Swap Assistant | Click **"+ Post a Swap"** and type *"Need urgent help fixing my bike"* to show instant auto-tagging. |
| **10** | Community Impact | Click **"Impact"** to present neighborhood resilience metrics and financial savings. |

---

## ♿ Accessibility Suite

Built from the ground up for low-resource environments and users with diverse abilities:

| Mode | Benefit | Implementation |
| :--- | :--- | :--- |
| **Low-Bandwidth (2G/3G)** | Text-first rendering, eliminates non-essential graphics, cuts initial data payload for spotty mobile networks. | Zero heavy media load; minimal CSS repaint. |
| **High Contrast** | Maximizes readability for low-vision users under bright sunlight or impaired vision. | High-contrast WCAG AAA color palette. |
| **Dynamic Font Scaling** | Toggle `A`, `A+`, `A++` sizing without breaking grid containers or mobile responsiveness. | Root-level font scaling variables. |
| **OpenDyslexic Font** | Specialized weighted typography to assist readers with dyslexia. | Accessible custom font styling. |

---

## 🔒 Privacy By Design

SkillSwap Local treats user privacy as a fundamental human right:

- **Zero Location Tracking**: No GPS coordinates, no geofences, no maps. Matching uses availability slots (`Available Now`, `Available Today`, `Available This Week`).
- **No Personal Contact Leakage**: No phone numbers, email addresses, or social accounts required to swap. All coordination happens inside in-app chat.
- **Zero Commercial Ad Trackers**: No third-party analytics pixels, data brokers, or advertising trackers.
- **User Empowerment**: One-click user block and listing report mechanisms with instant local sanitization.

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/swaps` | Fetch listings with optional `category`, `type`, `search`, `availability`, and `urgentOnly` filters. |
| `GET` | `/api/swaps/:id` | Fetch specific swap details by ID. |
| `POST` | `/api/swaps` | Create a new skill swap listing. |
| `GET` | `/api/swaps/:id/matches` | Get algorithmic smart matches for a specific listing. |
| `GET` | `/api/user/profile` | Retrieve the authenticated user's profile and TimeBank balance. |
| `GET` | `/api/user/ledger` | Retrieve full TimeBank audit transaction history. |
| `POST` | `/api/swaps/:id/complete` | Mark a swap as completed and credit +1 TimeBank Hour. |
| `GET` | `/api/notifications` | Fetch real-time notification feed. |
| `POST` | `/api/notifications/read-all` | Mark all notifications as read. |
| `GET` | `/api/impact` | Community statistics (members, hours exchanged, money saved). |

---

## 📂 Project Structure

```
skillswap-local/
├── server/                   # Backend API
│   ├── data/
│   │   ├── seed.json         # Realistic seed dataset (11 listings, 5 users)
│   │   └── store.js          # In-memory & JSON file persistent store
│   └── index.js              # Express REST server & static bundle server
├── src/                      # Frontend Application
│   ├── components/           # Modular Accessible UI Components
│   │   ├── AccessibilityBar.tsx  # Low-Bandwidth, Contrast, Font Resizing
│   │   ├── ChatDrawer.tsx        # In-app chat, handshake terms & reviews
│   │   ├── CreateSwapModal.tsx   # AI-assisted swap posting form
│   │   ├── DashboardModal.tsx    # Personal TimeBank ledger & stats
│   │   ├── FilterBar.tsx         # Category, availability & skill filters
│   │   ├── HeroBanner.tsx        # Vision headline & search bar
│   │   ├── ImpactModal.tsx       # Community impact metrics & reviews
│   │   ├── Navbar.tsx            # Navigation, notification badge, actions
│   │   ├── NotificationPanel.tsx # Unread notifications drawer
│   │   ├── PrivacyModal.tsx      # Privacy center & guarantees
│   │   ├── SmartMatchModal.tsx   # 92% algorithmic compatibility view
│   │   ├── SwapCard.tsx          # Listing card with trust badges
│   │   ├── SwapDetailModal.tsx   # Full listing view with safety guidelines
│   │   └── TrustSafetyCard.tsx   # User reputation & verification card
│   ├── context/
│   │   └── AppContext.tsx    # Global React state & API integration
│   ├── types/
│   │   └── index.ts          # TypeScript interfaces & types
│   ├── App.tsx               # Main layout coordinator
│   ├── index.css             # Tailwind CSS & accessible design tokens
│   └── main.tsx              # React application entry point
├── dist/                     # Pre-compiled production build
├── package.json              # Dependencies & npm scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite bundler configuration
├── LICENSE                   # MIT Open Source License
└── README.md                 # Complete project documentation
```

---

## 📜 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more details.

---

<div align="center">

**Built with ❤️ for community resilience and mutual aid.**

*"When communities share their skills, everyone prospers."*

</div>
