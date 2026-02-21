import { motion } from 'framer-motion';
import { ShieldCheck, Calendar, Trophy, Award, MapPin, Building2, Download, Share2, ChevronRight, Activity, TrendingUp, Lock, Plus, Shield } from 'lucide-react';
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
            // navigate('/'); 
        }
    }, [user, loading, navigate]);

    const participationHistory = [
        { event: "National Science Olympiad", status: "Gold Medalist", date: "Jan 2026", category: "Academic" },
        { event: "Mumbai Inter-School Debates", status: "Qualified", date: "Dec 2025", category: "Speech" },
        { event: "Zonal Football Championship", status: "Honorable Mention", date: "Oct 2025", category: "Sports" },
    ];

    const badges = [
        { icon: <Trophy className="text-[#fcb900]" />, label: "Academic Elite 1%", color: "bg-amber-50 border-amber-100 text-[#926300]" },
        { icon: <Award className="text-[#0d3862]" />, label: "Scholastic Pioneer", color: "bg-blue-50 border-blue-100 text-[#0d3862]" },
        { icon: <ShieldCheck className="text-[#911116]" />, label: "Verified Candidate", color: "bg-red-50 border-red-100 text-[#911116]" },
    ];

    const handleDownload = () => {
        alert("Generating your Verified Academic Transcript... Your credentials will be ready in a moment.");
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Academic Profile - ${user?.name || 'Candidate'}`,
                text: 'Check out my verified academic trajectory on the ApnaEvents Network.',
                url: window.location.href,
            }).catch(console.error);
        } else {
            alert("Institutional link copied to clipboard.");
        }
    };

    if (loading || !user) return null;

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            <Navbar />

            <div className="pt-40 pb-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12">

                        {/* Left Sidebar - Profile Summary */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-4"
                        >
                            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-10 text-center sticky top-36 shadow-xl shadow-slate-200/50">
                                <div className="relative w-40 h-40 mx-auto mb-8">
                                    <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden border-4 border-white shadow-2xl">
                                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=0d3862&color=fff&size=512&bold=true`} alt="Profile" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-[#911116] text-white p-2.5 rounded-2xl border-4 border-slate-50 shadow-lg">
                                        <ShieldCheck size={24} />
                                    </div>
                                </div>

                                <h2 className="text-3xl font-serif font-bold mb-2 tracking-tight text-[#0d3862]">{user.name}</h2>
                                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] mb-8">{user.role === 'student' ? 'Scholastic Candidate' : 'Institutional Host'}</p>

                                <div className="flex flex-col gap-4 mb-10 text-left">
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-700 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#0d3862] border border-slate-100">
                                            <Building2 size={20} />
                                        </div>
                                        <span className="line-clamp-1">Institutional Affiliation Active</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-700 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-[#911116] border border-slate-100">
                                            <MapPin size={20} />
                                        </div>
                                        <span>Verified Academic Region</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-10">
                                    <div className="p-6 bg-blue-50/50 rounded-2xl border border-blue-100 text-center">
                                        <div className="text-3xl font-serif font-bold text-[#0d3862] mb-1">12</div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Records</div>
                                    </div>
                                    <div className="p-6 bg-red-50/50 rounded-2xl border border-red-100 text-center">
                                        <div className="text-3xl font-serif font-bold text-[#911116] mb-1">4</div>
                                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Distinctions</div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <button onClick={handleDownload} className="w-full py-4 bg-[#0d3862] text-white font-bold uppercase tracking-widest text-xs rounded-xl transition-all shadow-lg shadow-blue-900/10 flex items-center justify-center gap-3">
                                        <Download size={18} /> Merit Transcript
                                    </button>
                                    <button onClick={handleShare} className="w-full py-4 bg-white text-[#0d3862] border border-slate-200 font-bold uppercase tracking-widest text-xs rounded-xl transition-all flex items-center justify-center gap-3 hover:bg-slate-50">
                                        <Share2 size={18} /> Public Profile
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Content Area */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="lg:col-span-8 space-y-12"
                        >

                            {/* Badges Section */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                                <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-2xl font-serif font-bold flex items-center gap-4 text-[#0d3862]">
                                        <Award className="text-[#fcb900]" size={32} /> Scholastic Distinctions
                                    </h3>
                                    <button className="text-[#911116] text-[10px] font-bold uppercase tracking-widest hover:underline">View All Records</button>
                                </div>
                                <div className="flex flex-wrap gap-6">
                                    {badges.map((badge, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            className={`${badge.color} px-6 py-5 rounded-[2rem] flex items-center gap-4 border shadow-sm`}
                                        >
                                            <div className="p-3 bg-white/50 rounded-2xl">
                                                {badge.icon}
                                            </div>
                                            <span className="font-bold text-xs uppercase tracking-widest">{badge.label}</span>
                                        </motion.div>
                                    ))}
                                    <div
                                        onClick={() => alert("Participate in verified events to unlock institutional recognition.")}
                                        className="border-2 border-dashed border-slate-200 px-8 py-5 rounded-[2rem] flex items-center gap-4 text-slate-400 font-bold text-xs uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full border-2 border-slate-200 flex items-center justify-center">+</div>
                                        <span>New Mandate</span>
                                    </div>
                                </div>
                            </div>

                            {/* Verified Activity Section */}
                            <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-sm">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold flex items-center gap-4 text-[#0d3862] mb-2">
                                            <ShieldCheck size={32} className="text-[#911116]" /> Academic Manifest
                                        </h3>
                                        <p className="text-slate-500 text-sm font-medium">Verified historical record of scholastic participations.</p>
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-50 text-[#0d3862] text-[10px] font-bold uppercase tracking-widest border border-blue-100">
                                        <Shield size={14} /> Institutional Integrity Active
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {participationHistory.map((item, idx) => (
                                        <motion.div
                                            whileHover={{ x: 10 }}
                                            key={idx}
                                            className="flex items-center gap-6 p-6 rounded-[2rem] bg-slate-50 hover:bg-white transition-all group cursor-pointer border border-transparent hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100"
                                        >
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-[#0d3862] group-hover:bg-[#0d3862] group-hover:text-white transition-all transform group-hover:rotate-6">
                                                {item.category === 'Academic' ? <Trophy size={28} /> : item.category === 'Sports' ? <MapPin size={28} /> : <Award size={28} />}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h4 className="font-serif font-bold text-xl text-[#0d3862]">{item.event}</h4>
                                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-4">{item.date}</span>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{item.category}</p>
                                                    <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 text-[#0d3862] text-[9px] font-bold uppercase tracking-wider border border-blue-100">
                                                        {item.status}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-slate-200 group-hover:text-[#911116] transition-colors hidden sm:block">
                                                <ChevronRight size={28} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => alert("Full trajectory visualization is available for verified candidates.")}
                                    className="w-full mt-12 py-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0d3862] hover:bg-slate-50 rounded-[2rem] transition-all border border-slate-100 flex items-center justify-center gap-3"
                                >
                                    Chronological Career Archive <TrendingUp size={18} />
                                </button>
                            </div>

                            {/* Talent Analytics Visualizer */}
                            <div className="bg-[#0d3862] p-10 md:p-16 text-white overflow-hidden relative rounded-[3.5rem] shadow-2xl overflow-hidden group">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full -mr-32 -mt-32 blur-[100px] pointer-events-none group-hover:bg-white/10 transition-all duration-1000"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-5 mb-12">
                                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                            <Activity size={32} className="text-[#fcb900]" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-serif font-bold tracking-tight">Merit Analytics</h3>
                                            <p className="text-blue-200/80 text-xs font-bold uppercase tracking-widest">Digital Intelligence Quotient</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                                        {[
                                            { label: 'Critical Syntax', val: '80%', color: 'bg-[#fcb900]' },
                                            { label: 'Rhetoric', val: '65%', color: 'bg-[#911116]' },
                                            { label: 'Synergy', val: '95%', color: 'bg-emerald-500' },
                                            { label: 'Quant Logic', val: '88%', color: 'bg-blue-400' }
                                        ].map(s => (
                                            <div key={s.label}>
                                                <div className="flex justify-between items-end mb-4">
                                                    <div className="text-blue-100/60 text-[9px] font-bold uppercase tracking-[0.2em]">{s.label}</div>
                                                    <div className="text-sm font-bold text-white">{s.val}</div>
                                                </div>
                                                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: s.val }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 2, ease: "circOut" }}
                                                        className={`h-full ${s.color} rounded-full`}
                                                    ></motion.div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
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
