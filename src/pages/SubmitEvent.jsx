import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, School, FileText, Calendar, Phone, Mail, Trophy, Info, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

import api from '../api/config';

const SubmitEvent = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        schoolName: '',
        eventName: '',
        date: '',
        contactNumber: '',
        email: '',
        description: '',
        category: 'Scholastic Competition'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await api.post('/proposals', formData);
            if (response.data.success) {
                setIsSuccess(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setError(response.data.message || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error('Submission error:', err);
            setError(err.response?.data?.message || 'Failed to submit proposal. Please verify your credentials.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white text-slate-800">
                <Navbar />
                <div className="pt-48 pb-24 flex items-center justify-center">
                    <div className="container-custom px-4 text-center">
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-slate-50 max-w-2xl mx-auto p-12 lg:p-16 rounded-[2.5rem] border border-slate-100 shadow-xl"
                        >
                            <div className="w-20 h-20 bg-blue-50 text-[#0d3862] rounded-full flex items-center justify-center mx-auto mb-10 border border-blue-100">
                                <CheckCircle size={40} />
                            </div>
                            <h2 className="text-4xl font-serif font-bold text-[#0d3862] mb-6">Manifest Accepted</h2>
                            <p className="text-slate-600 text-lg mb-10 font-medium">
                                Your institutional proposal has been received. Our administrative board will verify the academic merits and reach out via official channels within 24 hours.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="btn-primary px-10 py-4 rounded-xl font-bold flex items-center justify-center gap-3 mx-auto"
                            >
                                Return to Hub <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            <SEO
                title="Institutional Proposal | ApnaEvents Academic Network"
                description="Coordinate your academic competition discovery through India's premier merit platform. Register your institutional program for verification."
            />
            <Navbar />

            <div className="pt-40 pb-24">
                <div className="container-custom px-4">
                    <div className="max-w-5xl mx-auto">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-400 hover:text-[#0d3862] font-bold mb-10 transition-colors uppercase tracking-widest text-[10px]"
                        >
                            <ArrowLeft size={16} /> Previous Page
                        </motion.button>

                        <div className="grid lg:grid-cols-5 gap-16">
                            {/* Left Side - Info */}
                            <div className="lg:col-span-2 space-y-10">
                                <div>
                                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#0d3862] mb-8 leading-tight">
                                        Expand Your <span className="text-[#911116] italic">Institutional</span> Presence
                                    </h1>
                                    <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                        Partner with the ApnaEvents Network to ensure your academic programs reach the country's most ambitious student cohort.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    {[
                                        { icon: Trophy, title: "Elite Candidate Cohort", desc: "Connect directly with students from India's topper-tier institutions.", color: "text-[#fcb900]", bg: "bg-amber-50" },
                                        { icon: ShieldCheck, title: "Academic Accreditation", desc: "Every program receives a verified mandate, ensuring high institutional trust.", color: "text-[#0d3862]", bg: "bg-blue-50" },
                                        { icon: Info, title: "Curated Showcase", desc: "Our specialists help optimize your call for entries for maximum academic impact.", color: "text-[#911116]", bg: "bg-red-50" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-5 items-start">
                                            <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm`}>
                                                <item.icon size={22} />
                                            </div>
                                            <div>
                                                <h3 className="text-[#0d3862] font-serif font-bold text-lg mb-1">{item.title}</h3>
                                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Directive</p>
                                    <p className="text-sm text-[#0d3862] font-serif font-bold italic leading-relaxed">
                                        "Institutional hosts are encouraged to file proposals early to align with the national academic calendar."
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {error && (
                                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-[#911116] text-[10px] font-bold uppercase tracking-widest">
                                                {error}
                                            </div>
                                        )}
                                        <div className="space-y-6">
                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 group-focus-within:text-[#0d3862] transition-colors">
                                                    <School size={14} /> Official Branding / Institution Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="schoolName"
                                                    value={formData.schoolName}
                                                    onChange={handleChange}
                                                    className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0d3862] placeholder:text-slate-300 outline-none transition-all focus:border-[#fcb900] shadow-inner"
                                                    placeholder="e.g. Ashoka University Academic Council"
                                                    required
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 group-focus-within:text-[#0d3862] transition-colors">
                                                    <Trophy size={14} /> Program / Competition Nomenclature
                                                </label>
                                                <input
                                                    type="text"
                                                    name="eventName"
                                                    value={formData.eventName}
                                                    onChange={handleChange}
                                                    className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0d3862] placeholder:text-slate-300 outline-none transition-all focus:border-[#fcb900] shadow-inner"
                                                    placeholder="e.g. National Inter-School Scholastic Summit"
                                                    required
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="group">
                                                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 group-focus-within:text-[#0d3862] transition-colors">
                                                        <Calendar size={14} /> Scheduled Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="date"
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                        className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0d3862] placeholder:text-slate-300 outline-none transition-all focus:border-[#fcb900] shadow-inner"
                                                        placeholder="e.g. Autumn Term 2026"
                                                        required
                                                    />
                                                </div>
                                                <div className="group">
                                                    <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 group-focus-within:text-[#0d3862] transition-colors">
                                                        <Phone size={14} /> Official Contact Protocol
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="contactNumber"
                                                        value={formData.contactNumber}
                                                        onChange={handleChange}
                                                        className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0d3862] placeholder:text-slate-300 outline-none transition-all focus:border-[#fcb900] shadow-inner"
                                                        placeholder="+91 XXXXX XXXXX"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 group-focus-within:text-[#0d3862] transition-colors">
                                                    <Mail size={14} /> Institutional Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0d3862] placeholder:text-slate-300 outline-none transition-all focus:border-[#fcb900] shadow-inner"
                                                    placeholder="registrar@school.com"
                                                    required
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 pl-1 group-focus-within:text-[#0d3862] transition-colors">
                                                    <FileText size={14} /> Institutional Prospectus
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows="4"
                                                    className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 placeholder:text-slate-300 outline-none transition-all focus:border-[#fcb900] shadow-inner resize-none"
                                                    placeholder="Provide a professional summary of the program and its academic impact..."
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-[#0d3862] text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3 group text-xs disabled:opacity-70 transition-all"
                                        >
                                            {isSubmitting ? (
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                            ) : (
                                                <>Submit Program for Accreditation <ArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                                            )}
                                        </button>

                                        <p className="text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                            Submission of this manifest implies adherence to the verified network guidelines.
                                        </p>
                                    </form>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SubmitEvent;
