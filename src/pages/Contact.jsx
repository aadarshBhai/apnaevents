import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, Shield } from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import { sendContactMessage } from '../api/contact';
import { updatePageSEO } from '../utils/seo';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        updatePageSEO('contact');
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');
        try {
            await sendContactMessage(formData);
            setSuccess('Message filed successfully. Our administrative team will respond to your institutional primary email.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setError(err.message || 'Communication protocol failed. Please verify network status.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen text-slate-800">
            <Navbar />

            <div className="pt-40 pb-24">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto"
                    >
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#0d3862] mb-6">Institutional <span className="text-[#911116] italic">Inquiries</span></h1>
                            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                                Coordinate with our academic support desk for clarifications regarding merit pipelines, institutional partnerships, or candidate verification protocols.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-5 gap-12">
                            {/* Contact Info */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100 shadow-sm">
                                    <h3 className="text-xl font-serif font-bold mb-8 text-[#0d3862]">Official Channels</h3>

                                    <div className="space-y-8">
                                        {[
                                            { icon: Mail, label: "Academic Support", value: "admin@apnaevents.com", color: "text-[#0d3862]" },
                                            { icon: Phone, label: "Tele-Channel", value: "+91 98765 43210", color: "text-[#0d3862]" },
                                            { icon: MapPin, label: "Central Archive", value: "123 Academic Lane, New Delhi, India", color: "text-[#911116]" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-4">
                                                <div className="bg-white p-3 rounded-xl text-[#0d3862] shadow-sm border border-slate-100">
                                                    <item.icon size={20} />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-[#0d3862] text-xs uppercase tracking-widest mb-1">{item.label}</h4>
                                                    <p className="text-slate-600 font-medium text-sm">{item.value}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-12 p-6 bg-blue-50/50 rounded-xl border border-blue-100 flex gap-4">
                                        <Shield className="text-[#0d3862] shrink-0" size={20} />
                                        <p className="text-[10px] font-bold text-[#0d3862] uppercase tracking-[0.1em] leading-relaxed">
                                            All communications are archived for quality assurance and institutional compliance.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-3 bg-white p-10 rounded-2xl border border-slate-100 shadow-xl">
                                {success && (
                                    <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-[#0d3862] text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#0d3862]" />
                                        {success}
                                    </div>
                                )}

                                {error && (
                                    <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-[#911116] text-xs font-bold uppercase tracking-wider flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-[#911116]" />
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Candidate Identity</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-3.5 text-[#0d3862] placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] transition-all font-semibold shadow-inner"
                                                placeholder="Full Name"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Academic Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-3.5 text-[#0d3862] placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] transition-all font-semibold shadow-inner"
                                                placeholder="scholar@institution.edu"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Subject Protocol</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-3.5 text-[#0d3862] placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] transition-all font-semibold shadow-inner"
                                            placeholder="Nature of Inquiry"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">Manifest Details</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-6 py-3.5 text-[#0d3862] placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] transition-all font-semibold shadow-inner resize-none"
                                            placeholder="Detailed description of your requirement..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#0d3862] text-white py-4 rounded-xl flex items-center justify-center gap-3 disabled:opacity-70 font-bold uppercase tracking-[0.2em] text-xs shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all pointer-events-auto"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                Filing...
                                            </>
                                        ) : (
                                            <>
                                                Dispatch Inquiry <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Contact;