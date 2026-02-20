import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShieldCheck,
    MapPin,
    Calendar,
    Users,
    Star,
    ArrowLeft,
    FileText,
    Phone,
    Mail,
    CheckCircle,
    Lock,
    CreditCard,
    ChevronRight,
    Heart,
    Share2,
    Info,
    Check,
    X,
    Laptop
} from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import { useAuth } from '../context/AuthContext';
import { getEventById } from '../api/events';

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [showRegModal, setShowRegModal] = useState(false);
    const [regStep, setRegStep] = useState(1);
    const [hasPermission, setHasPermission] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                console.log('Fetching event with ID:', id);
                const data = await getEventById(id);
                console.log('Event data received:', data);
                setEvent(data.event || data); // Handle both response formats
            } catch (err) {
                console.error("Failed to fetch event", err);
                // Fallback mock data
                const isFootball = id?.includes('football');
                setEvent({
                    title: isFootball ? "All-India Inter-School Football Cup" : "National Science Olympiad 2026",
                    category: isFootball ? "Sports" : "Academic",
                    date: isFootball ? "April 10-25, 2026" : "March 15, 2026, 10:00 AM IST",
                    location: isFootball ? "New Delhi / National" : "Online / National",
                    image: isFootball
                        ? "https://images.unsplash.com/photo-1550850839-8dc894ed385a?auto=format&fit=crop&q=80&w=1200"
                        : "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
                    organizer: {
                        name: isFootball ? "Indian School Sports Fed" : "Global Scholar Association",
                        verified: true,
                        since: "2018",
                        phone: "+91 98765 43210",
                        email: isFootball ? "events@issf-sports.in" : "help@gsa-olympiad.org",
                        rating: 4.8,
                        totalStudents: "1.2M+"
                    },
                    description: isFootball
                        ? "The premier inter-school football tournament bringing together the best young talent from across India. Compete for the prestigious trophy and national scouting opportunities."
                        : "The National Science Olympiad (NSO) is an annual school-level competition designed to identify and nurture future scientists by testing logic and application-based science skills.",
                    rules: [
                        "Open to Class 9-12 students only.",
                        isFootball ? "Teams must consist of 11 players and 3 substitutes." : "Digital ID proof mandatory for log-in.",
                        isFootball ? "Standard FIFA rules apply with 30-min halves." : "No negative marking for MCQ round."
                    ],
                    reviews: [
                        { user: "Priya S.", rating: 5, comment: "Amazing experience! The certificate was verified and helped my applications.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" },
                        { user: "Rahul M.", rating: 4, comment: "Smooth registration and well-managed event.", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" }
                    ],
                    mode: isFootball ? "Offline" : "Online",
                    price: "Free",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const [isLiked, setIsLiked] = useState(false);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.description,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert("Competition link copied to clipboard!");
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!hasPermission) return;
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1500);
    };

    if (loading || !event) {
        return (
            <div className="min-h-screen bg-navy-950 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold">Verifying Competition Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy-950 text-slate-300">
            <Navbar />

            <div className="pt-24 md:pt-32 pb-24">
                <div className="container-custom">

                    <div className="flex items-center gap-4 mb-8">
                        <button onClick={() => navigate(-1)} className="p-2 glass-button rounded-xl text-slate-400 hover:text-emerald-400 transition-all">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-400">
                            <Link to="/" className="hover:text-emerald-400 transition-colors">Home</Link>
                            <ChevronRight size={14} />
                            <span className="text-white line-clamp-1">{event.title}</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-8 space-y-10">
                            <div className="rounded-3xl overflow-hidden relative shadow-2xl border border-white/5 group">
                                <div className="h-64 md:h-96 w-full relative overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/50 to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">{event.category}</span>
                                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 backdrop-blur px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                                <ShieldCheck size={14} className="text-emerald-500" />
                                                Verified Opportunity
                                            </span>
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-tight font-display">{event.title}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="glass-card flex items-center gap-5 p-6 rounded-2xl">
                                    <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-blue-500/20">
                                        <Calendar size={28} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date & Time</div>
                                        <div className="font-bold text-white">{event.date}</div>
                                    </div>
                                </div>
                                <div className="glass-card flex items-center gap-5 p-6 rounded-2xl">
                                    <div className="w-14 h-14 bg-emerald-500/10 text-emerald-400 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-emerald-500/20">
                                        <MapPin size={28} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Venue</div>
                                        <div className="font-bold text-white">{event.location}</div>
                                    </div>
                                </div>
                                {event.deadline && (
                                    <div className="glass-card flex items-center gap-5 p-6 rounded-2xl">
                                        <div className="w-14 h-14 bg-amber-500/10 text-amber-400 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-amber-500/20">
                                            <Calendar size={28} />
                                        </div>
                                        <div>
                                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registration Deadline</div>
                                            <div className="font-bold text-white">{new Date(event.deadline).toLocaleDateString()}</div>
                                        </div>
                                    </div>
                                )}
                                <div className="glass-card flex items-center gap-5 p-6 rounded-2xl">
                                    <div className="w-14 h-14 bg-purple-500/10 text-purple-400 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-purple-500/20">
                                        <Laptop size={28} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Event Mode</div>
                                        <div className="font-bold text-white">{event.mode || 'Online'}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-black mb-4 tracking-tight flex items-center gap-3 text-white font-display">
                                        <Info className="text-emerald-500" /> About the Event
                                    </h2>
                                    <p className="text-slate-300 leading-relaxed text-lg font-medium">{event.description}</p>
                                </div>

                                <div className="glass-card p-8 md:p-10 rounded-3xl">
                                    <h3 className="text-xl font-black mb-6 flex items-center gap-3 text-white font-display">
                                        <FileText className="text-emerald-500" /> Participation Rules
                                    </h3>
                                    <div className="grid gap-4">
                                        {(event.rules || [
                                            'Open to all interested participants.',
                                            'Registration must be completed before the deadline.',
                                            'Participants must follow all event guidelines.',
                                            'Valid ID proof may be required for verification.'
                                        ]).map((rule, idx) => (
                                            <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">{idx + 1}</div>
                                                <p className="font-bold text-slate-200 text-sm md:text-base">{rule}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="glass-card sticky top-28 p-8 md:p-10 rounded-3xl shadow-2xl shadow-navy-950/50">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Registration Fee</div>
                                        <div className="text-4xl font-black text-white">{event.registrationFee || event.price || 'Free'}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsLiked(!isLiked)}
                                            className={`p-3 rounded-xl transition-all shadow-sm ${isLiked ? 'bg-rose-500/20 text-rose-500' : 'bg-white/5 text-slate-400 hover:text-rose-500 hover:bg-white/10'}`}
                                        >
                                            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="p-3 bg-white/5 rounded-xl text-slate-400 hover:text-emerald-400 hover:bg-white/10 transition-colors shadow-sm"
                                        >
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-sm font-bold text-emerald-400 bg-emerald-500/10 p-4 rounded-2xl border border-emerald-500/20">
                                        <ShieldCheck size={20} className="shrink-0" />
                                        <span>Free for all Students</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm font-bold text-slate-300 bg-white/5 p-4 rounded-2xl border border-white/5">
                                        <Users size={20} className="shrink-0" />
                                        <span>84 Slots Remaining</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        if (user?.role === 'organizer' || user?.role === 'admin') {
                                            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
                                        } else {
                                            setShowRegModal(true);
                                        }
                                    }}
                                    className="btn-primary w-full py-5 text-lg rounded-2xl font-black tracking-tight flex items-center justify-center gap-2 group"
                                >
                                    {user?.role === 'admin' ? 'Admin Protocol' :
                                        user?.role === 'organizer' ? 'Management Hub' :
                                            'Register Now'}
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="mt-6 flex items-center justify-center gap-4">
                                    <div className="flex items-center gap-1.5 opacity-40 text-slate-400">
                                        <CreditCard size={14} /> <span className="text-[10px] font-black uppercase tracking-widest">Safe Payments</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-40">Refund Policy</div>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl">
                                <h3 className="text-[10px] font-black mb-6 uppercase tracking-widest text-slate-400">Host Entity</h3>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 font-black text-xl border border-emerald-500/20 shrink-0">
                                        {(event.organizer?.name || 'Event').charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-base flex items-center gap-1.5 text-white">
                                            {event.organizer?.name || 'Event Organizer'}
                                            <ShieldCheck size={16} className="text-emerald-500" />
                                        </h4>
                                        <p className="text-[10px] font-bold text-slate-400">Trusted since {event.organizer?.since || '2020'}</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <Phone size={16} className="text-emerald-500" />
                                        <div className="text-sm font-bold text-slate-300">{event.organizer?.phone || '+91 98765 43210'}</div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <Mail size={16} className="text-emerald-500" />
                                        <div className="text-xs font-bold break-all text-slate-300">{event.contactInfo || event.organizer?.email || 'contact@event.com'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <AnimatePresence>
                {showRegModal && (
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowRegModal(false)}
                            className="fixed inset-0 bg-navy-950/90 backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-navy-900 w-full max-w-xl rounded-[2.5rem] relative shadow-2xl border border-white/10 z-10 flex flex-col overflow-hidden"
                            style={{ maxHeight: 'calc(100vh - 40px)' }}
                        >
                            {isSuccess && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-50 bg-navy-900 flex flex-col items-center justify-center p-10 text-center"
                                >
                                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-6 border-2 border-emerald-500/30 shadow-inner">
                                        <CheckCircle size={48} />
                                    </div>
                                    {event.verified && (
                                        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/5">
                                            <ShieldCheck size={16} /> Verified Competition
                                        </div>
                                    )}
                                    <h2 className="text-3xl font-black mb-4 tracking-tight text-white font-display">Spot Secured!</h2>
                                    <p className="text-slate-400 mb-8 max-w-xs mx-auto">
                                        You're all set for {event.title}. Check your email for the entry pass.
                                    </p>
                                    <button
                                        onClick={() => setShowRegModal(false)}
                                        className="btn-primary w-full py-4 rounded-xl font-bold"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            )}

                            {/* Header */}
                            <div className="p-8 border-b border-white/5 bg-navy-800/50 flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-black text-white font-display">Registration</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step {regStep} of 2</p>
                                </div>
                                <button onClick={() => setShowRegModal(false)} className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-slate-400 transition-colors">
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-8 overflow-y-auto custom-scrollbar">
                                {regStep === 1 ? (
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4 p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                            <Info className="text-blue-400 shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <h4 className="font-bold text-blue-400 text-sm mb-1">Prerequisite Check</h4>
                                                <p className="text-xs text-blue-200/70 leading-relaxed">
                                                    Ensure you have a valid student ID card from your institution.
                                                    This event is strictly for current students.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <label className="flex items-center gap-4 p-4 rounded-2xl border border-white/10 cursor-pointer transition-all hover:bg-white/5 group">
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${hasPermission ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-slate-600'}`}>
                                                    {hasPermission && <Check size={14} strokeWidth={4} />}
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    className="hidden"
                                                    checked={hasPermission}
                                                    onChange={(e) => setHasPermission(e.target.checked)}
                                                />
                                                <span className="font-bold text-slate-300 text-sm group-hover:text-white transition-colors">
                                                    I confirm that I am a current student and meet the eligibility criteria.
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                ) : (
                                    <form id="reg-form" onSubmit={handleRegister} className="space-y-6">
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">Full Name</label>
                                                <input
                                                    type="text"
                                                    defaultValue={user?.name}
                                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-medium text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">Email Address</label>
                                                <input
                                                    type="email"
                                                    defaultValue={user?.email}
                                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-medium text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                    placeholder="name@university.edu"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2 pl-1">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-medium text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                    placeholder="+91 98765 43210"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 bg-navy-800/50">
                                {regStep === 1 ? (
                                    <button
                                        onClick={() => hasPermission && setRegStep(2)}
                                        disabled={!hasPermission}
                                        className={`w-full py-4 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-2
                                            ${hasPermission
                                                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20'
                                                : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                                    >
                                        Continue <ArrowLeft className="rotate-180" size={20} />
                                    </button>
                                ) : (
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setRegStep(1)}
                                            className="px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-white/5 transition-colors"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            form="reg-form"
                                            disabled={isSubmitting}
                                            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <>Confirm Registration <Check size={20} /></>
                                            )}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
};

export default EventDetail;
