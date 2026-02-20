import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, ArrowRight, ArrowLeft, School, FileText, Calendar, Phone, Mail, Trophy, Info } from 'lucide-react';
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
        category: 'Inter-School Competition'
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
            setError(err.response?.data?.message || 'Failed to submit proposal. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-navy-950 text-slate-300">
                <Navbar />
                <div className="pt-32 pb-24 flex items-center justify-center">
                    <div className="container-custom px-4 text-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="glass-card max-w-2xl mx-auto p-12 rounded-[2.5rem] border border-emerald-500/20"
                        >
                            <div className="w-20 h-20 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 border-2 border-emerald-500/30">
                                <CheckCircle size={48} />
                            </div>
                            <h2 className="text-4xl font-display font-black text-white mb-4">Submission Received!</h2>
                            <p className="text-slate-400 text-lg mb-10">
                                Thank you for choosing ApnaEvents. Our team will verify the competition details and reach out to you within 24 hours to finalize the listing.
                            </p>
                            <button
                                onClick={() => navigate('/')}
                                className="btn-primary px-8 py-4 rounded-xl font-bold flex items-center gap-2 mx-auto"
                            >
                                Back to Home <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy-950 text-slate-300 selection:bg-emerald-500/30">
            <SEO
                title="List Your School Competition | ApnaEvents"
                description="List your school competition on India's most trusted platform for Class 9-12 students. Get verified and reach thousands of students."
            />
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="container-custom px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-bold mb-8 transition-colors"
                        >
                            <ArrowLeft size={20} /> Back
                        </motion.button>

                        <div className="grid lg:grid-cols-5 gap-12">
                            {/* Left Side - Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div>
                                    <h1 className="text-4xl font-display font-black text-white mb-6 leading-tight">
                                        Grow Your <span className="text-emerald-400">Competition's</span> Reach
                                    </h1>
                                    <p className="text-slate-400 leading-relaxed font-medium">
                                        Join hundreds of schools across India who list their competitions with us to ensure high-quality participation and seamless discovery.
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 bg-emerald-500/10 text-emerald-500 rounded-xl flex items-center justify-center shrink-0 border border-emerald-500/20">
                                            <Trophy size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">Targeted Audience</h3>
                                            <p className="text-sm text-slate-500">Exclusively for Class 9–12 students who are actively looking for opportunities.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-xl flex items-center justify-center shrink-0 border border-blue-500/20">
                                            <CheckCircle size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">Verified Badge</h3>
                                            <p className="text-sm text-slate-500">Every listing gets a verified badge which increases trust by 3x.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start">
                                        <div className="w-10 h-10 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center shrink-0 border border-purple-500/20">
                                            <Info size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold mb-1">Expert Support</h3>
                                            <p className="text-sm text-slate-500">Our team helps you structure your event page for maximum conversions.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="glass-card p-6 rounded-2xl border-white/5">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Tip</p>
                                    <p className="text-sm text-slate-300 italic leading-relaxed">
                                        "School Principals typically prefer early onboarding to ensure maximum slots are filled before the board exams season."
                                    </p>
                                </div>
                            </div>

                            {/* Right Side - Form */}
                            <div className="lg:col-span-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="glass-card p-8 md:p-10 rounded-[2.5rem] border-white/5 shadow-2xl"
                                >
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        {error && (
                                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold animate-shake">
                                                {error}
                                            </div>
                                        )}
                                        <div className="space-y-6">
                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-1 transition-colors group-focus-within:text-emerald-400">
                                                    <School size={14} /> School / Organizer Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="schoolName"
                                                    value={formData.schoolName}
                                                    onChange={handleChange}
                                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-bold text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                    placeholder="e.g. DPS International"
                                                    required
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-1 transition-colors group-focus-within:text-emerald-400">
                                                    <Trophy size={14} /> Competition / Event Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="eventName"
                                                    value={formData.eventName}
                                                    onChange={handleChange}
                                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-bold text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                    placeholder="e.g. National Inter-School Tech Summit"
                                                    required
                                                />
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="group">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-1 transition-colors group-focus-within:text-emerald-400">
                                                        <Calendar size={14} /> Event Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="date"
                                                        value={formData.date}
                                                        onChange={handleChange}
                                                        className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-bold text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                        placeholder="e.g. 15 March 2026"
                                                        required
                                                    />
                                                </div>
                                                <div className="group">
                                                    <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-1 transition-colors group-focus-within:text-emerald-400">
                                                        <Phone size={14} /> Contact Number
                                                    </label>
                                                    <input
                                                        type="tel"
                                                        name="contactNumber"
                                                        value={formData.contactNumber}
                                                        onChange={handleChange}
                                                        className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-bold text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                        placeholder="+91 XXXXX XXXXX"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-1 transition-colors group-focus-within:text-emerald-400">
                                                    <Mail size={14} /> Official Email
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-bold text-white placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10"
                                                    placeholder="admin@school.com"
                                                    required
                                                />
                                            </div>

                                            <div className="group">
                                                <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 pl-1 transition-colors group-focus-within:text-emerald-400">
                                                    <FileText size={14} /> Short Description
                                                </label>
                                                <textarea
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    rows="4"
                                                    className="w-full py-4 px-6 bg-white/5 border border-white/10 rounded-2xl font-medium text-slate-300 placeholder:text-slate-600 outline-none transition-all focus:border-emerald-500/50 focus:bg-white/10 resize-none"
                                                    placeholder="Briefly describe the competition and its highlights..."
                                                    required
                                                ></textarea>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="btn-primary w-full py-5 rounded-2xl font-black text-xl tracking-tight shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 group"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            ) : (
                                                <>Submit for Verification <ArrowRight className="group-hover:translate-x-1 transition-transform" /></>
                                            )}
                                        </button>

                                        <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            By submitting, you agree to our verified listing terms.
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
