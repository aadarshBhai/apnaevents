import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import { sendContactMessage } from '../api/contact';

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Clear messages when user starts typing
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
            setSuccess('Message sent successfully! We will get back to you soon.');
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
        } catch (err) {
            setError(err.message || 'Failed to send message. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-navy-950 min-h-screen text-slate-300 selection:bg-emerald-500/30">
            <Navbar />
            
            <div className="pt-24 md:pt-32 pb-12">
                <div className="container mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-3xl md:text-5xl font-black mb-6 text-white text-center">Contact Us</h1>
                        <p className="text-slate-400 text-lg text-center mb-12">
                            Have questions? We'd love to hear from you.
                        </p>

                        <div className="grid md:grid-cols-2 gap-10">
                            {/* Contact Info */}
                            <div className="space-y-8">
                                <div className="glass-card p-8 rounded-2xl">
                                    <h3 className="text-xl font-bold mb-6 text-white">Get in Touch</h3>
                                    
                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="bg-emerald-500/10 p-3 rounded-full text-emerald-400">
                                                <Mail size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Email</h4>
                                                <p className="text-slate-400">support@eventdekho.com</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-emerald-500/10 p-3 rounded-full text-emerald-400">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Phone</h4>
                                                <p className="text-slate-400">+91 98765 43210</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="bg-emerald-500/10 p-3 rounded-full text-emerald-400">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Office</h4>
                                                <p className="text-slate-400">123 Education Lane, New Delhi, India</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form */}
                            <div className="glass-card p-8 rounded-2xl">
                                {/* Success Message */}
                                {success && (
                                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                                        {success}
                                    </div>
                                )}

                                {/* Error Message */}
                                {error && (
                                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">
                                        {error}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="Your name"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="your@email.com"
                                            required
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Subject (Optional)</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="input-field"
                                            placeholder="What's this about?"
                                            disabled={isLoading}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-white mb-2">Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            className="input-field resize-none"
                                            placeholder="How can we help you?"
                                            required
                                            disabled={isLoading}
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={18} />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message <Send size={18} />
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Contact;