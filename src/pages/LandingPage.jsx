import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Calendar, Shield, Target, Award } from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import Hero from '../components/premium/Hero';
import FeatureCards from '../components/premium/FeatureCards';
import Testimonials from '../components/premium/Testimonials';
import EventCard from '../components/EventCard';
import { SEOFAQ, SEOComparisonTable, SEOInternalLinks } from '../components/seo/SEOComponents';
import SEO from '../components/seo/SEO';
import { getEvents, getFeaturedEvents, getPublicStats } from '../api/events';
import { createSocket } from '../utils/socket';
import { updatePageSEO } from '../utils/seo';

const LandingPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [recentlyAdded, setRecentlyAdded] = useState([]);
    const [upcomingDeadlines, setUpcomingDeadlines] = useState([]);
    const [stats, setStats] = useState({ students: '50K+', events: '1.2K+', schools: '500+' });
    const [socket, setSocket] = useState(null);

    // SEO Data
    const olympiadComparisonData = {
        headers: ['Olympiad', 'Class', 'Registration Fee', 'Last Date', 'Prizes'],
        rows: [
            ['National Science Olympiad', 'Class 9-12', '₹125', 'Nov 13, 2025', 'Medals, Certificates, Scholarships'],
            ['International Math Olympiad', 'Class 9-12', '₹125', 'Nov 12, 2025', 'Medals, Certificates, Scholarships'],
            ['English Olympiad', 'Class 9-12', '₹150', 'Dec 10, 2025', '₹5,000 - ₹25,000'],
            ['Computer Olympiad', 'Class 9-12', '₹150', 'Dec 25, 2025', '₹15,000 - ₹75,000'],
            ['General Knowledge Olympiad', 'Class 9-12', '₹125', 'Dec 18, 2025', '₹8,000 - ₹40,000']
        ]
    };

    const faqs = [
        {
            question: "What are Online Olympiad Competitions for Class 9-12 Students?",
            answer: "Online Olympiad competitions are national and international level academic contests for students in classes 9-12. These competitions test knowledge in subjects like Science, Mathematics, English, and Computer Science through online exams."
        },
        {
            question: "How can I register for Olympiad competitions on ApnaEvents?",
            answer: "Simply create a free account on ApnaEvents, browse available Olympiad competitions, and register online. You'll get instant confirmation, exam details, and regular updates about your registered competitions."
        },
        {
            question: "What is registration fee for Olympiad competitions?",
            answer: "Registration fees vary from ₹100 to ₹200 depending on Olympiad type and organizing body. ApnaEvents shows all fees upfront with no hidden charges, and you can pay securely online."
        },
        {
            question: "Are these Olympiad competitions recognized by schools and colleges?",
            answer: "Yes! All Olympiad competitions listed on ApnaEvents are verified and recognized by major educational boards, schools, and colleges across India. Certificates can boost your academic profile."
        },
        {
            question: "What are prizes and benefits of participating in Olympiads?",
            answer: "Prizes range from ₹5,000 to ₹1,00,000 along with medals, certificates, and scholarships. Beyond prizes, participation enhances your academic profile, improves subject knowledge, and opens doors to better opportunities."
        }
    ];

    const internalLinks = [
        {
            href: '/events',
            name: 'ApnaEvents',
            alternateName: 'ApnaEvents',
            icon: <Trophy size={24} />,
            title: 'Browse All Competitions',
            description: 'Explore verified olympiads and contests'
        },
        {
            href: '/about',
            icon: <Shield size={24} />,
            title: 'About ApnaEvents',
            description: 'Learn about our mission and impact'
        },
        {
            href: '/contact',
            icon: <Users size={24} />,
            title: 'Get Support',
            description: 'Contact our team for help'
        },
        {
            href: '/auth',
            icon: <Calendar size={24} />,
            title: 'Create Free Account',
            description: 'Start your competition journey today'
        },
        {
            href: '/events?category=science',
            icon: <Trophy size={24} />,
            title: 'Science Olympiads',
            description: 'Specialized science competitions'
        },
        {
            href: '/events?category=mathematics',
            icon: <Trophy size={24} />,
            title: 'Math Olympiads',
            description: 'Mathematics challenge contests'
        }
    ];

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
                setEvents(prev => [event, ...prev.slice(0, 5)]);
            }
            setRecentlyAdded(prev => [event, ...prev.slice(0, 3)]);
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

    // Update SEO metadata
    useEffect(() => {
        updatePageSEO('home');
    }, []);

    useEffect(() => {
        const fetchEventsData = async () => {
            try {
                // Fetch Platform Stats
                const statsData = await getPublicStats();
                if (statsData) {
                    setStats({
                        students: statsData.students >= 1000 ? `${(statsData.students / 1000).toFixed(1)}K+` : statsData.students,
                        events: statsData.events >= 1000 ? `${(statsData.events / 1000).toFixed(1)}K+` : statsData.events,
                        schools: statsData.schools
                    });
                }

                // Featured Events
                const featuredData = await getFeaturedEvents();
                if (featuredData.events && featuredData.events.length > 0) {
                    setEvents(featuredData.events.slice(0, 6));
                } else {
                    const data = await getEvents({ limit: 6, featured: true });
                    setEvents(data.events || []);
                }

                // Recently Added
                const recentData = await getEvents({ limit: 4, sortBy: 'createdAt', sortOrder: 'desc' });
                setRecentlyAdded(recentData.events || []);

                // Upcoming Deadlines
                const deadlineData = await getEvents({ limit: 4, sortBy: 'deadline', sortOrder: 'asc' });
                setUpcomingDeadlines(deadlineData.events || []);

            } catch (err) {
                console.error("Failed to fetch events", err);
            }
        };

        fetchEventsData();
    }, []);
    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="ApnaEvents - Academic Merit Pipeline"
                description="The premier platform for students to discover verified competitions, build academic portfolios, and connect with global opportunities."
                keywords="liberal arts competitions, science olympiad, ashoka university network, merit scholarship, student excellence"
            />
            <Navbar />

            <main>
                <Hero stats={stats} />
                <FeatureCards />

                {/* Academic Focus Section */}
                <section className="py-24 bg-white relative">
                    <div className="container-custom px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0d3862] mb-6 tracking-tight">
                                Academic <span className="text-[#911116] italic">Excellence Hub</span>
                            </h2>
                            <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-12">
                                We believe in holistic development and critical thinking. Our curated pipeline connects students with world-class opportunities that go beyond traditional testing.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-[#F8FAFC] p-10 md:p-14 rounded-2xl border border-slate-100"
                            >
                                <h3 className="text-xl font-serif font-bold text-[#0d3862] mb-6 flex items-center gap-3">
                                    <Trophy className="text-[#911116]" size={24} />
                                    STEM Olympiads
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    Rigorous national and international competitions in Science and Mathematics, recognized by leading global institutions.
                                </p>
                                <ul className="space-y-3 text-slate-500 font-bold uppercase tracking-[0.15em] text-[10px]">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#911116]" /> National NSEJS / INJSO</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#911116]" /> Regional Math / Pre-RMO</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#911116]" /> International Stages</li>
                                </ul>
                                <p className="text-[10px] text-[#0d3862]/60 mt-8 font-bold uppercase tracking-[0.2em]">
                                    ACADEMIC ELIGIBILITY: CLASS 8-12
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-[#0d3862] p-10 md:p-14 rounded-2xl text-white shadow-lg"
                            >
                                <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-3">
                                    <Target className="text-[#fcb900]" size={24} />
                                    Liberal Arts & Critical Thinking
                                </h3>
                                <p className="text-white/80 mb-6 leading-relaxed">
                                    Expanding horizons through writing contests, debate championships, and interdisciplinary research programs.
                                </p>
                                <ul className="space-y-3 font-bold uppercase tracking-[0.15em] text-[10px] text-white/70">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#fcb900]" /> Inter-School Debating</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#fcb900]" /> Creative Writing Fellowship</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-[#fcb900]" /> Social Science Projects</li>
                                </ul>
                                <p className="text-[10px] text-white/40 mt-8 font-bold uppercase tracking-[0.2em]">
                                    PARTNER NETWORK: ACADEMIC INSTITUTIONS
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section className="py-24 bg-[#F8FAFC]">
                    <div className="container-custom px-4">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Recently Added */}
                            <div>
                                <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                                    <h2 className="text-2xl font-serif font-bold text-[#0d3862]">Recent <span className="text-[#911116]">Additions</span></h2>
                                    <button onClick={() => navigate('/events?sortBy=createdAt')} className="text-[10px] font-bold text-[#0d3862] uppercase tracking-[0.2em] hover:opacity-70 transition-all">Archives</button>
                                </div>
                                <div className="grid gap-4">
                                    {recentlyAdded.map((event) => (
                                        <EventCard key={event._id} {...event} isList={true} />
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Deadlines */}
                            <div>
                                <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                                    <h2 className="text-2xl font-serif font-bold text-[#0d3862]">Upcoming <span className="text-[#911116]">Deadlines</span></h2>
                                    <button onClick={() => navigate('/events?sortBy=deadline')} className="text-[10px] font-bold text-[#0d3862] uppercase tracking-[0.2em] hover:opacity-70 transition-all">View All</button>
                                </div>
                                <div className="grid gap-4">
                                    {upcomingDeadlines.map((event) => (
                                        <EventCard key={event._id} {...event} isList={true} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <SEOFAQ faqs={faqs} />

                <section className="py-24 bg-white relative">
                    <div className="container-custom px-4">
                        <div className="flex justify-between items-end mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0d3862] mb-4 tracking-tight">
                                    Featured <span className="text-[#911116]">Contests</span>
                                </h2>
                                <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Hand-picked for maximum academic value.</p>
                            </motion.div>
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/events')}
                                className="hidden md:flex items-center gap-2 text-[#0d3862] font-bold uppercase tracking-widest text-[10px] hover:opacity-70 transition-all"
                            >
                                Explore Directory <ArrowRight size={14} />
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
                                    <EventCard {...event} isList={false} />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <Testimonials />

                {/* Partner Section */}
                <section className="py-24 bg-[#F8FAFC] border-y border-slate-100">
                    <div className="container-custom px-4">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-serif font-bold text-[#0d3862] mb-8 leading-tight">
                                    Institutional <span className="text-[#911116] block">Partnerships</span>
                                </h2>
                                <p className="text-slate-600 text-lg mb-10">Expand your reach within India's brightest student cohort.</p>

                                <div className="grid gap-4">
                                    {[
                                        { title: "Academic Vetting", icon: <Shield className="text-[#0d3862]" />, desc: "Only high-value, verified competitions are listed." },
                                        { title: "Targeted Cohort", icon: <Users className="text-[#0d3862]" />, desc: "Direct access to ambitious Class 8-12 students." },
                                        { title: "Impact Tracking", icon: <Target className="text-[#0d3862]" />, desc: "Monitor participation and engagement levels." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4 p-6 bg-white rounded-xl border border-slate-100 shadow-sm">
                                            <div className="shrink-0">{item.icon}</div>
                                            <div>
                                                <h4 className="font-bold text-[#0d3862] text-sm mb-1">{item.title}</h4>
                                                <p className="text-slate-500 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#031d33] p-12 rounded-2xl text-center shadow-xl">
                                <Trophy size={48} className="mx-auto mb-8 text-[#fcb900] opacity-80" />
                                <h3 className="text-2xl font-serif font-bold text-white mb-6">Partner With Our Network</h3>
                                <p className="text-white/60 mb-10 font-bold uppercase tracking-wider text-[10px] leading-relaxed">
                                    Empower the next generation of leaders. List your institution's program today.
                                </p>
                                <button onClick={() => navigate('/submit-event')} className="w-full py-4 bg-[#fcb900] text-[#0d3862] font-black rounded-lg uppercase tracking-wider text-xs hover:bg-[#fef84c] transition-colors shadow-lg">
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 bg-white relative overflow-hidden">
                    <div className="container-custom px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#0d3862] mb-8 tracking-tight">
                                Begin Your <span className="text-[#911116]">Journey</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto">
                                Join our network of over {stats.students} students discovering their path to excellence.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <button onClick={() => navigate('/signup')} className="btn-primary px-12 py-4">
                                    Create Student Profile
                                </button>
                                <button onClick={() => navigate('/events')} className="px-12 py-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-bold hover:bg-slate-50 transition-all shadow-sm">
                                    Browse Contests
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <SEOComparisonTable
                    title="Comparative Analysis of Academic Olympiads"
                    data={olympiadComparisonData}
                />

                <SEOInternalLinks links={internalLinks} />
            </main>

            <Footer stats={stats} />
        </div>
    );
};

export default LandingPage;
