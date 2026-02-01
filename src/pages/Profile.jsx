import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Trophy, Award, MapPin, Building2, Download, Share2, ChevronRight, Activity, TrendingUp, Lock, Plus } from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Profile = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !user) {
            // navigate('/'); // Optional: redirect to home if not logged in
        }
    }, [user, loading, navigate]);

    const participationHistory = [
        { event: "National Science Olympiad", status: "Gold Medalist", date: "Jan 2026", category: "Academic" },
        { event: "Mumbai Inter-School Debates", status: "Qualified", date: "Dec 2025", category: "Speech" },
        { event: "Zonal Football Championship", status: "Captain / Finalist", date: "Oct 2025", category: "Sports" },
    ];

    const badges = [
        { icon: <Trophy className="text-yellow-400" />, label: "Top 1% National", color: "bg-yellow-500/10 border-yellow-500/20 text-yellow-400" },
        { icon: <Award className="text-blue-400" />, label: "Tech Wizard", color: "bg-blue-500/10 border-blue-500/20 text-blue-400" },
        { icon: <ShieldCheck className="text-emerald-400" />, label: "Verified Student", color: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" },
    ];

    const handleDownload = () => {
        alert("Generating your Digital Passport PDF... Your verified credentials will be ready in a moment.");
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `EventDekho Profile - ${user?.name || 'Aadarsh Kumar'}`,
                text: 'Check out my student profile and verified participations on EventDekho!',
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Profile link copied to clipboard!");
        }
    };

    if (loading || !user) return null;

    return (
        <div className="min-h-screen bg-navy-950 text-slate-300 selection:bg-emerald-500/30">
            <Navbar />

            <div className="pt-24 md:pt-32 pb-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-8">

                        {/* Left Sidebar - Profile Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-4"
                        >
                            <div className="bg-navy-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 text-center sticky top-28 lg:top-32 shadow-xl shadow-navy-950/50">
                                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-6">
                                    <div className="w-full h-full bg-navy-800 rounded-[2.5rem] overflow-hidden border-4 border-navy-700 shadow-2xl">
                                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150" alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-2xl border-4 border-navy-900 shadow-lg">
                                        <ShieldCheck size={20} />
                                    </div>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-black mb-1 tracking-tight text-white">{user.name}</h2>
                                <p className="text-slate-400 font-bold mb-6">{user.role === 'student' ? 'Student' : 'Organizer'}</p>

                                <div className="flex flex-col gap-3 mb-8 text-left">
                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-200 bg-navy-800/50 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center shadow-sm text-emerald-400">
                                            <Building2 size={18} />
                                        </div>
                                        <span className="line-clamp-1">Modern Public School, Delhi</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm font-bold text-slate-200 bg-navy-800/50 p-4 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-colors">
                                        <div className="w-8 h-8 rounded-lg bg-navy-700 flex items-center justify-center shadow-sm text-emerald-400">
                                            <MapPin size={18} />
                                        </div>
                                        <span>New Delhi, India</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    <div className="p-5 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                                        <div className="text-3xl font-black text-blue-400 mb-1">12</div>
                                        <div className="text-[10px] font-black text-blue-400/60 uppercase tracking-widest leading-none">Participations</div>
                                    </div>
                                    <div className="p-5 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                        <div className="text-3xl font-black text-emerald-400 mb-1">4</div>
                                        <div className="text-[10px] font-black text-emerald-400/60 uppercase tracking-widest leading-none">Awards Won</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <button onClick={handleDownload} className="w-full py-4 text-base bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2">
                                        <Download size={20} /> Download Passport
                                    </button>
                                    <button onClick={handleShare} className="w-full py-4 text-base bg-navy-800 hover:bg-navy-700 text-white font-bold rounded-xl transition-all border border-white/5 flex items-center justify-center gap-2">
                                        <Share2 size={20} /> Share Profile
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Content Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-8 flex flex-col gap-6 md:gap-8"
                        >

                            {/* Badges Section */}
                            <div className="bg-navy-900/50 backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-3xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl md:text-2xl font-black flex items-center gap-3 tracking-tight text-white">
                                        <Award className="text-emerald-400" /> Achievement Badges
                                    </h3>
                                    <button className="text-emerald-400 text-sm font-bold hover:underline">View All</button>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {badges.map((badge, idx) => (
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            key={idx}
                                            className={`${badge.color} px-5 py-4 rounded-3xl flex items-center gap-3 border border-white/5 shadow-sm`}
                                        >
                                            <div className="p-2 bg-navy-950/30 rounded-xl">
                                                {badge.icon}
                                            </div>
                                            <span className="font-bold text-sm tracking-tight">{badge.label}</span>
                                        </motion.div>
                                    ))}
                                    <div
                                        onClick={() => alert("Keep participating in events to unlock new badges and specialized student tracks!")}
                                        className="border-2 border-dashed border-slate-700 px-6 py-4 rounded-3xl flex items-center gap-3 text-slate-500 font-bold text-sm cursor-pointer hover:bg-navy-800 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full border-2 border-slate-700 flex items-center justify-center">+</div>
                                        <span>New Goal</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verified Activity Section */}
                            <div className="bg-navy-900/50 backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-3xl">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-black flex items-center gap-3 mb-1 tracking-tight text-white">
                                            <ShieldCheck size={28} className="text-emerald-500" /> My Activity Hub
                                        </h3>
                                        <p className="text-slate-400 text-sm font-bold">All participations are manually vetted by EventDekho team.</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest border border-emerald-500/20">
                                        <Activity size={14} /> 100% Verified
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {participationHistory.map((item, idx) => (
                                        <motion.div
                                            whileHover={{ x: 10 }}
                                            key={idx}
                                            className="flex items-center gap-4 md:gap-6 p-5 rounded-[2rem] bg-navy-800/30 hover:bg-navy-800 transition-all group cursor-pointer border border-transparent hover:border-emerald-500/20"
                                        >
                                            <div className="w-14 h-14 md:w-16 md:h-16 bg-navy-900 rounded-2xl shadow-sm border border-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors shrink-0">
                                                {item.category === 'Academic' ? <Trophy size={24} /> : item.category === 'Sports' ? <MapPin size={24} /> : <Award size={24} />}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-1">
                                                    <h4 className="font-black text-lg line-clamp-1 text-white">{item.event}</h4>
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest shrink-0 ml-2">{item.date}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <p className="text-sm text-slate-400 font-bold">{item.category}</p>
                                                    <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-wider">
                                                        {item.status}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-slate-600 group-hover:text-emerald-500 transition-colors hidden sm:block">
                                                <ChevronRight size={24} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => alert("Viewing complete verified trajectory... This feature is part of the Premium Passport track.")}
                                    className="w-full mt-10 py-5 text-center text-sm md:text-base font-black text-emerald-400 hover:bg-emerald-500/10 rounded-[2rem] transition-all border-2 border-transparent hover:border-emerald-500/20 flex items-center justify-center gap-2"
                                >
                                    View Full Career Trajectory <TrendingUp size={18} />
                                </button>
                            </div>

                            {/* Project Showcase */}
                            <div className="bg-navy-900/50 backdrop-blur-md border border-white/5 p-6 md:p-10 rounded-3xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl md:text-2xl font-black flex items-center gap-3 tracking-tight text-white">
                                        <Lock className="text-emerald-400" /> Project Showcase
                                    </h3>
                                    <button
                                        onClick={() => alert("Launching Secure Project Vault...")}
                                        className="px-4 py-2 text-xs font-black uppercase tracking-widest rounded-xl hover:bg-navy-800 text-slate-300 transition-all flex items-center gap-2 border border-white/10"
                                    >
                                        Add New <Plus size={14} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="group cursor-pointer">
                                        <div className="relative h-48 rounded-[2rem] overflow-hidden mb-4 bg-navy-800">
                                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" alt="Cybersecurity" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent flex items-end p-6">
                                                <span className="text-white text-xs font-black uppercase tracking-widest shadow-black drop-shadow-md">Verified Project</span>
                                            </div>
                                        </div>
                                        <h4 className="font-black text-lg mb-1 group-hover:text-emerald-400 transition-colors text-white">Neural Network Sandbox</h4>
                                        <p className="text-slate-400 text-sm font-bold">A Python-based deep learning playground for high schoolers.</p>
                                    </div>
                                    <div
                                        onClick={() => alert("Upload your competition project to build a professional portfolio.")}
                                        className="border-4 border-dashed border-navy-800 rounded-[2.5rem] flex flex-col items-center justify-center p-10 text-center hover:bg-navy-800/50 transition-all cursor-pointer group"
                                    >
                                        <div className="w-16 h-16 bg-navy-800 rounded-[1.5rem] flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                                            <Plus size={32} />
                                        </div>
                                        <span className="text-sm font-black text-slate-500 uppercase tracking-widest group-hover:text-emerald-400/70">Upload Submission</span>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Visualizer */}
                            <div className="bg-gradient-to-br from-navy-900 to-navy-950 p-8 md:p-12 text-white overflow-hidden relative rounded-[3rem] border border-white/5">
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-10">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                            <TrendingUp size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black tracking-tight">Talent Analytics</h3>
                                            <p className="text-slate-400 text-sm font-bold">Data-driven performance insights</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                                        {[
                                            { label: 'Coding', val: '80%', color: 'bg-blue-500' },
                                            { label: 'Speech', val: '65%', color: 'bg-purple-500' },
                                            { label: 'Teamwork', val: '95%', color: 'bg-emerald-500' },
                                            { label: 'Logic', val: '88%', color: 'bg-orange-500' }
                                        ].map(s => (
                                            <div key={s.label}>
                                                <div className="flex justify-between items-end mb-3">
                                                    <div className="text-slate-400 text-xs font-black uppercase tracking-widest">{s.label}</div>
                                                    <div className="text-sm font-black text-white">{s.val}</div>
                                                </div>
                                                <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: s.val }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                                        className={`h-full ${s.color} rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                {/* Abstract shape */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-20 -mt-20 blur-[80px]"></div>
                                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full -ml-10 -mb-10 blur-[60px]"></div>
                            </div>

                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;
