import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  ChevronRight, 
  ShoppingBag, 
  User, 
  Menu,
  Heart,
  Zap,
  Moon,
  Clock,
  ArrowRight,
  ShieldCheck,
  Mail,
  Lock,
  BarChart3,
  LogOut,
  LogIn
} from 'lucide-react';

// --- Components ---

const Navbar = ({ onLoginClick }) => (
  <nav className="fixed top-0 left-0 w-full z-50 bg-[#001A2C] text-white px-6 md:px-12 py-4 flex items-center justify-between">
    <div className="flex items-center gap-8">
      <div className="flex items-center gap-2">
        <Activity className="text-[#00A3AD]" size={28} />
        <span className="text-2xl font-black tracking-tighter">FITTRACK</span>
      </div>
      <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-300">
        <a href="#home" className="hover:text-white transition-colors">Home</a>
        <a href="#products" className="hover:text-white transition-colors">Products</a>
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#community" className="hover:text-white transition-colors">Community</a>
        <a href="#support" className="hover:text-white transition-colors">Support</a>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <div className="hidden md:flex items-center gap-6">
        <button onClick={onLoginClick} className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors cursor-pointer text-sm font-bold">
          <LogIn size={18} />
          Login
        </button>
        <div className="relative cursor-pointer">
          <ShoppingBag size={20} className="text-slate-300 hover:text-white" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
        </div>
      </div>
      <a 
        href="#products"
        className="bg-white text-[#001A2C] px-6 py-2 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors"
      >
        Buy Now
      </a>
      <Menu className="lg:hidden" size={24} />
    </div>
  </nav>
);

const Hero = ({ onLoginClick }) => (
  <section id="home" className="relative min-h-[85vh] flex items-center px-6 md:px-24 pt-20 overflow-hidden bg-white">
    <div className="max-w-2xl z-10">
      <motion.h1 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-7xl hero-text mb-8"
      >
        UNLOCK YOUR HEALTH.<br />
        ACHIEVE YOUR GOALS.
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-slate-600 mb-10 max-w-lg font-medium leading-relaxed"
      >
        Meet the all-new FitTrack Band 5. Track steps, heart rate, sleep, and activity with unparalleled accuracy.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-4"
      >
        <a 
          href="#products"
          className="bg-[#001A2C] text-white px-8 py-4 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2"
        >
          Discover Band 5
        </a>
        <a href="#products" className="bg-white text-[#001A2C] border-2 border-[#001A2C] px-8 py-4 rounded-full font-bold text-sm hover:bg-slate-50 transition-colors">
          Shop All
        </a>
      </motion.div>
    </div>
    
    <motion.div 
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="absolute right-0 top-0 h-full w-1/2 hidden lg:block"
    >
      <img 
        src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=2070" 
        alt="Woman Running" 
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent" />
    </motion.div>
  </section>
);

const FeatureBadge = ({ icon, text }) => (
  <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1.5 rounded-lg border border-slate-100">
    <div className="text-[#00A3AD]">{icon}</div>
    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-tight">{text}</span>
  </div>
);

const SnapshotCard = ({ icon, label, value, unit, color }) => (
  <div className="bg-white p-6 rounded-3xl brand-shadow border border-slate-50 flex items-center gap-4">
    <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-xl font-black text-slate-800">{value}</span>
        <span className="text-[10px] font-bold text-slate-400 uppercase">{unit}</span>
      </div>
    </div>
  </div>
);

const Snapshot = () => (
  <section id="features" className="px-6 md:px-24 py-16 bg-[#f8fafc]">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-2xl font-black text-slate-900">Your Fitness Snapshot</h2>
        <p className="text-slate-500 text-sm font-medium mt-1">Logged in your content</p>
      </div>
      <div className="text-xs font-bold text-[#00A3AD] bg-[#00A3AD]/10 px-3 py-1 rounded-full uppercase tracking-widest">
        Logged in
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <SnapshotCard icon={<Activity className="text-brand-teal" />} label="Steps" value="11,432" unit="steps" color="bg-teal-50" />
      <SnapshotCard icon={<Zap className="text-orange-500" />} label="Activity" value="45" unit="min" color="bg-orange-50" />
      <SnapshotCard icon={<Heart className="text-rose-500" />} label="Heart Rate" value="76" unit="bpm" color="bg-rose-50" />
      <SnapshotCard icon={<Moon className="text-blue-500" />} label="Sleep" value="7h 12m" unit="" color="bg-blue-50" />
    </div>
  </section>
);

const LoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('admin@fittrack.pro');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="absolute inset-0 bg-[#001A2C]/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-[#00A3AD] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/20">
            <Lock className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-[#001A2C] tracking-tight">Access FITTRACK</h2>
          <p className="text-slate-500 font-medium mt-2">Enter your core credentials to sync your data.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Secure Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00A3AD]/20 focus:border-[#00A3AD] transition-all"
                placeholder="admin@fittrack.pro"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Access Code</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#00A3AD]/20 focus:border-[#00A3AD] transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-[#001A2C] text-white font-bold py-5 rounded-2xl shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Initialize Sync
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-400 font-bold uppercase tracking-widest text-[10px]">Or continue with</span>
            </div>
          </div>
          
          <button 
            onClick={() => window.location.href = 'http://localhost/api/auth/login/saml'}
            className="mt-6 w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-3"
          >
            <ShieldCheck size={20} className="text-[#00A3AD]" />
            Enterprise SSO (SAML)
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const PricingTier = ({ name, price, features, isPro, onSelect }) => (
  <div className={`p-8 rounded-[2.5rem] flex flex-col h-full border ${isPro ? 'bg-[#001A2C] text-white border-[#001A2C] brand-shadow' : 'bg-white border-slate-100'}`}>
    <div className="mb-8">
      <h4 className={`text-sm font-black uppercase tracking-[0.2em] mb-2 ${isPro ? 'text-[#00A3AD]' : 'text-slate-400'}`}>{name}</h4>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black tracking-tight">${price}</span>
        <span className={`text-xs font-bold ${isPro ? 'text-slate-400' : 'text-slate-500'}`}>/month</span>
      </div>
    </div>
    <ul className="space-y-4 mb-10 flex-1">
      {features.map((f, i) => (
        <li key={i} className="flex items-center gap-3 text-sm font-medium">
          <ShieldCheck size={18} className={isPro ? 'text-[#00A3AD]' : 'text-teal-500'} />
          <span className={isPro ? 'text-slate-300' : 'text-slate-600'}>{f}</span>
        </li>
      ))}
    </ul>
    <button 
      onClick={onSelect}
      className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
        isPro ? 'bg-[#00A3AD] text-white hover:bg-[#008c95]' : 'bg-slate-100 text-[#001A2C] hover:bg-slate-200'
      }`}
    >
      {isPro ? 'Current Plan' : 'Select Plan'}
    </button>
  </div>
);

const SubscriptionModule = () => (
  <section id="products" className="px-6 md:px-24 py-24 bg-white">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
      <div className="text-center max-w-2xl mx-auto">
      <h2 className="text-4xl font-black text-[#001A2C] mb-4">Elite Membership Tiers</h2>
      <p className="text-slate-500 font-medium text-lg">Scale your fitness intelligence with our precision-engineered core plans.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <PricingTier 
        name="Free Core" 
        price="0" 
        features={["Basic Activity Tracking", "Snapshot Dashboard", "Sync Interval (1h)", "Standard Support"]} 
      />
      <PricingTier 
        name="Pro Intel" 
        price="12" 
        isPro={true}
        features={["Advanced Biometrics", "Neural Performance Map", "Sync Interval (15m)", "Priority Ecosystem Access"]} 
      />
      <PricingTier 
        name="Elite Entity" 
        price="29" 
        features={["Predictive AI Insights", "Metabolic Flux Analysis", "Real-time Sync (<1s)", "Personal Bio-Architect"]} 
      />
    </div>
  </motion.div>
  </section>
);

const ModulePlaceholder = ({ title, desc, icon }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white rounded-[2rem] p-16 brand-shadow border border-slate-100 flex flex-col items-center justify-center text-center min-h-[500px]"
  >
    <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center text-[#00A3AD] mb-8 shadow-inner">
      {icon}
    </div>
    <h2 className="text-3xl font-black text-slate-900 mb-4">{title}</h2>
    <p className="text-slate-500 font-medium max-w-md mx-auto">{desc}</p>
    <button className="mt-8 bg-[#001A2C] text-white px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform">
      Request Early Access
    </button>
  </motion.div>
);

// --- Dashboard ---

const MainDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col font-sans">
      {/* Top Status Bar */}
      <div className="px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          <span className="text-sm font-bold text-emerald-600">System Active</span>
        </div>
        <button 
          onClick={onLogout} 
          className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white hover:bg-red-500 px-4 py-2 rounded-full uppercase tracking-widest transition-all border border-slate-200 hover:border-red-500 shadow-sm"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>

      <main className="flex-1 px-10 pb-10">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Hello Alex, your physiological markers are optimal today.</h1>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'Overview' && (
            <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <CompactStatCard trend="+14.2%" label="Energy Output" value="2,450" unit="kcal" color="text-emerald-500" />
                <CompactStatCard trend="+2.1%" label="Peak Heart Rate" value="168" unit="bpm" color="text-emerald-500" />
                <CompactStatCard trend="-0.5%" label="Recovery Score" value="94" unit="%" color="text-rose-500" />
                <CompactStatCard trend="+8.4%" label="Active Volume" value="12.4" unit="km" color="text-emerald-500" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Neural Progress Map */}
                <div className="lg:col-span-8 bg-white rounded-[2rem] p-8 brand-shadow border border-slate-100 flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-lg font-black text-slate-900">Neural Progress Map</h3>
                      <p className="text-xs text-slate-400 font-medium">Real-time performance distribution</p>
                    </div>
                    <div className="flex gap-1 bg-slate-50 p-1 rounded-xl">
                      {['Day', 'Week', 'Month', 'Year'].map(p => (
                        <button key={p} className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all ${p === 'Day' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{p}</button>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 bg-[#1a1c1e] rounded-[1.5rem] relative flex items-center justify-center overflow-hidden min-h-[300px]">
                    <div className="absolute inset-0 opacity-30">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-purple-500/20 to-transparent animate-pulse" />
                    </div>
                    <div className="text-center z-10">
                      <BarChart3 className="mx-auto mb-4 text-slate-700" size={48} />
                      <p className="text-slate-500 font-black uppercase tracking-[0.4em] text-[10px]">Data Stream Initializing...</p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Sessions & Pulse */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 flex flex-col items-center justify-center text-center min-h-[220px]">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Next Session</p>
                    <h4 className="text-3xl font-black text-slate-900">In 2h 45m</h4>
                  </div>

                  <div className="bg-white rounded-[2rem] p-8 brand-shadow border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-black text-slate-900">Recent Pulse</h3>
                      <button className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest hover:text-emerald-500">View All</button>
                    </div>
                    <div className="space-y-4">
                      <PulseItem name="Hyper-Intervals" time="08:42 AM" type="Strength" value="-450 Kcal" color="bg-orange-500" />
                      <PulseItem name="Zone 2 Flux" time="Yesterday" type="Cardio" value="-820 Kcal" color="bg-amber-500" />
                      <PulseItem name="Metabolic Yoga" time="2 days ago" type="Flow" value="-120 Kcal" color="bg-emerald-500" />
                      <PulseItem name="Peak Sprint" time="3 days ago" type="Power" value="-310 Kcal" color="bg-teal-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'Training' && <ModulePlaceholder key="training" title="Training Protocol" desc="Your personalized workout regimens and kinetic history will appear here once synchronized." icon={<Activity size={48} />} />}
          {activeTab === 'Fuel' && <ModulePlaceholder key="fuel" title="Metabolic Fuel" desc="Advanced nutritional tracking and caloric deficit analysis module initializing." icon={<Zap size={48} />} />}
          {activeTab === 'Target' && <ModulePlaceholder key="target" title="Entity Targets" desc="Long-term physical milestones and habitual tracking systems are offline." icon={<Moon size={48} />} />}
          {activeTab === 'Entity' && <ModulePlaceholder key="entity" title="Bio-Entity Profile" desc="Access your core biometrics, subscription status, and ecosystem preferences." icon={<User size={48} />} />}
        </AnimatePresence>
      </main>

      {/* Bottom Module Navigation */}
      <nav className="border-t border-slate-100 bg-white/80 backdrop-blur-md px-10 py-6 flex items-center gap-8">
        <button onClick={() => setActiveTab('Overview')} className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'Overview' ? 'text-slate-900 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-slate-600'}`}>Overview</button>
        <button onClick={() => setActiveTab('Training')} className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'Training' ? 'text-slate-900 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-slate-600'}`}>Training</button>
        <button onClick={() => setActiveTab('Fuel')} className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'Fuel' ? 'text-slate-900 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-slate-600'}`}>Fuel</button>
        <button onClick={() => setActiveTab('Target')} className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'Target' ? 'text-slate-900 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-slate-600'}`}>Target</button>
        <button onClick={() => setActiveTab('Entity')} className={`text-sm font-black uppercase tracking-widest transition-all ${activeTab === 'Entity' ? 'text-slate-900 underline underline-offset-8 decoration-2' : 'text-slate-400 hover:text-slate-600'}`}>Entity</button>
      </nav>
    </div>
  );
};

const CompactStatCard = ({ trend, label, value, unit, color }) => (
  <div className="bg-white rounded-[1.5rem] p-6 brand-shadow border border-slate-50">
    <div className={`text-2xl font-black mb-4 ${color}`}>{trend}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-slate-900">{value}</span>
        <span className="text-xs font-bold text-slate-500 uppercase">{unit}</span>
      </div>
    </div>
  </div>
);

const PulseItem = ({ name, time, type, value, color }) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className={`w-1 h-8 rounded-full ${color}`} />
      <div>
        <h4 className="text-xs font-black text-slate-800">{name}</h4>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight">{time} · {type}</p>
      </div>
    </div>
    <span className="text-xs font-black text-slate-900">{value}</span>
  </div>
);

const HealthItem = ({ icon, label, status }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">{icon}</div>
      <span className="text-sm font-bold text-slate-700">{label}</span>
    </div>
    <span className="text-[10px] font-black text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg uppercase">{status}</span>
  </div>
);

// --- Main App ---

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  if (isAuthenticated) {
    return <MainDashboard onLogout={() => setIsAuthenticated(false)} />;
  }

  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <Navbar onLoginClick={() => setIsLoginModalOpen(true)} />
      <Hero onLoginClick={() => setIsLoginModalOpen(true)} />
      <Snapshot />
      <SubscriptionModule />
      
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onLoginSuccess={() => {
          setIsLoginModalOpen(false);
          setIsAuthenticated(true);
        }}
      />

      <footer id="support" className="bg-[#001A2C] text-white py-20 px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <Activity className="text-[#00A3AD]" size={32} />
              <span className="text-3xl font-black tracking-tighter">FITTRACK</span>
            </div>
            <p className="text-slate-400 max-w-sm font-medium leading-relaxed">
              Empowering your fitness journey with precision tracking and neural performance analytics. Unlock your potential today.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#00A3AD]">Products</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li><a href="#products" className="hover:text-white transition-colors">FitTrack Band 5</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Smart Scale Pro</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Heart Rate Monitor</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-[#00A3AD]">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400 font-medium">
              <li><a href="#home" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
          <span>© 2026 FITTRACK INTERNATIONAL</span>
          <div className="flex gap-8">
            <a href="#">Instagram</a>
            <a href="#">Twitter</a>
            <a href="#">Youtube</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
