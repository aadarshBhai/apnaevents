import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Navbar from '../components/premium/Navbar';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        alert('Message sent! We will get back to you soon.');
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
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full btn-primary flex items-center justify-center gap-2"
                                    >
                                        Send Message <Send size={18} />
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