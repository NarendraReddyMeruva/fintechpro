# 💠 FintechPro Dashboard


## 📖 Overview

**FintechPro** is a state-of-the-art financial dashboard built for high-density data legibility and a premium user experience. Designed with a mobile-first philosophy, it combines advanced glassmorphic aesthetics, real-time analytics, role-based access control, and deep personalization — all in a single-page application.

> **Live Demo:** `npm run dev` → `http://localhost:5173`

---

## ✨ Features

### 🏠 Unified Dashboard
- Real-time summary cards for **Total Balance**, **Income**, and **Expenses** with trend indicators
- Interactive **Balance Trend** line chart for time-based financial tracking
- **Spending Breakdown** pie chart with category-level drill-down and an expandable fullscreen modal
- Multi-card support — switch between accounts (Visa, Mastercard, Amex) and the entire dashboard re-renders instantly

### 📋 Transaction Ledger
- High-fidelity table with **Description**, **Category**, **Card**, **Date**, **Amount**, and **Type**
- Filter by card and income/expense type with side-by-side dropdowns
- **Global search** from the Navbar filters the ledger in real-time across descriptions and categories
- Horizontal scrolling with "Swipe to view" hints — fully usable on 375px mobile viewports

### 🔐 Role-Based Access Control
| Feature | Viewer | Admin |
|---|---|---|
| View Dashboard | ✅ | ✅ |
| Add Transactions | ❌ | ✅ |
| Delete Transactions | ❌ | ✅ |
| Access Admin Portal | ❌ | ✅ |

- **Sign In / Sign Up** on a single login page with static demo credentials
- Animated form transitions between Sign In and Register as Admin

### 📊 Intelligent Insights
- Identifies highest spending categories automatically
- Monthly performance comparisons vs historical data
- Integrated **Market Pulse** — tracks hypothetical stock performance (AAPL, NVDA, TSLA)

### 🎨 Dynamic Theme Customizer *(Premium Feature)*
- **Pallet icon (🎨)** in the Navbar opens a compact dropdown panel
- Toggle between **Light** and **Dark** mode instantly
- Choose from **6 curated accent colors** — Blue, Violet, Pink, Emerald, Orange, Slate
- Selected color is applied globally via a CSS variable (`--theme-color`), repainting all themed UI elements — buttons, borders, glows, chart highlights — with zero reload
- Active color is marked with a **checkmark indicator**
- All preferences **persist via Zustand** to `localStorage` and survive page refreshes
- Dropdown auto-closes on outside click and stays fully within the viewport on all screen sizes

---

## 🛠 Technology Stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS + Custom Glassmorphism CSS |
| State Management | Zustand + Persist Middleware |
| Animations | Framer Motion |
| Charts | Recharts |
| Icons | Lucide React |
| Routing | React Router v6 |

---

## 🚀 Getting Started

### Prerequisites
- Node.js **v16.14** or higher
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/fintechpro.git

# 2. Navigate into the project
cd fintechpro

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 🔑 Demo Credentials

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `Admin@123` |
| Viewer | `viewer` | `Viewer@123` |

> Admins can add and delete transactions. Viewers have read-only access.  
> New admin accounts can be registered directly from the login page.

---

## 📱 Responsiveness

| Breakpoint | Behavior |
|---|---|
| Desktop `1024px+` | Fixed sidebar, full-width ledger, multi-column layout |
| Tablet `768px–1024px` | Sidebar toggles via Navbar, charts stack vertically |
| Mobile `< 768px` | FAB navigation, horizontal ledger scroll, compact filters |

---

## 🎨 Design System

FintechPro uses a custom **Glassmorphism** design language:

- **Glowing Borders** — animated borders that respond to hover and focus states
- **Backdrop Blur & Glass Varnish** — semi-transparent surfaces with layered depth
- **Dynamic CSS Variables** — single `--theme-color` variable drives the entire color system
- **Dark / Light Mode** — full system-aware theme with smooth transitions
- **Framer Motion** — page-level and component-level animations throughout

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Charts/
│   │   ├── LineChart.jsx
│   │   └── PieChart.jsx
│   ├── AddTransactionModal.jsx
│   ├── FinancialHealth.jsx
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── StockSnapshot.jsx
│   ├── SummaryCard.jsx
│   ├── ThemeToggler.jsx
│   └── TransactionTable.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── Cards.jsx
│   ├── Insights.jsx
│   └── Login.jsx
├── store/
│   └── useStore.js
└── main.jsx
```

---

## 📄 License

This project is built for demonstration purposes.  
Feel free to fork, extend, and customize it for your own projects.

---


Built with using React + Tailwind CSS + Framer Motion
