import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set, get) => ({
      role: 'viewer', 
      setRole: (role) => set({ role }),
      
      authenticatedAdmin: false,
      setAuthenticatedAdmin: (val) => set({ authenticatedAdmin: val }),


      themeColor: '#2563eb',
      setThemeColor: (colorValue) => {
      
        const hex = colorValue.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        document.documentElement.style.setProperty('--theme-color', `${r} ${g} ${b}`);
        set({ themeColor: colorValue });
      },

      mode: 'light',
      toggleMode: () => {
        const newMode = get().mode === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newMode);
        set({ mode: newMode });
      },

  
      cards: [
        { id: 'card-1', brand: 'Visa', number: '**** **** **** 4589', balance: 12450, expiry: '12/26', primary: true },
        { id: 'card-2', brand: 'Mastercard', number: '**** **** **** 1024', balance: 8200, expiry: '09/25', primary: false },
        { id: 'card-3', brand: 'Amex', number: '**** **** **** 9012', balance: 15400, expiry: '05/27', primary: false },
      ],
      selectedCardId: 'card-1',
      setSelectedCardId: (id) => set({ selectedCardId: id }),
      
      addCard: (newCard) => set((state) => ({ 
        cards: [...state.cards, { ...newCard, id: `card-${Date.now()}`, primary: false }] 
      })),
      
      deleteCard: (id) => set((state) => ({
        cards: state.cards.filter(c => c.id !== id),
        selectedCardId: state.selectedCardId === id ? (state.cards[0]?.id || '') : state.selectedCardId
      })),

      setPrimaryCard: (id) => set((state) => ({
        cards: state.cards.map(c => ({ ...c, primary: c.id === id }))
      })),

  
      transactions: [
        { id: 1, cardId: 'card-1', date: '2024-03-24', description: 'GitHub Copilot', category: 'Technology', amount: -19, type: 'expense' },
        { id: 2, cardId: 'card-1', date: '2024-03-23', description: 'Whole Foods Market', category: 'Food', amount: -156.40, type: 'expense' },
        { id: 3, cardId: 'card-2', date: '2024-03-22', description: 'Stripe Payout', category: 'Income', amount: 4200.00, type: 'income' },
        { id: 4, cardId: 'card-1', date: '2024-03-21', description: 'Equinox Gym', category: 'Health', amount: -210, type: 'expense' },
        { id: 5, cardId: 'card-3', date: '2024-03-20', description: 'Design Conference', category: 'Education', amount: -650, type: 'expense' },
        { id: 6, cardId: 'card-1', date: '2024-03-19', description: 'Netflix Subscription', category: 'Entertainment', amount: -18.99, type: 'expense' },
        { id: 7, cardId: 'card-2', date: '2024-03-18', description: 'Airbnb Staycation', category: 'Travel', amount: -1240, type: 'expense' },
        { id: 8, cardId: 'card-1', date: '2024-03-17', description: 'Amazon Purchase', category: 'Shopping', amount: -89.50, type: 'expense' },
        { id: 9, cardId: 'card-3', date: '2024-03-16', description: 'Gas Station', category: 'Transport', amount: -75.20, type: 'expense' },
        { id: 10, cardId: 'card-1', date: '2024-03-15', description: 'Freelance Design', category: 'Income', amount: 850.00, type: 'income' },
        { id: 11, cardId: 'card-1', date: '2024-03-14', description: 'Apple Store', category: 'Technology', amount: -1299, type: 'expense' },
        { id: 12, cardId: 'card-2', date: '2024-03-13', description: 'Starbucks Coffee', category: 'Food', amount: -12.45, type: 'expense' },
        { id: 13, cardId: 'card-1', date: '2024-03-12', description: 'Rent Payment', category: 'Housing', amount: -2450.00, type: 'expense' },
        { id: 14, cardId: 'card-3', date: '2024-03-11', description: 'Uber Trip', category: 'Transport', amount: -42.10, type: 'expense' },
        { id: 15, cardId: 'card-1', date: '2024-03-10', description: 'Dividend Payment', category: 'Income', amount: 156.20, type: 'income' },
        { id: 16, cardId: 'card-2', date: '2024-03-09', description: 'Dinner Out', category: 'Food', amount: -185.00, type: 'expense' },
        { id: 17, cardId: 'card-1', date: '2024-03-08', description: 'PS5 Game Store', category: 'Entertainment', amount: -69.99, type: 'expense' },
        { id: 18, cardId: 'card-3', date: '2024-03-07', description: 'Pharmacy', category: 'Health', amount: -34.80, type: 'expense' },
        { id: 19, cardId: 'card-1', date: '2024-03-06', description: 'Salary Deposit', category: 'Income', amount: 5500.00, type: 'income' },
        { id: 20, cardId: 'card-2', date: '2024-03-05', description: 'Ticketmaster', category: 'Entertainment', amount: -450.00, type: 'expense' },
        { id: 21, cardId: 'card-1', date: '2024-03-04', description: 'Cloud VPS', category: 'Technology', amount: -45.00, type: 'expense' },
        { id: 22, cardId: 'card-3', date: '2024-03-03', description: 'Grocery Store', category: 'Food', amount: -94.20, type: 'expense' },
        { id: 23, cardId: 'card-2', date: '2024-03-02', description: 'Adobe Creative', category: 'Subscription', amount: -54.99, type: 'expense' },
        { id: 24, cardId: 'card-1', date: '2024-03-01', description: 'Bookstore', category: 'Education', amount: -125.00, type: 'expense' },
        { id: 25, cardId: 'card-3', date: '2024-02-28', description: 'Uber Eats', category: 'Food', amount: -38.50, type: 'expense' },
        { id: 26, cardId: 'card-1', date: '2024-02-27', description: 'Apple Music', category: 'Subscription', amount: -10.99, type: 'expense' },
        { id: 27, cardId: 'card-2', date: '2024-02-26', description: 'Consulting Fee', category: 'Income', amount: 1200.00, type: 'income' },
        { id: 28, cardId: 'card-1', date: '2024-02-25', description: 'Cinema Tickets', category: 'Entertainment', amount: -35.00, type: 'expense' },
        { id: 29, cardId: 'card-3', date: '2024-02-24', description: 'Pet Shop Supplies', category: 'Shopping', amount: -62.40, type: 'expense' },
        { id: 30, cardId: 'card-1', date: '2024-02-23', description: 'Laundry Service', category: 'Housing', amount: -45.00, type: 'expense' },
        { id: 31, cardId: 'card-2', date: '2024-02-22', description: 'Monthly Bonus', category: 'Income', amount: 500.00, type: 'income' },
        { id: 32, cardId: 'card-1', date: '2024-02-21', description: 'Digital Ocean', category: 'Technology', amount: -12.00, type: 'expense' },
        { id: 33, cardId: 'card-3', date: '2024-02-20', description: 'Parking Ticket', category: 'Transport', amount: -60.00, type: 'expense' },
        { id: 34, cardId: 'card-1', date: '2024-02-19', description: 'Yoga Class', category: 'Health', amount: -25.00, type: 'expense' },
        { id: 35, cardId: 'card-2', date: '2024-02-18', description: 'Business Lunch', category: 'Food', amount: -86.50, type: 'expense' },
        { id: 36, cardId: 'card-1', date: '2024-02-17', description: 'Utility Bill', category: 'Housing', amount: -185.00, type: 'expense' },
        { id: 37, cardId: 'card-3', date: '2024-02-16', description: 'Flight to NYC', category: 'Travel', amount: -450.00, type: 'expense' },
        { id: 38, cardId: 'card-1', date: '2024-02-15', description: 'Gadget Store', category: 'Shopping', amount: -320.00, type: 'expense' },
        { id: 39, cardId: 'card-2', date: '2024-02-14', description: 'Refund Stripe', category: 'Income', amount: 45.00, type: 'income' },
        { id: 40, cardId: 'card-1', date: '2024-02-13', description: 'Book Club', category: 'Education', amount: -15.00, type: 'expense' },
      ],
      addTransaction: (tx) => set((state) => ({ 
        transactions: [{ ...tx, id: Date.now(), cardId: state.selectedCardId }, ...state.transactions] 
      })),
      deleteTransaction: (id) => set((state) => ({ 
        transactions: state.transactions.filter(t => String(t.id) !== String(id)) 
      })),

      // Friends & Social
      friends: [
        { id: 1, name: 'Alex Rivera', status: 'active', balance: 1200, avatar: 'https://i.pravatar.cc/150?u=alex' },
        { id: 2, name: 'Sarah Chen', status: 'pending', balance: 0, avatar: 'https://i.pravatar.cc/150?u=sarah' },
        { id: 3, name: 'Jordan Smyth', status: 'active', balance: 450, avatar: 'https://i.pravatar.cc/150?u=jordan' },
      ],
      approveFriend: (id) => set((state) => ({
        friends: state.friends.map(f => f.id === id ? { ...f, status: 'active' } : f)
      })),
      removeFriend: (id) => set((state) => ({
        friends: state.friends.filter(f => f.id !== id)
      })),

    
      savingsGoals: [
        { id: 1, name: 'New Car', target: 25000, current: 8500, color: '#2563eb' },
        { id: 2, name: 'Vacation', target: 5000, current: 3200, color: '#db2777' },
        { id: 3, name: 'Emergency Fund', target: 10000, current: 4500, color: '#ea580c' },
      ],
      updateGoal: (id, amount) => set((state) => ({
        savingsGoals: state.savingsGoals.map(g => g.id === id ? { ...g, current: g.current + amount } : g)
      })),

     
      stocks: [
        { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 2.34, status: 'profit', quantity: 12, avgPrice: 175.20 },
        { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.22, change: -5.12, status: 'loss', quantity: 8, avgPrice: 198.50 },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 890.11, change: 12.45, status: 'profit', quantity: 5, avgPrice: 420.00 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.33, change: 1.22, status: 'profit', quantity: 15, avgPrice: 380.10 },
        { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.11, change: -2.45, status: 'loss', quantity: 20, avgPrice: 185.00 },
        { symbol: 'META', name: 'Meta Platforms', price: 485.40, change: 4.12, status: 'profit', quantity: 10, avgPrice: 450.00 },
        { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 152.33, change: 1.88, status: 'profit', quantity: 25, avgPrice: 140.00 },
        { symbol: 'BTC', name: 'Bitcoin', price: 68420, change: 3.45, status: 'profit', quantity: 0.15, avgPrice: 45000 },
        { symbol: 'ETH', name: 'Ethereum', price: 3450, change: -2.11, status: 'loss', quantity: 1.2, avgPrice: 3800.00 },
        { symbol: 'NFLX', name: 'Netflix', price: 610.22, change: 0.95, status: 'profit', quantity: 5, avgPrice: 580.00 },
        { symbol: 'TSM', name: 'TSMC', price: 142.10, change: 1.20, status: 'profit', quantity: 30, avgPrice: 130.00 },
        { symbol: 'ASML', name: 'ASML Holding', price: 920.45, change: -0.45, status: 'loss', quantity: 2, avgPrice: 950.00 },
      ],
      stockPredictions: [
        { symbol: 'NVDA', outlook: 'Bullish', confidence: 92, advice: 'Strong Buy - AI demand continuing to surge.' },
        { symbol: 'TSLA', outlook: 'Neutral', confidence: 64, advice: 'Hold - Market volatility in EV sector.' },
        { symbol: 'AAPL', outlook: 'Bullish', confidence: 81, advice: 'Buy - New product cycle expected.' },
        { symbol: 'GOOGL', outlook: 'Bullish', confidence: 77, advice: 'Buy - Undervalued relative to peers.' },
        { symbol: 'BTC', outlook: 'Bullish', confidence: 85, advice: 'Buy - Strong resistance at 70k.' },
      ],

      
      chartData: {
        daily: [
          { name: 'Mon', balance: 12100 },
          { name: 'Tue', balance: 12450 },
          { name: 'Wed', balance: 12300 },
          { name: 'Thu', balance: 12600 },
          { name: 'Fri', balance: 12550 },
          { name: 'Sat', balance: 12400 },
          { name: 'Sun', balance: 12450 },
        ],
        monthly: [
          { name: 'Jan', balance: 4000 },
          { name: 'Feb', balance: 3000 },
          { name: 'Mar', balance: 2000 },
          { name: 'Apr', balance: 2780 },
          { name: 'May', balance: 1890 },
          { name: 'Jun', balance: 2390 },
          { name: 'Jul', balance: 3490 },
          { name: 'Aug', balance: 4200 },
          { name: 'Sep', balance: 5000 },
          { name: 'Oct', balance: 8000 },
          { name: 'Nov', balance: 10000 },
          { name: 'Dec', balance: 12450 },
        ],
        yearly: [
          { name: '2020', balance: 45000 },
          { name: '2021', balance: 52000 },
          { name: '2022', balance: 61000 },
          { name: '2023', balance: 75000 },
          { name: '2024', balance: 14180 },
        ],
      },

      
      searchTerm: '',
      setSearchTerm: (term) => set({ searchTerm: term }),
    }),
    {
      name: 'fintech-storage',
      version: 4, 
      migrate: (persistedState, version) => {
        let state = { ...persistedState };
        
        if (version < 3) {
          state.searchTerm = '';
          state.stocks = [
             { symbol: 'AAPL', name: 'Apple Inc.', price: 189.45, change: 2.34, status: 'profit', quantity: 12, avgPrice: 175.20 },
             { symbol: 'TSLA', name: 'Tesla, Inc.', price: 175.22, change: -5.12, status: 'loss', quantity: 8, avgPrice: 198.50 },
             { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 890.11, change: 12.45, status: 'profit', quantity: 5, avgPrice: 420.00 },
             { symbol: 'MSFT', name: 'Microsoft Corp.', price: 412.33, change: 1.22, status: 'profit', quantity: 15, avgPrice: 380.10 },
             { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.11, change: -2.45, status: 'loss', quantity: 20, avgPrice: 185.00 },
             { symbol: 'META', name: 'Meta Platforms', price: 485.40, change: 4.12, status: 'profit', quantity: 10, avgPrice: 450.00 },
             { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 152.33, change: 1.88, status: 'profit', quantity: 25, avgPrice: 140.00 },
             { symbol: 'BTC', name: 'Bitcoin', price: 68420, change: 3.45, status: 'profit', quantity: 0.15, avgPrice: 45000 },
             { symbol: 'ETH', name: 'Ethereum', price: 3450, change: -2.11, status: 'loss', quantity: 1.2, avgPrice: 3800.00 },
             { symbol: 'NFLX', name: 'Netflix', price: 610.22, change: 0.95, status: 'profit', quantity: 5, avgPrice: 580.00 },
             { symbol: 'TSM', name: 'TSMC', price: 142.10, change: 1.20, status: 'profit', quantity: 30, avgPrice: 130.00 },
             { symbol: 'ASML', name: 'ASML Holding', price: 920.45, change: -0.45, status: 'loss', quantity: 2, avgPrice: 950.00 },
          ];
        }

        if (version < 4) {
          state.transactions = (state.transactions || []).map(t => ({
            ...t,
            category: t.category === 'Ent' ? 'Entertainment' : 
                     t.category === 'Sub' ? 'Subscription' : t.category
          }));
        }

        return state;
      },
    }
  )
);
