import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Building2, GraduationCap, School, Globe, Phone, BookOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student', // 'student' or 'organizer'
        // Student specific
        institution: '',
        department: '',
        year: '',
        // Organizer specific
        orgName: '',
        website: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { login, register, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we should default to signup based on state passed from other pages
    useState(() => {
        if (location.state?.mode === 'signup') {
            setIsLogin(false);
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        
        if (!isLogin) {
            if (!formData.name.trim()) {
                newErrors.name = 'Name is required';
            }

            if (formData.role === 'student') {
                if (!formData.institution.trim()) newErrors.institution = 'Institution is required';
            }

            if (formData.role === 'organizer') {
                if (!formData.orgName.trim()) newErrors.orgName = 'Organization Name is required';
                if (!formData.phone.trim()) newErrors.phone = 'Contact number is required';
            }
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!isLogin && formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            if (isLogin) {
                const res = await login(formData.email, formData.password);
                // Restrict Admin Login
                if (res.user.role === 'admin') {
                    await logout();
                    setErrors({ submit: 'Admin login restricted. Please use the Admin Portal.' });
                    setIsLoading(false);
                    return;
                }
            } else {
                const payload = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                };
                await register(payload);
            }
            // Navigate to dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            const message =
                err.response?.data?.message ||
                (err.response?.status === 401
                    ? 'Invalid email or password.'
                    : err.message) ||
                'Authentication failed. Please try again.';
            setErrors({ submit: message });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setErrors({});
        setFormData(prev => ({ ...prev, password: '' })); // Clear password on toggle
    };

    return (
        <div className="min-h-screen bg-navy-950 text-slate-300 font-body selection:bg-emerald-500/30">
            <Navbar />
            
            <div className="pt-32 pb-20 relative overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
                
                <div className="container relative z-10 px-4 mx-auto">
                    <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Left Side - Hero Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden lg:block space-y-8"
                        >
                            <h1 className="text-5xl font-black text-white leading-tight font-display">
                                {isLogin ? 'Welcome Back to' : 'Join the Future of'} <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                                    EventDekho
                                </span>
                            </h1>
                            <p className="text-lg text-slate-400 leading-relaxed max-w-md">
                                {isLogin 
                                    ? 'Continue your journey, track your competitions, and discover new opportunities tailored just for you.'
                                    : 'Create an account to unlock exclusive features, register for events, and build your professional portfolio.'
                                }
                            </p>
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-slate-300">
                                    <div className="w-10 h-10 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center text-emerald-400">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span>Access to exclusive verified events</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-300">
                                    <div className="w-10 h-10 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center text-emerald-400">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span>Track your applications in real-time</span>
                                </div>
                                <div className="flex items-center gap-4 text-slate-300">
                                    <div className="w-10 h-10 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center text-emerald-400">
                                        <CheckCircle size={20} />
                                    </div>
                                    <span>Connect with organizers and peers</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - Auth Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-navy-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden"
                        >
                            {/* Form Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-black text-white mb-2 font-display">
                                    {isLogin ? 'Sign In' : 'Create Account'}
                                </h2>
                                <p className="text-slate-400 text-sm">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
                                    <button 
                                        onClick={toggleMode}
                                        className="text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                                    >
                                        {isLogin ? 'Sign up' : 'Sign in'}
                                    </button>
                                </p>
                            </div>

                            {/* Error Alert */}
                            <AnimatePresence>
                                {errors.submit && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm"
                                    >
                                        <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>{errors.submit}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <AnimatePresence mode="popLayout">
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-5 overflow-hidden"
                                        >
                                            {/* Role Selection */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <button
                                                    type="button"
                                                    onClick={() => handleInputChange('role', 'student')}
                                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                                                        formData.role === 'student'
                                                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                                                            : 'bg-navy-950/50 border-white/5 text-slate-400 hover:border-white/10'
                                                    }`}
                                                >
                                                    <GraduationCap size={24} />
                                                    <span className="text-sm font-bold">Student</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleInputChange('role', 'organizer')}
                                                    className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                                                        formData.role === 'organizer'
                                                            ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                                                            : 'bg-navy-950/50 border-white/5 text-slate-400 hover:border-white/10'
                                                    }`}
                                                >
                                                    <Building2 size={24} />
                                                    <span className="text-sm font-bold">Organizer</span>
                                                </button>
                                            </div>

                                            {/* Name Input */}
                                            <div>
                                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                                    Full Name
                                                </label>
                                                <div className="relative group">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className={`w-full pl-12 pr-4 py-3 bg-navy-950/50 border rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                            errors.name
                                                                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                                                : 'border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/50'
                                                        }`}
                                                        placeholder="John Doe"
                                                    />
                                                </div>
                                                {errors.name && (
                                                    <p className="mt-2 text-xs text-red-400 flex items-center gap-1 ml-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        {errors.name}
                                                    </p>
                                                )}
                                            </div>

                                            {/* Student Specific Fields */}
                                            {formData.role === 'student' && (
                                                <div className="space-y-5">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                                            Institution / University
                                                        </label>
                                                        <div className="relative group">
                                                            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                                            <input
                                                                type="text"
                                                                value={formData.institution}
                                                                onChange={(e) => handleInputChange('institution', e.target.value)}
                                                                className={`w-full pl-12 pr-4 py-3 bg-navy-950/50 border rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                                    errors.institution
                                                                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                                                        : 'border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/50'
                                                                }`}
                                                                placeholder="University Name"
                                                            />
                                                        </div>
                                                        {errors.institution && (
                                                            <p className="mt-2 text-xs text-red-400 flex items-center gap-1 ml-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {errors.institution}
                                                            </p>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                                                Department
                                                            </label>
                                                            <div className="relative group">
                                                                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                                                <input
                                                                    type="text"
                                                                    value={formData.department}
                                                                    onChange={(e) => handleInputChange('department', e.target.value)}
                                                                    className="w-full pl-12 pr-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                                                    placeholder="CS, IT, etc."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                                                Year
                                                            </label>
                                                            <div className="relative group">
                                                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                                                <select
                                                                    value={formData.year}
                                                                    onChange={(e) => handleInputChange('year', e.target.value)}
                                                                    className="w-full pl-12 pr-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all appearance-none"
                                                                >
                                                                    <option value="">Year</option>
                                                                    <option value="1">1st Year</option>
                                                                    <option value="2">2nd Year</option>
                                                                    <option value="3">3rd Year</option>
                                                                    <option value="4">4th Year</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Organizer Specific Fields */}
                                            {formData.role === 'organizer' && (
                                                <div className="space-y-5">
                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                                            Organization Name
                                                        </label>
                                                        <div className="relative group">
                                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                                            <input
                                                                type="text"
                                                                value={formData.orgName}
                                                                onChange={(e) => handleInputChange('orgName', e.target.value)}
                                                                className={`w-full pl-12 pr-4 py-3 bg-navy-950/50 border rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                                    errors.orgName
                                                                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                                                        : 'border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/50'
                                                                }`}
                                                                placeholder="EventDekho Inc."
                                                            />
                                                        </div>
                                                        {errors.orgName && (
                                                            <p className="mt-2 text-xs text-red-400 flex items-center gap-1 ml-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {errors.orgName}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                                            Website (Optional)
                                                        </label>
                                                        <div className="relative group">
                                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                                            <input
                                                                type="url"
                                                                value={formData.website}
                                                                onChange={(e) => handleInputChange('website', e.target.value)}
                                                                className="w-full pl-12 pr-4 py-3 bg-navy-950/50 border border-white/10 rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                                                placeholder="https://example.com"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                                            Contact Number
                                                        </label>
                                                        <div className="relative group">
                                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                                            <input
                                                                type="tel"
                                                                value={formData.phone}
                                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                                className={`w-full pl-12 pr-4 py-3 bg-navy-950/50 border rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                                    errors.phone
                                                                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                                                        : 'border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/50'
                                                                }`}
                                                                placeholder="+91 98765 43210"
                                                            />
                                                        </div>
                                                        {errors.phone && (
                                                            <p className="mt-2 text-xs text-red-400 flex items-center gap-1 ml-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                {errors.phone}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Email Input */}
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">
                                        Email Address
                                    </label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-3 bg-navy-950/50 border rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                errors.email
                                                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                                    : 'border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/50'
                                            }`}
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-2 text-xs text-red-400 flex items-center gap-1 ml-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password Input */}
                                <div>
                                    <div className="flex justify-between items-center mb-2 ml-1">
                                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider">
                                            Password
                                        </label>
                                        {isLogin && (
                                            <Link to="/reset-password" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                                                Forgot password?
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className={`w-full pl-12 pr-4 py-3 bg-navy-950/50 border rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-1 transition-all ${
                                                errors.password
                                                    ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                                    : 'border-white/10 focus:border-emerald-500/50 focus:ring-emerald-500/50'
                                            }`}
                                            placeholder="••••••••"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="mt-2 text-xs text-red-400 flex items-center gap-1 ml-1">
                                            <AlertCircle className="w-3 h-3" />
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-emerald-500/30 transition-all mt-8"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {isLogin ? 'Sign In' : 'Create Account'}
                                            <ArrowRight size={20} />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Auth;
