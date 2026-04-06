import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Wallet, ArrowRight, User, Mail, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';


const STATIC_USERS = [
  { username: 'admin', email: 'admin@fintechpro.com', password: 'Admin@123', role: 'admin' },
  { username: 'viewer', email: 'viewer@fintechpro.com', password: 'Viewer@123', role: 'viewer' },
];


const registeredUsers = [...STATIC_USERS];

const Login = () => {
  const navigate = useNavigate();
  const { setRole, setAuthenticatedAdmin } = useStore();

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

 
  const [signInUsername, setSignInUsername] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirm, setSignUpConfirm] = useState('');

  const resetErrors = () => { setError(''); setSuccess(''); };


  const handleSignIn = (e) => {
    e.preventDefault();
    resetErrors();
    if (!signInUsername.trim() || !signInPassword.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = registeredUsers.find(
        u => (u.username === signInUsername.trim() || u.email === signInUsername.trim())
          && u.password === signInPassword
      );
      if (user) {
        setRole(user.role);
        setAuthenticatedAdmin(user.role === 'admin');
        setLoading(false);
        navigate('/');
      } else {
        setError('Invalid username or password.');
        setLoading(false);
      }
    }, 1200);
  };

 
  const handleSignUp = (e) => {
    e.preventDefault();
    resetErrors();
    if (!signUpUsername.trim() || !signUpEmail.trim() || !signUpPassword.trim() || !signUpConfirm.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    if (signUpPassword !== signUpConfirm) {
      setError('Passwords do not match.');
      return;
    }
    if (signUpPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const exists = registeredUsers.find(
      u => u.username === signUpUsername.trim() || u.email === signUpEmail.trim()
    );
    if (exists) {
      setError('Username or email already registered.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
   
      registeredUsers.push({
        username: signUpUsername.trim(),
        email: signUpEmail.trim(),
        password: signUpPassword,
        role: 'admin',
      });
      setSuccess('Account created! You can now sign in.');
      setLoading(false);
      setIsSignUp(false);
      setSignInUsername(signUpUsername.trim());
      setSignInPassword('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-background overflow-hidden">
      
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-theme/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-500/20 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="w-full max-w-md glass-card p-10 border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative z-10 mx-4"
      >
       
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-theme to-pink-500 flex items-center justify-center shadow-2xl mb-6 relative group overflow-hidden">
            <Shield className="text-white w-10 h-10 relative z-10" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-white/20 blur-[10px] scale-150 rotate-45 pointer-events-none"
            ></motion.div>
          </div>
          <h1 className="text-4xl font-black text-text tracking-tight mb-2">
            {isSignUp ? 'Create Account' : 'Admin Portal'}
          </h1>
          <p className="text-text/40 font-bold uppercase tracking-[0.2em] text-[10px]">
            {isSignUp ? 'Register as Admin • FintechPro' : 'Authorization Required • FintechPro'}
          </p>
        </div>

       
        <div className="flex items-center gap-2 p-1 bg-text/5 rounded-2xl mb-8 border border-white/10">
          <button
            onClick={() => { setIsSignUp(false); resetErrors(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              !isSignUp ? 'bg-theme text-white shadow-lg shadow-theme/30' : 'text-text/40 hover:text-text/60'
            }`}
          >
            <LogIn className="w-3.5 h-3.5" /> Sign In
          </button>
          <button
            onClick={() => { setIsSignUp(true); resetErrors(); }}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              isSignUp ? 'bg-theme text-white shadow-lg shadow-theme/30' : 'text-text/40 hover:text-text/60'
            }`}
          >
            <UserPlus className="w-3.5 h-3.5" /> Register as Admin
          </button>
        </div>

       
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-2xl text-[11px] font-black uppercase tracking-widest text-red-500"
            >
              {error}
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-6 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl text-[11px] font-black uppercase tracking-widest text-green-500"
            >
              {success}
            </motion.div>
          )}
        </AnimatePresence>

      
        <AnimatePresence mode="wait">
          {!isSignUp ? (
            <motion.form
              key="signin"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignIn}
              className="space-y-5"
            >
             
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text/40 tracking-widest pl-4">Username or Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text/30 group-focus-within:text-theme transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={signInUsername}
                    onChange={e => setSignInUsername(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-text/5 border border-white/10 rounded-2xl focus:outline-none focus:border-theme/40 text-text font-mono tracking-widest transition-all"
                    placeholder="admin or admin@fintechpro.com"
                  />
                </div>
              </div>

            
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text/40 tracking-widest pl-4">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text/30 group-focus-within:text-theme transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signInPassword}
                    onChange={e => setSignInPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-text/5 border border-white/10 rounded-2xl focus:outline-none focus:border-theme/40 text-text font-mono tracking-widest transition-all"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute inset-y-0 right-4 flex items-center text-text/30 hover:text-theme transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

          
              <div className="px-4 py-3 bg-text/5 rounded-2xl border border-white/5">
                <p className="text-[9px] font-black uppercase tracking-widest text-text/30">
                  Demo credentials — admin / Admin@123 &nbsp;|&nbsp; viewer / Viewer@123
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-theme text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <> Unlock Dashboard <ArrowRight className="w-5 h-5" /> </>
                )}
              </button>
            </motion.form>
          ) : (

          
            <motion.form
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              onSubmit={handleSignUp}
              className="space-y-5"
            >
             
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text/40 tracking-widest pl-4">Username</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text/30 group-focus-within:text-theme transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={signUpUsername}
                    onChange={e => setSignUpUsername(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-text/5 border border-white/10 rounded-2xl focus:outline-none focus:border-theme/40 text-text font-mono tracking-widest transition-all"
                    placeholder="johndoe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text/40 tracking-widest pl-4">Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text/30 group-focus-within:text-theme transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    value={signUpEmail}
                    onChange={e => setSignUpEmail(e.target.value)}
                    className="w-full h-14 pl-12 pr-4 bg-text/5 border border-white/10 rounded-2xl focus:outline-none focus:border-theme/40 text-text font-mono tracking-widest transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text/40 tracking-widests pl-4">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text/30 group-focus-within:text-theme transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={signUpPassword}
                    onChange={e => setSignUpPassword(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-text/5 border border-white/10 rounded-2xl focus:outline-none focus:border-theme/40 text-text font-mono tracking-widest transition-all"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    className="absolute inset-y-0 right-4 flex items-center text-text/30 hover:text-theme transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

             
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-text/40 tracking-widests pl-4">Confirm Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-text/30 group-focus-within:text-theme transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    value={signUpConfirm}
                    onChange={e => setSignUpConfirm(e.target.value)}
                    className="w-full h-14 pl-12 pr-12 bg-text/5 border border-white/10 rounded-2xl focus:outline-none focus:border-theme/40 text-text font-mono tracking-widest transition-all"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(p => !p)}
                    className="absolute inset-y-0 right-4 flex items-center text-text/30 hover:text-theme transition-colors"
                  >
                    {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-theme text-white rounded-2xl font-black uppercase tracking-widest shadow-[0_15px_30px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <> Create Admin Account <ArrowRight className="w-5 h-5" /> </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center text-[10px] font-bold text-text/40 uppercase tracking-[0.2em]">
          <span>Secured by FinGuard</span>
          <Wallet className="w-5 h-5 opacity-20" />
          <span>v4.0.2 Stable</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;