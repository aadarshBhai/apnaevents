import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Building2, GraduationCap, School, Globe, Phone, BookOpen, ShieldCheck } from 'lucide-react';
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
        institution: '',
        department: '',
        year: '',
        orgName: '',
        website: '',
        phone: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { login, register, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if we should default to signup
    useState(() => {
        if (location.state?.mode === 'signup') {
            setIsLogin(false);
        }
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!isLogin) {
            if (!formData.name.trim()) newErrors.name = 'Full identity name is required';
            if (formData.role === 'student' && !formData.institution.trim()) newErrors.institution = 'Institutional affiliation is required';
            if (formData.role === 'organizer') {
                if (!formData.orgName.trim()) newErrors.orgName = 'Organization title is required';
                if (!formData.phone.trim()) newErrors.phone = 'Contact protocol is required';
            }
        }
        if (!formData.email.trim()) newErrors.email = 'Academic email is required';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email syntax';
        if (!formData.password) newErrors.password = 'Credential password is required';
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
                if (res.user.role === 'admin') {
                    await logout();
                    setErrors({ submit: 'Administrative access restricted. Use secure portal.' });
                    setIsLoading(false);
                    return;
                }
            } else {
                await register({ ...formData });
            }
            navigate('/dashboard');
        } catch (err) {
            setErrors({ submit: err.response?.data?.message || 'Authentication protocol failed.' });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            <Navbar />

            <div className="pt-40 pb-24 relative overflow-hidden min-h-screen flex items-center">
                {/* Academic Decoration */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container relative z-10 px-4 mx-auto">
                    <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Side Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden lg:block space-y-10"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-[#0d3862] text-[10px] font-bold uppercase tracking-[0.2em]">
                                <ShieldCheck size={14} />
                                Secure Academic Gateway
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#0d3862] leading-tight">
                                {isLogin ? 'Access Your' : 'Begin Your'} <br />
                                <span className="text-[#911116] italic">Academic Merit</span>
                            </h1>
                            <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                                {isLogin
                                    ? 'Re-enter the premier network for students to consolidate their academic standing and explore verified opportunities.'
                                    : 'Join the official pipeline for national excellence. Build a verified digital portfolio recognized by top global institutions.'
                                }
                            </p>

                            <div className="space-y-5">
                                {[
                                    'Access to verified high-value merit contests',
                                    'Digital academic portfolio & achievement tracking',
                                    'Direct connection to prestigious institutional hosts'
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-4 text-slate-700 font-medium">
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#911116] shadow-sm">
                                            <CheckCircle size={18} />
                                        </div>
                                        <span>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Auth Form Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] relative"
                        >
                            <div className="mb-10 text-center">
                                <h2 className="text-2xl font-serif font-bold text-[#0d3862] mb-3">
                                    {isLogin ? 'Scholastic Sign In' : 'Candidate Registration'}
                                </h2>
                                <p className="text-slate-500 text-sm font-medium">
                                    {isLogin ? "Candidate not registered?" : "Already a member?"} {' '}
                                    <button
                                        onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                                        className="text-[#911116] font-bold hover:underline transition-all"
                                    >
                                        {isLogin ? 'Register Manifest' : 'Secure Entry'}
                                    </button>
                                </p>
                            </div>

                            {errors.submit && (
                                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-[#911116] text-xs font-bold uppercase tracking-wider">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span>{errors.submit}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <AnimatePresence mode="popLayout">
                                    {!isLogin && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-6 overflow-hidden"
                                        >
                                            {/* Role Selection */}
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { id: 'student', label: 'Scholastic Candidate', icon: GraduationCap },
                                                    { id: 'organizer', label: 'Institutional Host', icon: Building2 }
                                                ].map(role => (
                                                    <button
                                                        key={role.id}
                                                        type="button"
                                                        onClick={() => handleInputChange('role', role.id)}
                                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${formData.role === role.id
                                                                ? 'bg-blue-50 border-[#0d3862] text-[#0d3862]'
                                                                : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                                            }`}
                                                    >
                                                        <role.icon size={22} />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{role.label}</span>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Legal Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0d3862] font-semibold placeholder:text-slate-300 focus:border-[#fcb900] outline-none transition-all shadow-inner"
                                                        placeholder="e.g. Aadarsh Patel"
                                                    />
                                                </div>
                                            </div>

                                            {formData.role === 'student' ? (
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Academic Institution</label>
                                                        <div className="relative">
                                                            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                            <input
                                                                type="text"
                                                                value={formData.institution}
                                                                onChange={(e) => handleInputChange('institution', e.target.value)}
                                                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0d3862] font-semibold placeholder:text-slate-300 focus:border-[#fcb900] outline-none transition-all shadow-inner"
                                                                placeholder="Current School or University"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Organization Title</label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                                        <input
                                                            type="text"
                                                            value={formData.orgName}
                                                            onChange={(e) => handleInputChange('orgName', e.target.value)}
                                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0d3862] font-semibold placeholder:text-slate-300 focus:border-[#fcb900] outline-none transition-all shadow-inner"
                                                            placeholder="Official Organization Name"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Common Fields */}
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Professional Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0d3862] font-semibold placeholder:text-slate-300 focus:border-[#fcb900] outline-none transition-all shadow-inner"
                                            placeholder="academic@institution.edu"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2 ml-1">
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secret Credential</label>
                                        {isLogin && (
                                            <Link to="/reset-password" name="forgot-password" id="forgot-password" className="text-[10px] font-bold text-[#911116] hover:underline uppercase tracking-widest">
                                                Reset Protocol
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-[#0d3862] font-semibold placeholder:text-slate-300 focus:border-[#fcb900] outline-none transition-all shadow-inner"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full py-4 bg-[#0d3862] text-white rounded-xl font-bold uppercase tracking-[0.2em] shadow-lg shadow-blue-900/10 flex items-center justify-center gap-3 disabled:opacity-50 transition-all mt-10 text-xs"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <>
                                            {isLogin ? 'Establish Connection' : 'Register Manifest'}
                                            <ArrowRight size={18} />
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
