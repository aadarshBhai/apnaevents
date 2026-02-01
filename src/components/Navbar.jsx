import { useState, useEffect } from 'react';
import { Menu, X, CheckCircle, ChevronRight, LogOut, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { title: 'Events', path: '/events' },
        { title: 'Organize', path: '/dashboard' },
    ];

    return (
        <>
            <nav className={`glass-nav fixed w-full top-0 left-0 transition-all duration-500 z-1000 ${isScrolled ? 'py-3 md:py-4 shadow-xl shadow-slate-200/50' : 'py-6 md:py-8'
                }`}>
                <div className="container flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                            className="bg-primary p-2 md:p-2.5 rounded-2xl shadow-lg shadow-blue-200"
                        >
                            <CheckCircle className="text-white w-5 h-5 md:w-6 md:h-6" strokeWidth={3} />
                        </motion.div>
                        <span className="text-2xl md:text-3xl font-black tracking-tighter text-text-main group-hover:text-primary transition-all duration-300">
                            Event<span className="text-primary font-black">Dekho</span>
                        </span>
                    </Link>

                    {/* Desktop Links - Always Visible for testing, responsive logic adjusted */}
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    className="pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary w-64 transition-all"
                                />
                            </div>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm font-bold uppercase tracking-widest hover:text-primary transition-all relative group ${location.pathname === link.path ? 'text-primary' : 'text-text-muted'
                                        }`}
                                >
                                    {link.title}
                                    <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-primary transform origin-left transition-transform duration-300 ${location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                                        }`}></span>
                                </Link>
                            ))}
                        </div>

                        {user ? (
                            <div className="flex items-center gap-4">
                                <Link to="/dashboard" className="btn-outline border-none hover:bg-slate-50 text-sm py-2 px-4 rounded-xl">
                                    Create an event
                                </Link>

                                <Link to="/profile" className="flex items-center gap-2 p-1.5 pr-4 bg-slate-50 rounded-full border border-slate-100 hover:border-primary/20 transition-all group">
                                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                                        <User size={16} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest text-text-main group-hover:text-primary transition-colors">{user.name.split(' ')[0]}</span>
                                </Link>
                                <button
                                    onClick={logout}
                                    className="p-2.5 text-text-muted hover:text-red-500 transition-colors"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="text-sm font-bold uppercase tracking-widest text-text-muted hover:text-primary transition-colors"
                                >
                                    Create an event
                                </button>
                                <button
                                    onClick={() => setAuthModalOpen(true)}
                                    className="btn-primary shadow-lg shadow-blue-200 hover:shadow-blue-300"
                                >
                                    Sign up
                                </button>
                            </div>
                        )}
                    </div >
                </div >

                <div className="hidden items-center gap-3">
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-text-main bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </motion.button>
                </div>

                {/* Mobile Menu */}
                < AnimatePresence >
                    {mobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setMobileMenuOpen(false)}
                                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm md:hidden z-[-1]"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="md:hidden fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white shadow-2xl z-[1001] p-8 flex flex-col pt-24"
                            >
                                <div className="flex flex-col gap-2">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Menu</span>
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className="flex justify-between items-center py-4 text-xl font-black text-text-main border-b border-slate-50 hover:text-primary transition-colors group"
                                        >
                                            {link.title}
                                            <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-all" />
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    {user ? (
                                        <button
                                            onClick={logout}
                                            className="btn-outline w-full py-5 text-lg rounded-2xl flex items-center justify-center gap-2"
                                        >
                                            <LogOut size={20} /> Sign Out
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setAuthModalOpen(true);
                                            }}
                                            className="btn-primary w-full py-5 text-lg rounded-2xl shadow-xl shadow-blue-100"
                                        >
                                            Sign up
                                        </button>
                                    )}
                                    <p className="text-center mt-6 text-xs font-bold text-slate-400">© 2026 EventDekho Platform</p>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence >
            </nav >

            <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
        </>
    );
};

export default Navbar;
