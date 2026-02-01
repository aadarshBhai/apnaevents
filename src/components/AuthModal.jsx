import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, ShieldCheck, ChevronRight, Eye, EyeOff, AlertCircle, CheckCircle2, Phone, Calendar, MapPin, Building } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [roleSelected, setRoleSelected] = useState(false);
    const [isForgotFlow, setIsForgotFlow] = useState(false);
    const [signupStep, setSignupStep] = useState(1);
    const [resetInfo, setResetInfo] = useState('');
    const [resetSuccess, setResetSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        gender: '',
        school: '',
        grade: '',
        role: 'student'
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [touched, setTouched] = useState({});
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, register, forgotPassword } = useAuth();

    const handleRoleSelect = (role) => {
        setFormData({ ...formData, role });
        setRoleSelected(true);
        setSignupStep(1);
    };

    const resetFlow = () => {
        setRoleSelected(false);
        setIsLogin(true);
        setSignupStep(1);
    };

    const resetForgotFlow = () => {
        setIsForgotFlow(false);
        setResetInfo('');
        setResetSuccess('');
        setError('');
        setLoading(false);
        setTouched({});
        setErrors({});
    };

    const handleForgotPassword = async () => {
        setError('');
        setResetSuccess('');
        setResetInfo('');
        setLoading(true);
        try {
            const email = formData.email;
            if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setErrors((prev) => ({ ...prev, email: 'Please enter a valid email address' }));
                setTouched((prev) => ({ ...prev, email: true }));
                return;
            }

            const res = await forgotPassword(email);
            setResetInfo(res?.message || 'If that email exists, a password reset link has been sent.');
            setResetSuccess('Check your email for a password reset link.');
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to start password reset');
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!isLogin) {
            const displayName = formData.role === 'organizer'
                ? (formData.name || '').trim()
                : `${(formData.firstName || '').trim()} ${(formData.lastName || '').trim()}`.trim();

            if (formData.role === 'organizer') {
                if (!displayName) {
                    newErrors.name = 'Organization name is required';
                } else if (displayName.length < 2) {
                    newErrors.name = 'Organization name must be at least 2 characters';
                }
            } else {
                if (!formData.firstName.trim()) {
                    newErrors.firstName = 'First name is required';
                }
                if (!formData.lastName.trim()) {
                    newErrors.lastName = 'Last name is required';
                }
                if (!displayName) {
                    newErrors.name = 'Name is required';
                } else if (displayName.length < 2) {
                    newErrors.name = 'Name must be at least 2 characters';
                }
            }

            if (!formData.phone.trim()) {
                newErrors.phone = 'Contact number is required';
            }

            if (!formData.gender) {
                newErrors.gender = 'Please select your gender';
            }
            
            if (formData.role === 'student') {
                if (!formData.school.trim()) {
                    newErrors.school = 'School name is required';
                }
                if (!formData.grade) {
                    newErrors.grade = 'Please select your grade';
                }
            }
            
            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, and number';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field, value) => {
        if (field === 'firstName' || field === 'lastName') {
            const next = { ...formData, [field]: value };
            next.name = `${(next.firstName || '').trim()} ${(next.lastName || '').trim()}`.trim();
            setFormData(next);
        } else {
            setFormData({ ...formData, [field]: value });
        }
        if (errors[field]) {
            setErrors({ ...errors, [field]: '' });
        }
    };

    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const validateSignupStep = (step) => {
        const newErrors = {};

        if (step === 1) {
            if (formData.role === 'organizer') {
                if (!(formData.name || '').trim()) newErrors.name = 'Organization name is required';
            } else {
                if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
                if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
            }

            if (!formData.phone.trim()) newErrors.phone = 'Contact number is required';
            if (!formData.gender) newErrors.gender = 'Please select your gender';
        }

        if (step === 2) {
            if (formData.role === 'student') {
                if (!formData.school.trim()) newErrors.school = 'School name is required';
                if (!formData.grade) newErrors.grade = 'Please select your grade';
            }

            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
                newErrors.password = 'Password must contain uppercase, lowercase, and number';
            }

            if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors((prev) => ({ ...prev, ...newErrors }));
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isLogin) {
            if (signupStep === 1) {
                const ok = validateSignupStep(1);
                setTouched((prev) => ({
                    ...prev,
                    firstName: true,
                    lastName: true,
                    name: true,
                    phone: true,
                    gender: true,
                    school: true,
                    grade: true
                }));
                if (!ok) return;
                setSignupStep(2);
                return;
            }

            if (!validateSignupStep(2)) {
                setTouched((prev) => ({ ...prev, email: true, password: true, confirmPassword: true }));
                return;
            }
        } else {
            if (!validateForm()) {
                return;
            }
        }
        
        setError('');
        setLoading(true);
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                const payload = {
                    name: (formData.role === 'organizer'
                        ? (formData.name || '').trim()
                        : `${(formData.firstName || '').trim()} ${(formData.lastName || '').trim()}`.trim()),
                    email: (formData.email || '').trim(),
                    password: formData.password,
                    role: formData.role,
                };
                await register(payload);
            }
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-white w-[92vw] max-w-[520px] max-h-[92vh] rounded-[2.5rem] relative shadow-2xl shadow-blue-900/20 overflow-hidden z-10"
            >
                <div className="h-1.5 bg-gradient-to-r from-primary to-blue-600" />
                {/* Decorative Background Elements */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />

                <div className="p-6 md:p-8 relative overflow-y-auto max-h-[calc(92vh-0.375rem)]">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            {/* Dynamic Header */}
                            {!isLogin && !roleSelected ? (
                                <>
                                    <h2 className="text-3xl font-black tracking-tight text-slate-800">Select Role</h2>
                                    <p className="text-text-muted font-bold mt-1 text-sm">How will you use EventDekho?</p>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-1">
                                        {isLogin ? 'Hello Again!' : 'Registration Form'}
                                    </h2>
                                    <p className="text-text-muted font-bold text-sm">
                                        {isLogin
                                            ? 'Welcome back, you\'ve been missed!'
                                            : `Register as ${formData.role === 'student' ? 'Student' : 'Organizer'}`}
                                    </p>
                                </>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-slate-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all duration-300 text-text-muted group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium flex items-start gap-3"
                        >
                            <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                            <div>
                                <div className="font-semibold">Authentication Error</div>
                                <div className="text-red-600 mt-1">{error}</div>
                            </div>
                        </motion.div>
                    )}

                    {/* VIEW 1: ROLE SELECTION */}
                    {!isForgotFlow && !isLogin && !roleSelected ? (
                        <div className="space-y-4">
                            <button
                                onClick={() => handleRoleSelect('student')}
                                className="w-full p-1 rounded-3xl group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="bg-white p-6 text-left border-2 border-slate-100 rounded-[1.3rem] group-hover:border-primary/30 group-hover:shadow-xl group-hover:shadow-blue-500/10 transition-all h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />

                                    <div className="relative z-10 flex items-center gap-5">
                                        <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-white border border-blue-100 text-primary rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <User size={28} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-800 group-hover:text-primary transition-colors">I am a Student</h3>
                                            <p className="text-xs font-bold text-slate-400 mt-1">Participate, track progress & build passport</p>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <button
                                onClick={() => handleRoleSelect('organizer')}
                                className="w-full p-1 rounded-3xl group transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <div className="bg-white p-6 text-left border-2 border-slate-100 rounded-[1.3rem] group-hover:border-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/10 transition-all h-full relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500" />

                                    <div className="relative z-10 flex items-center gap-5">
                                        <div className="w-14 h-14 bg-gradient-to-br from-purple-50 to-white border border-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                                            <ShieldCheck size={28} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-slate-800 group-hover:text-purple-600 transition-colors">I am an Organizer</h3>
                                            <p className="text-xs font-bold text-slate-400 mt-1">Host competitions, manage registrations</p>
                                        </div>
                                    </div>
                                </div>
                            </button>

                            <div className="mt-8 pt-6 border-t border-slate-100/50 text-center">
                                <p className="text-sm font-bold text-slate-400">
                                    Already have an account?
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="ml-2 text-primary hover:text-blue-700 hover:underline transition-colors"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </div>
                    ) : isForgotFlow ? (
                        /* VIEW 2: FORGOT PASSWORD (Email link) */
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-800">Reset Password</h3>
                                    <p className="text-sm font-medium text-slate-500 mt-1">We will email you a secure reset link.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={resetForgotFlow}
                                    className="text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>

                            {resetSuccess && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-sm font-medium"
                                >
                                    {resetSuccess}
                                </motion.div>
                            )}

                            {resetInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-4 bg-blue-50 border border-blue-200 text-blue-800 rounded-2xl text-sm font-medium"
                                >
                                    {resetInfo}
                                </motion.div>
                            )}

                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-3 flex items-center gap-2">
                                        <Mail size={14} />
                                        Email Address
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="email"
                                            placeholder="name@example.com"
                                            required
                                            className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                                errors.email && touched.email
                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                            }`}
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            onBlur={() => handleBlur('email')}
                                        />
                                        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
                                            errors.email && touched.email ? 'text-red-500' : 'text-slate-400 group-focus-within:text-primary'
                                        }`}>
                                            <Mail size={20} />
                                        </div>
                                    </div>
                                    {errors.email && touched.email && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                        >
                                            <AlertCircle size={12} />
                                            {errors.email}
                                        </motion.p>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    disabled={loading}
                                    onClick={handleForgotPassword}
                                    className="w-full py-4 text-base font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-primary to-blue-600 text-white"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Reset Link <ChevronRight size={18} />
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        resetForgotFlow();
                                        setIsLogin(true);
                                    }}
                                    className="w-full text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    Back to Sign In
                                </button>
                            </div>
                        </div>
                    ) : (
                        /* VIEW 3: FORM (Login or Signup Form) */
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${signupStep === 1 ? 'bg-primary text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500'}`}>1</div>
                                        <div className={`text-[11px] font-black uppercase tracking-widest ${signupStep === 1 ? 'text-slate-800' : 'text-slate-400'}`}>Profile</div>
                                    </div>
                                    <div className="h-px flex-1 mx-4 bg-slate-100" />
                                    <div className="flex items-center gap-2">
                                        <div className={`w-8 h-8 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${signupStep === 2 ? 'bg-primary text-white shadow-lg shadow-blue-200' : 'bg-slate-100 text-slate-500'}`}>2</div>
                                        <div className={`text-[11px] font-black uppercase tracking-widest ${signupStep === 2 ? 'text-slate-800' : 'text-slate-400'}`}>Account</div>
                                    </div>
                                </div>
                            )}

                            {!isLogin && signupStep === 1 && (
                                <div className="space-y-4">
                                    {formData.role === 'student' ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                                    First Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="First name"
                                                    required
                                                    className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                                        errors.firstName && touched.firstName
                                                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                            : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                    }`}
                                                    value={formData.firstName}
                                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                    onBlur={() => handleBlur('firstName')}
                                                />
                                                {errors.firstName && touched.firstName && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                                    >
                                                        <AlertCircle size={12} />
                                                        {errors.firstName}
                                                    </motion.p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                                    Last Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Last name"
                                                    required
                                                    className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                                        errors.lastName && touched.lastName
                                                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                            : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                    }`}
                                                    value={formData.lastName}
                                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                    onBlur={() => handleBlur('lastName')}
                                                />
                                                {errors.lastName && touched.lastName && (
                                                    <motion.p
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                                    >
                                                        <AlertCircle size={12} />
                                                        {errors.lastName}
                                                    </motion.p>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="space-y-2">
                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                                Organization Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="e.g. IIT Bombay"
                                                required
                                                className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                                    errors.name && touched.name
                                                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                        : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                }`}
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                onBlur={() => handleBlur('name')}
                                            />
                                            {errors.name && touched.name && (
                                                <motion.p
                                                    initial={{ opacity: 0, y: -5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                                >
                                                    <AlertCircle size={12} />
                                                    {errors.name}
                                                </motion.p>
                                            )}
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                            Contact <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            placeholder="e.g. +91 98765 43210"
                                            required
                                            className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                                errors.phone && touched.phone
                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                            }`}
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            onBlur={() => handleBlur('phone')}
                                        />
                                        {errors.phone && touched.phone && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.phone}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                            Gender <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                className={`w-full appearance-none py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 ${
                                                    errors.gender && touched.gender
                                                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                        : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                }`}
                                                value={formData.gender}
                                                onChange={(e) => handleInputChange('gender', e.target.value)}
                                                onBlur={() => handleBlur('gender')}
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <ChevronRight size={14} className="rotate-90" />
                                            </div>
                                        </div>
                                        {errors.gender && touched.gender && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.gender}
                                            </motion.p>
                                        )}
                                    </div>

                                </div>
                            )}

                            {!isLogin && signupStep === 2 && formData.role === 'student' && (
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                            School Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Delhi Public School"
                                            required
                                            className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                                errors.school && touched.school
                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                            }`}
                                            value={formData.school}
                                            onChange={(e) => handleInputChange('school', e.target.value)}
                                            onBlur={() => handleBlur('school')}
                                        />
                                        {errors.school && touched.school && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.school}
                                            </motion.p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                            Grade <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <select
                                                className={`w-full appearance-none py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 ${
                                                    errors.grade && touched.grade
                                                        ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                        : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                }`}
                                                value={formData.grade}
                                                onChange={(e) => handleInputChange('grade', e.target.value)}
                                                onBlur={() => handleBlur('grade')}
                                            >
                                                <option value="">Select Grade</option>
                                                <option value="Class 9">Class 9</option>
                                                <option value="Class 10">Class 10</option>
                                                <option value="Class 11">Class 11</option>
                                                <option value="Class 12">Class 12</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                <ChevronRight size={14} className="rotate-90" />
                                            </div>
                                        </div>
                                        {errors.grade && touched.grade && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                            >
                                                <AlertCircle size={12} />
                                                {errors.grade}
                                            </motion.p>
                                        )}
                                    </div>
                                </div>
                            )}

                            {(isLogin || signupStep === 2) && (
                            <div className="space-y-2">
                                <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    required
                                    className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                        errors.email && touched.email
                                            ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                            : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                    }`}
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    onBlur={() => handleBlur('email')}
                                />
                                {errors.email && touched.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                    >
                                        <AlertCircle size={12} />
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>
                            )}

                            {(isLogin || signupStep === 2) && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                        Password <span className="text-red-500">*</span>
                                    </label>
                                    {isLogin && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsForgotFlow(true);
                                                setResetSuccess('');
                                                setResetInfo('');
                                                setError('');
                                            }}
                                            className="text-[11px] font-medium text-primary hover:text-blue-700 transition-colors"
                                        >
                                            Forgot Password?
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Min. 8 characters"
                                        required
                                        className={`w-full py-4 pl-6 pr-12 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                            errors.password && touched.password
                                                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                        }`}
                                        value={formData.password}
                                        onChange={(e) => handleInputChange('password', e.target.value)}
                                        onBlur={() => handleBlur('password')}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                                {errors.password && touched.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                    >
                                        <AlertCircle size={12} />
                                        {errors.password}
                                    </motion.p>
                                )}
                                {!isLogin && (
                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                formData.password.length >= 8 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {formData.password.length >= 8 && <CheckCircle2 size={12} />}
                                            </div>
                                            <span className={formData.password.length >= 8 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                At least 8 characters
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                /(?=.*[a-z])/.test(formData.password) ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {/(?=.*[a-z])/.test(formData.password) && <CheckCircle2 size={12} />}
                                            </div>
                                            <span className={/(?=.*[a-z])/.test(formData.password) ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                One lowercase letter
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                /(?=.*[A-Z])/.test(formData.password) ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {/(?=.*[A-Z])/.test(formData.password) && <CheckCircle2 size={12} />}
                                            </div>
                                            <span className={/(?=.*[A-Z])/.test(formData.password) ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                One uppercase letter
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                                /(?=.*\d)/.test(formData.password) ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                            }`}>
                                                {/(?=.*\d)/.test(formData.password) && <CheckCircle2 size={12} />}
                                            </div>
                                            <span className={/(?=.*\d)/.test(formData.password) ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                                One number
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            )}

                            {!isLogin && signupStep === 2 && (
                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-2">
                                        Re-type Password <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Re-enter your password"
                                            required
                                            className={`w-full py-4 pl-6 pr-12 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${
                                                errors.confirmPassword && touched.confirmPassword
                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                            }`}
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            onBlur={() => handleBlur('confirmPassword')}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && touched.confirmPassword && (
                                        <motion.p
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-xs text-red-600 font-medium pl-2 flex items-center gap-1"
                                        >
                                            <AlertCircle size={12} />
                                            {errors.confirmPassword}
                                        </motion.p>
                                    )}
                                </div>
                            )}

                            {!isLogin && signupStep === 1 && (
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const ok = validateSignupStep(1);
                                            setTouched((prev) => ({
                                                ...prev,
                                                firstName: true,
                                                lastName: true,
                                                name: true,
                                                phone: true,
                                                gender: true,
                                            }));
                                            if (!ok) return;
                                            setSignupStep(2);
                                        }}
                                        className={`flex-1 py-4 text-base font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                                            formData.role === 'admin' 
                                                ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200' 
                                                : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-blue-500/40'
                                        }`}
                                    >
                                        Continue <ChevronRight size={18} />
                                    </button>
                                </div>
                            )}

                            {!isLogin && signupStep === 2 && (
                                <div className="flex gap-3 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setSignupStep(1)}
                                        className="flex-1 py-4 rounded-2xl font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className={`flex-[2] py-4 text-base font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                                            formData.role === 'admin' 
                                                ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200' 
                                                : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-blue-500/40'
                                        }`}
                                    >
                                        {loading ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Creating Account...
                                            </>
                                        ) : (
                                            <>
                                                Create Account <ChevronRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}

                            {isLogin && (
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className={`w-full py-4 text-base font-semibold rounded-2xl shadow-xl mt-6 flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                                        formData.role === 'admin' 
                                            ? 'bg-slate-900 text-white hover:bg-black shadow-slate-200' 
                                            : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:shadow-blue-500/40'
                                    }`}
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Signing In...
                                        </>
                                    ) : (
                                        <>
                                            Sign In <ChevronRight size={18} />
                                        </>
                                    )}
                                </button>
                            )}

                            <div className="mt-8 pt-4 border-t border-slate-100/50 text-center">
                                <p className="text-sm font-bold text-slate-400">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (isLogin) {
                                                setIsLogin(false);
                                                setRoleSelected(false);
                                            } else {
                                                setIsLogin(true);
                                            }
                                        }}
                                        className="ml-2 text-primary hover:text-blue-700 hover:underline transition-colors"
                                    >
                                        {isLogin ? 'Join Now' : 'Sign In'}
                                    </button>
                                </p>
                                {!isLogin && (
                                    <button
                                        type="button"
                                        onClick={() => setRoleSelected(false)}
                                        className="text-xs font-bold text-slate-400 mt-4 hover:text-text-main flex items-center gap-1 mx-auto transition-colors"
                                    >
                                        <ChevronRight size={12} className="rotate-180" /> Change Role
                                    </button>
                                )}
                            </div>
                        </form>
                    )}

                    <div className="mt-8 flex items-center justify-center gap-2 opacity-40 hover:opacity-100 transition-opacity">
                        <ShieldCheck size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Secure 256-bit encryption</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AuthModal;
