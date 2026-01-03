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
  Briefcase, 
  Palette, 
  Store, 
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

// -----------------------------------------------------------------------------
// [SECTION] MOCK DATA (DATA PALSU UNTUK DEMO)
// -----------------------------------------------------------------------------

const MOCK_EVENTS_DATA = [
  {
    id: 'evt-1',
    title: 'UTHM Mega E-Sports Championship',
    date: '2026-11-15',
    time: '08:00 to 17:00',
    location: 'Dewan Sultan Ibrahim (DSI)',
    category: 'Sport',
    clubName: 'Computer Science Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    description: 'Pertandingan E-Sports terbesar tahun ini! Valorant, MLBB, dan FIFA.',
    approval: 'Approved',
    maxParticipants: 200,
    isWalkIn: false,
    formConfig: { requireMatric: true, requireFaculty: true, requireTshirt: true }
  },
  {
    id: 'evt-2',
    title: 'AI & Future Tech Symposium',
    date: '2026-10-20',
    time: '09:00 to 13:00',
    location: 'Auditorium FSKTM',
    category: 'Academic',
    clubName: 'Robotics Club',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80',
    description: 'Seminar tentang masa depan AI bersama pakar industri.',
    approval: 'Approved',
    maxParticipants: 100,
    isWalkIn: false
  },
  {
    id: 'evt-3',
    title: 'Neon Night Run 2025',
    date: '2026-12-05',
    time: '20:00 to 23:00',
    location: 'Stadium UTHM',
    category: 'Sport',
    clubName: 'Student Council',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?auto=format&fit=crop&q=80',
    description: 'Larian malam 5KM dengan tema neon.',
    approval: 'Pending', 
    maxParticipants: 500,
    isWalkIn: false
  },
  {
    id: 'evt-4',
    title: 'International Cultural Food Fest',
    date: '2026-09-30',
    time: '10:00 to 22:00',
    location: 'Dataran Kawad',
    category: 'Arts',
    clubName: 'International Student Society',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80',
    description: 'Pesta makanan antarabangsa. Masuk percuma!',
    approval: 'Approved',
    maxParticipants: 0,
    isWalkIn: true 
  },
  {
    id: 'evt-5',
    title: 'Career Fair 2025: Engineering',
    date: '2026-10-25',
    time: '09:00 to 16:00',
    location: 'Dewan Tunku Mahkota Ismail',
    category: 'Career',
    clubName: 'Career Centre',
    createdBy: 'demo-staff',
    poster: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80',
    description: 'Temuduga terbuka bersama syarikat kejuruteraan terkemuka.',
    approval: 'Approved',
    maxParticipants: 1000,
    isWalkIn: true
  },
  {
    id: 'evt-6',
    title: 'Mental Health Workshop',
    date: '2025-10-05',
    time: '14:00 to 16:00',
    location: 'Bilik Seminar Perpustakaan',
    category: 'Welfare',
    clubName: 'Counseling Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80',
    description: 'Bengkel pengurusan stres untuk pelajar tahun akhir.',
    approval: 'Approved',
    maxParticipants: 50,
    isWalkIn: false
  },
  // --- PAST EVENTS ---
  {
    id: 'evt-7',
    title: 'Photography Masterclass',
    date: '2025-09-15',
    time: '08:00 to 12:00',
    location: 'Taman Universiti',
    category: 'Workshop',
    clubName: 'Media Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80',
    description: 'Belajar teknik fotografi outdoor.',
    approval: 'Approved',
    maxParticipants: 30,
    isWalkIn: false
  },
  {
    id: 'evt-8',
    title: 'Debate Championship Finals',
    date: '2025-11-20',
    time: '20:00 to 23:00',
    location: 'Dewan Kuliah 1',
    category: 'Academic',
    clubName: 'Debate Team',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    description: 'Pusingan akhir debat antara fakulti.',
    approval: 'Approved',
    maxParticipants: 200,
    isWalkIn: false
  },
  // --- EVENTS BULAN INI (Untuk Kalendar) ---
  {
    id: 'evt-9',
    title: 'Java Coding Bootcamp',
    date: new Date().toISOString().split('T')[0], // HARI INI
    time: '08:00 to 17:00',
    location: 'Makmal Komputer 3',
    category: 'Workshop',
    clubName: 'Computer Science Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80',
    description: 'Bengkel intensif Java untuk pemula.',
    approval: 'Approved',
    maxParticipants: 40,
    isWalkIn: false
  },
  {
    id: 'evt-10',
    title: 'Futsal Friendly Match',
    date: new Date(new Date().setDate(new Date().getDate() + 3)).toISOString().split('T')[0], // +3 HARI
    time: '17:00 to 19:00',
    location: 'Gelanggang Futsal Kolej',
    category: 'Sport',
    clubName: 'Sports Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80',
    description: 'Perlawanan persahabatan antara kolej.',
    approval: 'Approved',
    maxParticipants: 20,
    isWalkIn: false
  },
  {
    id: 'evt-11',
    title: 'Islamic Talk: Exam Prep',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // +7 HARI
    time: '19:00 to 21:00',
    location: 'Masjid UTHM',
    category: 'Religious',
    clubName: 'Islamic Center',
    createdBy: 'demo-staff',
    poster: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80',
    description: 'Persiapan rohani menghadapi peperiksaan akhir.',
    approval: 'Approved',
    maxParticipants: 300,
    isWalkIn: true
  },
  {
    id: 'evt-12',
    title: 'Entrepreneurship 101',
    date: new Date(new Date().setDate(new Date().getDate() + 10)).toISOString().split('T')[0], // +10 HARI
    time: '09:00 to 12:00',
    location: 'PTTA',
    category: 'Entrepreneur',
    clubName: 'Business Club',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80',
    description: 'Cara memulakan bisnes di kampus.',
    approval: 'Approved',
    maxParticipants: 50,
    isWalkIn: false
  },
  // --- NEW EVENTS FOR JAN 2025 ---
  {
    id: 'evt-13',
    title: 'New Year Code Jam 2025',
    date: '2026-01-01',
    time: '09:00 to 21:00',
    location: 'Makmal Komputer Pusat',
    category: 'Workshop',
    clubName: 'Computer Science Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80',
    description: 'Kickstart the year with a 12-hour coding marathon. Open to all levels.',
    approval: 'Approved',
    maxParticipants: 60,
    isWalkIn: false
  },
  {
    id: 'evt-14',
    title: 'Varsity Chess Open',
    date: '2026-01-03',
    time: '08:00 to 18:00',
    location: 'Dewan Peperiksaan',
    category: 'Sport',
    clubName: 'Strategy Games Club',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80',
    description: 'Checkmate your way to victory. Prizes worth RM500.',
    approval: 'Approved',
    maxParticipants: 40,
    isWalkIn: false
  },
  {
    id: 'evt-15',
    title: 'Digital Art Exhibition: Future',
    date: '2026-01-05',
    time: '10:00 to 17:00',
    location: 'Galeri Seni UTHM',
    category: 'Arts',
    clubName: 'Creative Arts Society',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&q=80',
    description: 'Showcasing student artwork on the theme of "Future Malaysia".',
    approval: 'Approved',
    maxParticipants: 0,
    isWalkIn: true
  },
  {
    id: 'evt-16',
    title: 'Charity Fun Run: Food Bank',
    date: '2026-01-07',
    time: '07:00 to 11:00',
    location: 'Stadium UTHM',
    category: 'Welfare',
    clubName: 'Rakan Masjid',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1552674605-469523f7009c?auto=format&fit=crop&q=80',
    description: 'Run for a cause. All registration fees go to the student food bank.',
    approval: 'Approved',
    maxParticipants: 200,
    isWalkIn: false
  },
  {
    id: 'evt-17',
    title: 'Resume Writing Workshop',
    date: '2026-01-10',
    time: '14:00 to 17:00',
    location: 'Bilik Seminar 1',
    category: 'Career',
    clubName: 'Career Centre',
    createdBy: 'demo-staff',
    poster: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80',
    description: 'Learn how to craft a winning resume for your internship applications.',
    approval: 'Approved',
    maxParticipants: 80,
    isWalkIn: false
  },
  {
    id: 'evt-18',
    title: 'Inter-Faculty Debate',
    date: '2026-01-12',
    time: '20:00 to 23:00',
    location: 'Dewan Kuliah 2',
    category: 'Academic',
    clubName: 'Debate Team',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80',
    description: 'Topic: "AI in Education: Boon or Bane?". Come watch the showdown.',
    approval: 'Approved',
    maxParticipants: 150,
    isWalkIn: true
  },
  {
    id: 'evt-19',
    title: 'Robotics Showcase 2025',
    date: '2026-01-15',
    time: '09:00 to 16:00',
    location: 'Foyer FKMP',
    category: 'Academic',
    clubName: 'Robotics Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?auto=format&fit=crop&q=80',
    description: 'See the latest robots built by UTHM engineering students.',
    approval: 'Approved',
    maxParticipants: 0,
    isWalkIn: true
  },
  {
    id: 'evt-20',
    title: 'Traditional Music Night',
    date: '2026-01-18',
    time: '20:30 to 23:00',
    location: 'Dewan Sultan Ibrahim',
    category: 'Arts',
    clubName: 'Cultural Club',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80',
    description: 'A night of Gamelan and Zapin performances.',
    approval: 'Approved',
    maxParticipants: 400,
    isWalkIn: false
  },
{
  id: 'evt-21',
  title: 'Startup Pitching Day',
  date: '2026-01-20',
  time: '09:00 AM to 02:00 PM',
  location: 'Technopreneur Centre, UTHM',
  category: 'Entrepreneur',
  clubName: 'Business Club',
  createdBy: 'demo-club',
  poster: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80',
  description: `🚀 UTHM Startup Pitching Day
  Pitch your business idea to real investors.

  Welcome, Founder! You are one step away from presenting your vision. Please read the following carefully before registering:

  ⏱️ The 5-Minute Rule: You have exactly 5 minutes to convince the judges. Practice your timing!
  📂 Deck Upload: Your final pitch deck is required by 15 Jan 2026. No changes allowed after submission. Google Drive Link will be given after you joining the whatsapp group.
  💼 Attire: Business Casual / Formal (First impressions count!).
  🎓 Workshop: By registering, you agree to attend the mandatory 'Pitching Masterclass' on 12 Jan 2026.

  *Final Task: Please prepare a one-sentence summary (Elevator Pitch) of your startup for the registration form.`,
    approval: 'Approved',
    maxParticipants: 30,
    isWalkIn: false,
    formConfig: {
      requireMatric: true,
      requireFaculty: true,
      requireTshirt: false,
      requirePayment: false,
      requireIC: false,
      externalLink: 'https://chat.whatsapp.com/demo-pitching-day'
    }
  },
{
    id: 'evt-22',
    title: 'Mental Health Awareness',
    date: '2026-01-22',
    time: '10:00 AM to 12:00 PM',
    location: 'Dewan Tunku Ibrahim Ismail',
    category: 'Welfare',
    clubName: 'Counseling Unit',
    createdBy: 'demo-staff',
    poster: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80',
    description: 'Coping mechanisms for final exam stress.',
    approval: 'Approved',
    maxParticipants: 100,
    isWalkIn: false
  },
  {
    id: 'evt-23',
    title: 'Badminton Tournament',
    date: '2026-01-25',
    time: '08:00 to 18:00',
    location: 'Sports Complex',
    category: 'Sport',
    clubName: 'Sports Club',
    createdBy: 'demo-club',
    poster: 'https://images.unsplash.com/photo-1626224583764-8478ab2e153d?auto=format&fit=crop&q=80',
    description: 'Singles and Doubles categories available. Register now!',
    approval: 'Approved',
    maxParticipants: 60,
    isWalkIn: false
  },
  {
    id: 'evt-24',
    title: 'Public Speaking Masterclass',
    date: '2026-01-28',
    time: '14:00 to 18:00',
    location: 'Bilik Kuliah 5',
    category: 'Leadership',
    clubName: 'Toastmasters UTHM',
    createdBy: 'demo-club-2',
    poster: 'https://images.unsplash.com/photo-1544531696-cb478dc98ecb?auto=format&fit=crop&q=80',
    description: 'Overcome stage fright and speak with confidence.',
    approval: 'Approved',
    maxParticipants: 40,
    isWalkIn: false
  }
];


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
          <h1 className="text-white font-black text-lg leading-tight tracking-tighter uppercase drop-shadow-md">UTHM EVENT<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">PULSE</span></h1>
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
              onClick={() => setView('about')} // Add this handler
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-[10px] md:text-xs tracking-widest transition-all duration-300 whitespace-nowrap shrink-0 ${view === 'about' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'}`}
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

  // 1. Mock events (Kekal UI asal anda)
  const mockEvents = [
    {
      id: 'mock-1',
      title: 'UTHM Coding Boot Camp',
      date: '2028-01-01',
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

  // 2. Logic Pagination (Add-on baru)
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const ITEMS_PER_PAGE = 4;

  // 3. Memoized Split (Kekal logik asal anda tapi buang .slice supaya Carousel boleh guna semua data)
  const { upcomingEvents, pastEvents } = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    if (events.length === 0) return { upcomingEvents: mockEvents, pastEvents: [] };

    const upcoming = events
      .filter(e => e.approval === 'Approved' && new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date));
      // Kita tak slice di sini supaya carousel nampak semua event

    const past = events
      .filter(e => {
        const d = new Date(e.date);
        return e.approval === 'Approved' && d < now && d >= threeMonthsAgo;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3); 

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [events]);

  // Handle Navigation
  const handleNext = () => {
    setDirection('right');
    if (startIndex + ITEMS_PER_PAGE >= upcomingEvents.length) {
      setStartIndex(0);
    } else {
      setStartIndex(startIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    setDirection('left');
    if (startIndex - ITEMS_PER_PAGE < 0) {
      const lastIndex = Math.floor((upcomingEvents.length - 1) / ITEMS_PER_PAGE) * ITEMS_PER_PAGE;
      setStartIndex(Math.max(0, lastIndex));
    } else {
      setStartIndex(startIndex - ITEMS_PER_PAGE);
    }
  };

  const visibleUpcoming = upcomingEvents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-full pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HERO SECTION (Kekal asal) */}
      <div className="relative w-full min-h-[550px] flex items-center justify-center text-center p-8 overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-slate-900 to-black z-0"></div>
         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 z-0 mix-blend-overlay"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent z-0"></div>

         <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-1000">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-400/30 backdrop-blur-md text-indigo-300 font-bold text-[10px] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                <Building2 size={14} className="animate-pulse"/> Official Campus Portal
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

      {/* 2. UPCOMING EVENTS SECTION (Carousel Mode) */}
      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full -mt-24 relative z-20">
          <div className="flex justify-center mb-8">
            <div className="mt-28 bg-white/10 backdrop-blur-sm border border-white/40 p-1 rounded-3xl shadow-2xl">
               <div className="bg-white px-8 py-2 rounded-[1.2rem] text-slate-900 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                  <CalendarIcon size={14} className="text-indigo-600"/> Upcoming Events
               </div>
            </div>
          </div>

          {/* Carousel Wrapper */}
          <div className="relative px-2 md:px-14">
            
            {/* Left Arrow */}
           {upcomingEvents.length > 4 && (
              <button 
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-4 bg-white hover:bg-indigo-600 hover:text-white text-slate-700 rounded-full shadow-2xl border border-slate-100 transition-all duration-300 -translate-x-4 md:-translate-x-2 scale-100"
              >
                <ChevronLeft size={24} strokeWidth={3} />
              </button>
            )}

            {/* Grid Container */}
           <div 
              key={startIndex} 
              className={`grid grid-cols-1 md:grid-cols-4 gap-6 animate-in fade-in duration-500 ${direction === 'right' ? 'slide-in-from-right-8' : 'slide-in-from-left-8'}`}
            >
            
               {visibleUpcoming.map((event, idx) => {
                   const theme = getCategoryTheme(event.category);
                   const dateObj = event.date ? new Date(event.date) : new Date();
                   const month = dateObj.toLocaleString('default', { month: 'short' });
                   const dayNum = dateObj.getDate();
                   const dayName = dateObj.toLocaleString('default', { weekday: 'short' }).toUpperCase();

                   return (
                    <div key={event.id || idx} className="bg-white p-4 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col group hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 h-full">
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
                                <span className="text-[10px] text-slate-400 mb-1">{month}</span>
                                <span className="text-xl text-indigo-600">{dayNum}</span>
                                <span className="text-[9px] text-slate-300 mt-1">{dayName}</span>
                            </div>

                            <div className="absolute top-4 left-4">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase bg-white/90 backdrop-blur-md text-slate-800 shadow-lg`}>
                                    {theme.icon} {event.category}
                                </span>
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col pt-6">
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
              </div>

            {/* Right Arrow */}
           {upcomingEvents.length > 3 && (
              <button 
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-4 bg-white hover:bg-indigo-600 hover:text-white text-slate-700 rounded-full shadow-2xl border border-slate-100 transition-all duration-300 translate-x-4 md:translate-x-2 scale-100"
              >
                <ChevronRight size={24} strokeWidth={3} />
              </button>
            )}
          </div>

          {/* Dots Indicator */}
          {upcomingEvents.length > 3 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(upcomingEvents.length / ITEMS_PER_PAGE) }).map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${Math.floor(startIndex / ITEMS_PER_PAGE) === i ? 'w-8 bg-indigo-600' : 'w-2 bg-slate-300'}`}
                />
              ))}
            </div>
          )}

          {/* 3. RECENTLY CONCLUDED (Kekal asal) */}
          {pastEvents.length > 0 && (
            <div className="mt-20">
                <div className="bg-slate-200/50 backdrop-blur-sm border border-slate-200 p-1 rounded-3xl inline-block mb-8">
                    <div className="bg-slate-100 px-6 py-2 rounded-[1.2rem] text-slate-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        <Clock size={14} className="text-slate-400"/> Recently Concluded (Past 3 Months)
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 opacity-70 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
                    {pastEvents.map((event, idx) => {
                        const dateObj = event.date ? new Date(event.date) : new Date();
                        const month = dateObj.toLocaleString('default', { month: 'short' });
                        const dayNum = dateObj.getDate();
                        const dayName = dateObj.toLocaleString('default', { weekday: 'short' }).toUpperCase();
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
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl font-black text-xs shadow-lg uppercase tracking-wider text-slate-800 flex flex-col items-center leading-none">
                                    <span className="text-[10px] text-slate-400 mb-1">{month}</span>
                                    <span className="text-xl text-indigo-600">{dayNum}</span>
                                    <span className="text-[9px] text-slate-300 mt-1">{dayName}</span>
                                </div>
                            </div>
                            <div className="p-4 flex-1 pt-6">
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
                   View All Events <ArrowLeft className="rotate-180" size={16}/>
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
            const currentDayStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
            const currentDayDate = new Date(currentDayStr);

            // Filter for events that happen on OR span across this day
            const dayEvents = events.filter(e => {
                if(e.approval !== 'Approved') return false;
                
                const start = new Date(e.date);
                // If dateEnd doesn't exist, use e.date (1-day event)
                const end = e.dateEnd ? new Date(e.dateEnd) : new Date(e.date);
                
                // Normalize dates to midnight for accurate comparison
                start.setHours(0,0,0,0);
                end.setHours(0,0,0,0);
                const checkDay = new Date(currentDayDate);
                checkDay.setHours(0,0,0,0);

                return checkDay >= start && checkDay <= end;
            });

            return (
              <div key={i} className="h-40 border-r border-b border-indigo-50/50 p-4 hover:bg-indigo-50/40 transition-all relative group cursor-pointer"
                onClick={() => dayEvents.length > 0 && (setSelectedEvent(dayEvents[0]), setView('detail'))}>
                <span className={`text-sm font-black ${dayEvents.length > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>{i + 1}</span>
                <div className="mt-2 space-y-1 overflow-y-auto max-h-[100px] no-scrollbar">
                  {dayEvents.map(e => (
                    <div key={e.id} className="text-[9px] bg-gradient-to-r from-indigo-500 to-violet-500 text-white px-2 py-1.5 rounded-lg font-black truncate shadow-md shadow-indigo-500/20 leading-none border-l-2 border-white/40 hover:scale-105 transition-transform">
                        {e.title}
                    </div>
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
    
  const categories = [
  'All', 
  'Sport', 
  'Academic', 
  'Workshop', 
  'Welfare', 
  'Leadership', 
  'Entrepreneur', 
  'Arts', 
  'Religious', 
  'Career'
];
  
  // [UPDATED] Filtering logic: Exclude events older than 3 months
  const filtered = events.filter(e => {
    const eventDate = new Date(e.date);
    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);
    
    const isApproved = e.approval === 'Approved';
    
    // If you want to see ALL future events and only hide VERY old ones:
    const isRecentOrFuture = eventDate >= threeMonthsAgo; 

    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        (e.clubName && e.clubName.toLowerCase().includes(searchQuery.toLowerCase()));

    return isApproved && isRecentOrFuture && matchesCategory && matchesSearch;
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
const DetailedView=()=>{
  const { selectedEvent, setView, profile, registrations, user, notify } = useContext(AppContext);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  if (!selectedEvent) return null;

  const isAuthorized = profile?.role === 'club' || user?.uid === selectedEvent.createdBy;
  const isApproved = selectedEvent.approval === 'Approved';

  if (!isApproved && !isAuthorized) {
    return (
      <div className="p-20 flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center shadow-lg"><AlertCircle size={48} /></div>
        <div className="space-y-2"><h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Access Restricted</h2><p className="text-slate-500 font-medium max-w-sm">This event is currently awaiting administrative approval (PPW).</p></div>
        <button onClick={() => setView('browse')} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg">Return to Marketplace</button>
      </div>
    );
  }
  
  // Timer Logic
  useEffect(() => {
    if (!selectedEvent?.date) return;
    const targetDate = new Date(selectedEvent.date);
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
      } else { clearInterval(timer); }
    }, 1000);
    return () => clearInterval(timer);
  }, [selectedEvent]);

  const formatFullDate = (dateStr) => {
     if (!dateStr) return '';
     const dateObj = new Date(dateStr);
     // Format: "Tuesday, 30 Dec 2025"
     return dateObj.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });
  };

  // --- Logic for Date Display (Multi-day) ---
  const displayDate = selectedEvent.dateEnd && selectedEvent.dateEnd !== selectedEvent.date 
    ? `${formatFullDate(selectedEvent.date)} - ${formatFullDate(selectedEvent.dateEnd)}` 
    : formatFullDate(selectedEvent.date);

  return (
    <div className="p-8 max-w-4xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
      <button onClick={() => setView('browse')} className="mb-8 flex items-center gap-2 text-slate-500 font-black text-xs uppercase hover:text-indigo-600 transition bg-white/50 px-4 py-2 rounded-xl backdrop-blur-sm"><ChevronLeft size={16} /> Back to Browse</button>
      
      <div className="bg-white/80 backdrop-blur-2xl rounded-[3.5rem] shadow-2xl overflow-hidden border border-white/60">
        <div className="bg-slate-900 p-16 text-white text-center relative overflow-hidden group">
          {selectedEvent.poster && (<><div className="absolute inset-0 bg-gradient-to-b from-indigo-900/80 to-slate-900/90 z-10"></div><img src={selectedEvent.poster} className="absolute inset-0 w-full h-full object-cover opacity-60 z-0 blur-sm group-hover:scale-105 transition duration-[3s]" /></>)}
          <div className="relative z-20">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase tracking-widest">{selectedEvent.category}</span>
            <h2 className="text-5xl font-black uppercase tracking-tight mb-4 drop-shadow-xl">{selectedEvent.title}</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 my-8">
               <div className="flex gap-4 text-center">
                  {[{ label: 'Days', val: timeLeft.days }, { label: 'Hours', val: timeLeft.hours }, { label: 'Mins', val: timeLeft.minutes }, { label: 'Secs', val: timeLeft.seconds }].map((t, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 min-w-[70px]"><div className="text-2xl font-black text-white">{t.val}</div><div className="text-[9px] uppercase tracking-widest text-indigo-200">{t.label}</div></div>
                  ))}
               </div>
            </div>
            <p className="font-bold text-indigo-200 text-lg">By {selectedEvent.clubName}</p>
          </div>
        </div>

        <div className="p-12 space-y-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div className="space-y-1 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <p className="font-black text-indigo-400 uppercase text-[10px] tracking-widest flex items-center gap-2"><CalendarIcon size={12}/> Date</p>
              <p className="font-black text-slate-800 text-lg leading-tight">{displayDate}</p>
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

          <div className="pt-10 border-t border-slate-100">
            {profile?.role === 'club' ? (
              <div className="p-6 bg-slate-50 rounded-2xl text-center text-slate-400 font-bold text-sm italic border border-dashed border-slate-200">Clubs manage event data via their Profile Dashboard.</div>
            ) : (() => {
              // --- WALK-IN CHECK ---
              if (selectedEvent.isWalkIn) {
                 return (
                    <div className="w-full bg-emerald-50 text-emerald-600 py-6 rounded-[1.5rem] font-black text-xl border-2 border-dashed border-emerald-200 text-center uppercase tracking-widest flex flex-col items-center gap-2">
                       <span>Walk-in Event</span>
                       <span className="text-xs font-bold opacity-70">No prior registration required. Just show up!</span>
                    </div>
                 );
              }

              // --- REGISTRATION DEADLINE CHECK ---
              // Use regDeadline if available, otherwise fallback to event date
              const deadlineDate = selectedEvent.regDeadline ? new Date(selectedEvent.regDeadline) : new Date(selectedEvent.date);
              deadlineDate.setHours(23, 59, 59, 999); // End of the day
              const today = new Date();
              const isDateClosed = today > deadlineDate;

              const currentRegCount = registrations.filter(r => r.eventId === selectedEvent.id).length;
              const maxParticipants = parseInt(selectedEvent.maxParticipants) || 0;
              const isFull = maxParticipants !== 0 && currentRegCount >= maxParticipants;

              if (isDateClosed) return <div className="w-full bg-slate-100 text-slate-400 py-6 rounded-[1.5rem] font-black text-xl border-2 border-dashed border-slate-200 text-center uppercase tracking-widest">Registration Closed</div>;
              if (isFull) return <div className="w-full bg-rose-50 text-rose-500 py-6 rounded-[1.5rem] font-black text-xl border-2 border-dashed border-rose-200 text-center uppercase tracking-widest">Maximum Limit Reached</div>;

              return (
                <button onClick={() => setView('register-form')} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-6 rounded-[1.5rem] font-black text-xl shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 hover:scale-[1.02] transition-all duration-300 active:scale-95">REGISTER NOW</button>
              );
            })()}
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
  const { selectedEvent, profile, user, setView, registrations, setRegistrations, checkEventCapacity, notify, uploadFile } = useContext(AppContext);
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
              id: existingReg ? existingReg.id : `reg-${Date.now()}`,
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
              timestamp: isEditMode ? existingReg.timestamp : new Date(), // Keep original timestamp or update? Usually keep original for registration time.
              lastUpdated: new Date()
            };

            if (isEditMode) {
                // UPDATE LOCAL STATE
                setRegistrations(prev => prev.map(r => r.id === existingReg.id ? regData : r));
                notify("Registration updated!");
            } else {
                // ADD LOCAL STATE
                setRegistrations(prev => [...prev, regData]);
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
  const { selectedEvent, user, events, setEvents, profile, setView, notify, uploadFile, registrations } = useContext(AppContext);
  const [uploading, setUploading] = useState(false);
  const [posterFile, setPosterFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState(null);

  // --- Validation States ---
  const [conflictModal, setConflictModal] = useState(false);
  const [conflictingEvent, setConflictingEvent] = useState(null);
  const [pendingData, setPendingData] = useState(null);

  // --- New Feature States ---
  const [isWalkIn, setIsWalkIn] = useState(selectedEvent?.isWalkIn || false);

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

  const getMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
  };

  const handlePreSubmit = async (e) => {
    e.preventDefault();
    const f = e.target;
    
    // 1. Capture Form Data
    const rawData = {
      title: f.title.value,
      date: f.date.value,           // Start Date
      dateEnd: f.dateEnd.value,     // End Date (New)
      regDeadline: f.regDeadline ? f.regDeadline.value : '', // Custom Deadline (New)
      timeFrom: f.timeFrom.value,
      timeTo: f.timeTo.value,
      location: f.venue.value,
      category: f.category.value,
      max: f.max ? f.max.value : 0,
      description: f.description.value,
      approval: f.approval.value,
      externalLink: f.externalLink ? f.externalLink.value : '',
      isWalkIn: isWalkIn // Walk-in Status (New)
    };

    // 2. Overlap Logic (Simplified for Multi-day: Checks strictly if Start Date overlaps for now)
    const newStart = getMinutes(rawData.timeFrom);
    const newEnd = getMinutes(rawData.timeTo);

    const overlap = events.find(ev => {
      if (selectedEvent && ev.id === selectedEvent.id) return false;
      
      // Strict Check: Overlap only calculates based on Start Date matching
      if (ev.date !== rawData.date) return false;

      if (!ev.time || !ev.time.includes(' to ')) return false;
      const [evStartStr, evEndStr] = ev.time.split(' to ');
      const evStart = getMinutes(evStartStr);
      const evEnd = getMinutes(evEndStr);

      return (newStart < evEnd && newEnd > evStart);
    });

    if (overlap) {
      const [ovStart, ovEnd] = overlap.time.split(' to ');
      setConflictingEvent({
        date: overlap.date,
        startTime: ovStart,
        endTime: ovEnd,
        title: overlap.title 
      });
      setPendingData(rawData); 
      setConflictModal(true);  
    } else {
      await processFinalSave(rawData);
    }
  };

  const processFinalSave = async (data) => {
    if (!user) return;
    setUploading(true);
    setConflictModal(false);

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

      // Prepare payload
      const finalPayload = {
        id: selectedEvent ? selectedEvent.id : `evt-${Date.now()}`,
        title: data.title,
        date: data.date,
        dateEnd: data.dateEnd || data.date, // Default to start date if empty
        regDeadline: data.regDeadline,      // Save deadline
        isWalkIn: data.isWalkIn,            // Save walk-in status
        time: `${data.timeFrom} to ${data.timeTo}`,
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
        lastModified: new Date()
      };

      if (selectedEvent) {
        // UPDATE LOCAL STATE
        setEvents(prev => prev.map(e => e.id === selectedEvent.id ? finalPayload : e));
        notify("Event updated successfully!");
      } else {
        // ADD LOCAL STATE
        setEvents(prev => [...prev, { ...finalPayload, createdAt: new Date() }]);
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
      
      {/* CONFLICT MODAL (Kept same as before) */}
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
                    <button onClick={() => setConflictModal(false)} className="flex-1 py-3 rounded-xl border-2 border-slate-100 text-slate-500 font-black text-xs uppercase hover:bg-slate-50 transition">Cancel</button>
                    <button onClick={() => processFinalSave(pendingData)} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white font-black text-xs uppercase shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition">Yes, Proceed</button>
                </div>
            </div>
        </div>
      )}

      <div className="bg-white/80 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white/60">
        <h2 className="text-3xl font-black mb-10 uppercase tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-900">{selectedEvent ? 'EDIT EVENT' : 'CREATE NEW EVENT'}</h2>
        
        <form onSubmit={handlePreSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Event Title*</label>
            <input name="title" defaultValue={selectedEvent?.title} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" />
          </div>
            
          {/* POSTER & GALLERY INPUTS (Hidden for brevity, assume same as before) */}
          <div className="space-y-1">
             <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Event Poster</label>
             <div className={`w-full p-6 border-4 border-dashed rounded-2xl flex items-center justify-center relative overflow-hidden transition ${posterFile ? 'border-indigo-500 bg-indigo-50/50' : 'border-slate-200 hover:border-indigo-400 hover:bg-white/50'}`}>
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" onChange={(e) => setPosterFile(e.target.files[0])} accept="image/*" />
                <div className="text-center flex flex-col items-center gap-2">
                    {selectedEvent?.poster && !posterFile && <img src={selectedEvent.poster} className="h-20 w-auto rounded-lg mb-2 shadow-sm" alt="Current Poster"/>}
                    {posterFile ? <p className="text-indigo-600 font-bold text-xs flex items-center gap-2"><CheckCircle2 size={16}/> {posterFile.name}</p> : <p className="text-slate-300 font-black text-[10px] uppercase tracking-widest flex items-center gap-2"><ImageIcon size={16}/> {selectedEvent?.poster ? "Change Poster" : "Upload Poster"}</p>}
                </div>
             </div>
          </div>
          {/* End Poster Input */}


          {/* --- NEW DATE LOGIC: START & END DATE --- */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Start Date*</label>
              <input name="date" type="date" defaultValue={selectedEvent?.date} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">End Date (Optional)</label>
              <input name="dateEnd" type="date" defaultValue={selectedEvent?.dateEnd || selectedEvent?.date} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
              <p className="text-[9px] text-slate-400 ml-2 mt-1 italic">Leave same as Start Date for 1-day event.</p>
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
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Venue*</label>
            <input name="venue" defaultValue={selectedEvent?.location} required className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Category</label>
              <select name="category" defaultValue={selectedEvent?.category || 'Workshop'} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500">
                <option>Sport</option><option>Academic</option><option>Workshop</option><option>Welfare</option><option>Leadership</option><option>Entrepreneur</option><option>Arts</option><option>Religious</option><option>Career</option>
              </select>
            </div>
            
            {/* Walk-in Logic for Max Participants */}
            {!isWalkIn && (
              <div className="space-y-1 animate-in fade-in">
                <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Max Participants</label>
                <input name="max" type="number" defaultValue={selectedEvent?.maxParticipants || 0} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
                <p className="text-[9px] font-bold text-indigo-400 ml-2 mt-1 italic italic leading-tight">* Set to <span className="underline">0</span> for unlimited.</p>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Description</label>
            <textarea name="description" defaultValue={selectedEvent?.description} rows={4} className="w-full p-5 bg-white/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>

          {/* --- WALK-IN & REGISTRATION CONFIG --- */}
          <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 shadow-inner">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Settings2 size={16} className="text-indigo-500" />
                  <h3 className="text-xs font-black text-slate-600 uppercase tracking-widest">Event Type & Registration</h3>
                </div>
                
                {/* WALK-IN TOGGLE */}
                <label className="flex items-center gap-2 cursor-pointer bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-sm">
                  <span className={`text-[10px] font-black uppercase tracking-wider ${isWalkIn ? 'text-indigo-600' : 'text-slate-400'}`}>Walk-in Event?</span>
                  <input type="checkbox" checked={isWalkIn} onChange={() => setIsWalkIn(!isWalkIn)} className="accent-indigo-600 w-4 h-4" />
                </label>
              </div>

              {/* Registration Options (Hide if Walk-in) */}
              {!isWalkIn ? (
                <div className="animate-in slide-in-from-top-2">
                    <div className="space-y-2 mb-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 flex items-center gap-2">
                           <Clock size={12} /> Registration Closing Date
                        </label>
                        <input name="regDeadline" type="date" defaultValue={selectedEvent?.regDeadline || selectedEvent?.date} className="w-full p-4 bg-white border border-rose-100 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-rose-500 transition-all shadow-sm text-rose-600" />
                        <p className="text-[9px] text-slate-400 ml-2 italic">Students cannot register after this date, even if the event hasn't started.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                        { key: 'requireMatric', label: 'Matric Number', icon: <GraduationCap size={14}/> },
                        { key: 'requireFaculty', label: 'Faculty Info', icon: <Building2 size={14}/> },
                        { key: 'requireTshirt', label: 'T-shirt Size', icon: <Sparkles size={14}/> },
                        { key: 'requirePayment', label: 'Payment Receipt', icon: <ShieldCheck size={14}/> },
                        { key: 'requireIC', label: 'IC Number', icon: <Fingerprint size={14}/> }
                        ].map(item => (
                        <button key={item.key} type="button" onClick={() => toggleConfig(item.key)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${formConfig[item.key] ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' : 'bg-white text-slate-400 border-slate-200'}`}>
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
              ) : (
                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                    <p className="text-xs font-bold text-indigo-700 uppercase tracking-wide">Walk-in Mode Active</p>
                    <p className="text-[10px] text-indigo-500 mt-1">Users will see event details but no "Register" button is required. Ideal for food festivals or open houses.</p>
                </div>
              )}
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
  const { selectedEvent, registrations, setRegistrations, setView, downloadCSV, notify } = useContext(AppContext);
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
      // UPDATE LOCAL STATE
      setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, attendance: !currentStatus } : r));
      notify(`Attendance updated!`);
    } catch (e) { notify("Update failed", "error"); }
  };

  const verifyPayment = async (regId, currentStatus) => {
      try {
      // UPDATE LOCAL STATE
      setRegistrations(prev => prev.map(r => r.id === regId ? { ...r, paymentStatus: currentStatus === 'Verified' ? 'Pending' : 'Verified' } : r));
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
                  <button onClick={async () => { if(confirm("Remove participant?")) setRegistrations(prev => prev.filter(r => r.id !== reg.id)) }} className="text-rose-400 hover:text-rose-600 p-2"><Trash2 size={18}/></button>
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
                // MOCK PASSWORD CHANGE
                await new Promise(r => setTimeout(r, 800));
                notify("Password updated successfully!");
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
            
            // UPDATE LOCAL STATE
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
                  {/* --- COUNTDOWN TIMER LOGIC --- */}
                  {!isClub && (() => {
                    // Find the actual event object to get the real date
                    const linkedEvent = events.find(e => e.id === item.eventId);
                    
                    if (linkedEvent) {
                      const eventDate = new Date(linkedEvent.date);
                      const today = new Date();
                      today.setHours(0,0,0,0); // Reset hours for accurate day calculation
                      
                      const diffTime = eventDate - today;
                      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

                      if (diffDays > 0) {
                        return (
                          <div className="mt-2 inline-block px-3 py-1 bg-indigo-900 text-white rounded-lg text-[10px] font-black uppercase tracking-widest animate-pulse">
                            ⏳ {diffDays} Days to go
                          </div>
                        );
                      } else if (diffDays === 0) {
                        return <div className="mt-2 text-rose-600 font-black text-xs uppercase">🔥 Happening Today!</div>;
                      } else {
                        return <div className="mt-2 text-slate-400 font-bold text-xs uppercase">Event Ended</div>;
                      }
                    }
                  })()}

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
                    <button onClick={async () => { if(confirm("Permanently delete this event?")) setEvents(prev => prev.filter(e => e.id !== item.id)) }} className="p-4 bg-slate-50 text-slate-400 hover:bg-rose-500 hover:text-white rounded-2xl transition hover:shadow-lg"><Trash2 size={20} /></button>
                  </>
                ) : (
                  <>
                    <button 
                        onClick={() => { 
                          // 1. Cari data event asal berdasarkan ID dalam registration
                          const linkedEvent = events.find(e => e.id === item.eventId);
                          
                          if (linkedEvent) {
                            // 2. Check Tarikh Tutup (Deadline)
                            const deadline = linkedEvent.regDeadline ? new Date(linkedEvent.regDeadline) : new Date(linkedEvent.date);
                            deadline.setHours(23, 59, 59); // Set ke penghujung hari
                            const now = new Date();

                            if (now > deadline) {
                                // Kalau dah tutup
                                notify("Registration has closed. Updates are not allowed.", "error");
                            } else {
                                // Kalau masih buka -> Bawa ke form
                                setSelectedEvent(linkedEvent); // Load data event
                                setView('register-form');      // Buka form (form akan auto-detect 'Edit Mode')
                            }
                          } else {
                            notify("Event details not found.", "error");
                          }
                        }} 
                        className="px-6 py-3 text-xs font-black uppercase tracking-widest bg-white border border-slate-100 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition"
                      >
                        Update
                    </button>      
                    <button onClick={async () => { if(confirm("Cancel registration for this event?")) setRegistrations(prev => prev.filter(r => r.id !== item.id)) }} className="px-6 py-3 text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 rounded-xl transition border border-transparent hover:border-rose-100">Cancel</button>
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
// [SECTION] AUTH VIEW (MOCKED BUT INTERACTIVE)
// -----------------------------------------------------------------------------
const AuthView = () => {
  const { authMode, setAuthMode, setView, setProfile, setUser, setLoading, notify } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  
  // State untuk simpan input pengguna (Interaktif)
  const [formData, setFormData] = useState({
    fullName: '',
    matric: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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
      <div className="bg-white/5 backdrop-blur-3xl p-6 md:p-16 rounded-[3.5rem] md:rounded-[4.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/10 w-[98%] max-w-md md:max-w-xl lg:max-w-lg relative overflow-hidden z-10 ring-1 ring-white/10 my-auto">
        {/* Glow Line at top of card */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
        
        <div className="text-center mb-10 relative z-10">
           <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-500/30 border border-white/20">
             <Building2 size={40} className="text-white"/>
           </div>

           <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 uppercase tracking-tighter leading-none">
             {authMode === 'login' ? 'Hello Again!' : 'CREATE A NEW ACCOUNT'}
           </h2>

           <p className="text-slate-400 font-bold uppercase text-[10px] tracking-[0.4em] mt-4 italic opacity-60">
             Start your journey with us
           </p>
        </div>

        <form onSubmit={async (e) => {
        e.preventDefault();
        const f = e.target;
        if (authMode === 'signup' && formData.password !== f.rePassword.value) { notify("Passwords mismatch", "error"); return; }
        
        setLoading(true);
        // MOCK LOGIN LOGIC
        setTimeout(() => {
            let mockUser = { uid: `user-${Date.now()}`, email: formData.email };
            let mockProfile = {};

            if (authMode === 'signup') {
                // --- LOGIK REGISTER (Guna apa yang awak taip) ---
                mockProfile = {
                    fullName: formData.fullName || 'New Student',
                    role: formData.role, 
                    faculty: 'FSKTM',
                    matric: 'N/A',
                    photoUrl: '' 
                };
                notify("Account created successfully! Welcome.");
            } else {
                // --- LOGIK LOGIN (Auto-detect watak berdasarkan email) ---
                const emailLower = formData.email.toLowerCase();

                if (emailLower.includes('club') || emailLower.includes('admin')) {
                    // LOGIN SEBAGAI CLUB
                    mockUser.uid = 'demo-club';
                    mockProfile = { fullName: 'Information Technology Club', role: 'club', faculty: 'FSKTM', photoUrl: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80' };
                } else if (emailLower.includes('staff')) {
                    // LOGIN SEBAGAI STAFF
                    mockUser.uid = 'demo-staff';
                    mockProfile = { fullName: 'Dr. Sarah (Staff)', role: 'staff', faculty: 'HEP', photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80' };
                } else {
                    // LOGIN SEBAGAI STUDENT
                    mockUser.uid = 'demo-student';
                    mockProfile = { fullName: 'Ahmad Ali Bin Abu', role: 'student', faculty: 'FSKTM', matric: 'AI190023', photoUrl: 'https://share.google/z4RVvkoHwMaVz09IV' };
                }
                notify(`Welcome back, ${mockProfile.fullName}!`);
            }

            setUser(mockUser);
            setProfile(mockProfile);
            setLoading(false);
            setView('home');
        }, 1500);

      }} className="space-y-4 relative z-10">
          
          {/* Input ditukar ke gaya Dark Glass (text-white) */}
          {authMode === 'signup' && (
            <input name="fullName" required onChange={handleChange} placeholder="Full Name" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" />
          )}
          
          <input name="email" required type="email" onChange={handleChange} placeholder="University Email" className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500" />
          
          <div className="relative">
            <input 
              name="password" 
              required 
              onChange={handleChange}
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
            <select name="role" onChange={handleChange} className="w-full p-5 bg-slate-900 border border-white/10 rounded-2xl font-bold text-sm text-white outline-none focus:ring-2 focus:ring-indigo-500">
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
// [SECTION] VIEW: ABOUT US
// -----------------------------------------------------------------------------
const AboutUsView = () => {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* 1. HERO SECTION (The Big Statement) */}
      <div className="text-center space-y-6 py-12">
        <h2 className="text-3xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 tracking-tighter uppercase leading-none">
          Unlock Every Opportunity, <br/> Experience Every Moment.
        </h2>
        <div className="w-24 h-2 bg-indigo-600 mx-auto rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"></div>
      </div>

      {/* 2. MISSION STATEMENT (Who We Are) */}
      <div className="bg-white/70 backdrop-blur-2xl p-12 rounded-[3.5rem] shadow-2xl border border-white/60 relative overflow-hidden group">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-100 rounded-full blur-3xl opacity-50 group-hover:bg-indigo-200 transition-colors duration-700"></div>
        <div className="relative z-10 space-y-6">
          <h3 className="text-xs font-black text-indigo-500 uppercase tracking-[0.4em]">Our Mission</h3>
          <p className="text-2xl md:text-3xl font-bold text-slate-800 leading-relaxed italic">
            "The UTHM Event Portal is a centralized digital hub designed to revolutionize how students and organizations interact within our campus. We simplify the journey from discovering an event to scanning your ticket at the door."
          </p>
        </div>
      </div>

      {/* 3. KEY PILLARS (The Features) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { 
            title: "Seamless Discovery", 
            desc: "Browse through a diverse range of activities from academic workshops to sports tournaments.",
            icon: <Search size={28} />,
            color: "indigo"
          },
          { 
            title: "Effortless Registration", 
            desc: "No more messy Google Forms. Register in seconds with your integrated student profile.",
            icon: <UserCheck size={28} />,
            color: "violet"
          },
          { 
            title: "Sustainability First", 
            desc: "We are going paperless. Say goodbye to physical tickets and hello to digital QR passes.",
            icon: <ShieldCheck size={28} />,
            color: "emerald"
          },
          { 
            title: "Empowering Clubs", 
            desc: "Providing student leaders with real-time analytics and automated participant management.",
            icon: <LayoutDashboard size={28} />,
            color: "amber"
          }
        ].map((pillar, idx) => (
          <div key={idx} className="bg-white/40 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/40 hover:bg-white/80 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
              <div className={`w-14 h-14 bg-${pillar.color}-100 text-${pillar.color}-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-${pillar.color}-600 group-hover:text-white transition-all`}>
                {pillar.icon}
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-3">{pillar.title}</h4>
              <p className="text-slate-500 font-medium leading-relaxed">{pillar.desc}</p>
          </div>
        ))}
      </div>

      {/* FOOTER CALL TO ACTION */}
      <div className="text-center pt-10">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em] mb-4 italic">Built for the future of UTHM</p>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// [SECTION] NOTIFIACTION COMPONENT
// -----------------------------------------------------------------------------

const HeaderNotification = () => {
  const [show, setShow] = useState(false);
  // Mock notifications for demo view
  const [notis, setNotis] = useState([
    { id: 1, message: "Welcome to UTHM Event Pulse!", timestamp: { seconds: Date.now() / 1000 }, isRead: false },
    { id: 2, message: "Upcoming: Futsal Friendly Match in 3 days.", timestamp: { seconds: (Date.now() - 86400000) / 1000 }, isRead: false }
  ]);
  const handleDelete = (idToDelete) => {
    setNotis(currentNotis => currentNotis.filter(n => n.id !== idToDelete));
  };
  const [unreadCount, setUnreadCount] = useState(2);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeOpen = (e) => {
      if (!e.target.closest('.noti-container')) setShow(false);
    }
    document.addEventListener('click', closeOpen);
    return () => document.removeEventListener('click', closeOpen);
  }, []);

  const handleMarkRead = async () => {
     setShow(!show);
     if (!show && unreadCount > 0) {
       setUnreadCount(0); 
     }
  };

  return (
    <div className="relative noti-container mr-4">
      {/* Bell Button */}
      <button onClick={handleMarkRead} className="relative p-2.5 rounded-xl hover:bg-white/50 transition-all text-slate-500 hover:text-indigo-600">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full animate-pulse"></span>
        )}
      </button>

      {/* Dropdown Menu */}
      {show && (
        <div className="absolute right-0 top-12 w-80 bg-white/80 hover:bg-white rounded-[1.5rem] rounded-[1.5rem] shadow-2xl border border-slate-200 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 z-50">
          <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Notifications</span>
              <span className="text-[9px] font-bold bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-md">{notis.length} Recent</span>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
            {notis.length === 0 ? (
               <div className="p-8 text-center text-slate-400 text-xs italic">No new notifications</div>
            ) : (
                notis.map(n => (
                  <div key={n.id} className="group relative p-4 hover:bg-indigo-50/50 transition border-b border-slate-50 last:border-0 cursor-pointer">
                    <div className="flex gap-3 justify-between items-start">
                      
                      {/* Left: Info */}
                      <div className="flex gap-3 w-full">
                        <div className="w-1.5 h-1.5 mt-1.5 bg-indigo-500 rounded-full shrink-0"></div>
                        <div>
                            <p className="text-xs font-bold text-slate-700 leading-snug">{n.message}</p>
                            <p className="text-[9px] text-slate-400 mt-1 font-medium">
                              {n.timestamp ? new Date(n.timestamp.seconds * 1000).toLocaleDateString() : 'Just now'}
                            </p>
                        </div>
                      </div>

                      {/* Right: Delete Button */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); 
                          handleDelete(n.id); 
                        }}
                        className="text-slate-400 hover:text-rose-500 transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      )}
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
  
  // INITIALIZE MOCK DATA HERE
  const [events, setEvents] = useState(MOCK_EVENTS_DATA); 
  const [registrations, setRegistrations] = useState([]);
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false); // No global loading needed for mock
  const [notification, setNotification] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const [currentMonth, setCurrentMonth] = useState(new Date());

const getCategoryTheme = (cat) => {
  switch (cat) {
    case 'Sport': return { color: 'amber', icon: <Trophy size={14} /> };
    case 'Academic': return { color: 'indigo', icon: <GraduationCap size={14} /> };
    case 'Workshop': return { color: 'violet', icon: <Wrench size={14} /> };
    case 'Welfare': return { color: 'emerald', icon: <Heart size={14} /> };
    case 'Leadership': return { color: 'blue', icon: <ShieldCheck size={14} /> };
    case 'Entrepreneur': return { color: 'cyan', icon: <Store size={14} /> };
    case 'Arts': return { color: 'rose', icon: <Palette size={14} /> };
    case 'Religious': return { color: 'teal', icon: <BookOpen size={14} /> };
    case 'Career': return { color: 'slate', icon: <Briefcase size={14} /> };
    default: return { color: 'slate', icon: <Sparkles size={14} /> };
  }
};

  const notify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleLogout = () => {
    // MOCK LOGOUT
    setLoading(true);
    setTimeout(() => {
        setUser(null);
        setProfile(null);
        setView('home');
        setLoading(false);
        notify("Logged out successfully. See you again soon!");
    }, 800);
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

  // MOCK UPLOAD FUNCTION
  const uploadFile = async (file, path) => {
    console.log("Mock Uploading...", file?.name);
    if (!file) return null;
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return dummy URL
    if (path.includes('events')) return 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80';
    return 'https://source.unsplash.com/random/800x600';
  };

  const contextValue = {
    user, setUser,
    profile, setProfile,
    view, setView,
    authMode, setAuthMode,
    events, setEvents, // Expose setter for CreateEvent
    registrations, setRegistrations, // Expose setter for Registration
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
      <p className="mt-8 text-white font-black text-xs tracking-[0.4em] uppercase opacity-40 animate-pulse">PREPARING YOUR EXPERIENCE...</p>
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

<main className="flex-1 h-full overflow-y-auto relative z-10 custom-scrollbar">
          {/* 1. Navbar & Header Bar kekal saiz asal (100% size) */}
          {view !== 'auth' && (
            <header className="h-14 bg-white/50 backdrop-blur-md border-b border-white/10 px-10 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-violet-600 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                <h1 className="font-black text-sm text-slate-400 uppercase tracking-[0.2em]">
                  {view === 'home' && 'HOME PAGE'}
                  {view === 'calendar' && 'MONTHLY SCHEDULE'}
                  {view === 'browse' && 'EVENT DISCOVERY'}
                  {view === 'profile' && 'USER PROFILE'}
                  {view === 'view-participants' && 'MANAGE PARTICIPANTS '}
                  {view === 'edit-profile' && 'PROFILE SETTINGS'}
                  {view === 'about' && 'Get to Know Us'}
                </h1>
              </div>
              {user && !user.isAnonymous && (
                <div className="flex items-center gap-6">
                  {profile?.role !== 'club' && (
                    <HeaderNotification />
                  )}
                  <div
                    onClick={() => setView('profile')}
                    className="flex items-center gap-4 cursor-pointer hover:opacity-100 transition-all group"
                  >
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
                  </div>
                </div>
              )}
            </header>
          )}

          {/* 2. KANDUNGAN VIEW (Dikecilkan kepada 90% menggunakan text-[0.9rem]) */}
          <div className="relative pb-20 text-[0.9rem]">
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
            {view === 'about' && <AboutUsView />}
          </div>
        </main>
      </div>
    </AppContext.Provider>
  );
}
