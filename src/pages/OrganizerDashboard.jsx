import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Users,
    BarChart3,
    MessageSquare,
    Settings,
    Calendar,
    CheckCircle2,
    Clock,
    ArrowUpRight,
    Search,
    MoreVertical,
    ChevronRight,
    Filter,
    Zap,
    Lock,
    X,
    ArrowLeft,
    AlertCircle,
    Eye,
    EyeOff,
    Upload,
    MapPin,
    Tag,
    FileText,
    Globe,
    DollarSign,
    Trophy,
    AlertTriangle,
    CheckCircle,
    Mail,
    Phone
} from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Overview');
    const [broadcastMsg, setBroadcastMsg] = useState('');

    useEffect(() => {
        if (!loading && (!user || (user.role !== 'organizer' && user.role !== 'admin'))) {
            // navigate('/');
        }
    }, [user, loading, navigate]);

    if (loading || !user) return null;

    // Check if organizer is approved
    if (user.role === 'organizer' && !user.isApproved) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center font-sans">
                <div className="max-w-md w-full mx-4">
                    <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 text-center shadow-2xl shadow-slate-200/50">
                        <div className="w-20 h-20 bg-red-50 text-[#911116] rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-100">
                            <AlertTriangle size={40} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-[#0d3862] mb-4">Credentials Pending</h2>
                        <p className="text-slate-500 mb-8 font-medium italic">
                            Your institutional organizer status is currently under scholarly review. Please allow up to 12 hours for official verification.
                        </p>
                        <div className="bg-white border border-slate-100 rounded-2xl p-6 mb-8 text-left">
                            <p className="text-xs font-bold text-[#0d3862] uppercase tracking-widest mb-2">Protocol Status:</p>
                            <p className="text-sm text-slate-600 font-medium">
                                <strong>Vetting Process:</strong> An officer will authenticate your profile and authorize your program enrollment capacity shortly.
                            </p>
                        </div>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-[#0d3862] hover:bg-[#0d3862]/90 text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] transition-all shadow-lg"
                        >
                            Return to Portal
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const stats = [
        { label: 'Participants', value: '1,284', change: '+12%', icon: <Users size={28} />, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50' },
        { label: 'Event NPS', value: '62', change: '+5', icon: <BarChart3 size={28} />, color: 'from-emerald-500 to-emerald-600', bgLight: 'bg-emerald-50' },
        { label: 'Retention', value: '28%', change: '+3%', icon: <ArrowUpRight size={28} />, color: 'from-violet-500 to-violet-600', bgLight: 'bg-violet-50' },
        { label: 'Active Events', value: '4', change: '0', icon: <Calendar size={28} />, color: 'from-amber-500 to-amber-600', bgLight: 'bg-amber-50' },
    ];

    const recentEvents = [
        { name: 'National Science Olympiad', status: 'Live', applicants: 450, date: 'Mar 10', trend: 'up' },
        { name: 'Robotics Workshop', status: 'Draft', applicants: 0, date: 'Apr 02', trend: 'neutral' },
        { name: 'Inter-School Debate', status: 'Vetting', applicants: 120, date: 'Feb 28', trend: 'up' },
    ];

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [createStep, setCreateStep] = useState(1);
    const [formErrors, setFormErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [eventData, setEventData] = useState({
        title: '',
        category: 'Academic',
        date: '',
        location: '',
        mode: 'Offline',
        description: '',
        price: 'Free',
        maxParticipants: '',
        registrationDeadline: '',
        prizes: '',
        rules: '',
        contactEmail: '',
        contactPhone: '',
        website: '',
        tags: []
    });

    const validateEventForm = () => {
        const newErrors = {};

        if (!eventData.title.trim()) {
            newErrors.title = 'Event title is required';
        } else if (eventData.title.length < 5) {
            newErrors.title = 'Title must be at least 5 characters';
        }

        if (!eventData.date) {
            newErrors.date = 'Event date is required';
        }

        if (!eventData.location.trim()) {
            newErrors.location = 'Location is required';
        }

        if (!eventData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (eventData.description.length < 50) {
            newErrors.description = 'Description must be at least 50 characters';
        }

        if (!eventData.contactEmail.trim()) {
            newErrors.contactEmail = 'Contact email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(eventData.contactEmail)) {
            newErrors.contactEmail = 'Please enter a valid email address';
        }

        if (eventData.contactPhone && !/^[+]?[\d\s\-\(\)]+$/.test(eventData.contactPhone)) {
            newErrors.contactPhone = 'Please enter a valid phone number';
        }

        if (eventData.website && !/^https?:\/\//.test(eventData.website)) {
            newErrors.website = 'Please enter a valid URL starting with http:// or https://';
        }

        setFormErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleEventInputChange = (field, value) => {
        setEventData({ ...eventData, [field]: value });
        if (formErrors[field]) {
            setFormErrors({ ...formErrors, [field]: '' });
        }
    };

    const handleEventBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    const handleCreateEvent = () => {
        setFormErrors({});
        setTouched({});
        setShowCreateModal(true);
    };

    const submitEvent = (e) => {
        e.preventDefault();

        if (!validateEventForm()) {
            return;
        }

        alert(`Event "${eventData.title}" has been submitted for vetting. It will appear on the platform within 12 hours.`);
        setShowCreateModal(false);
        setCreateStep(1);
        setEventData({
            title: '',
            category: 'Academic',
            date: '',
            location: '',
            mode: 'Offline',
            description: '',
            price: 'Free',
            maxParticipants: '',
            registrationDeadline: '',
            prizes: '',
            rules: '',
            contactEmail: '',
            contactPhone: '',
            website: '',
            tags: []
        });
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-red-50">
            <Navbar />

            <div className="pt-24 md:pt-32 pb-20">
                <div className="container">

                    {/* Header */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <div className="bg-slate-50 border border-slate-100 rounded-[3rem] p-10 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-blue-50 text-[#0d3862] text-[10px] font-bold px-4 py-2 rounded-xl uppercase tracking-widest border border-blue-100 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-[#0d3862] rounded-full"></div>
                                            Scholastic Hub
                                        </div>
                                        <div className="flex items-center gap-2 text-[#911116] text-[10px] font-bold uppercase tracking-widest bg-red-50 px-3 py-1.5 rounded-xl border border-red-100">
                                            <div className="w-2 h-2 rounded-full bg-[#911116] animate-pulse"></div>
                                            Institutional Status
                                        </div>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-[#0d3862] mb-3">Institutional Hub</h1>
                                    <p className="text-slate-500 font-medium text-lg italic">Distinguished Administrator, <span className="text-[#911116] font-bold">{user.name}</span></p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCreateEvent}
                                    className="bg-[#911116] text-white py-5 px-10 rounded-2xl flex items-center gap-3 font-bold uppercase tracking-widest text-xs shadow-xl shadow-red-900/10 hover:shadow-red-900/20 transition-all duration-300"
                                >
                                    <Plus size={24} /> Enlist Program
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Create Event Modal */}
                    <AnimatePresence>
                        {showCreateModal && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-y-auto">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setShowCreateModal(false)}
                                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
                                />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-white w-full max-w-2xl rounded-[2.5rem] relative z-10 shadow-2xl overflow-hidden"
                                >
                                    <div className="p-8 md:p-10">
                                        <div className="flex justify-between items-center mb-8">
                                            <div>
                                                <span className="text-[10px] font-black text-primary bg-blue-50 px-3 py-1 rounded-full uppercase tracking-widest">Step {createStep} of 2</span>
                                                <h3 className="text-2xl font-black mt-2">Create New Competition</h3>
                                            </div>
                                            <button onClick={() => setShowCreateModal(false)} className="p-2 bg-slate-50 rounded-xl"><X size={20} /></button>
                                        </div>

                                        <form onSubmit={submitEvent} className="space-y-6">
                                            {createStep === 1 ? (
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                            <Tag size={14} />
                                                            Event Title
                                                            <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. National Robotics Championship 2026"
                                                            required
                                                            className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${formErrors.title && touched.title
                                                                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                }`}
                                                            value={eventData.title}
                                                            onChange={(e) => handleEventInputChange('title', e.target.value)}
                                                            onBlur={() => handleEventBlur('title')}
                                                        />
                                                        {formErrors.title && touched.title && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                                            >
                                                                <AlertCircle size={12} />
                                                                {formErrors.title}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <FileText size={14} />
                                                                Category
                                                                <span className="text-red-500">*</span>
                                                            </label>
                                                            <select
                                                                className={`w-full appearance-none py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 ${formErrors.category && touched.category
                                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                    }`}
                                                                value={eventData.category}
                                                                onChange={(e) => handleEventInputChange('category', e.target.value)}
                                                                onBlur={() => handleEventBlur('category')}
                                                            >
                                                                <option value="Academic">Academic</option>
                                                                <option value="Coding">Coding & Tech</option>
                                                                <option value="Sports">Sports</option>
                                                                <option value="Art">Art & Design</option>
                                                                <option value="Music">Music</option>
                                                                <option value="Debate">Debate & Speech</option>
                                                                <option value="Science">Science & Research</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <Globe size={14} />
                                                                Mode
                                                                <span className="text-red-500">*</span>
                                                            </label>
                                                            <select
                                                                className={`w-full appearance-none py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 ${formErrors.mode && touched.mode
                                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                    }`}
                                                                value={eventData.mode}
                                                                onChange={(e) => handleEventInputChange('mode', e.target.value)}
                                                                onBlur={() => handleEventBlur('mode')}
                                                            >
                                                                <option value="Offline">Offline</option>
                                                                <option value="Online">Online</option>
                                                                <option value="Hybrid">Hybrid</option>
                                                            </select>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <Calendar size={14} />
                                                                Event Date
                                                                <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="date"
                                                                required
                                                                className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 ${formErrors.date && touched.date
                                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                    }`}
                                                                value={eventData.date}
                                                                onChange={(e) => handleEventInputChange('date', e.target.value)}
                                                                onBlur={() => handleEventBlur('date')}
                                                            />
                                                            {formErrors.date && touched.date && (
                                                                <motion.p
                                                                    initial={{ opacity: 0, y: -5 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                                                >
                                                                    <AlertCircle size={12} />
                                                                    {formErrors.date}
                                                                </motion.p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <Calendar size={14} />
                                                                Registration Deadline
                                                            </label>
                                                            <input
                                                                type="date"
                                                                className="w-full py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                                                                value={eventData.registrationDeadline}
                                                                onChange={(e) => handleEventInputChange('registrationDeadline', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                            <MapPin size={14} />
                                                            Venue/Location
                                                            <span className="text-red-500">*</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="e.g. Nehru Centre, Mumbai"
                                                            required
                                                            className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${formErrors.location && touched.location
                                                                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                }`}
                                                            value={eventData.location}
                                                            onChange={(e) => handleEventInputChange('location', e.target.value)}
                                                            onBlur={() => handleEventBlur('location')}
                                                        />
                                                        {formErrors.location && touched.location && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                                            >
                                                                <AlertCircle size={12} />
                                                                {formErrors.location}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() => setCreateStep(2)}
                                                        className="btn-primary w-full py-5 rounded-2xl shadow-lg font-semibold"
                                                    >
                                                        Next: Event Details <ChevronRight size={20} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                            <FileText size={14} />
                                                            Event Description
                                                            <span className="text-red-500">*</span>
                                                        </label>
                                                        <textarea
                                                            placeholder="Provide detailed information about your event including objectives, target audience, format, and what participants should expect..."
                                                            required
                                                            rows={6}
                                                            className={`w-full h-32 p-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 resize-none ${formErrors.description && touched.description
                                                                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                }`}
                                                            value={eventData.description}
                                                            onChange={(e) => handleEventInputChange('description', e.target.value)}
                                                            onBlur={() => handleEventBlur('description')}
                                                        />
                                                        {formErrors.description && touched.description && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                                            >
                                                                <AlertCircle size={12} />
                                                                {formErrors.description}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <DollarSign size={14} />
                                                                Participation Fee
                                                            </label>
                                                            <select
                                                                className="w-full appearance-none py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-700 outline-none transition-all duration-300 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                                                                value={eventData.price}
                                                                onChange={(e) => handleEventInputChange('price', e.target.value)}
                                                            >
                                                                <option value="Free">Free</option>
                                                                <option value="Paid">Paid</option>
                                                            </select>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <Users size={14} />
                                                                Max Participants
                                                            </label>
                                                            <input
                                                                type="number"
                                                                placeholder="e.g. 100"
                                                                min="1"
                                                                className="w-full py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                                                                value={eventData.maxParticipants}
                                                                onChange={(e) => handleEventInputChange('maxParticipants', e.target.value)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                            <Trophy size={14} />
                                                            Prizes & Rewards
                                                        </label>
                                                        <textarea
                                                            placeholder="Describe the prizes, certificates, recognition, or other rewards for winners..."
                                                            rows={3}
                                                            className="w-full h-24 p-6 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 resize-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                                                            value={eventData.prizes}
                                                            onChange={(e) => handleEventInputChange('prizes', e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                            <FileText size={14} />
                                                            Rules & Guidelines
                                                        </label>
                                                        <textarea
                                                            placeholder="Outline the participation rules, eligibility criteria, judging criteria, and important guidelines..."
                                                            rows={3}
                                                            className="w-full h-24 p-6 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 resize-none focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                                                            value={eventData.rules}
                                                            onChange={(e) => handleEventInputChange('rules', e.target.value)}
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <Mail size={14} />
                                                                Contact Email
                                                                <span className="text-red-500">*</span>
                                                            </label>
                                                            <input
                                                                type="email"
                                                                placeholder="contact@organization.com"
                                                                required
                                                                className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${formErrors.contactEmail && touched.contactEmail
                                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                    }`}
                                                                value={eventData.contactEmail}
                                                                onChange={(e) => handleEventInputChange('contactEmail', e.target.value)}
                                                                onBlur={() => handleEventBlur('contactEmail')}
                                                            />
                                                            {formErrors.contactEmail && touched.contactEmail && (
                                                                <motion.p
                                                                    initial={{ opacity: 0, y: -5 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                                                >
                                                                    <AlertCircle size={12} />
                                                                    {formErrors.contactEmail}
                                                                </motion.p>
                                                            )}
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                                <Phone size={14} />
                                                                Contact Phone
                                                            </label>
                                                            <input
                                                                type="tel"
                                                                placeholder="+91 98765 43210"
                                                                className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${formErrors.contactPhone && touched.contactPhone
                                                                    ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                    : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                    }`}
                                                                value={eventData.contactPhone}
                                                                onChange={(e) => handleEventInputChange('contactPhone', e.target.value)}
                                                                onBlur={() => handleEventBlur('contactPhone')}
                                                            />
                                                            {formErrors.contactPhone && touched.contactPhone && (
                                                                <motion.p
                                                                    initial={{ opacity: 0, y: -5 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                                                >
                                                                    <AlertCircle size={12} />
                                                                    {formErrors.contactPhone}
                                                                </motion.p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-1 flex items-center gap-2">
                                                            <Globe size={14} />
                                                            Event Website
                                                        </label>
                                                        <input
                                                            type="url"
                                                            placeholder="https://example.com/event"
                                                            className={`w-full py-4 px-6 bg-white border-2 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 ${formErrors.website && touched.website
                                                                ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-4 focus:ring-red-100'
                                                                : 'border-slate-200 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300'
                                                                }`}
                                                            value={eventData.website}
                                                            onChange={(e) => handleEventInputChange('website', e.target.value)}
                                                            onBlur={() => handleEventBlur('website')}
                                                        />
                                                        {formErrors.website && touched.website && (
                                                            <motion.p
                                                                initial={{ opacity: 0, y: -5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                className="text-xs text-red-600 font-medium pl-3 flex items-center gap-1"
                                                            >
                                                                <AlertCircle size={12} />
                                                                {formErrors.website}
                                                            </motion.p>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-4">
                                                        <button
                                                            type="button"
                                                            onClick={() => setCreateStep(1)}
                                                            className="p-5 bg-slate-100 rounded-2xl text-slate-600 hover:bg-slate-200 transition-colors"
                                                        >
                                                            <ArrowLeft size={24} />
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="btn-primary flex-grow py-5 rounded-2xl shadow-lg font-semibold"
                                                        >
                                                            Submit for Vetting <Zap size={20} />
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </form>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {stats.map((stat, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                key={idx}
                                className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className={`w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                                    <div className="text-[#0d3862]">{stat.icon}</div>
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{stat.label}</div>
                                <div className="text-3xl md:text-4xl font-serif font-bold text-[#0d3862] mb-2">{stat.value}</div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#911116]"></div>
                                    <span className="text-sm font-bold text-[#911116]">{stat.change}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Events Table */}
                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* Main Content Area */}
                        <div className="lg:col-span-8 space-y-8">

                            {/* Event Management */}
                            <div className="bg-gradient-to-br from-white via-white to-slate-50/30 rounded-[2.5rem] p-10 shadow-2xl border border-slate-100/50">
                                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-8">
                                    <div>
                                        <h3 className="text-3xl font-serif font-bold tracking-tighter flex items-center gap-4 mb-2">
                                            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/5">
                                                <Zap size={24} className="text-[#0d3862]" />
                                            </div>
                                            Academic Portfolio
                                        </h3>
                                        <p className="text-slate-500 font-medium">Verified list of active scholarly programs</p>
                                    </div>
                                    <div className="relative w-full lg:w-96">
                                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={22} />
                                        <input
                                            type="text"
                                            placeholder="Search listings..."
                                            className="w-full pl-14 pr-6 py-5 bg-white border-2 border-slate-200 rounded-2xl text-sm font-medium outline-none transition-all duration-300 focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300 shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-5">
                                    {recentEvents.map((event, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            whileHover={{ x: 12, scale: 1.02 }}
                                            key={idx}
                                            onClick={() => alert(`Opening management panel for ${event.name}`)}
                                            className="flex items-center gap-8 p-8 rounded-3xl bg-gradient-to-r from-white to-slate-50/50 border-2 border-slate-100/80 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 cursor-pointer group relative overflow-hidden"
                                        >
                                            {/* Background decoration */}
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 relative z-10 ${event.status === 'Live' ? 'bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl shadow-green-500/30' :
                                                event.status === 'Draft' ? 'bg-gradient-to-br from-slate-500 to-slate-700 text-white shadow-2xl shadow-slate-500/30' :
                                                    'bg-gradient-to-br from-orange-500 to-red-600 text-white shadow-2xl shadow-orange-500/30'
                                                }`}>
                                                <Calendar size={36} />
                                                {event.status === 'Live' && (
                                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-pulse border-2 border-white"></div>
                                                )}
                                            </div>
                                            <div className="flex-grow min-w-0 relative z-10">
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-black text-2xl line-clamp-1 text-slate-900">{event.name}</h4>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4 bg-slate-100 px-3 py-1 rounded-2xl">{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className={`text-[10px] font-black px-4 py-2 rounded-2xl uppercase tracking-wider font-bold ${event.status === 'Live' ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-2 border-green-300 shadow-sm' :
                                                        event.status === 'Draft' ? 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 border-2 border-slate-300 shadow-sm' :
                                                            'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 border-2 border-orange-300 shadow-sm'
                                                        }`}>
                                                        {event.status}
                                                    </span>
                                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                                        <Users size={18} /> <span className="font-black">{event.applicants}</span> Applicants
                                                    </div>
                                                    {event.trend === 'up' && (
                                                        <div className="flex items-center gap-1 text-emerald-600 font-bold">
                                                            <ArrowUpRight size={18} />
                                                            <span className="text-xs font-black uppercase tracking-wider">Trending</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <button className="text-xs font-black text-primary hover:bg-blue-50 px-4 py-2 rounded-2xl transition-all border-2 border-transparent hover:border-blue-200 uppercase tracking-widest">
                                                        View Details
                                                    </button>
                                                    <button className="text-xs font-black text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-2xl transition-all border-2 border-transparent hover:border-slate-200 uppercase tracking-widest">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-slate-100 to-slate-200 p-4 rounded-2xl text-slate-400 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-primary/80 group-hover:text-white transition-all duration-300 shadow-sm">
                                                <ChevronRight size={28} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => alert("Loading full event history...")}
                                    className="w-full mt-8 py-4 text-center text-sm font-black text-primary hover:bg-blue-50 rounded-2xl transition-all border-2 border-transparent hover:border-blue-100 uppercase tracking-widest"
                                >
                                    View Full Portfolio
                                </button>
                            </div>

                            {/* Mass Communication */}
                            <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 md:p-14 text-white relative overflow-hidden rounded-[3rem] shadow-2xl border border-slate-700/50">
                                {/* Animated background elements */}
                                <div className="absolute inset-0">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
                                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-2xl animate-pulse delay-1000"></div>
                                </div>

                                <div className="relative z-10">
                                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-8">
                                        <div>
                                            <h3 className="text-3xl lg:text-4xl font-black mb-4 tracking-tight flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 animate-pulse">
                                                    <MessageSquare size={36} className="text-white" />
                                                </div>
                                                Mass Broadcast
                                            </h3>
                                            <p className="text-slate-300 text-lg font-bold">Send instant updates to <span className="text-emerald-400 font-black">570</span> verified participants</p>
                                        </div>
                                        <div className="hidden lg:flex w-20 h-20 bg-gradient-to-r from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40">
                                            <MessageSquare size={40} className="text-white" />
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="flex flex-wrap gap-4">
                                            {['All Participants', 'Winners Only', 'Volunteers', 'Judges'].map((target, idx) => (
                                                <motion.button
                                                    key={target}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    onClick={() => alert(`Broadcasting targeting set to: ${target}`)}
                                                    className="px-6 py-4 rounded-2xl bg-white/10 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border-2 border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl"
                                                >
                                                    {target}
                                                </motion.button>
                                            ))}
                                        </div>

                                        <div className="relative">
                                            <textarea
                                                value={broadcastMsg}
                                                onChange={(e) => setBroadcastMsg(e.target.value)}
                                                placeholder="Type your broadcast message here...\n\ne.g. Venue changed to Auditorium B / Deadline extended by 24h"
                                                className="w-full h-44 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl p-8 text-base font-medium placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 resize-none shadow-inner"
                                            />
                                            <div className="absolute bottom-4 right-4 text-xs font-black text-slate-500 uppercase tracking-widest">
                                                {broadcastMsg.length}/500
                                            </div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse shadow-2xl shadow-emerald-400/50"></div>
                                                <div>
                                                    <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">System Online</span>
                                                    <div className="text-[10px] text-slate-500 font-medium">All services operational</div>
                                                </div>
                                            </div>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => alert('Broadcast feature coming soon!')}
                                                className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-6 px-12 rounded-3xl font-black text-lg shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/60 transition-all duration-300 flex items-center gap-3"
                                            >
                                                <MessageSquare size={24} /> Send Broadcast Now
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar Flow */}
                        <div className="lg:col-span-4 space-y-8">

                            {/* Verification Queue */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                whileHover={{ y: -8 }}
                                className="bg-gradient-to-br from-blue-50 via-blue-100/30 to-indigo-50/50 p-12 rounded-[2.5rem] shadow-2xl border border-blue-200/60 relative overflow-hidden"
                            >
                                {/* Background decoration */}
                                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -mr-24 -mt-24 blur-2xl"></div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-6 flex items-center gap-4 tracking-tight">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                                            <CheckCircle2 className="text-white" size={28} />
                                        </div>
                                        SLA Vetting Queue
                                    </h3>
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-6">
                                            <div className="relative">
                                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-blue-500/30">
                                                    <Clock size={40} />
                                                </div>
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full animate-pulse border-3 border-white shadow-lg shadow-orange-500/40"></div>
                                            </div>
                                            <div className="flex-grow">
                                                <div className="text-xl font-black mb-3 text-slate-900">Inter-School Debate</div>
                                                <div className="flex justify-between items-center mb-4">
                                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-100 px-3 py-1 rounded-2xl">Manual Verification</span>
                                                    <span className="text-[10px] font-black text-orange-600 uppercase tracking-widest bg-orange-100 px-3 py-1 rounded-2xl">4h left</span>
                                                </div>
                                                <div className="relative">
                                                    <div className="w-full h-3 bg-blue-100 rounded-full overflow-hidden shadow-inner">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: "70%" }}
                                                            transition={{ duration: 2, ease: "easeInOut" }}
                                                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-500/30 relative"
                                                        >
                                                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg animate-pulse"></div>
                                                        </motion.div>
                                                    </div>
                                                    <div className="flex justify-between text-[10px] font-black text-slate-600 uppercase tracking-widest mt-2">
                                                        <span>70% Complete</span>
                                                        <span>~2 hours</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-blue-200/50 shadow-lg">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                                                    <AlertCircle size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-slate-900 mb-2">Verification in Progress</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                                        Your event is currently under manual review by our compliance team. Average SLA: 12 hours.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 text-center">
                                                <div className="p-4 bg-blue-50 rounded-2xl">
                                                    <div className="text-2xl font-black text-blue-600">12h</div>
                                                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Avg SLA</div>
                                                </div>
                                                <div className="p-4 bg-emerald-50 rounded-2xl">
                                                    <div className="text-2xl font-black text-emerald-600">98%</div>
                                                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Success Rate</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Checklist */}
                            <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100">
                                <h3 className="text-2xl font-black mb-6 flex items-center gap-3 tracking-tight">
                                    <Settings className="text-primary" size={28} /> Setup Checklist
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        { label: 'Event Poster Uploaded', done: true },
                                        { label: 'Prize Details Added', done: true },
                                        { label: 'Rules & Regs PDF', done: false },
                                        { label: 'Contact Person Assigned', done: false }
                                    ].map((item, idx) => (
                                        <motion.div key={idx} whileHover={{ x: 4 }} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                            <div className={`w-8 h-8 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${item.done
                                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                                                : 'bg-slate-100 border-slate-300 text-slate-400'
                                                }`}>
                                                {item.done && <CheckCircle2 size={18} />}
                                            </div>
                                            <span className={`text-sm font-bold ${item.done ? 'text-slate-900' : 'text-slate-500'}`}>{item.label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                                <button
                                    onClick={() => alert("Updating organization settings...")}
                                    className="w-full mt-8 py-4 text-center text-sm font-black text-primary hover:bg-blue-50 rounded-2xl transition-all border-2 border-transparent hover:border-blue-100 uppercase tracking-widest"
                                >
                                    Update Settings
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
