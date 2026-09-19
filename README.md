# SkillSwap Local

> **People exchange skills, not just money.**

SkillSwap Local is a community-focused web application designed to help people exchange skills and services without depending entirely on money. The idea is simple: everyone has something valuable to offer. Someone might know how to repair a bicycle, while another person might know how to teach a language, build a website, cook, or help with basic computer skills. SkillSwap Local brings these people together and makes it easier for them to exchange their time and skills.

The platform allows users to create skill offers and requests, browse available opportunities, search and filter listings, discover compatible matches, communicate through in-app chat, agree on an exchange, and complete the swap. The project also introduces a TimeBank concept, where users can earn time credits by helping others and use those credits when they need help themselves.

For example, imagine a user who knows how to teach basic Spanish but needs help repairing a bicycle. Instead of paying for the repair, the user can offer an hour of Spanish lessons to someone who can repair bicycles. After the exchange is completed, the user earns a TimeBank hour that can later be used to receive help from another community member. This creates a simple cycle of **sharing skills, helping others, and receiving help when needed**.

The project was built around a real community problem: many people need help with small everyday tasks, but traditional service platforms can make these interactions expensive or difficult. At the same time, communities already contain a large amount of unused knowledge and skills. SkillSwap Local attempts to connect these two sides by creating a platform where people can contribute what they know instead of always paying money for what they need.

The application provides a simple interface for browsing and discovering skill exchanges. Users can view offers and requests, search for specific skills, and filter results by categories, availability, and other relevant information. A smart matching system helps identify potentially compatible users based on the skills they offer, the skills they need, and their availability. This makes it easier to find relevant exchanges without manually searching through every listing.

A major part of the platform is the **TimeBank system**. The idea behind TimeBank is that time spent helping another person can become a form of community credit. For example, helping someone for one hour can provide one TimeBank hour. That credit can then be used when the user needs assistance in the future. This encourages participation and creates a system where users can both contribute and receive value from the community.

SkillSwap Local also includes an **in-app chat and swap agreement system**. Once users find a suitable exchange, they can communicate through the platform and discuss what each person will provide. The swap agreement clearly shows the two sides of the exchange, such as **"You provide"** and **"You receive."** The exchange can move through different stages, including requested, connected, agreement accepted, in progress, and completed. After completing a swap, users can provide a rating or review, helping build community trust over time.

Trust and safety are also considered in the design. User profiles can display information such as ratings, completed exchanges, community endorsements, and verification indicators. Users can also report or block other users when necessary. These features are intended to make interactions more transparent and help users make better-informed decisions before starting an exchange.

Another important feature is the platform's focus on **accessibility**. SkillSwap Local includes a Low-Bandwidth mode designed for users with slower or limited internet connections. The application can reduce unnecessary visual content and focus on essential information so that the core experience remains usable on slower networks. The project also includes high-contrast options, adjustable font sizes, and OpenDyslexic typography to support different accessibility needs.

**Privacy** is another core consideration. The application is designed to avoid unnecessary personal information and does not depend on precise GPS tracking for its main matching experience. Users can communicate through the platform instead of immediately sharing personal contact information. The goal is to provide useful community connections while keeping unnecessary personal data collection to a minimum.

The project is built using a modern web development stack. The frontend uses **React and TypeScript**, with **Vite** for development and building and **Tailwind CSS** for styling. The backend uses **Node.js and Express.js** to provide the application's API functionality. The project structure separates frontend components, application state, types, and backend functionality to keep the code organized and easier to maintain.

## Main Features

- Skill offers and skill requests
- Search and filtering
- Smart skill matching
- TimeBank-based exchanges
- In-app chat
- Swap agreement workflow
- Ratings and reviews
- Trust and safety information
- Report and block functionality
- Notifications
- Community impact information
- Low-Bandwidth mode
- High-contrast mode
- Dynamic font scaling
- OpenDyslexic font support
- Privacy-focused design

## Technology Stack

- **Frontend:** React, TypeScript, Vite
- **Styling:** Tailwind CSS
- **Backend:** Node.js, Express.js
- **Data:** Local/JSON-based application data
- **Version Control:** Git and GitHub

## Project Structure

```text
SkillSwap-Local/
│
├── server/
│   ├── data/
│   │   ├── seed.json
│   │   └── store.js
│   └── index.js
│
├── src/
│   ├── components/
│   │   ├── AccessibilityBar.tsx
│   │   ├── ChatDrawer.tsx
│   │   ├── CreateSwapModal.tsx
│   │   ├── DashboardModal.tsx
│   │   ├── FilterBar.tsx
│   │   ├── HeroBanner.tsx
│   │   ├── ImpactModal.tsx
│   │   ├── Navbar.tsx
│   │   ├── NotificationPanel.tsx
│   │   ├── PrivacyModal.tsx
│   │   ├── SmartMatchModal.tsx
│   │   ├── SwapCard.tsx
│   │   ├── SwapDetailModal.tsx
│   │   └── TrustSafetyCard.tsx
│   │
│   ├── context/
│   │   └── AppContext.tsx
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
│
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
├── LICENSE
└── README.md
