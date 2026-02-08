import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import Hero from '../components/premium/Hero';
import FeatureCards from '../components/premium/FeatureCards';
import Testimonials from '../components/premium/Testimonials';
import EventCard from '../components/EventCard';
import { getEvents, getFeaturedEvents } from '../api/events';
import { createSocket } from '../utils/socket';

const LandingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [socket, setSocket] = useState(null);

    // Initialize Socket.IO for real-time updates
    useEffect(() => {
        const newSocket = createSocket();
        setSocket(newSocket);
        
        newSocket.on('connect', () => {
            console.log('LandingPage: Socket connected');
        });
        
        newSocket.on('eventCreated', (event) => {
            console.log('LandingPage: New event created', event);
            if (event.featured) {
                setEvents(prev => [event, ...prev.slice(0, 5)]); // Keep only 6 featured events
            }
        });
        
        newSocket.on('eventUpdated', (event) => {
            console.log('LandingPage: Event updated', event);
            if (event.featured) {
                setEvents(prev => prev.map(e => e._id === event._id ? event : e));
            }
        });
        
        newSocket.on('eventDeleted', ({ id }) => {
            console.log('LandingPage: Event deleted', id);
            setEvents(prev => prev.filter(e => e._id !== id));
        });
        
        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const featuredData = await getFeaturedEvents();
                if (featuredData.events && featuredData.events.length > 0) {
                    setEvents(featuredData.events.slice(0, 6));
                } else {
                    const data = await getEvents({ limit: 6, featured: true });
                    setEvents(data.events || []);
                }
            } catch (err) {
                console.error("Failed to fetch events", err);
                // Fallback to mock data if API fails
                const mockEvents = [
                    {
                        _id: '1',
                        title: "FASPE FELLOWSHIPS",
                        category: "Fellowship",
                        date: new Date('2026-01-04'),
                        location: "Germany and Poland",
                        eligibility: "Graduate Students",
                        prizes: "Full funding",
                        applicationLink: "bit.ly/faspefellowships",
                        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
                        verified: true,
                        featured: true
                    },
                    {
                        _id: '2',
                        title: "SONY WORLD PHOTOGRAPHY",
                        category: "Photography",
                        date: new Date('2026-01-06'),
                        location: "London, UK",
                        eligibility: "OPEN TO ALL",
                        prizes: "Sony digital kit",
                        applicationLink: "bit.ly/sony",
                        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
                        verified: true,
                        featured: true
                    },
                    {
                        _id: '3',
                        title: "INTEL AI GLOBAL IMPACT",
                        category: "Tech Innovation",
                        date: new Date('2026-02-15'),
                        location: "Global / Online",
                        eligibility: "Students 13-18",
                        prizes: "$5000 + Mentorship",
                        applicationLink: "#",
                        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
                        verified: true,
                        featured: true
                    }
                ];
                setEvents(mockEvents);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="bg-navy-950 min-h-screen text-slate-300 selection:bg-emerald-500/30">
            <Navbar />
            <Hero />
            
            <FeatureCards />

            {/* Featured Events Section */}
            <section className="py-24 bg-navy-900 relative">
                <div className="container-custom px-4">
                    <div className="flex justify-between items-end mb-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
                                Featured <span className="text-emerald-400">Opportunities</span>
                            </h2>
                            <p className="text-slate-400">Hand-picked competitions for maximum impact.</p>
                        </motion.div>
                        <motion.button 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            onClick={() => navigate('/events')}
                            className="hidden md:flex items-center gap-2 text-emerald-400 font-medium hover:text-emerald-300 transition-colors"
                        >
                            View All <ArrowRight size={20} />
                        </motion.button>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event, index) => (
                            <motion.div
                                key={event._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <EventCard {...event} isList={true} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-12 text-center md:hidden">
                        <button 
                            onClick={() => navigate('/events')}
                            className="btn-primary w-full"
                        >
                            View All Opportunities
                        </button>
                    </div>
                </div>
            </section>

            <Testimonials />

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-br from-emerald-900/20 to-navy-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                <div className="container-custom px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                            Ready to Build Your <br/><span className="text-emerald-400">Future?</span>
                        </h2>
                        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                            Join 50,000+ students who are already using ApnaEvents to discover, compete, and win.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-6">
                            <button onClick={() => navigate('/signup')} className="btn-primary text-lg px-8 py-4">
                                Create Free Account
                            </button>
                            <button onClick={() => navigate('/events')} className="px-8 py-4 bg-navy-800 text-white rounded-lg font-medium hover:bg-navy-700 transition-colors border border-navy-700">
                                Browse Events
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            <Footer />
        </div>
    );
};

export default LandingPage;
