import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Users, 
  LogIn, 
  LogOut, 
  MapPin, 
  Clock, 
  PlusCircle, 
  Building2, 
  Search,
  ChevronLeft, 
  ChevronRight, 
  Filter, 
  User, 
  LayoutDashboard, 
  FileText, 
  Upload, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Bell, 
  Sparkles, 
  Trophy, 
  GraduationCap, 
  Heart, 
  Wrench, 
  Trash2, 
  Edit3, 
  UserCheck, 
  ArrowLeft, 
  Save, 
  Phone, 
  BookOpen, 
  Download, 
  ShieldCheck, 
  MoreVertical, 
  Eye, 
  EyeOff, 
  Image as ImageIcon, 
  Camera, 
  Loader2,
  Lock,
  ChevronDown,
  ChevronUp,
  Settings2,
  Fingerprint,
  Link as LinkIcon,
  MessageSquare,
  ExternalLink,
  Hash,
  Globe,
  IdCard,
  Home as HomeIcon,
  Info,
  Share2,      
  CalendarPlus 
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithCustomToken, 
  signInAnonymously,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  query, 
  onSnapshot, 
  serverTimestamp, 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc
} from 'firebase/firestore';
import {
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL
} from 'firebase/storage';

// -----------------------------------------------------------------------------
// [SECTION] FIREBASE CONFIGURATION & INITIALIZATION
// -----------------------------------------------------------------------------
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY, // Mesti ada VITE_ kat depan
  authDomain: "uthm-css-7741c.firebaseapp.com",
  projectId: "uthm-css-7741c",
  storageBucket: "uthm-css-7741c.firebasestorage.app",
  messagingSenderId: "939603396742",
  appId: "1:939603396742:web:31576357a74a333879a907"
};

const appId = 'uthm-css-7741c'; 

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// -----------------------------------------------------------------------------
// [SECTION] CONTEXT SETUP
// -----------------------------------------------------------------------------
const AppContext = createContext();

