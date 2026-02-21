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
    Laptop,
    Loader2,
    Trophy,
    Award
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
                const data = await getEventById(id);
                setEvent(data.event || data);
            } catch (err) {
                console.error("Failed to fetch event", err);
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
                        phone: "+91 70508 19323",
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
                        { user: "Priya S.", rating: 5, comment: "Amazing experience!", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" }
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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-[#0d3862] animate-spin" />
                    <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Verifying Channel Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-slate-800">
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="container-custom px-4">

                    <div className="flex items-center gap-4 mb-8">
                        <button onClick={() => navigate(-1)} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 hover:text-[#0d3862] transition-all">
                            <ArrowLeft size={20} />
                        </button>
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                            <Link to="/events" className="hover:text-[#0d3862] transition-colors">Directory</Link>
                            <ChevronRight size={14} className="opacity-20" />
                            <span className="text-[#0d3862] line-clamp-1">{event.title}</span>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-8 space-y-12">
                            <div className="rounded-3xl overflow-hidden relative shadow-lg border border-slate-100 group bg-slate-50">
                                <div className="h-[400px] w-full relative">
                                    <img
                                        src={event.image}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d3862]/80 via-transparent to-transparent"></div>
                                    <div className="absolute bottom-10 left-10 right-10">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span className="bg-[#fcb900] text-[#0d3862] px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest">{event.category}</span>
                                            <span className="bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-[#0d3862] shadow-sm">
                                                <ShieldCheck size={14} className="text-[#0d3862]" />
                                                Verified Enrollment
                                            </span>
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight mb-4">{event.title}</h1>
                                    </div>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {[
                                    { icon: Calendar, label: "Schedule", value: event.date, color: "text-[#0d3862]" },
                                    { icon: MapPin, label: "Medium", value: event.location, color: "text-[#0d3862]" },
                                    { icon: Trophy, label: "Incentive", value: event.prizes || 'Accreditation', color: "text-[#fcb900]" },
                                    { icon: Laptop, label: "Format", value: event.mode || 'Online', color: "text-[#911116]" }
                                ].map((item, i) => (
                                    <div key={i} className="bg-[#F8FAFC] border border-slate-100 p-8 rounded-2xl shadow-sm">
                                        <item.icon className={`${item.color} mb-4`} size={24} />
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{item.label}</div>
                                        <div className="font-bold text-[#0d3862] text-sm line-clamp-1">{item.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold mb-6 text-[#0d3862] flex items-center gap-3">
                                        <Info className="text-[#911116]" /> Prospectus Brief
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{event.description}</p>
                                </div>

                                <div className="bg-[#F8FAFC] p-10 md:p-12 rounded-3xl border border-slate-100 shadow-sm">
                                    <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-3 text-[#0d3862]">
                                        <FileText className="text-[#0d3862]" /> Participation Protocol
                                    </h3>
                                    <div className="grid gap-6">
                                        {(event.rules || [
                                            'Open to all interested participants.',
                                            'Registration must be completed before the deadline.',
                                            'Participants must follow all event guidelines.',
                                            'Valid ID proof may be required for verification.'
                                        ]).map((rule, idx) => (
                                            <div key={idx} className="flex gap-6 items-start">
                                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#0d3862] flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</div>
                                                <p className="font-semibold text-slate-600 text-base">{rule}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-white sticky top-32 p-10 rounded-3xl border border-slate-100 shadow-xl">
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Financial Commitment</div>
                                        <div className="text-4xl font-serif font-bold text-[#0d3862]">{event.registrationFee || event.price || 'Scholarship Seat'}</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsLiked(!isLiked)}
                                            className={`p-3.5 rounded-xl transition-all ${isLiked ? 'bg-red-50 text-[#911116]' : 'bg-slate-50 text-slate-400 hover:text-[#911116]'}`}
                                        >
                                            <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                                        </button>
                                        <button
                                            onClick={handleShare}
                                            className="p-3.5 bg-slate-50 rounded-xl text-slate-400 hover:text-[#0d3862] transition-colors"
                                        >
                                            <Share2 size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-10">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-[#0d3862] uppercase tracking-widest p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                                        <ShieldCheck size={18} className="shrink-0" />
                                        <span>Official Academic Gateway</span>
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
                                    className="btn-primary w-full py-4 text-xs uppercase tracking-[0.2em] font-bold rounded-xl flex items-center justify-center gap-3 group"
                                >
                                    {user?.role === 'admin' ? 'Administrative Hub' :
                                        user?.role === 'organizer' ? 'Management Center' :
                                            'Begin Registration'}
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>

                                <div className="mt-8 flex items-center justify-center gap-4 opacity-50">
                                    <div className="flex items-center gap-2">
                                        <Lock size={12} /> <span className="text-[9px] font-bold uppercase tracking-widest">Encrypted Auth</span>
                                    </div>
                                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                    <div className="text-[9px] font-bold uppercase tracking-widest">SLA Verified</div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-10 rounded-3xl border border-slate-100">
                                <h3 className="text-[10px] font-bold mb-8 uppercase tracking-widest text-slate-400">Institutional Host</h3>
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-16 h-16 bg-[#0d3862] rounded-2xl flex items-center justify-center text-white font-serif font-bold text-2xl border border-slate-200 shrink-0 shadow-sm">
                                        {(event.organizer?.name || 'A').charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-serif font-bold text-lg flex items-center gap-2 text-[#0d3862]">
                                            {event.organizer?.name || 'Academic Authority'}
                                            <ShieldCheck size={18} className="text-[#fcb900]" />
                                        </h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verified Associate</p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                        <Phone size={18} className="text-[#0d3862]" />
                                        <div className="text-xs font-bold text-slate-600">{event.organizer?.phone || '+91 70508 19323'}</div>
                                    </div>
                                    <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)]">
                                        <Mail size={18} className="text-[#0d3862]" />
                                        <div className="text-xs font-bold text-slate-600 line-clamp-1">{event.contactInfo || event.organizer?.email || 'registrar@apnaevents.com'}</div>
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
                    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowRegModal(false)}
                            className="fixed inset-0 bg-[#0d3862]/40 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            className="bg-white w-full max-w-xl rounded-[2rem] relative shadow-2xl border border-slate-200 z-10 flex flex-col overflow-hidden"
                            style={{ maxHeight: 'calc(100vh - 40px)' }}
                        >
                            {isSuccess ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 z-50 bg-white flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <div className="w-20 h-20 bg-blue-50 text-[#0d3862] rounded-full flex items-center justify-center mb-8 border border-blue-100">
                                        <CheckCircle size={40} />
                                    </div>
                                    <h2 className="text-3xl font-serif font-bold mb-4 text-[#0d3862]">Seat Secured</h2>
                                    <p className="text-slate-500 mb-10 font-medium text-sm">
                                        Your registration request has been successfully filed. Please monitor your institutional email for the next steps.
                                    </p>
                                    <button
                                        onClick={() => setShowRegModal(false)}
                                        className="btn-primary w-full py-4 rounded-xl"
                                    >
                                        Return to Portal
                                    </button>
                                </motion.div>
                            ) : (
                                <>
                                    <div className="p-10 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                        <div>
                                            <h2 className="text-2xl font-serif font-bold text-[#0d3862]">Registration</h2>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Verification Stage {regStep}/2</p>
                                        </div>
                                        <button onClick={() => setShowRegModal(false)} className="p-3 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 text-slate-400 transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>

                                    <div className="p-10 overflow-y-auto">
                                        {regStep === 1 ? (
                                            <div className="space-y-8">
                                                <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100">
                                                    <Info className="text-[#0d3862] mb-4" size={28} />
                                                    <h4 className="font-bold text-[#0d3862] text-sm mb-2 uppercase tracking-wide">Eligibility Mandate</h4>
                                                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                                                        This opportunity is reserved for students with valid institutional credentials. Accreditation requires a digital copy of your student ID.
                                                    </p>
                                                </div>

                                                <label className="flex items-center gap-6 p-8 bg-slate-50 border border-slate-100 rounded-2xl cursor-pointer transition-all hover:bg-slate-100 group">
                                                    <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-colors ${hasPermission ? 'border-[#0d3862] bg-[#0d3862] text-white' : 'border-slate-300'}`}>
                                                        {hasPermission && <Check size={16} strokeWidth={4} />}
                                                    </div>
                                                    <input
                                                        type="checkbox"
                                                        className="hidden"
                                                        checked={hasPermission}
                                                        onChange={(e) => setHasPermission(e.target.checked)}
                                                    />
                                                    <span className="font-bold text-slate-500 text-xs uppercase tracking-widest group-hover:text-[#0d3862] transition-colors">
                                                        I affirm my academic enrollment.
                                                    </span>
                                                </label>
                                            </div>
                                        ) : (
                                            <form id="reg-form" onSubmit={handleRegister} className="space-y-6">
                                                <div className="space-y-5">
                                                    {[
                                                        { label: "Nominee Name", placeholder: "Aadarsh Patel", value: user?.name, type: "text" },
                                                        { label: "Institutional Email", placeholder: "scholar@university.edu", value: user?.email, type: "email" },
                                                        { label: "Direct Contact", placeholder: "+91 00000 00000", type: "tel" }
                                                    ].map((field, i) => (
                                                        <div key={i}>
                                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">{field.label}</label>
                                                            <input
                                                                type={field.type}
                                                                defaultValue={field.value}
                                                                className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0d3862] placeholder:text-slate-300 focus:border-[#fcb900] outline-none transition-all shadow-sm"
                                                                placeholder={field.placeholder}
                                                                required
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </form>
                                        )}
                                    </div>

                                    <div className="p-10 bg-slate-50 flex gap-4 border-t border-slate-100">
                                        {regStep === 1 ? (
                                            <button
                                                onClick={() => hasPermission && setRegStep(2)}
                                                disabled={!hasPermission}
                                                className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 text-xs
                                                    ${hasPermission
                                                        ? 'bg-[#0d3862] text-white shadow-lg'
                                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                                            >
                                                Advance Protocol <ArrowLeft className="rotate-180" size={18} />
                                            </button>
                                        ) : (
                                            <>
                                                <button onClick={() => setRegStep(1)} className="px-8 py-4 rounded-xl font-bold text-slate-400 uppercase tracking-widest hover:text-[#0d3862] transition-colors text-xs">
                                                    Edit
                                                </button>
                                                <button
                                                    type="submit"
                                                    form="reg-form"
                                                    disabled={isSubmitting}
                                                    className="flex-1 bg-[#0d3862] text-white py-4 rounded-xl font-bold uppercase tracking-[0.2em] transition-all shadow-lg flex items-center justify-center gap-3 text-xs"
                                                >
                                                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Submit Manifest'}
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EventDetail;
