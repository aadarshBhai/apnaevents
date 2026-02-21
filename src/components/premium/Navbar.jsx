import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ChevronDown, Shield } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleDarkMode = () => {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      } else {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      }
    };

    handleScroll();
    handleDarkMode();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const userLinks = user ? [
    { name: 'Dashboard', path: user.role === 'admin' ? '/admin/dashboard' : '/dashboard' },
    { name: 'Profile', path: '/profile' },
    { name: 'Settings', path: '/settings' },
  ] : [];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200'
          : 'bg-white/50 backdrop-blur-sm'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-10 h-10 bg-[#0d3862] rounded-lg flex items-center justify-center shadow-md"
              >
                <div className="text-white">
                  <Shield size={20} fill="currentColor" />
                </div>
              </motion.div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-[#0d3862] leading-none tracking-tight">
                  apna<span className="text-[#911116]">events</span>
                </h1>
                <p className="text-[9px] text-slate-500 font-bold uppercase tracking-[0.2em] mt-1">Ashoka Academic Network</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all duration-200 ${location.pathname === link.path
                      ? 'text-[#0d3862] bg-slate-100'
                      : 'text-slate-600 hover:text-[#0d3862] hover:bg-slate-50'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* User Menu */}
              {user ? (
                <div className="relative ml-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 px-4 py-2 bg-slate-100 rounded-lg text-slate-700 hover:bg-slate-200 transition-all duration-200 border border-slate-200"
                  >
                    <div className="w-8 h-8 bg-[#0d3862] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="text-sm font-bold">{user.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </motion.button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden"
                      >
                        <div className="py-2">
                          {userLinks.map((link) => (
                            <Link
                              key={link.name}
                              to={link.path}
                              onClick={() => setIsDropdownOpen(false)}
                              className="block px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-[#0d3862] transition-colors duration-200"
                            >
                              {link.name}
                            </Link>
                          ))}
                          <div className="border-t border-slate-100 my-2"></div>
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                          >
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex items-center space-x-4 ml-4">
                  <Link
                    to="/auth"
                    className="text-sm font-bold text-slate-600 hover:text-[#0d3862] transition-colors duration-200"
                  >
                    Student Login
                  </Link>
                  <Link
                    to="/submit-event"
                    className="bg-[#0d3862] text-white text-[13px] px-6 py-2.5 rounded-lg font-bold hover:bg-[#0a2c4d] shadow-sm transition-all"
                  >
                    Post Competition
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all duration-200"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div >

        {/* Mobile Menu */}
        < AnimatePresence >
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-200"
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block text-base font-bold transition-colors duration-200 ${location.pathname === link.path
                      ? 'text-[#0d3862]'
                      : 'text-slate-600 hover:text-[#0d3862]'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {user ? (
                  <>
                    <div className="border-t border-slate-100 pt-4">
                      {userLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block text-base font-bold text-slate-600 hover:text-[#0d3862] transition-colors duration-200 py-2"
                        >
                          {link.name}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left text-base font-bold text-red-600 hover:text-red-700 py-2"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <Link
                      to="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-base font-bold text-slate-600 hover:text-[#0d3862]"
                    >
                      Student Login
                    </Link>
                    <Link
                      to="/submit-event"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center bg-[#0d3862] text-white font-bold py-3 rounded-lg"
                    >
                      Post Competition
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )
          }
        </AnimatePresence >
      </motion.nav >
    </>
  );
};

export default Navbar;
