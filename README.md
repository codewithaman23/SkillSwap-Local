# SkillSwap Local 🤝🌱

> **"People exchange skills, not just money."**
>
> A polished, accessible, privacy-focused hackathon MVP connecting peers to exchange skills and services without financial barriers.

---

## 🌟 The Core Concept
Commercial gig apps charge steep commissions and minimum hourly fees, excluding underserved families and individuals from getting everyday help. 

**SkillSwap Local** replaces money with community mutual aid:
- **1 hour of help = +1 TimeBank Hour.**
- Users earn TimeBank hours by helping others, and redeem them when they need tutoring, repairs, coding, or lifestyle guidance.
- Zero cash required. Zero GPS tracking. Built for accessibility and resilience.

---

## 🚀 Quick Start (Judge / Demo Setup)

### 1. Install & Run:
```bash
# Install dependencies
npm install

# Run both the React frontend (port 3000) & Express backend (port 5000) concurrently:
npm run dev
```

- **Frontend Application**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:5000](http://localhost:5000)

*(To test the production build, run `npm run build && npm start` to serve the compiled application on port 5000).*

---

## 🧭 3-Minute Hackathon Demo Script (Step-by-Step for Judges)

Follow this exact sequence to demonstrate the complete user journey:

### Step 1 — Discover
- Open [http://localhost:3000](http://localhost:3000).
- Notice the core banner: **"People exchange skills, not just money."**
- Toggle between **Offers** and **Requests**, and filter across categories (*Technology*, *Education*, *Creative*, *Repair & Practical*, *Lifestyle*).
- In the global search bar, type: **`Bicycle Repair`**.
- Notice the immediate filtering highlighting both requests and offers.

### Step 2 — Smart Matching
- Open the listing: **"Need help repairing my bicycle today"** (marked with 🚨 Urgent).
- Click **"Find Smart Matches (AI)"** or the green **"Matches"** button.
- See the **92% Match** with **Mateo R.**:
  - 🔧 Bicycle Repair
  - ⭐ 4.9 Rating
  - 🟢 Available Today (5:00 PM – 7:00 PM)
  - 🤝 17 Completed Swaps
  - Direct algorithmic match breakdown (keyword match, availability, and reputation).
- Click **[Connect]**.

### Step 3 — Trust & Safety
- View Mateo's **Trust & Safety Card**:
  - ⭐ 4.9 / 5.0 Rating
  - ✓ 17 Swaps Completed
  - ⏱️ 24 Hours Exchanged
  - ✓ 8 Community Endorsements
  - ✓ Verified Community Member badge
  - Report User & Block User safety actions.

### Step 4 — Chat
- The in-app chat drawer opens with Mateo R.
- Click the suggestion chip or send:
  > *"Hi Mateo, I would like to exchange one hour of help for bicycle repair."*
- Mateo responds interactively in real time!

### Step 5 — Digital Handshake
- Inspect the **Swap Agreement**:
  - **You provide:** 1 TimeBank Hour / Spanish Tutoring
  - **You receive:** Bicycle Repair Assistance
  - **Estimated Duration:** 1 Hour
- Click **"Accept Agreement Handshake"**.
- The status immediately updates to 🟢 **Agreement Confirmed** with state progression tracking:
  *Pending → Connected → Agreement Accepted → In Progress → Completed*.

### Step 6 — Complete Swap
- Click **"Mark Swap as Completed"**.
- Fill out the review modal (5 stars, quality metrics, badge: *Skilled Fixer*).
- Submit the review and see the celebratory confirmation:
  **🎉 +1 TimeBank Hour Credited to Your Balance!**

### Step 7 — Member Dashboard
- Click **"Dashboard"** in the top navigation bar.
- See your updated personal statistics:
  - **TimeBank Balance:** 8 Hours (incremented by +1 hour!)
  - **Swaps Completed:** 13
  - **Community Rating:** ⭐ 4.8
  - **Estimated Money Saved:** ₹2,500+
  - **Transaction Ledger:** Inspect the newly appended transaction log showing *+1 hr helped with bicycle repair*.

### Step 8 — Accessibility
- In the top accessibility toolbar:
  - Click **"Low-Bandwidth (2G/3G)"**: notice heavy media and animations strip instantly for spotty networks.
  - Click **"High Contrast"**: switches to high-contrast mode for low-vision users.
  - Click **"A++"**: tests extra-large accessible text scaling without breaking responsive grid containers.
  - Click **"Dyslexia Font"**: switches to open dyslexic typography.

### Step 9 — Create a Swap with AI Assistant
- Click **"+ Post a Swap"** in the top navigation.
- In the title field, type: **`Need someone to fix my cycle brake`**.
- Notice the **AI Request Assistant** automatically detects keywords and suggests:
  - Category: *Repair & Practical Skills*
  - Type: *Request*
  - Priority: *🚨 Urgent*
  - Suggested Skills: *Bicycle Repair, Brake Repair, Cycle Maintenance*
- Click **"Apply Suggestions"**, select your availability, and click **"Publish Swap Listing"**.
- The new listing immediately appears at the top of the feed and is instantly searchable!

### Step 10 — Community Impact
- Click **"Impact"** in the top navigation to present the Community Resilience Dashboard:
  - 👥 **1,248** Community Members
  - 🤝 **3,426** Successful Swaps
  - ⏱️ **5,820** Hours Exchanged
  - 💰 **₹8.4 Lakh** Estimated Savings
  - ⭐ **94%** Positive Reviews
  - 🛠️ **2,450** Skills Shared
  - 💬 **5,800** Community Connections
  - Resilience Score: **96/100**
  - Category breakdown chart and verified endorsements wall.

End your hackathon presentation with:
# **"SkillSwap Local — People exchange skills, not just money."**

---

## 🔒 Privacy Center: Zero GPS & Maximum User Sovereignty

| Privacy Feature | How SkillSwap Local Protects You |
| :--- | :--- |
| **No GPS / Location Tracking** | Zero location permissions requested. Matching is 100% based on skill compatibility and availability. |
| **No Phone Numbers Exchanged** | All communication, scheduling, and agreements occur within the secure in-app chat. |
| **Zero Commercial Trackers** | No Google Analytics, advertising pixels, or data broker sales. |
| **Full User Control** | Instant one-click user reporting and blocking directly from profiles and chats. |

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons.
- **Backend API**: Node.js, Express.js REST API with file-backed state persistence (`server/data/store.js`).
- **Matching Engine**: Algorithmic keyword compatibility, availability matching, rating weighting, and urgency sorting.
- **Ledger Engine**: TimeBank transaction history ledger with earned/spent tracking.
- **Accessibility**: WCAG AA/AAA compliant color contrast, scalable font sizing, dyslexia fonts, and low-bandwidth asset optimizations.

---

## 📜 License
Open-source under the [MIT License](LICENSE). Built for community empowerment and mutual aid.
