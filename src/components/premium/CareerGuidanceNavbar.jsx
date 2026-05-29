import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Search, ChevronDown, GraduationCap, BookOpen, Building2, Award, Brain, Users, FileText, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CareerGuidanceNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleDropdown = (dropdownName) => {
    setIsDropdownOpen(isDropdownOpen === dropdownName ? null : dropdownName);
  };

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
    {
      name: 'Resources',
      icon: <Brain className="w-4 h-4" />,
      dropdown: [
        { name: 'Career Quiz', path: '/career-quiz' },
        { name: 'Stream Selector', path: '/resources/stream-selector' },
        { name: 'Study Planner', path: '/resources/study-planner' },
        { name: 'Resume Templates', path: '/resources/resume' },
        { name: 'SOP Templates', path: '/resources/sop' },
        { name: 'Time Management Guides', path: '/resources/time-management' },
        { name: 'Student Roadmaps', path: '/resources/roadmaps' },
      ]
    },
  ];

  const userLinks = user ? [
    { name: 'Dashboard', path: user.role === 'admin' ? '/admin/dashboard' : '/dashboard' },
    { name: 'Profile', path: '/profile' },
  ] : [];

  return (
    <>
      {/* Main Navbar - Institutional Elite Gatekeeper Style */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#002D62]/95 backdrop-blur-md shadow-sm border-b border-[#002D62]'
          : 'bg-[#002D62]/90 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo + Brand - Academic Prestige */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-[#721c24] rounded-lg flex items-center justify-center shadow-sm"
              >
                <GraduationCap className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-white leading-none tracking-tight">
                  Career<span className="text-[#721c24]">Pilot</span>
                </h1>
                <p className="text-[9px] text-gray-300 font-semibold uppercase tracking-[0.2em] mt-1 font-sans">
                  Guiding India's Students Beyond School
                </p>
              </div>
            </Link>

            {/* Desktop Navigation - Institutional Style */}
            <div className="hidden lg:flex items-center space-x-0.5">
              <div className="flex items-center space-x-0.5">
                {navLinks.map((link) => (
                  <div key={link.name} className="relative">
                    {link.dropdown ? (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={() => toggleDropdown(link.name)}
                        className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 font-sans ${isDropdownOpen === link.name
                          ? 'text-white bg-white/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isDropdownOpen === link.name ? 'rotate-180' : ''}`} />
                      </motion.button>
                    ) : (
                      <Link
                        to={link.path}
                        className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-[12px] font-semibold transition-all duration-200 font-sans ${location.pathname === link.path
                          ? 'text-white bg-white/10'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                          }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    )}

                    {/* Dropdown Menu - Institutional Style */}
                    <AnimatePresence>
                      {isDropdownOpen === link.name && link.dropdown && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
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

              {/* Search Bar - Institutional Style */}
              <form onSubmit={handleSearch} className="relative mx-2 hidden xl:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-body" />
                <input
                  type="text"
                  placeholder="Search careers, colleges, exams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2.5 bg-brand-bgLight border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-brand-maroon focus:border-transparent w-48 md:w-56 transition-all duration-200 font-sans text-brand-heading"
                />
              </form>

              {/* Right Side Buttons - Institutional Style */}
              <div className="flex items-center space-x-2 md:space-x-2">
                <Link
                  to="/career-quiz"
                  className="px-3 py-2 md:px-4 md:py-2.5 bg-white text-brand-maroon border-2 border-brand-maroon text-xs md:text-[13px] font-bold rounded-lg hover:bg-brand-maroon hover:text-white transition-all duration-200 font-sans uppercase tracking-wide whitespace-nowrap"
                >
                  Take Quiz
                </Link>
                <Link
                  to="/book-guidance"
                  className="px-3 py-2 md:px-4 md:py-2.5 bg-brand-maroon text-white text-xs md:text-[13px] font-bold rounded-lg hover:bg-[#5a161d] transition-all duration-200 font-sans uppercase tracking-wide shadow-sm whitespace-nowrap"
                >
                  Book Free
                </Link>

                {/* User Menu - Institutional Style */}
                {user ? (
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
                          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                        >
                          <div className="py-2">
                            {userLinks.map((link) => (
                              <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsDropdownOpen(null)}
                                className="block px-4 py-3 text-sm font-semibold text-brand-body hover:bg-brand-bgLight hover:text-brand-maroon transition-colors duration-200 font-sans"
                              >
                                {link.name}
                              </Link>
                            ))}
                            <div className="border-t border-gray-200 my-2"></div>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-3 text-sm font-semibold text-brand-maroon hover:bg-brand-bgLight transition-colors duration-200 font-sans"
                            >
                              Logout
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Mobile Menu Button - Institutional Style */}
            <div className="lg:hidden flex items-center space-x-2">
              <Link
                to="/career-quiz"
                className="px-3 py-2 bg-white text-brand-maroon border-2 border-brand-maroon text-[11px] font-bold rounded-lg hover:bg-brand-maroon hover:text-white transition-all duration-200 font-sans uppercase tracking-wide"
              >
                Quiz
              </Link>
              <Link
                to="/book-guidance"
                className="px-3 py-2 bg-brand-maroon text-white text-[11px] font-bold rounded-lg hover:bg-[#5a161d] transition-all duration-200 font-sans uppercase tracking-wide shadow-sm"
              >
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

        {/* Mobile Menu - Institutional Style */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#495057]" />
                  <input
                    type="text"
                    placeholder="Search careers, colleges, exams..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#f8f9fa] border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#721c24] focus:border-transparent font-sans text-[#212529]"
                  />
                </form>

                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div>
                        <motion.button
                          onClick={() => toggleDropdown(link.name)}
                          className="flex items-center justify-between w-full text-base font-semibold text-[#495057] hover:text-[#721c24] transition-colors duration-200 py-2 font-sans"
                        >
                          <div className="flex items-center space-x-2">
                            {link.icon}
                            <span>{link.name}</span>
                          </div>
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
                                  onClick={() => {
                                    setIsDropdownOpen(null);
                                    setIsMobileMenuOpen(false);
                                  }}
                                  className="block text-sm font-semibold text-[#495057] hover:text-[#721c24] transition-colors duration-200 py-2 font-sans"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center space-x-2 text-base font-semibold text-[#495057] hover:text-[#721c24] transition-colors duration-200 py-2 font-sans"
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </Link>
                    )}
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <Link
                    to="/book-guidance"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center bg-[#721c24] text-white font-semibold py-3 rounded-lg font-sans"
                  >
                    Book Free Guidance
                  </Link>

                  {user ? (
                    <>
                      {userLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-base font-semibold text-[#495057] hover:text-[#721c24] transition-colors duration-200 py-2 font-sans"
                        >
                          {link.name}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left text-base font-semibold text-[#721c24] hover:text-[#5a161d] py-2 font-sans"
                      >
                        Logout
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default CareerGuidanceNavbar;
