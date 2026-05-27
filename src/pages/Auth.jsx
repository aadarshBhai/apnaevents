import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, CheckCircle, AlertCircle, Building2, GraduationCap, School, Globe, Phone, BookOpen, ShieldCheck, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
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
        <div className="min-h-screen bg-[#f8f9fa] text-[#212529] font-sans">
            <CareerGuidanceNavbar />

            <div className="pt-40 pb-24 relative overflow-hidden min-h-screen flex items-center">
                {/* Academic Decoration - Brand Identity */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#721c24]/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ced4da]/10 rounded-full blur-[120px] pointer-events-none" />

                <div className="container relative z-10 px-4 mx-auto">
                    <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                        {/* Left Side Content - Brand Identity */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden lg:block space-y-10"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl text-[#721c24] text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                                <ShieldCheck size={14} />
                                Secure Academic Gateway
                            </div>
                            <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#212529] leading-tight">
                                {isLogin ? 'Access Your' : 'Begin Your'} <br />
                                <span className="text-[#721c24] italic">Academic Merit</span>
                            </h1>
                            <p className="text-lg text-[#495057] leading-relaxed max-w-md font-sans">
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
                                    <div key={i} className="flex items-center gap-4 text-[#495057] font-semibold">
                                        <div className="w-8 h-8 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-[#721c24] shadow-sm">
                                            <CheckCircle size={18} />
                                        </div>
                                        <span className="font-sans">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Auth Form Card - Brand Identity */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-gray-100 rounded-3xl p-8 md:p-12 shadow-sm relative"
                        >
                            <div className="mb-10 text-center">
                                <h2 className="text-2xl font-serif font-bold text-[#212529] mb-3">
                                    {isLogin ? 'Scholastic Sign In' : 'Candidate Registration'}
                                </h2>
                                <p className="text-[#495057] text-sm font-semibold font-sans">
                                    {isLogin ? "Candidate not registered?" : "Already a member?"} {' '}
                                    <button
                                        onClick={() => { setIsLogin(!isLogin); setErrors({}); }}
                                        className="text-[#721c24] font-bold hover:underline transition-all"
                                    >
                                        {isLogin ? 'Register Manifest' : 'Secure Entry'}
                                    </button>
                                </p>
                            </div>

                            {errors.submit && (
                                <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-[#721c24] text-xs font-bold uppercase tracking-wider">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    <span className="font-sans">{errors.submit}</span>
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
                                            {/* Role Selection - Brand Identity */}
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
                                                                                ? 'bg-[#f8f9fa] border-[#721c24] text-[#721c24]'
                                                                                : 'bg-white border-gray-100 text-[#495057] hover:border-gray-200'
                                                                            }`}
                                                    >
                                                        <role.icon size={22} />
                                                        <span className="text-[10px] font-bold uppercase tracking-widest font-sans">{role.label}</span>
                                                    </button>
                                                ))}
                                            </div>

                                            {/* Full Name - Brand Identity */}
                                            <div>
                                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Full Legal Name</label>
                                                <div className="relative">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => handleInputChange('name', e.target.value)}
                                                        className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] outline-none transition-all shadow-inner font-sans"
                                                        placeholder="e.g. Aadarsh Patel"
                                                    />
                                                </div>
                                            </div>

                                            {formData.role === 'student' ? (
                                                <div className="space-y-6">
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Academic Institution</label>
                                                        <div className="relative">
                                                            <School className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                                            <input
                                                                type="text"
                                                                value={formData.institution}
                                                                onChange={(e) => handleInputChange('institution', e.target.value)}
                                                                className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] outline-none transition-all shadow-inner font-sans"
                                                                placeholder="Current School or University"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Organization Title</label>
                                                    <div className="relative">
                                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                                        <input
                                                            type="text"
                                                            value={formData.orgName}
                                                            onChange={(e) => handleInputChange('orgName', e.target.value)}
                                                            className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] outline-none transition-all shadow-inner font-sans"
                                                            placeholder="Official Organization Name"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Common Fields - Brand Identity */}
                                <div>
                                    <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Professional Email</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] outline-none transition-all shadow-inner font-sans"
                                            placeholder="academic@institution.edu"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-2 ml-1">
                                        <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest font-sans">Secret Credential</label>
                                        {isLogin && (
                                            <Link to="/reset-password" name="forgot-password" id="forgot-password" className="text-[10px] font-bold text-[#721c24] hover:underline uppercase tracking-widest font-sans">
                                                Reset Protocol
                                            </Link>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                        <input
                                            type="password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] outline-none transition-all shadow-inner font-sans"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="w-full py-4 bg-[#721c24] text-white rounded-xl font-bold uppercase tracking-[0.2em] shadow-sm flex items-center justify-center gap-3 disabled:opacity-50 transition-all mt-10 text-xs font-sans"
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
