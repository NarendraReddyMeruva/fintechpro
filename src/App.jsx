import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import InsightsPage from './pages/InsightsPage';
import FriendsPage from './pages/FriendsPage';
import CardsPage from './pages/CardsPage';
import PortfolioPortal from './pages/PortfolioPortal';
import Login from './pages/Login';
import { AnimatePresence, motion } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    className="w-full max-w-7xl mx-auto"
  >
    {children}
  </motion.div>
);

function App() {
  const { mode, role } = useStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const AdminRoute = ({ children }) => {
    if (role !== 'admin') return <Navigate to="/login" />;
    return children;
  };

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-background text-text transition-colors duration-500 font-sans selection:bg-theme selection:text-white">
        
       
        <Sidebar />

        <main className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto relative">
          <Navbar />
          
          <div className="p-6 md:p-10 pt-24 md:pt-28 relative z-10 w-full max-w-full">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
                <Route path="/transactions" element={<PageWrapper><Transactions /></PageWrapper>} />
                <Route path="/insights" element={<PageWrapper><InsightsPage /></PageWrapper>} />
                <Route path="/cards" element={<PageWrapper><CardsPage /></PageWrapper>} />
                <Route path="/investments" element={<PageWrapper><PortfolioPortal /></PageWrapper>} />
                <Route path="/friends" element={<PageWrapper><FriendsPage /></PageWrapper>} />
                <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
                
                <Route 
                  path="/admin-dashboard" 
                  element={
                    <AdminRoute>
                      <PageWrapper>
                        <div className="p-12 glass-card border-theme/20 bg-theme/5">
                          <h1 className="text-4xl font-black text-theme">Admin Protocol Active</h1>
                          <p className="mt-4 text-text/60 font-bold uppercase tracking-widest">
                            Full System Control Granted
                          </p>
                        </div>
                      </PageWrapper>
                    </AdminRoute>
                  } 
                />

               
                <Route path="*" element={<PageWrapper><Dashboard /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </div>

         
          <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
            <div className="absolute top-[10%] left-[-10%] w-[40vw] h-[40vw] bg-theme/5 blur-[120px] rounded-full animate-float opacity-30"></div>
            <div className="absolute bottom-[10%] right-[-10%] w-[35vw] h-[35vw] bg-pink-500/5 blur-[100px] rounded-full animate-float-delayed opacity-20"></div>
          </div>
        </main>
      </div>
    </HashRouter>
  );
}

export default App;