import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, X, Search, ChevronDown, GraduationCap, BookOpen,
  Building2, Award, Users, Code, Stethoscope, Briefcase,
  Scale, Palette, Zap, ArrowRight
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// ─── Searchable data ────────────────────────────────────────────────────────
const SEARCH_DATA = [
  { type: 'Career', title: 'Software Engineer', path: '/careers/engineering', icon: Code },
  { type: 'Career', title: 'Data Scientist', path: '/careers/engineering', icon: Code },
  { type: 'Career', title: 'AI/ML Engineer', path: '/careers/engineering', icon: Code },
  { type: 'Career', title: 'Full Stack Developer', path: '/careers/engineering', icon: Code },
  { type: 'Career', title: 'Doctor (MBBS)', path: '/careers/medical', icon: Stethoscope },
  { type: 'Career', title: 'Dentist', path: '/careers/medical', icon: Stethoscope },
  { type: 'Career', title: 'Pharmacist', path: '/careers/medical', icon: Stethoscope },
  { type: 'Career', title: 'Chartered Accountant (CA)', path: '/careers/commerce', icon: Briefcase },
  { type: 'Career', title: 'Investment Banker', path: '/careers/commerce', icon: Briefcase },
  { type: 'Career', title: 'Lawyer', path: '/careers/law', icon: Scale },
  { type: 'Career', title: 'Judge', path: '/careers/law', icon: Scale },
  { type: 'Career', title: 'IAS Officer', path: '/careers/humanities', icon: Users },
  { type: 'Career', title: 'Journalist', path: '/careers/humanities', icon: Users },
  { type: 'Career', title: 'Psychologist', path: '/careers/humanities', icon: Users },
  { type: 'Career', title: 'Graphic Designer', path: '/careers/design', icon: Palette },
  { type: 'Career', title: 'UX/UI Designer', path: '/careers/design', icon: Palette },
  { type: 'Career', title: 'Architect', path: '/careers/design', icon: Palette },
  { type: 'Career', title: 'Content Creator', path: '/careers/modern', icon: Zap },
  { type: 'Career', title: 'Digital Marketer', path: '/careers/modern', icon: Zap },
  { type: 'Career', title: 'Startup Founder', path: '/careers/modern', icon: Zap },
  { type: 'Exam', title: 'JEE Main', path: '/exams/jee', icon: BookOpen },
  { type: 'Exam', title: 'JEE Advanced', path: '/exams/jee', icon: BookOpen },
  { type: 'Exam', title: 'NEET UG', path: '/exams/neet', icon: BookOpen },
  { type: 'Exam', title: 'CUET', path: '/exams/cuet', icon: BookOpen },
  { type: 'Exam', title: 'CLAT', path: '/exams/clat', icon: BookOpen },
  { type: 'Exam', title: 'NDA', path: '/exams/nda', icon: BookOpen },
  { type: 'Exam', title: 'NIFT', path: '/exams/nift', icon: BookOpen },
  { type: 'Exam', title: 'UCEED', path: '/exams/uceed', icon: BookOpen },
  { type: 'Exam', title: 'IPMAT', path: '/exams/ipmat', icon: BookOpen },
  { type: 'Exam', title: 'SAT', path: '/exams/sat', icon: BookOpen },
  { type: 'Exam', title: 'UPSC Civil Services', path: '/exams/nda', icon: BookOpen },
  { type: 'College', title: 'IITs', path: '/colleges/engineering', icon: Building2 },
  { type: 'College', title: 'NITs', path: '/colleges/engineering', icon: Building2 },
  { type: 'College', title: 'AIIMS Delhi', path: '/colleges/medical', icon: Building2 },
  { type: 'College', title: 'NLUs', path: '/colleges/law', icon: Building2 },
  { type: 'College', title: 'SRCC Delhi', path: '/colleges/commerce', icon: Building2 },
  { type: 'College', title: 'JNU', path: '/colleges/government', icon: Building2 },
  { type: 'College', title: 'NIFT Colleges', path: '/colleges/engineering', icon: Building2 },
  { type: 'Scholarship', title: 'National Scholarship Portal', path: '/scholarships/government', icon: Award },
  { type: 'Scholarship', title: 'Inspire Scholarship (DST)', path: '/scholarships/merit', icon: Award },
  { type: 'Scholarship', title: 'Tata Scholarship', path: '/scholarships/private', icon: Award },
  { type: 'Scholarship', title: 'Reliance Foundation Scholarship', path: '/scholarships/private', icon: Award },
  { type: 'Scholarship', title: 'Commonwealth Scholarships', path: '/scholarships/international', icon: Award },
  { type: 'Scholarship', title: 'Minority Scholarships', path: '/scholarships/minority', icon: Award },
];