// -----------------------------------------------------------------------------
// [SECTION] COMPONENT: NAVBAR (TOP BAR)
// -----------------------------------------------------------------------------
const Navbar = () => {
  const { view, setView, user, handleLogout } = useContext(AppContext);
    
  const isLoggedIn = user && !user.isAnonymous;

  return (
    <div className="w-full bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 shrink-0 flex flex-col md:flex-row items-center justify-between p-4 shadow-2xl relative z-50 border-b border-white/10 gap-4">
      <div className="flex items-center justify-between w-full md:w-auto px-2">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('home')}>
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/40 border border-white/10">
            <Building2 className="text-white" size={24} />
          </div>
          <h1 className="text-white font-black text-lg leading-tight tracking-tighter uppercase drop-shadow-md">UTHM EVENT<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">PORTAL</span></h1>
        </div>
        
        {/* Mobile Auth Button */}
        <div className="md:hidden">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="p-2 rounded-xl text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 bg-rose-900/10">
                <LogOut size={18} />
              </button>
            ) : (
              <button onClick={() => setView('auth')} className="p-2 rounded-xl bg-indigo-600 text-white">
                <LogIn size={18} />
              </button>
            )}
        </div>
      </div>

      <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto px-2 justify-start md:justify-center">
        {isLoggedIn ? (
          // LOGGED IN MENU
          [
            { id: 'home', label: 'HOME', icon: <HomeIcon size={18} /> },
            { id: 'calendar', label: 'CALENDAR', icon: <CalendarIcon size={18} /> },
            { id: 'browse', label: 'BROWSE', icon: <Search size={18} /> },
            { id: 'profile', label: 'PROFILE', icon: <User size={18} /> }
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setView(item.id)} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] md:text-xs tracking-widest transition-all duration-300 whitespace-nowrap shrink-0
                ${view === item.id || (view === 'view-participants' && item.id === 'profile') || (view === 'edit-profile' && item.id === 'profile') 
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <span className={view === item.id ? 'animate-pulse' : ''}>{item.icon}</span> 
              <span className="md:inline">{item.label}</span>
            </button>
          ))
        ) : (
          // PUBLIC / GUEST MENU
          <>
            <button 
              onClick={() => setView('home')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] md:text-xs tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 ${view === 'home' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <HomeIcon size={18} /> HOME
            </button>
            <button 
              onClick={() => setView('browse')} 
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] md:text-xs tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 ${view === 'browse' || view === 'detail' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              <Search size={18} /> EVENTS
            </button>
            <button 
              onClick={() => {}} // Static placeholder for now
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] md:text-xs tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 text-slate-400 hover:text-white`}
            >
              <Info size={18} /> ABOUT US
            </button>
          </>
        )}
      </nav>

      <div className="hidden md:block px-2">
        {isLoggedIn ? (
          <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black tracking-widest text-rose-300 border border-rose-500/30 hover:bg-rose-500/20 hover:text-white hover:shadow-lg hover:shadow-rose-500/20 transition-all duration-300">
            <LogOut size={16} /> LOG OUT
          </button>
        ) : (
          <button onClick={() => setView('auth')} className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black tracking-widest bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 hover:shadow-indigo-500/50">
            <LogIn size={16} /> LOG IN
          </button>
        )}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] VIEW: HOME (LANDING PAGE)
// -----------------------------------------------------------------------------
const HomeView = () => {
  const { events, setView, setSelectedEvent, getCategoryTheme } = useContext(AppContext);

  // Mock events for landing page if no events exist to make it look populated
  const mockEvents = [
    {
      id: 'mock-1',
      title: 'UTHM Coding Boot Camp 2025',
      date: '2025-12-25',
      category: 'Workshop',
      clubName: 'Computer Science Club',
      poster: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80',
      isMock: true
    },
    {
      id: 'mock-2',
      title: 'Inter-Varsity Futsal Cup',
      date: '2025-12-28',
      category: 'Sport',
      clubName: 'UTHM Sports Centre',
      poster: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80',
      isMock: true
    },
    {
      id: 'mock-3',
      title: 'Mental Health Awareness Talk',
      date: '2026-01-05',
      category: 'Welfare',
      clubName: 'Counseling Unit',
      poster: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80',
      isMock: true
    }
  ];

  // Logic: Split events into Upcoming and Recent Past (3 months)
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    // If no real events, return mocks for upcoming, empty for past
    if (events.length === 0) return { upcomingEvents: mockEvents, pastEvents: [] };

    const upcoming = events
      .filter(e => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3); // Take top 3 upcoming

    const past = events
      .filter(e => {
        const d = new Date(e.date);
        return d < now && d >= threeMonthsAgo;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date)) // Most recent past first
      .slice(0, 3); // Take top 3 recent past

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  return (
    <div className="flex flex-col min-h-full pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full min-h-[550px] flex items-center justify-center text-center p-8 overflow-hidden">
         {/* Background */}
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black z-0"></div>
         {/* Decorative Image Overlay */}
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 z-0 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-0"></div>

         <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-1000">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-md text-indigo-300 font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Sparkles size={14} className="animate-pulse"/> Official Campus Portal
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-[0.9] drop-shadow-2xl">
               Discover & Join <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-teal-400">UTHM's Best Events.</span>
             </h1>
             <p className="text-lg md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-md">
               Open to students and the public. Register in seconds, manage your schedule, and get certified.
             </p>
             <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                 <button onClick={() => setView('browse')} className="px-10 py-4 bg-white text-indigo-950 rounded-full font-black text-sm uppercase tracking-widest hover:scale-105 hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)] transition-all duration-300 group">
                   Explore Events <ChevronRight className="inline ml-1 -mt-0.5 group-hover:translate-x-1 transition-transform" size={16}/>
                 </button>
             </div>
         </div>
      </div>

      {/* 2. UPCOMING EVENTS SECTION */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full -mt-24 relative z-20">
          <div className="bg-white/10 backdrop-blur-sm border border-white/40 p-1 rounded-3xl inline-block mb-8 shadow-2xl">
             <div className="bg-white px-6 py-2 rounded-[1.2rem] text-slate-900 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                <CalendarIcon size={14} className="text-indigo-600"/> Upcoming Events
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {upcomingEvents.map((event, idx) => {
                 const theme = getCategoryTheme(event.category);
                 return (
                  <div key={idx} className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500">
                      <div className="h-64 rounded-[2rem] overflow-hidden relative bg-slate-100">
                          {event.poster ? (
                              <img src={event.poster} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                          ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
                                 <ImageIcon size={48} className="mb-2"/>
                                 <span className="text-[10px] font-black uppercase tracking-widest">No Image</span>
                              </div>
                          )}
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-black text-xs shadow-lg uppercase tracking-wider text-slate-800 flex flex-col items-center leading-none">
                              <span className="text-[10px] text-slate-400 mb-1">{event.date ? new Date(event.date).toLocaleString('default', { month: 'short' }) : 'DEC'}</span>
                              <span className="text-xl text-indigo-600">{event.date ? new Date(event.date).getDate() : '25'}</span>
                          </div>
                          <div className="absolute top-4 left-4">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-white/90 backdrop-blur-md text-slate-800 shadow-lg`}>
                                 {theme.icon} {event.category}
                              </span>
                          </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{event.clubName}</p>
                          <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 line-clamp-2">{event.title}</h3>
                          <div className="mt-auto">
                              <button 
                                onClick={() => {
                                   if (!event.isMock) {
                                         setSelectedEvent(event); 
                                         setView('detail'); 
                                   } else {
                                         setView('browse');
                                   }
                                }} 
                                className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-colors shadow-lg flex items-center justify-center gap-2 group-hover:gap-3"
                              >
                                Join Now <ArrowLeft className="rotate-180" size={14}/>
                              </button>
                          </div>
                      </div>
                  </div>
                 );
             })}
             {upcomingEvents.length === 0 && (
                <div className="col-span-full text-center py-20 text-slate-400 font-bold bg-white/50 rounded-3xl border border-dashed border-slate-300">
                    No upcoming events scheduled.
                </div>
             )}
          </div>

          {/* 3. RECENTLY CONCLUDED (PAST) SECTION */}
          {pastEvents.length > 0 && (
            <div className="mt-20">
                <div className="bg-slate-200/50 backdrop-blur-sm border border-slate-200 p-1 rounded-3xl inline-block mb-8">
                    <div className="bg-slate-100 px-6 py-2 rounded-[1.2rem] text-slate-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} className="text-slate-400"/> Recently Concluded (Past 3 Months)
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-70 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                    {pastEvents.map((event, idx) => {
                        const theme = getCategoryTheme(event.category);
                        return (
                        <div key={idx} className="bg-slate-50 p-4 rounded-[2.5rem] border border-slate-100 flex flex-col">
                            <div className="h-48 rounded-[2rem] overflow-hidden relative bg-slate-200">
                                {event.poster ? (
                                    <img src={event.poster} alt={event.title} className="w-full h-full object-cover grayscale opacity-80" />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-200">
                                        <ImageIcon size={32}/>
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-md px-3 py-1.5 rounded-lg font-black text-[10px] uppercase text-white">
                                    Concluded
                                </div>
                            </div>
                            <div className="p-4 flex-1">
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">{event.date}</p>
                                <h3 className="text-lg font-black text-slate-700 leading-tight mb-2 line-clamp-2">{event.title}</h3>
                                <button onClick={() => { setSelectedEvent(event); setView('detail'); }} className="text-[10px] font-black uppercase text-indigo-500 hover:text-indigo-700">View Details &rarr;</button>
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
          )}

          <div className="mt-16 text-center">
               <button onClick={() => setView('browse')} className="inline-flex items-center gap-2 text-indigo-600 font-black text-sm uppercase tracking-widest hover:text-indigo-800 hover:gap-4 transition-all">
                   View All Events in Calendar <ArrowLeft className="rotate-180" size={16}/>
               </button>
          </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] VIEW: CALENDAR
// -----------------------------------------------------------------------------
const CalendarView = () => {
  const { events, setSelectedEvent, setView, currentMonth, setCurrentMonth } = useContext(AppContext);
    
  const { firstDay, days } = (date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const first = new Date(year, month, 1).getDay();
    const numDays = new Date(year, month + 1, 0).getDate();
    return { firstDay: first, days: numDays };
  })(currentMonth);
    
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight uppercase">MONTHLY CALENDAR</h2>
        <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-white/50">
          <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))} className="p-3 hover:bg-slate-100 rounded-xl transition"><ChevronLeft size={20}/></button>
          <span className="px-6 font-black text-sm uppercase tracking-widest text-indigo-600">{monthName}</span>
          <button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))} className="p-3 hover:bg-slate-100 rounded-xl transition"><ChevronRight size={20}/></button>
        </div>
      </div>
      <div className="bg-white/60 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/50 overflow-hidden">
        <div className="grid grid-cols-7 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => <div key={d} className="py-6 text-center text-[10px] font-black tracking-widest opacity-70">{d}</div>)}
        </div>
        <div className="grid grid-cols-7">
          {Array(firstDay).fill(null).map((_, i) => <div key={`empty-${i}`} className="h-40 border-r border-b border-indigo-50/50 bg-slate-50/20"></div>)}
          {Array(days).fill(null).map((_, i) => {
            const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
            const dayEvents = events.filter(e => e.date === dateStr);
            return (
              <div key={i} className="h-40 border-r border-b border-indigo-50/50 p-4 hover:bg-indigo-50/40 transition-all relative group cursor-pointer"
                onClick={() => dayEvents.length > 0 && (setSelectedEvent(dayEvents[0]), setView('detail'))}>
                <span className={`text-sm font-black ${dayEvents.length > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>{i + 1}</span>
                <div className="mt-2 space-y-1">
                  {dayEvents.map(e => (
                    <div key={e.id} className="text-[9px] bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-2 py-1.5 rounded-lg font-black truncate shadow-md shadow-indigo-500/20 leading-none border-l-2 border-white/40 hover:scale-105 transition-transform">{e.title}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] VIEW: BROWSE EVENTS
// -----------------------------------------------------------------------------
const BrowseView = () => {
  const { events, setSelectedEvent, setView, searchQuery, setSearchQuery, categoryFilter, setCategoryFilter } = useContext(AppContext);
    
  const categories = ['All', 'Sport', 'Academic', 'Welfare', 'Workshop'];
  
  // [UPDATED] Filtering logic: Exclude events older than 3 months
  const filtered = events.filter(e => {
    const eventDate = new Date(e.date);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    // Ignore time portion for date comparisons generally
    threeMonthsAgo.setHours(0,0,0,0); 

    const isNotTooOld = eventDate >= threeMonthsAgo;
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || (e.clubName && e.clubName.toLowerCase().includes(searchQuery.toLowerCase()));

    return isNotTooOld && matchesCategory && matchesSearch;
  });

  return (
    <div className="p-8 space-y-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900 uppercase">BROWSE EVENTS</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)} className={`px-5 py-2.5 rounded-xl font-black text-[10px] tracking-widest transition-all duration-300 ${categoryFilter === cat ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/40' : 'bg-white/60 backdrop-blur-md text-slate-400 border border-white/50 hover:bg-white hover:text-indigo-500'}`}>{cat.toUpperCase()}</button>
          ))}
        </div>
      </div>
      <div className="bg-white/70 backdrop-blur-xl p-4 rounded-[2rem] shadow-lg border border-white/60 flex gap-4 ring-1 ring-indigo-100">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search by name club, keyword..." className="w-full pl-16 pr-6 py-5 bg-slate-50/50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500/50 font-bold text-sm transition-all" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(event => (
          <div key={event.id} onClick={() => { setSelectedEvent(event); setView('detail'); }} className="bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/60 overflow-hidden shadow-xl shadow-indigo-100/30 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 flex flex-col cursor-pointer group hover:-translate-y-2">
            <div className="h-48 bg-indigo-50 flex items-center justify-center p-0 overflow-hidden relative">
               <div className="absolute inset-0 bg-indigo-900/10 z-10 group-hover:bg-transparent transition duration-500"></div>
               {event.poster ? (
                 <img src={event.poster} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
               ) : (
                 <FileText size={48} className="text-indigo-200 group-hover:text-indigo-400 transition" />
               )}
            </div>
            <div className="p-8">
              <span className="text-[10px] font-black text-white bg-indigo-500 px-3 py-1 rounded-full uppercase tracking-widest shadow-md shadow-indigo-500/30">{event.category}</span>
              <h3 className="text-2xl font-black mt-4 mb-6 leading-tight text-slate-800 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-violet-600 transition-all">{event.title}</h3>
              <div className="flex items-center justify-between pt-6 border-t border-slate-200/50 text-slate-400 text-xs font-bold">
                <div className="flex items-center gap-2"><CalendarIcon size={14} /> {event.date}</div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <ChevronRight size={16} />
                </div>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="col-span-full text-center text-slate-400 py-20 bg-white/30 backdrop-blur-sm border-2 border-dashed border-slate-200 rounded-[3rem]">No matching events found.</p>}
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] VIEW: DETAILED EVENT
// -----------------------------------------------------------------------------
const DetailedView = () => {
  const { selectedEvent, setView, profile, registrations, user, notify } = useContext(AppContext);
    
  if (!selectedEvent) return null;

  // --- [NEW LOGIC START] COUNTDOWN & CALENDAR ---
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!selectedEvent?.date) return;
    
    const targetDate = new Date(selectedEvent.date);
    // Attempt to parse start time from "HH:MM" or "HH:MM to HH:MM"
    if (selectedEvent.time) {
      const startTime = selectedEvent.time.split(' to ')[0].replace('am','').replace('pm','').trim();
      const [h, m] = startTime.split(':');
      if (h) targetDate.setHours(parseInt(h) + (selectedEvent.time.includes('pm') && h!=='12' ? 12 : 0), m ? parseInt(m) : 0);
    }

    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedEvent]);

  const addToCalendar = () => {
     // Basic ISO formatting for GCal
     const baseDate = selectedEvent.date.replace(/-/g, '');
     const link = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(selectedEvent.title)}&details=${encodeURIComponent(selectedEvent.description)}&location=${encodeURIComponent(selectedEvent.location)}&dates=${baseDate}/${baseDate}`;
     window.open(link, '_blank');
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({ title: selectedEvent.title, text: `Join ${selectedEvent.title}!`, url: window.location.href });
    } else {
      notify("Link copied!");
      // Fallback for when navigator.share isn't supported
      navigator.clipboard.writeText(window.location.href);
    }
  };
  // --- [NEW LOGIC END] ---

  return (
    <div className="p-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
      <button onClick={() => setView('browse')} className="mb-8 flex items-center gap-2 text-slate-500 font-black text-xs uppercase hover:text-indigo-600 transition bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm">
        <ChevronLeft size={16} /> Back to Browse
      </button>
      <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/60">
        <div className="bg-slate-900 p-16 text-white text-center relative overflow-hidden group">
          {selectedEvent.poster && (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 to-slate-900/90 z-10"></div>
              <img src={selectedEvent.poster} className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 blur-sm group-hover:scale-105 transition duration-[3s]" />
            </>
          )}
          <div className="relative z-20">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest">{selectedEvent.category}</span>
            <h2 className="text-5xl font-black uppercase tracking-tight mb-4 drop-shadow-xl">{selectedEvent.title}</h2>
            
            {/* [NEW UI] TIMER & ACTIONS */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8 animate-in slide-in-from-bottom-2 fade-in duration-700">
               <div className="flex gap-4 text-center">
                  {[
                    { label: 'Days', val: timeLeft.days },
                    { label: 'Hours', val: timeLeft.hours },
                    { label: 'Mins', val: timeLeft.minutes },
                    { label: 'Secs', val: timeLeft.seconds }
                  ].map((t, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 min-w-[70px]">
                       <div className="text-2xl font-black text-white">{t.val}</div>
                       <div className="text-[9px] uppercase tracking-widest text-indigo-200">{t.label}</div>
                    </div>
                  ))}
               </div>
               <div className="flex gap-3">
                  <button onClick={addToCalendar} className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white text-indigo-900 font-bold text-xs uppercase tracking-widest hover:bg-indigo-50 transition shadow-lg">
                    <CalendarPlus size={16}/> Save Date
                  </button>
                  <button onClick={shareEvent} className="p-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition">
                    <Share2 size={18}/>
                  </button>
               </div>
            </div>

            <p className="font-bold text-indigo-200 text-lg">By {selectedEvent.clubName}</p>
          </div>
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500 rounded-full blur-[100px] opacity-40 z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-40 z-0"></div>
        </div>
        <div className="p-12 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-black text-indigo-400 uppercase text-[10px] tracking-widest flex items-center gap-2"><CalendarIcon size={12}/> Date</p>
              <p className="font-black text-slate-800 text-lg">{selectedEvent.date}</p>
            </div>
            <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-black text-indigo-400 uppercase text-[10px] tracking-widest flex items-center gap-2"><Clock size={12}/> Time</p>
              <p className="font-black text-slate-800 text-lg">{selectedEvent.time || 'TBA'}</p>
            </div>
            <div className="space-y-1 col-span-2 md:col-span-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-black text-indigo-400 uppercase text-[10px] tracking-widest flex items-center gap-2"><MapPin size={12}/> Location</p>
              <p className="font-black text-slate-800 text-lg">{selectedEvent.location}</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em] border-b border-slate-100 pb-2">Description</h4>
            <p className="text-slate-600 leading-relaxed font-medium whitespace-pre-line text-justify">{selectedEvent.description}</p>
          </div>

          {/* [FEATURE] DIGITAL TICKET */}
          {(() => {
            const userTicket = registrations.find(r => r.eventId === selectedEvent.id && r.userId === user?.uid);
            if (userTicket) return (
                <div className="mb-10 relative group perspective-1000">
                    <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row relative z-10">
                        {/* Left Side: Event Info */}
                        <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-dashed border-slate-300 relative">
                             <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                                 <Building2 size={100} />
                             </div>
                             
                             {/* [NEW] Edit Button if Event is Future */}
                             {new Date(selectedEvent.date) >= new Date().setHours(0,0,0,0) && (
                                <button 
                                    onClick={() => setView('register-form')}
                                    className="absolute top-6 right-6 p-2 bg-indigo-50 text-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-white transition-colors z-20 shadow-sm border border-indigo-100"
                                    title="Edit Registration Details"
                                >
                                    <Edit3 size={16} />
                                </button>
                             )}

                             <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 font-black text-[10px] uppercase tracking-widest mb-4">
                                <CheckCircle2 size={12} className="inline mr-1"/> Registered Ticket
                             </span>
                             <h2 className="text-2xl font-black text-slate-900 leading-none mb-2 uppercase">{selectedEvent.title}</h2>
                             <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">{selectedEvent.clubName}</p>
            
                             <div className="grid grid-cols-2 gap-4 text-xs">
                                 <div>
                                     <p className="text-[9px] font-black text-slate-400 uppercase">Date</p>
                                     <p className="font-bold text-slate-800">{selectedEvent.date}</p>
                                 </div>
                                 <div>
                                     <p className="text-[9px] font-black text-slate-400 uppercase">Time</p>
                                     <p className="font-bold text-slate-800">{selectedEvent.time}</p>
                                 </div>
                                  <div>
                                     <p className="text-[9px] font-black text-slate-400 uppercase">Venue</p>
                                     <p className="font-bold text-slate-800">{selectedEvent.location}</p>
                                 </div>
                                 <div>
                                     <p className="text-[9px] font-black text-slate-400 uppercase">Ticket Holder</p>
                                     <p className="font-bold text-slate-800">{userTicket.fullName}</p>
                                 </div>
                             </div>
                        </div>
            
                        {/* Right Side: QR & ID */}
                        <div className="w-full md:w-64 bg-slate-900 p-8 flex flex-col items-center justify-center text-white relative">
                             {/* Decorative Circles for 'holes' */}
                             <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full"></div>
                             <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-100 rounded-full md:hidden"></div>
            
                             <div className="bg-white p-2 rounded-xl mb-4">
                                 {/* Placeholder QR */}
                                 <div className="w-24 h-24 bg-slate-900 rounded-lg flex items-center justify-center">
                                    <Fingerprint size={48} className="text-white/50" />
                                 </div>
                             </div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Ref Code</p>
                             <p className="text-xl font-mono font-black tracking-widest text-indigo-400">{userTicket.registerId || 'NO-REF'}</p>
                        </div>
                    </div>
                </div>
            );
          })()}

          {selectedEvent.photos && (
            <div className="space-y-6 pt-4">
              <h4 className="font-black text-slate-900 uppercase text-xs tracking-[0.2em]">Event Gallery</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {selectedEvent.photos.split(',').filter(Boolean).map((url, i) => (
                   <div key={i} className="rounded-2xl overflow-hidden shadow-lg shadow-indigo-500/10 h-32 hover:scale-105 transition duration-300 ring-2 ring-white cursor-pointer">
                     <img src={url.trim()} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                   </div>
                 ))}
              </div>
            </div>
          )}

          <div className="pt-10 border-t border-slate-100">
            {profile?.role === 'club' ? (
              <div className="p-6 bg-slate-50 rounded-2xl text-center text-slate-400 font-bold text-sm italic border border-dashed border-slate-200">
                Clubs manage event data via their Profile Dashboard.
              </div>
            ) : (
              <button 
                onClick={() => setView('register-form')} 
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-6 rounded-[1.5rem] font-black text-xl shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.02] transition-all duration-300 active:scale-95"
              >
                REGISTER NOW
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] FORM: REGISTRATION
// -----------------------------------------------------------------------------
const RegistrationForm = () => {
  const { selectedEvent, profile, user, setView, registrations, checkEventCapacity, notify, uploadFile } = useContext(AppContext);
  const [uploading, setUploading] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [regId, setRegId] = useState('');

  const isGuest = !user || user.isAnonymous;
  
  // Check for existing registration
  const existingReg = registrations.find(r => r.eventId === selectedEvent?.id && r.userId === user?.uid);
  const isEditMode = !!existingReg;
  
  const isFull = selectedEvent && !isEditMode ? !checkEventCapacity(selectedEvent) : false;

  const config = selectedEvent?.formConfig || {
    requireMatric: true,
    requireFaculty: true,
    requireTshirt: true,
    requirePayment: true,
    requireIC: false,
    externalLink: ''
  };

  // SUCCESS VIEW
  if (isSuccess) return (
    <div className="p-8 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
       <div className="bg-white/90 backdrop-blur-2xl p-16 rounded-[4rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] border border-white text-center space-y-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
         <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-100/50 animate-bounce">
            <CheckCircle2 size={48} />
         </div>
         <div className="space-y-2">
           <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Success!</h2>
           <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest italic">
             {isEditMode ? 'Registration Updated' : 'Registration Recorded'}
           </p>
         </div>
         <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
             <p className="text-sm font-medium text-slate-600">You are officially registered for <span className="font-black text-indigo-600">{selectedEvent.title}</span>.</p>
             
             <div className="bg-white p-4 rounded-2xl shadow-sm border border-indigo-50">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Reference ID</p>
                <p className="text-2xl font-black text-indigo-700 tracking-tighter">{regId}</p>
                <p className="text-[9px] text-slate-400 mt-1 italic">Save this ID for attendance check-in.</p>
             </div>

             {config.externalLink && (
                <div className="pt-4 space-y-4">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Action Required:</p>
                   <a 
                    href={config.externalLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg shadow-green-500/30 hover:scale-105 transition flex items-center justify-center gap-3"
                   >
                     <MessageSquare size={18} /> Join Group Chat
                   </a>
                </div>
             )}
         </div>
         <button 
           onClick={() => setView(isGuest ? 'browse' : 'profile')} 
           className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-slate-800 shadow-xl transition"
         >
           {isGuest ? 'Back to Events' : 'Go to Records'}
         </button>
       </div>
    </div>
  );

  return (
    <div className="p-8 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
      <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white/60">
        <h2 className="text-3xl font-black mb-2 uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900">
          {isEditMode ? 'EDIT REGISTRATION' : (isGuest ? 'GUEST REGISTRATION' : 'STUDENT REGISTRATION')}
        </h2>
        <p className="text-indigo-600 font-black mb-10 uppercase text-xs tracking-widest leading-none">{selectedEvent?.title}</p>
        
        {isFull && !isEditMode && (
          <div className="mb-8 p-6 bg-rose-50 border-l-4 border-rose-500 rounded-2xl flex items-start gap-4 shadow-sm">
            <AlertCircle className="text-rose-500 mt-1" size={20} />
            <div>
              <p className="font-black text-rose-900 text-sm uppercase">Notice</p>
              <p className="text-rose-700 text-xs font-bold uppercase">
                This event has reached its maximum participant limit.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={async (e) => {
          e.preventDefault();
          const f = e.target;
          // If capacity full and not editing, block
          if (isFull && !isEditMode) { notify("Event is full!", "error"); return; }
            
          setUploading(true);
          try {
            let receiptUrl = existingReg?.receiptUrl || ''; // Default to existing receipt
            if (config.requirePayment && receiptFile) {
                receiptUrl = await uploadFile(receiptFile, 'receipts');
            }

            // DYNAMIC ID LOGIC
            let finalRegId = existingReg?.registerId || '';
            if (!finalRegId) {
                if (!isGuest) {
                   finalRegId = config.requireMatric ? (f.matric?.value || profile?.matric || 'STUDENT') : (profile?.matric || 'STUDENT');
                } else {
                   finalRegId = Math.random().toString(36).substring(2, 8).toUpperCase();
                }
            }

            const regData = {
              fullName: f.fullName.value,
              email: f.email.value,
              phone: isGuest ? f.phone.value : (profile?.phone || 'N/A'),
              matric: config.requireMatric ? (f.matric?.value || 'N/A') : 'N/A',
              faculty: config.requireFaculty ? (f.faculty?.value || 'N/A') : 'N/A',
              icNumber: config.requireIC ? (f.icNumber?.value || 'N/A') : 'N/A',
              tshirt: config.requireTshirt ? (f.tshirt?.value || 'N/A') : 'N/A',
              eventId: selectedEvent.id,
              eventTitle: selectedEvent.title,
              clubName: selectedEvent.clubName,
              userId: user?.uid || 'guest-user',
              isOutsider: isGuest,
              registerId: finalRegId,
              paymentStatus: config.requirePayment ? (isEditMode ? existingReg.paymentStatus : 'Pending') : 'N/A', // Don't reset verified status on edit
              status: 'Active',
              attendance: isEditMode ? existingReg.attendance : false,
              receiptUrl,
              timestamp: isEditMode ? existingReg.timestamp : serverTimestamp(), // Keep original timestamp or update? Usually keep original for registration time.
              lastUpdated: serverTimestamp()
            };

            if (isEditMode) {
                await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registrations', existingReg.id), regData);
                notify("Registration updated!");
            } else {
                await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'registrations'), regData);
                notify("Registration successful! See you there.");
            }
            
            setRegId(finalRegId);
            setIsSuccess(true);
          } catch (e) { console.error(e); notify("Failed to process registration"); }
          finally { setUploading(false); }
        }} className="space-y-5">
          
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Full Name</label>
            <input name="fullName" defaultValue={existingReg?.fullName || profile?.fullName} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Email Address</label>
            <input name="email" type="email" defaultValue={existingReg?.email || profile?.email} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
          </div>

          {isGuest && (
             <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Phone Number</label>
              <input name="phone" defaultValue={existingReg?.phone} placeholder="012-3456789" required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
            </div>
          )}

          {config.requireIC && (
             <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">IC Number / ID</label>
              <input name="icNumber" defaultValue={existingReg?.icNumber} placeholder="e.g. 012345-01-1234" required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {config.requireMatric && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Matric Number</label>
                <input name="matric" defaultValue={existingReg?.matric} placeholder="e.g. AB12345" required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
              </div>
            )}
            {config.requireFaculty && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Faculty</label>
                <select name="faculty" defaultValue={existingReg?.faculty} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm">
                  <option>FKMP</option><option>FSKTM</option><option>FKEE</option><option>FKAAB</option><option>FAST</option><option>FPTP</option><option>FPTV</option>
                </select>
              </div>
            )}
          </div>

          {config.requireTshirt && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">T-shirt Size</label>
              <select name="tshirt" defaultValue={existingReg?.tshirt} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm">
                <option>XS</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
              </select>
            </div>
          )}

          {config.requirePayment && (
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">
                  Registration Fee Receipt {isEditMode && existingReg?.receiptUrl && "(Re-upload to change)"}
              </label>
              <div className={`w-full p-8 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-300 transition relative overflow-hidden ${receiptFile ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-white/50'}`}>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setReceiptFile(e.target.files[0])} accept="image/*,application/pdf" required={!isEditMode && !existingReg?.receiptUrl} />
                {receiptFile ? (
                    <div className="text-center text-indigo-600">
                        <CheckCircle2 size={32} className="mx-auto mb-2 text-green-500"/>
                        <span className="text-xs font-bold">{receiptFile.name}</span>
                    </div>
                ) : (
                    <>
                      {isEditMode && existingReg?.receiptUrl ? (
                          <div className="text-center">
                              <CheckCircle2 size={32} className="mx-auto mb-2 text-indigo-300"/>
                              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Previous Receipt Uploaded</span>
                          </div>
                      ) : (
                          <>
                            <Upload size={32} className="mb-2 group-hover:text-indigo-600 transition" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Click to Upload Proof</span>
                          </>
                      )}
                    </>
                )}
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-6">
            <button type="button" onClick={() => setView('detail')} className="flex-1 text-slate-400 font-black text-xs uppercase hover:text-slate-600 transition">Cancel</button>
            <button 
              type="submit" 
              disabled={(isFull && !isEditMode) || uploading}
              className={`flex-[2] py-5 rounded-[1.5rem] font-black text-lg shadow-xl hover:shadow-2xl transition flex items-center justify-center gap-2 ${(isFull && !isEditMode) || uploading ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:scale-[1.02] shadow-indigo-500/30'}`}
            >
              {uploading && <Loader2 size={20} className="animate-spin"/>}
              {isEditMode ? "UPDATE DETAILS" : "REGISTER"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] FORM: CREATE/EDIT EVENT
// -----------------------------------------------------------------------------
const CreateEditEvent = () => {
  const { selectedEvent, user, events, profile, setView, notify, uploadFile } = useContext(AppContext);
  const [uploading, setUploading] = useState(false);
  const [posterFile, setPosterFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState(null);

  // --- [NEW] Validation States ---
  const [conflictModal, setConflictModal] = useState(false);
  const [conflictingEvent, setConflictingEvent] = useState(null);
  const [pendingData, setPendingData] = useState(null); // Stores form data while waiting for user confirmation

  // Registration Form Preferences State
  const [formConfig, setFormConfig] = useState(selectedEvent?.formConfig || {
    requireMatric: true,
    requireFaculty: true,
    requireTshirt: false,
    requirePayment: false,
    requireIC: false,
    externalLink: ''
  });

  const toggleConfig = (key) => setFormConfig(prev => ({ ...prev, [key]: !prev[key] }));

  // Logic to parse existing time string "HH:MM to HH:MM" for edit mode
  let defaultStart = '';
  let defaultEnd = '';
  
  if (selectedEvent?.time && selectedEvent.time.includes(' to ')) {
    const parts = selectedEvent.time.split(' to ');
    if (parts.length === 2) {
      defaultStart = parts[0];
      defaultEnd = parts[1];
    }
  }

  // --- [NEW] Helper: Convert Time "HH:MM" to minutes for comparison ---
  const getMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  // --- [NEW] Step 1: Handle the Submit Button Click ---
  const handlePreSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    
    // 1. Capture Form Data
    const rawData = {
      title: f.title.value,
      date: f.date.value,
      timeFrom: f.timeFrom.value,
      timeTo: f.timeTo.value,
      location: f.venue.value,
      category: f.category.value,
      max: f.max.value,
      description: f.description.value,
      approval: f.approval.value,
      externalLink: f.externalLink.value
    };

    // 2. Overlap Logic
    const newStart = getMinutes(rawData.timeFrom);
    const newEnd = getMinutes(rawData.timeTo);

    // Find any event that overlaps
    const overlap = events.find(ev => {
      // Don't check against itself if editing
      if (selectedEvent && ev.id === selectedEvent.id) return false;
      
      // Must be same date
      if (ev.date !== rawData.date) return false;

      // Parse existing event times (Format: "HH:MM to HH:MM")
      if (!ev.time || !ev.time.includes(' to ')) return false;
      const [evStartStr, evEndStr] = ev.time.split(' to ');
      const evStart = getMinutes(evStartStr);
      const evEnd = getMinutes(evEndStr);

      // Overlap Formula: (StartA < EndB) and (EndA > StartB)
      return (newStart < evEnd && newEnd > evStart);
    });

    if (overlap) {
      // 3. If Overlap found, Show Custom Popup
      // Parse the overlapping time for the message
      const [ovStart, ovEnd] = overlap.time.split(' to ');
      
      setConflictingEvent({
        date: overlap.date,
        startTime: ovStart,
        endTime: ovEnd,
        title: overlap.title // Optional: purely for context
      });
      setPendingData(rawData); // Save data to state
      setConflictModal(true);  // Open Modal
    } else {
      // 4. No Overlap, proceed directly
      await processFinalSave(rawData);
    }
  };

  // --- [NEW] Step 2: Actual Firebase Save Function ---
  const processFinalSave = async (data) => {
    if (!user) return;
    setUploading(true);
    setConflictModal(false); // Close modal if open

    try {
      let posterUrl = selectedEvent?.poster || '';
      if (posterFile) {
        posterUrl = await uploadFile(posterFile, `events/${user.uid}`);
      }

      let galleryUrls = selectedEvent?.photos ? selectedEvent.photos.split(',') : [];
      if (galleryFiles && galleryFiles.length > 0) {
        const newUrls = await Promise.all(Array.from(galleryFiles).map(file => uploadFile(file, `events/${user.uid}/gallery`)));
        galleryUrls = [...galleryUrls, ...newUrls];
      }

      const finalPayload = {
        title: data.title,
        date: data.date,
        time: `${data.timeFrom} to ${data.timeTo}`, // Combine time here
        location: data.location,
        category: data.category,
        maxParticipants: data.max,
        description: data.description,
        approval: data.approval,
        clubName: profile?.fullName,
        createdBy: user.uid,
        poster: posterUrl,
        photos: galleryUrls.join(','),
        formConfig: { ...formConfig, externalLink: data.externalLink },
        lastModified: serverTimestamp()
      };

      if (selectedEvent) {
        await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', selectedEvent.id), finalPayload);
        notify("Event updated successfully!");
      } else {
        await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'events'), { ...finalPayload, createdAt: serverTimestamp() });
        notify("New event created!");
      }
      setView('profile');
    } catch (e) { 
      alert(e.message); 
    } finally { 
      setUploading(false); 
      setPendingData(null);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto animate-in zoom-in-95 duration-500 relative">
      
      {/* --- [NEW] CUSTOM CONFIRMATION MODAL --- */}
      {conflictModal && conflictingEvent && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setConflictModal(false)}></div>
            <div className="bg-white rounded-[2rem] p-8 max-w-md w-full shadow-2xl relative z-10 border border-slate-200 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <AlertCircle size={32} />
                </div>
                <h3 className="text-xl font-black text-center text-slate-800 mb-4 uppercase">Schedule Confirmation</h3>
                
                <p className="text-sm text-slate-600 text-center leading-relaxed mb-8">
                  There is another event scheduled on <span className="font-bold text-slate-900">{conflictingEvent.date}</span> from <span className="font-bold text-slate-900">{conflictingEvent.startTime}</span> to <span className="font-bold text-slate-900">{conflictingEvent.endTime}</span>.
                  <br/><br/>
                   Do you want to proceed with creating this event?
                </p>

                <div className="flex gap-3">
                    <button 
                        onClick={() => setConflictModal(false)}
                        className="flex-1 py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-black text-xs uppercase hover:bg-slate-50 transition"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => processFinalSave(pendingData)}
                        className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition"
                    >
                        Yes, Proceed
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white/60">
        <h2 className="text-3xl font-black mb-10 uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900">{selectedEvent ? 'EDIT EVENT' : 'CREATE NEW EVENT'}</h2>
        
        {/* Changed onSubmit to handlePreSubmit */}
        <form onSubmit={handlePreSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Event Title*</label>
            <input name="title" defaultValue={selectedEvent?.title} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" />
          </div>
           
          {/* Main Poster Input */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Event Poster</label>
            <div className={`w-full p-6 border-4 border-dashed rounded-2xl flex items-center justify-center relative overflow-hidden transition ${posterFile ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-white/50'}`}>
                <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    onChange={(e) => setPosterFile(e.target.files[0])} 
                    accept="image/*" 
                />
                <div className="text-center flex flex-col items-center gap-2">
                    {selectedEvent?.poster && !posterFile && <img src={selectedEvent.poster} className="h-20 w-auto rounded-lg mb-2 shadow-sm" alt="Current Poster"/>}
                    {posterFile ? (
                        <p className="text-indigo-600 font-bold text-xs flex items-center gap-2"><CheckCircle2 size={16}/> {posterFile.name}</p>
                    ) : (
                        <p className="text-slate-300 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><ImageIcon size={16}/> {selectedEvent?.poster ? "Change Poster" : "Upload Poster"}</p>
                    )}
                </div>
            </div>
          </div>

          {/* New Gallery Input Section */}
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Additional Info (Rules / Size Charts / Gallery)</label>
            <div className={`w-full p-6 border-4 border-dashed rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition ${galleryFiles ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-white/50'}`}>
                <input 
                    type="file" 
                    multiple 
                    className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                    onChange={(e) => setGalleryFiles(e.target.files)} 
                    accept="image/*" 
                />
                <div className="text-center flex flex-col items-center gap-2">
                    {galleryFiles ? (
                        <div className="flex flex-col items-center">
                            <p className="text-indigo-600 font-bold text-xs flex items-center gap-2"><CheckCircle2 size={16}/> {galleryFiles.length} files selected</p>
                            <span className="text-[9px] text-slate-400">(Will be added to existing)</span>
                        </div>
                    ) : (
                        <p className="text-slate-300 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><ImageIcon size={16}/> Upload Gallery Images</p>
                    )}
                </div>
            </div>
             
            {/* Existing Gallery Preview */}
            {selectedEvent?.photos && (
                <div className="mt-4 space-y-2">
                    <p className="text-[9px] font-black text-slate-400 uppercase ml-2">Current Gallery</p>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {selectedEvent.photos.split(',').filter(Boolean).map((url, i) => (
                            <div key={i} className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-slate-200 relative group">
                                <img src={url} alt="Gallery" className="h-full w-full object-cover" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Date</label>
              <input name="date" type="date" defaultValue={selectedEvent?.date} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Venue*</label>
              <input name="venue" defaultValue={selectedEvent?.location} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Category</label>
              <select name="category" defaultValue={selectedEvent?.category || 'Workshop'} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Workshop</option><option>Seminar</option><option>Sport</option><option>Academic</option><option>Welfare</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Max Participants</label>
              <input name="max" type="number" defaultValue={selectedEvent?.maxParticipants || 0} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Time Start</label>
              <input name="timeFrom" type="time" defaultValue={defaultStart} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Time End</label>
              <input name="timeTo" type="time" defaultValue={defaultEnd} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Description</label>
            <textarea name="description" defaultValue={selectedEvent?.description} rows={4} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 shadow-inner">
             <div className="flex items-center gap-2 mb-2">
                <Settings2 size={16} className="text-indigo-500" />
                <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest">Registration Form Setup</h3>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { key: 'requireMatric', label: 'Matric Number', icon: <GraduationCap size={14}/> },
                  { key: 'requireFaculty', label: 'Faculty Info', icon: <Building2 size={14}/> },
                  { key: 'requireTshirt', label: 'T-shirt Size', icon: <Sparkles size={14}/> },
                  { key: 'requirePayment', label: 'Payment Receipt', icon: <ShieldCheck size={14}/> },
                  { key: 'requireIC', label: 'IC Number', icon: <Fingerprint size={14}/> }
                ].map(item => (
                  <button 
                    key={item.key}
                    type="button"
                    onClick={() => toggleConfig(item.key)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${formConfig[item.key] ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-400 border-slate-200'}`}
                  >
                    <div className={formConfig[item.key] ? 'text-white' : 'text-indigo-400'}>{item.icon}</div>
                    <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
                  </button>
                ))}
             </div>
             
             <div className="pt-4 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                   <LinkIcon size={12}/> Post-Registration WhatsApp/Telegram Link
                </label>
                <div className="relative">
                  <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16}/>
                  <input name="externalLink" defaultValue={formConfig.externalLink} placeholder="https://chat.whatsapp.com/..." className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-xs outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" />
                </div>
             </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Paperwork Approval status</label>
            <select name="approval" defaultValue={selectedEvent?.approval || 'Pending'} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Pending</option><option>Approved</option><option>Rejected</option>
            </select>
          </div>

          <div className="flex gap-4 pt-10">
            <button type="button" onClick={() => setView('profile')} className="flex-1 text-slate-400 font-black text-xs uppercase hover:text-slate-600 transition">Cancel</button>
            <button type="submit" disabled={uploading} className="flex-[2] bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition flex items-center justify-center gap-2">
                {uploading ? <Loader2 size={24} className="animate-spin" /> : "SAVE EVENT"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] VIEW: PARTICIPANTS LIST (ADMIN)
// -----------------------------------------------------------------------------
const ParticipantsListView = () => {
  const { selectedEvent, registrations, setView, downloadCSV, notify } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
    
  const eventParticipants = useMemo(() => {
    return registrations
      .filter(r => r.eventId === selectedEvent?.id)
      .filter(r => 
        r.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (r.registerId && r.registerId.toLowerCase().includes(searchTerm.toLowerCase())) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [registrations, selectedEvent, searchTerm]);
    
  const toggleAttendance = async (regId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registrations', regId), {
        attendance: !currentStatus
      });
      notify(`Attendance updated!`);
    } catch (e) { notify("Update failed", "error"); }
  };

  const verifyPayment = async (regId, currentStatus) => {
      try {
      await updateDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registrations', regId), {
        paymentStatus: currentStatus === 'Verified' ? 'Pending' : 'Verified'
      });
      notify(`Payment status updated!`);
    } catch (e) { notify("Update failed", "error"); }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <button onClick={() => setView('profile')} className="p-4 bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl text-slate-400 hover:text-indigo-600 shadow-sm transition">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900 tracking-tight uppercase leading-tight">ATTENDANCE PORTAL</h2>
            <p className="text-indigo-600 font-bold uppercase text-[10px] tracking-widest leading-none">{selectedEvent?.title}</p>
          </div>
        </div>

        <div className="flex flex-1 max-w-md items-center gap-3 bg-white/80 p-2 rounded-2xl border border-white shadow-lg">
           <Search size={18} className="ml-4 text-slate-300" />
           <input 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Name or Ref Code..." 
            className="w-full p-3 bg-transparent outline-none font-bold text-sm"
           />
        </div>

        <div className="flex items-center gap-3">
            <button 
            onClick={() => downloadCSV(selectedEvent?.title, eventParticipants)}
            className="bg-white/80 backdrop-blur-md text-slate-600 border border-white/60 px-6 py-3 rounded-2xl font-black text-[10px] tracking-widest shadow-sm flex items-center gap-2 hover:bg-white transition"
            >
              <Download size={16}/> EXPORT CSV
            </button>
            <div className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3 rounded-full font-black text-[10px] tracking-widest shadow-lg shadow-indigo-500/30 whitespace-nowrap">
              {eventParticipants.length} ENTRIES
            </div>
        </div>
      </div>

      <div className="bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-2xl border border-white/50 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
            <tr>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest">Participant</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest">Reference ID</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest">Payment</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-center">Status</th>
              <th className="p-8 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-indigo-50/50">
            {eventParticipants.map(reg => (
              <tr key={reg.id} className="hover:bg-indigo-50/40 transition">
                <td className="p-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${reg.isOutsider ? 'bg-amber-500' : 'bg-indigo-500'}`}>
                       {reg.isOutsider ? <Globe size={18}/> : <GraduationCap size={18}/>}
                    </div>
                    <div>
                      <p className="font-black text-slate-900 text-lg leading-none">{reg.fullName}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`text-[8px] font-black px-2 py-0.5 rounded-md uppercase border ${reg.isOutsider ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-indigo-50 text-indigo-600 border-indigo-200'}`}>
                          {reg.isOutsider ? 'Guest' : 'Student'}
                        </span>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-tighter">
                          {reg.matric !== 'N/A' ? reg.matric : reg.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-8">
                    <div className="flex items-center gap-2 text-slate-500">
                       <Hash size={14} className="text-slate-300"/>
                       <span className="font-mono font-bold text-sm tracking-widest">{reg.registerId || 'N/A'}</span>
                    </div>
                </td>
                <td className="p-8">
                  {reg.paymentStatus !== 'N/A' ? (
                    <button 
                      onClick={() => verifyPayment(reg.id, reg.paymentStatus)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${reg.paymentStatus === 'Verified' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-amber-50 text-amber-600 border border-amber-100'}`}
                    >
                      <ShieldCheck size={14}/> {reg.paymentStatus || 'Pending'}
                    </button>
                  ) : (
                    <span className="text-[10px] font-bold text-slate-300 uppercase italic tracking-widest">Free Entry</span>
                  )}
                </td>
                <td className="p-8 text-center">
                  <button 
                    onClick={() => toggleAttendance(reg.id, reg.attendance)}
                    className={`group relative overflow-hidden px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${reg.attendance ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-slate-100 text-slate-400 border border-slate-200 hover:border-green-300 hover:text-green-500'}`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {reg.attendance ? <UserCheck size={14}/> : <User size={14}/>}
                      {reg.attendance ? "Attended" : "Mark Present"}
                    </div>
                  </button>
                </td>
                <td className="p-8 text-right">
                  <button onClick={async () => { if(confirm("Remove participant?")) await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registrations', reg.id)); }} className="text-rose-400 hover:text-rose-600 p-2"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
            {eventParticipants.length === 0 && (
              <tr>
                <td colSpan="5" className="p-32 text-center text-slate-300 font-bold italic flex flex-col items-center gap-4">
                  <Search size={48} className="opacity-10"/>
                  No participants matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] FORM: EDIT PROFILE
// -----------------------------------------------------------------------------
const EditProfileView = () => {
  const { user, profile, setProfile, setView, notify, uploadFile } = useContext(AppContext);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [expandPassword, setExpandPassword] = useState(false);
    
  // [NEW] 1. Upload Loading State & Storage for the URL
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);

  // [NEW] 2. Handle Image Upload immediately on selection
  const handleImageUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile); // Keep for UI feedback (filename display)
    setIsUploading(true);

    try {
      const url = await uploadFile(selectedFile, `profiles/${user.uid}`);
      setUploadedPhotoUrl(url);
      notify("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      notify("Failed to upload image", "error");
    } finally {
      setIsUploading(false);
    }
  };
    
  return (
    <div className="p-8 max-w-xl mx-auto animate-in zoom-in-95 duration-500">
      <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white/60">
        <h2 className="text-3xl font-black mb-10 uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900">Edit Profile</h2>
        <form onSubmit={async (e) => {
          e.preventDefault();
          const f = e.target;
            
          setUploading(true);
          try {
            if (expandPassword) {
              const oldPass = f.oldPassword.value;
              const newPass = f.newPassword.value;
              const confirmPass = f.confirmPassword.value;

              if (!oldPass || !newPass || !confirmPass) {
                notify("All password fields are required", "error");
                setUploading(false);
                return;
              }

              if (newPass !== confirmPass) {
                notify("New passwords do not match", "error");
                setUploading(false);
                return;
              }

              if (newPass.length < 6) {
                notify("Password must be at least 6 characters", "error");
                setUploading(false);
                return;
              }

              try {
                const credential = EmailAuthProvider.credential(user.email, oldPass);
                await reauthenticateWithCredential(auth.currentUser, credential);
                await updatePassword(auth.currentUser, newPass);
              } catch (reauthErr) {
                console.error(reauthErr);
                notify("Old password incorrect or update failed", "error");
                setUploading(false);
                return;
              }
            }

            // [UPDATED] Use the pre-uploaded URL or fallback to existing profile URL
            const photoUrl = uploadedPhotoUrl || profile.photoUrl || '';

            const data = {
              fullName: f.fullName.value,
              phone: f.phone.value,
              faculty: f.faculty.value,
              course: f.course.value,
              role: profile.role,
              email: profile.email,
              photoUrl
            };
            await setDoc(doc(db, 'artifacts', appId, 'users', user.uid, 'profile', 'data'), data);
            setProfile(data);
            notify("Looking good! Profile changes saved");
            setView('profile');
          } catch (e) { 
            console.error(e);
            notify("Failed to update profile", "error"); 
          }
          finally { setUploading(false); }
        }} className="space-y-6">
            
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
              <input name="fullName" defaultValue={profile?.fullName} required className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
            </div>
          </div>
            
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Profile Photo</label>
            <div className={`w-full p-6 border-4 border-dashed rounded-2xl flex items-center justify-center relative overflow-hidden transition ${file ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-white/50'}`}>
                {/* [UPDATED] Input uses handleImageUpload */}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={handleImageUpload} accept="image/*" />
                <div className="text-center flex flex-col items-center gap-2">
                    {(profile?.photoUrl && !file) && <img src={profile.photoUrl} className="w-16 h-16 rounded-full object-cover mb-2 shadow-md ring-2 ring-white" alt="Current"/>}
                    {file ? (
                        <div className="flex flex-col items-center">
                           {/* Show visual feedback if uploaded */}
                           {uploadedPhotoUrl && <img src={uploadedPhotoUrl} className="w-16 h-16 rounded-full object-cover mb-2 shadow-md ring-2 ring-indigo-200" alt="New Preview"/>}
                           <p className="text-indigo-600 font-bold text-xs flex items-center gap-2">
                             {isUploading ? <Loader2 size={16} className="animate-spin"/> : <CheckCircle2 size={16}/>} 
                             {file.name}
                           </p>
                        </div>
                    ) : (
                        <p className="text-slate-300 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><Upload size={16}/> {profile?.photoUrl ? "Change Photo" : "Upload Photo"}</p>
                    )}
                </div>
            </div>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
                <input name="phone" defaultValue={profile?.phone} placeholder="012-3456789" className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Faculty</label>
              <select name="faculty" defaultValue={profile?.faculty} className="w-full p-4 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm">
                <option>FKMP</option><option>FSKTM</option><option>FKEE</option><option>FKAAB</option><option>FAST</option><option>FPTP</option><option>FPTV</option>
              </select>
            </div>
          </div>
            
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Course Name</label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18}/>
              <input name="course" defaultValue={profile?.course} placeholder="Mechanical Engineering" className="w-full pl-12 pr-4 py-4 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => setExpandPassword(!expandPassword)}
              className="flex items-center justify-between w-full py-2 group"
            >
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] group-hover:text-indigo-700 transition-colors">Change Password?</span>
              {expandPassword ? <ChevronUp size={16} className="text-indigo-400"/> : <ChevronDown size={16} className="text-indigo-400"/>}
            </button>
              
            {expandPassword && (
              <div className="mt-4 space-y-4 animate-in slide-in-from-top-4 duration-300">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Current Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16}/>
                    <input name="oldPassword" type="password" placeholder="Verify existing password" required={expandPassword} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">New Password</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16}/>
                    <input name="newPassword" type="password" placeholder="Minimum 6 characters" required={expandPassword} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Confirm New Password</label>
                  <div className="relative">
                    <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16}/>
                    <input name="confirmPassword" type="password" placeholder="Repeat new password" required={expandPassword} className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-10">
            <button type="button" onClick={() => setView('profile')} className="flex-1 text-slate-400 font-black text-xs uppercase tracking-widest hover:text-slate-600 transition">Cancel</button>
              
            {/* [UPDATED] 3. Button with Conditional Text & Disabled state */}
            <button 
              type="submit" 
              disabled={uploading || isUploading} 
              className={`flex-[2] bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-5 rounded-[1.5rem] font-black text-lg shadow-xl shadow-indigo-500/30 hover:scale-[1.02] transition flex items-center justify-center gap-2 ${isUploading ? 'opacity-70 cursor-wait' : ''}`}
            >
              {isUploading ? (
                <>
                  <Loader2 size={24} className="animate-spin" /> Uploading Image...
                </>
              ) : uploading ? (
                <Loader2 size={24} className="animate-spin" /> 
              ) : (
                <><Save size={20}/> Save Changes</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] VIEW: USER PROFILE
// -----------------------------------------------------------------------------
const ProfileView = () => {
  const { user, profile, events, registrations, setView, setSelectedEvent, notify } = useContext(AppContext);
    
  const isClub = profile?.role === 'club';
  const clubEvents = events.filter(e => e.createdBy === user?.uid);
  const myRegistrations = registrations.filter(r => r.userId === user?.uid);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl group-hover:bg-indigo-200 transition-colors duration-700"></div>
        <div className="relative flex flex-col md:flex-row md:items-center gap-8">
          <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl shadow-indigo-500/30 overflow-hidden ring-4 ring-white/50">
             {profile?.photoUrl ? (
               <img src={profile.photoUrl} alt="Profile" className="w-full h-full object-cover" />
             ) : (
               <User size={48} />
             )}
          </div>
          <div className="flex-1">
            <span className="bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">{profile?.role || 'Guest'} Account</span>
            <h2 className="text-4xl font-black text-slate-900 mt-2 mb-1 tracking-tight">{profile?.fullName}</h2>
            <div className="flex gap-4 text-slate-400 font-bold text-sm tracking-tight">
              <p>{profile?.email}</p>
              {profile?.phone && <p>• {profile?.phone}</p>}
              {profile?.faculty && <p>• {profile?.faculty}</p>}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={() => setView('edit-profile')} className="bg-white text-slate-600 px-6 py-3 rounded-xl font-black text-xs uppercase border border-slate-200 hover:bg-slate-50 transition shadow-sm">Edit Profile</button>
            {isClub && (
              <button onClick={() => { setSelectedEvent(null); setView('edit-event'); }} className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-8 py-4 rounded-2xl font-black text-xs tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center gap-2">
                <PlusCircle size={20}/> Create Event
              </button>
            )}
          </div>
        </div>
      </div>

      {/* [FEATURE] CLUB ANALYTICS DASHBOARD */}
      {isClub && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-indigo-50 flex flex-col items-center text-center group hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-3xl font-black text-slate-800">{clubEvents.length}</span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Events</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-indigo-50 flex flex-col items-center text-center group hover:scale-105 transition-transform">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Users size={20} />
              </div>
              <span className="text-3xl font-black text-slate-800">
                {registrations.filter(r => clubEvents.map(e => e.id).includes(r.eventId)).length}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Total Participants</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-indigo-50 flex flex-col items-center text-center group hover:scale-105 transition-transform">
               <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Clock size={20} />
              </div>
              <span className="text-3xl font-black text-slate-800">
                {clubEvents.filter(e => e.approval === 'Pending').length}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Pending Approvals</span>
            </div>
            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-indigo-50 flex flex-col items-center text-center group hover:scale-105 transition-transform">
               <div className="w-12 h-12 bg-violet-100 text-violet-600 rounded-full flex items-center justify-center mb-3 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                <ShieldCheck size={20} />
              </div>
              <span className="text-3xl font-black text-slate-800">
                {registrations.filter(r => clubEvents.map(e => e.id).includes(r.eventId) && r.paymentStatus === 'Verified').length}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Verified Payments</span>
            </div>
          </div>
      )}

      <div>
        <h3 className="text-xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 uppercase tracking-tight flex items-center gap-3">
          <div className="w-2 h-8 bg-indigo-600 rounded-full shadow-[0_0_10px_rgba(79,70,229,0.5)]"></div> 
          {isClub ? 'Your Managed Programs' : 'My Registration Activity'}
        </h3>
        <div className="grid gap-6">
          {(isClub ? clubEvents : myRegistrations).map(item => (
            <div key={item.id} className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] shadow-lg border border-white/60 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:shadow-2xl hover:shadow-indigo-100/50 hover:scale-[1.01] transition-all duration-300">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-2xl flex items-center justify-center text-indigo-500 transition group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-indigo-500/30">
                  <FileText size={32} />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-900 leading-tight">{isClub ? item.title : item.eventTitle}</h4>
                  <p className="text-sm font-bold text-slate-400 mt-1 uppercase tracking-tight">{isClub ? item.date : `Organized by ${item.clubName}`}</p>
                  {isClub && (
                      <div className="flex gap-4 mt-3">
                      <div className="text-[9px] font-black uppercase bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full border border-indigo-100">Participants: {registrations.filter(r => r.eventId === item.id).length} / {item.maxParticipants}</div>
                      <div className={`text-[9px] font-black uppercase bg-slate-50 text-slate-500 px-3 py-1 rounded-full border ${item.approval === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : ''}`}>PPW: {item.approval || 'Pending'}</div>
                    </div>
                  )}
                  {!isClub && (
                      <div className="mt-3 flex gap-3">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase border ${item.paymentStatus === 'Verified' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
                          {item.paymentStatus === 'Verified' ? <CheckCircle2 size={12}/> : <Clock size={12}/>} Payment: {item.paymentStatus || 'Pending'}
                        </div>
                        {item.attendance && (
                           <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase bg-green-50 text-green-600 border border-green-100">
                              <UserCheck size={12}/> Attended
                           </div>
                        )}
                      </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isClub ? (
                  <>
                    <button 
                      onClick={() => { setSelectedEvent(item); setView('view-participants'); }} 
                      className="px-6 py-3 text-xs font-black uppercase tracking-widest bg-white border border-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white rounded-xl transition-all flex items-center gap-2 hover:shadow-lg"
                    >
                      <Users size={16} /> List
                    </button>
                    <button onClick={() => { setSelectedEvent(item); setView('edit-event'); }} className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-indigo-600 hover:text-white transition hover:shadow-lg"><Edit3 size={20} /></button>
                    <button onClick={async () => { if(confirm("Permanently delete this event?")) await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'events', item.id)); }} className="p-4 bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white rounded-2xl transition hover:shadow-lg"><Trash2 size={20} /></button>
                  </>
                ) : (
                  <>
                    <button onClick={() => notify("Self-update coming soon")} className="px-6 py-3 text-xs font-black uppercase tracking-widest bg-white border border-slate-100 text-slate-600 rounded-xl hover:bg-indigo-50 transition">Update</button>
                    <button onClick={async () => { if(confirm("Cancel registration for this event?")) await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'registrations', item.id)); }} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-xl transition border border-transparent hover:border-rose-100">Cancel</button>
                  </>
                )}
              </div>
            </div>
          ))}
          {((isClub && clubEvents.length === 0) || (!isClub && myRegistrations.length === 0)) && (
            <div className="text-center py-32 bg-white/40 border-4 border-dotted border-slate-200 rounded-[3rem] text-slate-300 font-black uppercase tracking-widest italic flex flex-col items-center gap-4 backdrop-blur-sm">
              <FileText size={48} className="opacity-20" /> No records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] VIEW: AUTHENTICATION (LOGIN/SIGNUP)
// -----------------------------------------------------------------------------

const AuthView = () => {
  const { authMode, setAuthMode, setView, setProfile, setLoading, notify } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    /* Tukar bg-transparent ke bg-slate-950 supaya glow blobs lebih menonjol */
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-20 bg-slate-950 relative overflow-hidden">

      {/* --- LATAR BELAKANG TAK KOSONG (ANIMATED BLOBS) --- */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse delay-700"></div>
      
      {/* Grid Pattern untuk estetika moden */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Back Arrow Button */}
      <button 
        onClick={() => setView('home')} 
        className="absolute top-4 left-4 md:top-8 md:left-8 p-3 md:p-4 bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg text-slate-400 hover:text-white hover:bg-white/20 transition-all z-50 group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* --- DARK MODE GLASSMORPHISM CARD (bg-white/5) --- */}
      <div className="bg-white/5 backdrop-blur-3xl p-16 rounded-[4.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/10 max-w-xl w-full relative overflow-hidden z-10 ring-1 ring-white/10 my-auto">
        
        {/* Glow Line at top of card */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>S
        
        <div className="text-center mb-10 relative z-10">
           <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30 border border-white/20">
             <Building2 size={40} className="text-white"/>
           </div>

           <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-tighter leading-none">
             {authMode === 'login' ? 'Hello Again!' : 'CREATE A NEW ACCOUNT'}
           </h2>
           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-4 italic opacity-60">
             Start your journey with us
           </p>
        </div>

        <form onSubmit={async (e) => {
        e.preventDefault();
        const f = e.target;
        if (authMode === 'signup' && f.password.value !== f.rePassword.value) { notify("Passwords mismatch", "error"); return; }
        setLoading(true);
        try {
          if (authMode === 'login') {
            await signInWithEmailAndPassword(auth, f.email.value, f.password.value);
            notify("Welcome back! Ready for the next event?");
          } else {
            const res = await createUserWithEmailAndPassword(auth, f.email.value, f.password.value);
            const data = { fullName: f.fullName.value, email: f.email.value, role: f.role.value, faculty: 'FCI', createdAt: serverTimestamp() };
            await setDoc(doc(db, 'artifacts', appId, 'users', res.user.uid, 'profile', 'data'), data);
            setProfile(data);
            notify("Account created successfully! Welcome.");
          }
          setView('home');
        } catch (e) { 
          // Handle technically detailed errors with user-friendly text
          let msg = "Something went wrong. Please try again.";
          if (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password') msg = "Incorrect email or password.";
          if (e.code === 'auth/email-already-in-use') msg = "Email already exists. Try signing in.";
          if (e.code === 'auth/too-many-requests') msg = "Too many attempts. Try again later.";
          
          notify(msg, "error"); 
        }
        finally { setLoading(false); }
      }} className="space-y-4 relative z-10">
          
          {/* Input ditukar ke gaya Dark Glass (text-white) */}
          {authMode === 'signup' && (
            <input name="fullName" required placeholder="Full Name" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" />
          )}
          
          <input name="email" required type="email" placeholder="University Email" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" />
          
          <div className="relative">
            <input 
              name="password" 
              required 
              type={showPassword ? "text" : "password"} 
              placeholder="Password" 
              className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" 
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition">
              {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
            </button>
          </div>

          {authMode === 'signup' && (
            <div className="relative">
              <input name="rePassword" required type={showPassword ? "text" : "password"} placeholder="Verify Password" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" />
            </div>
          )}

          {authMode === 'signup' && (
            <select name="role" className="w-full p-5 bg-slate-900 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500">
              <option value="student">Student Account</option>
              <option value="club">Club Administrator</option>
            </select>
          )}
          
          <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/30 mt-6 active:scale-95 hover:scale-[1.02] transition-all duration-300">
            {authMode === 'login' ? 'LogIn' : 'Create Account'}
          </button>
        </form>

        <button onClick={() => { setAuthMode(authMode === 'login' ? 'signup' : 'login'); setShowPassword(false); }} className="w-full mt-10 text-[10px] font-black text-slate-500 hover:text-indigo-400 uppercase tracking-[0.4em] text-center transition z-10 relative">
          {authMode === 'login' ? "New here? Create An Account" : "Already have an account?"}
        </button>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] MAIN APP COMPONENT
// -----------------------------------------------------------------------------
export default function UTHMClubEventSystem() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState('home'); 
  const [authMode, setAuthMode] = useState('login'); 
    
  const [events, setEvents] = useState([]); 
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getCategoryTheme = (cat) => {
    switch (cat) {
      case 'Sport': return { color: 'amber', icon: <Trophy size={14} /> };
      case 'Academic': return { color: 'indigo', icon: <GraduationCap size={14} /> };
      case 'Welfare': return { color: 'emerald', icon: <Heart size={14} /> };
      case 'Workshop': return { color: 'violet', icon: <Wrench size={14} /> };
      default: return { color: 'slate', icon: <Sparkles size={14} /> };
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth initialization error:", err);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currUser) => {
      if (currUser) {
        try {
          const userDoc = await getDoc(doc(db, 'artifacts', appId, 'users', currUser.uid, 'profile', 'data'));
          if (userDoc.exists()) {
            setProfile(userDoc.data());
          } else {
            setProfile({ fullName: 'Guest User', role: 'student', phone: '', faculty: 'none', course: '' });
          }
        } catch (e) {
          console.error("Profile fetch error:", e);
        }
        setUser(currUser);
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;

    const qEvents = query(collection(db, 'artifacts', appId, 'public', 'data', 'events'));
    const unsubEvents = onSnapshot(qEvents, (snap) => {
      setEvents(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.error(err));

    const qRegs = query(collection(db, 'artifacts', appId, 'public', 'data', 'registrations'));
    const unsubRegs = onSnapshot(qRegs, (snap) => {
      setRegistrations(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    }, (err) => console.error(err));

    return () => { unsubEvents(); unsubRegs(); };
  }, [user]);

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    signOut(auth);
    setView('home');
    notify("Logged out successfully.See you again soon!");
  };

  const checkDuplicateRegistration = (eventId) => {
    return registrations.some(r => r.eventId === eventId && r.userId === user?.uid);
  };

  const checkEventCapacity = (event) => {
    const count = registrations.filter(r => r.eventId === event.id).length;
    return count < (parseInt(event.maxParticipants) || 9999);
  };

  const downloadCSV = (eventTitle, data) => {
    const headers = ["Full Name", "Type", "Ref Code", "Email", "Phone", "Matric", "Faculty", "T-Shirt", "Status", "Attendance"];
    const rows = data.map(r => [
      r.fullName,
      r.isOutsider ? "Guest" : "Student",
      r.registerId || "N/A",
      r.email,
      r.phone || "N/A",
      r.matric,
      r.faculty,
      r.tshirt,
      r.paymentStatus || 'Pending',
      r.attendance ? 'Present' : 'Absent'
    ]);
     
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n" 
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${eventTitle}_Participants.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notify("CSV Exported!");
  };

  const uploadFile = async (file, path) => {
    console.log("1. Starting uploadFile...", file?.name);
    if (!file) return null;
    try {
      let fileToUpload = file;
      const isImage = file.type.startsWith('image/');

      // MIDDLE STEP: SHRINK IF LARGE
      if (isImage && file.size > 300 * 1024) {
        console.log("2. Image is large (>300KB)... compressing.");
        try {
          fileToUpload = await new Promise((resolve) => {
            const img = new Image();
            const objectUrl = URL.createObjectURL(file);
            img.src = objectUrl;
              
            img.onload = () => {
              URL.revokeObjectURL(objectUrl); 
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800; // Constrain width for consistency
              let width = img.width;
              let height = img.height;

              // Calculate new dimensions
              if (width > MAX_WIDTH) {
                height = Math.round((height * MAX_WIDTH) / width);
                width = MAX_WIDTH;
              }

              canvas.width = width;
              canvas.height = height;

              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);

              // Convert to Blob (JPEG, 0.7 Quality)
              canvas.toBlob((blob) => {
                if (blob) {
                    console.log("3. Compression done. Old:", file.size, "New:", blob.size);
                    resolve(blob);
                } else {
                    resolve(file); // Fallback to original
                }
              }, 'image/jpeg', 0.7); 
            };
              
            img.onerror = (err) => {
               console.error("Image load error during resize", err);
               URL.revokeObjectURL(objectUrl);
               resolve(file); // Fail gracefully, upload original
            }
          });
        } catch (resizeError) {
          console.warn("Resize failed, uploading original.", resizeError);
          // fileToUpload remains 'file'
        }
      }

      // Generate Filename (use .jpg extension if we compressed it, otherwise original)
      // Note: If we compressed, fileToUpload is a Blob (default type image/jpeg)
      const extension = (fileToUpload !== file && isImage) ? '.jpg' : file.name.substring(file.name.lastIndexOf('.'));
      const fileName = `${Date.now()}_uploaded${extension}`;

      const storageRef = ref(storage, `artifacts/${appId}/${path}/${fileName}`);
      
      // Important: Update metadata content type if we converted to JPEG
      const metadata = { 
        contentType: (fileToUpload !== file && isImage) ? 'image/jpeg' : file.type 
      };
      
      console.log("4. Sending to Firebase...", storageRef.fullPath);
      const snapshot = await uploadBytes(storageRef, fileToUpload, metadata);
      console.log("5. Upload Success. Getting URL...");
      const url = await getDownloadURL(snapshot.ref);
      return url;
    } catch (error) {
      console.error("Upload failed", error);
      notify("Upload failed: " + error.message, "error");
      throw error;
    }
  };

  const contextValue = {
    user, setUser,
    profile, setProfile,
    view, setView,
    authMode, setAuthMode,
    events, setEvents,
    registrations, setRegistrations,
    selectedEvent, setSelectedEvent,
    loading, setLoading,
    notification, setNotification,
    searchQuery, setSearchQuery,
    categoryFilter, setCategoryFilter,
    currentMonth, setCurrentMonth,
    getCategoryTheme,
    notify,
    handleLogout,
    checkDuplicateRegistration,
    checkEventCapacity,
    downloadCSV,
    uploadFile
  };

  if (loading && !user) return (
    <div className="h-screen flex flex-col items-center justify-center bg-slate-900 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
      <div className="relative z-10">
        <div className="w-24 h-24 border-8 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin shadow-[0_0_20px_rgba(99,102,241,0.5)]"></div>
        <Building2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-20" size={32} />
      </div>
      <p className="mt-8 text-white font-black text-xs tracking-[0.4em] uppercase opacity-40 animate-pulse">Initializing Portal</p>
    </div>
  );

  return (
    <AppContext.Provider value={contextValue}>
      <div className="h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-indigo-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900 relative overflow-hidden">
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-cyan-400/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>
          <div className="absolute top-[40%] left-[30%] w-72 h-72 bg-pink-300/10 rounded-full blur-[80px] animate-bounce duration-[12s]"></div>
        </div>

        {notification && (
          <div className={`fixed top-8 left-1/2 -translate-x-1/2 z-[100] ${notification.type === 'error' ? 'bg-rose-900 border-rose-500 shadow-rose-900/50' : 'bg-slate-900 border-indigo-500 shadow-indigo-900/50'} text-white px-8 py-4 rounded-3xl shadow-2xl font-black text-[10px] tracking-widest animate-in slide-in-from-top-8 flex items-center gap-4 border-b-4 backdrop-blur-md`}>
            <div className={`w-2 h-2 ${notification.type === 'error' ? 'bg-rose-500' : 'bg-indigo-500'} rounded-full animate-ping`}></div>
            {notification.msg.toUpperCase()}
          </div>
        )}

        {/* Change: Sidebar is hidden when view is 'auth', replaced with Top Navbar */}
        {view !== 'auth' && <Navbar />}

        <main className="flex-1 h-full overflow-y-auto relative z-10">
          {/* 1. Bar hanya muncul jika BUKAN skrin login (auth) */}
          {view !== 'auth' && (
            <header className="h-24 bg-white/50 backdrop-blur-md border-b border-white/10 px-10 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                <h1 className="font-black text-sm text-slate-400 uppercase tracking-[0.2em]">
                  {view === 'home' && 'HOME PAGE'}
                  {view === 'calendar' && 'MONTHLY SCHEDULE'}
                  {view === 'browse' && 'EVENT MARKETPLACE'}
                  {view === 'profile' && 'USER MANAGEMENT'}
                  {view === 'view-participants' && 'ADMIN PORTAL'}
                  {view === 'edit-profile' && 'PROFILE SETTINGS'}
                </h1>
              </div>
              {user && !user.isAnonymous && (
                <div 
                  onClick={() => setView('profile')}
                  className="flex items-center gap-6 cursor-pointer hover:opacity-80 transition-all group"
                >
                  {/* Bahagian di bawah ini dipermudahkan supaya tidak bertindih div yang sama fungsi */}
                  <div className="text-right flex flex-col items-end">
                    <span className="text-[9px] font-black text-white bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 rounded-full uppercase tracking-tighter mb-1 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                      {profile?.role}
                    </span>
                    <p className="text-sm font-black text-slate-900 leading-none group-hover:text-indigo-600 transition-colors">
                      {profile?.fullName}
                    </p>
                  </div>
                  
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 shadow-md ring-2 ring-white/50 overflow-hidden group-hover:ring-indigo-500/50 transition-all">
                    {profile?.photoUrl ? (
                      <img src={profile.photoUrl} alt="Mini Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={24} />
                    )}
                  </div>
                </div> // PENUTUP DIV UTAMA
              )}
            </header>
          )}

          <div className="relative pb-20">
            {view === 'home' && <HomeView />}
            {view === 'calendar' && <CalendarView />}
            {view === 'browse' && <BrowseView />}
            {view === 'detail' && <DetailedView />}
            {view === 'profile' && <ProfileView />}
            {view === 'register-form' && <RegistrationForm />}
            {view === 'edit-event' && <CreateEditEvent />}
            {view === 'auth' && <AuthView />}
            {view === 'view-participants' && <ParticipantsListView />}
            {view === 'edit-profile' && <EditProfileView />}
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
}