const TYPE_COLOR = {
  Career:      'bg-purple-100 text-purple-700',
  Exam:        'bg-blue-100 text-blue-700',
  College:     'bg-green-100 text-green-700',
  Scholarship: 'bg-amber-100 text-amber-700',
};

const POPULAR = ['JEE', 'NEET', 'IAS', 'Software Engineer', 'Scholarship', 'IIT', 'CA', 'Design'];

const CareerGuidanceNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll → close dropdowns
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsDropdownOpen(null);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close search on route change
  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Focus input when overlay opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  // Esc closes overlay
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeSearch(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const closeSearch = () => { setIsSearchOpen(false); setSearchQuery(''); };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      closeSearch();
    }
  };

  const handleLogout = async () => { await logout(); navigate('/'); };

  const toggleDropdown = (name) => setIsDropdownOpen(isDropdownOpen === name ? null : name);

  // Live search results
  const results = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_DATA.filter((item) =>
      item.title.toLowerCase().includes(q) || item.type.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  const navLinks = [
    {
      name: 'Explore Careers',
      icon: <GraduationCap className="w-4 h-4" />,
      dropdown: [
        { name: 'Science Careers', path: '/careers/science' },
        { name: 'Commerce Careers', path: '/careers/commerce' },
        { name: 'Humanities Careers', path: '/careers/humanities' },
        { name: 'Modern Careers', path: '/careers/modern' },
        { name: 'Government Careers', path: '/careers/government' },
        { name: 'Study Abroad', path: '/careers/study-abroad' },
        { name: 'High Salary Careers', path: '/careers/high-salary' },
        { name: 'Careers Without Maths', path: '/careers/no-maths' },
      ]
    },
    {
      name: 'Entrance Exams',
      icon: <BookOpen className="w-4 h-4" />,
      dropdown: [
        { name: 'JEE', path: '/exams/jee' },
        { name: 'NEET', path: '/exams/neet' },
        { name: 'CUET', path: '/exams/cuet' },
        { name: 'CLAT', path: '/exams/clat' },
        { name: 'NDA', path: '/exams/nda' },
        { name: 'IPMAT', path: '/exams/ipmat' },
        { name: 'NIFT', path: '/exams/nift' },
        { name: 'UCEED', path: '/exams/uceed' },
        { name: 'SAT', path: '/exams/sat' },
      ]
    },
    {
      name: 'Colleges',
      icon: <Building2 className="w-4 h-4" />,
      dropdown: [
        { name: 'Engineering Colleges', path: '/colleges/engineering' },
        { name: 'Medical Colleges', path: '/colleges/medical' },
        { name: 'Law Colleges', path: '/colleges/law' },
        { name: 'Commerce Colleges', path: '/colleges/commerce' },
        { name: 'Government Colleges', path: '/colleges/government' },
        { name: 'Affordable Colleges', path: '/colleges/affordable' },
        { name: 'Scholarship Colleges', path: '/colleges/scholarship' },
      ]
    },
    {
      name: 'Scholarships',
      icon: <Award className="w-4 h-4" />,
      dropdown: [
        { name: 'Government Scholarships', path: '/scholarships/government' },
        { name: 'Private Scholarships', path: '/scholarships/private' },
        { name: 'International Scholarships', path: '/scholarships/international' },
        { name: 'Minority Scholarships', path: '/scholarships/minority' },
        { name: 'Merit-Based Scholarships', path: '/scholarships/merit' },
      ]
    },
  ];

  const userLinks = user ? [
    { name: 'Dashboard', path: user.role === 'admin' ? '/admin/dashboard' : '/dashboard' },
    { name: 'Profile', path: '/profile' },
  ] : [];

  return (
    <>
      {/* ── Main Navbar ─────────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#002D62]/95 backdrop-blur-md shadow-sm border-b border-[#002D62]'
            : 'bg-[#002D62]/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div whileHover={{ scale: 1.05 }} className="w-12 h-12 bg-[#721c24] rounded-lg flex items-center justify-center shadow-sm">
                <GraduationCap className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-white leading-none tracking-tight">
                  We<span className="text-[#721c24]">Bridge</span>
                </h1>
                <p className="text-[9px] text-gray-300 font-semibold uppercase tracking-[0.2em] mt-1 font-sans">
                  Guiding India's Students Beyond School
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center space-x-0.5">
              <div className="flex items-center space-x-0.5">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      onClick={() => toggleDropdown(link.name)}
                      className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 font-sans ${
                        isDropdownOpen === link.name
                          ? 'text-white bg-white/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {link.icon}
                      <span>{link.name}</span>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen === link.name ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                      {isDropdownOpen === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsDropdownOpen(null)}
                                className="block px-4 py-3 text-sm font-semibold text-[#495057] hover:bg-[#f8f9fa] hover:text-[#721c24] transition-colors duration-200 font-sans"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Search Icon Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="ml-2 flex items-center gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white/70 hover:text-white hover:bg-white/20 transition-all duration-200 text-sm font-sans"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-xs text-white/60">Search…</span>
              </button>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-2 ml-2">
                <Link to="/career-quiz" className="px-3 py-2 md:px-4 md:py-2.5 bg-white text-brand-maroon border-2 border-brand-maroon text-xs md:text-[13px] font-bold rounded-lg hover:bg-brand-maroon hover:text-white transition-all duration-200 font-sans uppercase tracking-wide whitespace-nowrap">
                  Take Quiz
                </Link>
                <Link to="/book-guidance" className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-maroon text-white text-xs md:text-[13px] font-bold rounded-lg hover:bg-[#5a161d] transition-all duration-200 font-sans uppercase tracking-wide shadow-sm whitespace-nowrap">
                  Book Free
                </Link>

                {user && (
                  <div className="relative ml-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleDropdown('user')}
                      className="flex items-center space-x-2 md:space-x-3 px-3 md:px-4 py-2.5 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-all duration-200 border border-white/20 font-sans"
                    >
                      <div className="w-7 h-7 md:w-8 md:h-8 bg-brand-maroon rounded-full flex items-center justify-center">
                        <span className="text-white text-[10px] md:text-xs font-bold font-serif">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs md:text-sm font-semibold hidden md:inline">{user.name}</span>
                      <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 transition-transform duration-200 ${isDropdownOpen === 'user' ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                      {isDropdownOpen === 'user' && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50"
                        >
                          <div className="py-2">
                            {userLinks.map((link) => (
                              <Link key={link.name} to={link.path} onClick={() => setIsDropdownOpen(null)} className="block px-4 py-3 text-sm font-semibold text-brand-body hover:bg-brand-bgLight hover:text-brand-maroon transition-colors duration-200 font-sans">
                                {link.name}
                              </Link>
                            ))}
                            <div className="border-t border-gray-200 my-2" />
                            <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-sm font-semibold text-brand-maroon hover:bg-brand-bgLight transition-colors duration-200 font-sans">
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Right */}
            <div className="lg:hidden flex items-center space-x-2">
              <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <Link to="/career-quiz" className="px-3 py-2 bg-white text-brand-maroon border-2 border-brand-maroon text-[11px] font-bold rounded-lg hover:bg-brand-maroon hover:text-white transition-all duration-200 font-sans uppercase tracking-wide">
                Quiz
              </Link>
              <Link to="/book-guidance" className="px-3 py-2 bg-brand-maroon text-white text-[11px] font-bold rounded-lg hover:bg-[#5a161d] transition-all duration-200 font-sans uppercase tracking-wide shadow-sm">
                Book
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-all duration-200"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    <motion.button
                      onClick={() => toggleDropdown(link.name)}
                      className="flex items-center justify-between w-full text-base font-semibold text-[#495057] hover:text-[#721c24] transition-colors duration-200 py-2 font-sans"
                    >
                      <div className="flex items-center space-x-2">{link.icon}<span>{link.name}</span></div>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen === link.name ? 'rotate-180' : ''}`} />
                    </motion.button>
                    <AnimatePresence>
                      {isDropdownOpen === link.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-6 space-y-2"
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.name}
                              to={item.path}
                              onClick={() => { setIsDropdownOpen(null); setIsMobileMenuOpen(false); }}
                              className="block text-sm font-semibold text-[#495057] hover:text-[#721c24] transition-colors duration-200 py-2 font-sans"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <Link to="/book-guidance" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center bg-[#721c24] text-white font-semibold py-3 rounded-lg font-sans">
                    Book Free Guidance
                  </Link>
                  {user && (
                    <>
                      {userLinks.map((link) => (
                        <Link key={link.name} to={link.path} onClick={() => setIsMobileMenuOpen(false)} className="block text-base font-semibold text-[#495057] hover:text-[#721c24] transition-colors duration-200 py-2 font-sans">
                          {link.name}
                        </Link>
                      ))}
                      <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-base font-semibold text-[#721c24] hover:text-[#5a161d] py-2 font-sans">
                        Logout
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Search Overlay ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSearch}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Search Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 right-0 z-[70] bg-white shadow-2xl rounded-b-3xl max-h-[85vh] overflow-hidden flex flex-col"
            >
              {/* Input Row */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                <Search className="w-5 h-5 text-[#002D62] flex-shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleSearchSubmit();
                    }
                  }}
                  placeholder="Search careers, exams, colleges, scholarships..."
                  className="flex-1 text-lg text-gray-800 placeholder-gray-400 focus:outline-none font-sans bg-transparent"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all">
                    <X className="w-4 h-4" />
                  </button>
                )}
                <button onClick={closeSearch} className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-all font-sans text-sm font-semibold">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Results / Default */}
              <div className="overflow-y-auto flex-1">
                {!searchQuery ? (
                  /* Popular searches */
                  <div className="px-5 py-5">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 font-sans">Popular Searches</p>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSearchQuery(s)}
                          className="px-4 py-2 bg-gray-100 hover:bg-[#002D62] hover:text-white text-gray-700 rounded-full text-sm font-semibold transition-all font-sans"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length === 0 ? (
                  /* No results */
                  <div className="px-5 py-10 text-center">
                    <p className="text-gray-400 font-sans">No results for "<span className="font-bold text-gray-600">{searchQuery}</span>"</p>
                    <p className="text-sm text-gray-400 mt-1 font-sans">Try: JEE, NEET, Software Engineer, IIT, Scholarship</p>
                    <button
                      onClick={handleSearchSubmit}
                      className="mt-4 px-6 py-2 bg-[#002D62] text-white rounded-lg text-sm font-semibold hover:bg-[#001d42] transition-all font-sans"
                    >
                      Search Everything
                    </button>
                  </div>
                ) : (
                  /* Results list */
                  <div className="py-2">
                    <p className="px-5 py-2 text-xs font-bold text-gray-400 uppercase tracking-widest font-sans">
                      {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                    {results.map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={i}
                          to={item.path}
                          onClick={closeSearch}
                          className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${TYPE_COLOR[item.type]}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 font-sans text-sm">
                              {item.title}
                            </p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${TYPE_COLOR[item.type]}`}>
                            {item.type}
                          </span>
                          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#002D62] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                        </Link>
                      );
                    })}
                    <div className="border-t border-gray-100 mt-2 pt-3 px-5">
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full py-2.5 bg-[#002D62] text-white rounded-lg text-sm font-semibold hover:bg-[#001d42] transition-all font-sans"
                      >
                        View All Results for "{searchQuery}"
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer hint */}
              <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between">
                <p className="text-xs text-gray-400 font-sans">Press <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-gray-500 font-mono text-xs">Esc</kbd> to close</p>
                <p className="text-xs text-gray-400 font-sans">{SEARCH_DATA.length} items indexed</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CareerGuidanceNavbar;
