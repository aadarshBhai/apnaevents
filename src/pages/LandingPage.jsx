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
        <div className="min-h-screen bg-navy-950 font-['Outfit']">
            <SEO
                title="EventDekho - India's Premier Merit Pipeline"
                description="Join India's best competitions for Class 9-12 students. Verified events, cash prizes, and certificates recognized by top schools."
                keywords="olympiad competitions, online contests, class 9-12 competitions, science olympiad, math olympiad, student scholarships"
            />
            <Navbar />

            <main>
                <Hero stats={stats} />
                <FeatureCards />

                {/* Blog Section - Competitive Exams Content */}
                <section className="py-24 bg-navy-900 relative">
                    <div className="container-custom px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-display font-black text-white mb-6">
                                Competitive Exams for <span className="text-amber-500 italic">Class 9</span> Students in India
                            </h2>
                            <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-12">
                                Class 9th is a critical point in a student's school learning journey. The student doesn't yet have the class 10th board pressure and yet is mature enough to face national-level competitions.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="glass-card p-8 rounded-3xl border-white/5"
                            >
                                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                    <Trophy className="text-amber-500" size={24} />
                                    NSEJS
                                </h3>
                                <p className="text-slate-300 mb-4 leading-relaxed">
                                    Indian science olympiads are respected worldwide for the quality of students they send every year in the international stages of competition. The Science Olympiad program in India follows a five-stage procedure.
                                </p>
                                <ul className="space-y-3 text-slate-400 font-medium">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> National Standard Examination in Junior Science (NSEJS)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Indian National Olympiad in Junior Science (INJSO)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Orientation cum Selection Camp (OCSC)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pre-departure Training Camp (PDT)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> International Junior Science Olympiad (IJSO)</li>
                                </ul>
                                <p className="text-xs text-slate-500 mt-6 font-bold uppercase tracking-wider">
                                    AGE GROUP: 14-15 YEARS | LEVEL: SECONDARY (UP TO CLASS X)
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="glass-card p-8 rounded-3xl border-white/5"
                            >
                                <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                    <Target className="text-amber-500" size={24} />
                                    Pre-RMO
                                </h3>
                                <p className="text-slate-300 mb-4 leading-relaxed">
                                    The Mathematical Olympiad Programme in India leads to participation of Indian students in the International Mathematical Olympiad (IMO).
                                </p>
                                <ul className="space-y-3 text-slate-400 font-medium">
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Pre-Regional Mathematical Olympiad (Pre-RMO)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Regional Mathematical Olympiad (RMO)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Indian National Mathematical Olympiad (INMO)</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> IMO Training Camp</li>
                                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> International Mathematical Olympiad (IMO)</li>
                                </ul>
                                <p className="text-xs text-slate-500 mt-6 font-bold uppercase tracking-wider">
                                    ELIGIBILITY: CLASS 8 TO CLASS 12
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="glass-card p-8 rounded-3xl mt-12 border-white/5"
                        >
                            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3">
                                <Award className="text-amber-500" size={24} />
                                NSTSE
                            </h3>
                            <p className="text-slate-300 mb-4 leading-relaxed">
                                NSTSE stands for National Level Science Talent Search Exam. This diagnostic test identifies talented students from classes II to XII.
                            </p>
                            <p className="text-sm text-slate-500 mt-4 font-medium italic">
                                All these examinations are prestigious. Even if students don't qualify, the prep multifold enhances academic abilities.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-24 bg-navy-950/50">
                    <div className="container-custom px-4">
                        <div className="grid lg:grid-cols-2 gap-16">
                            {/* Recently Added */}
                            <div>
                                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Recently <span className="text-amber-500">Added</span></h2>
                                    <button onClick={() => navigate('/events?sortBy=createdAt')} className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors">View Archive</button>
                                </div>
                                <div className="grid gap-4">
                                    {recentlyAdded.map((event) => (
                                        <EventCard key={event._id} {...event} isList={true} />
                                    ))}
                                </div>
                            </div>

                            {/* Upcoming Deadlines */}
                            <div>
                                <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight">Closing <span className="text-rose-500">Soon</span></h2>
                                    <button onClick={() => navigate('/events?sortBy=deadline')} className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:text-amber-400 transition-colors">View All</button>
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

                <section className="py-24 bg-navy-900 relative">
                    <div className="container-custom px-4">
                        <div className="flex justify-between items-end mb-12">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-4">
                                    Featured <span className="text-amber-500">Exhibitions</span>
                                </h2>
                                <p className="text-slate-400 font-medium">Hand-picked competitions for maximum academic impact.</p>
                            </motion.div>
                            <motion.button
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                onClick={() => navigate('/events')}
                                className="hidden md:flex items-center gap-2 text-amber-500 font-black uppercase tracking-widest text-xs hover:text-amber-400 transition-colors"
                            >
                                Explore All <ArrowRight size={20} />
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

                        <div className="mt-16 text-center md:hidden">
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

                {/* Why List With Us Section */}
                <section className="py-24 bg-navy-950 border-y border-white/5">
                    <div className="container-custom px-4">
                        <div className="max-w-4xl mx-auto text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6">Partner <span className="text-amber-500">With Us</span></h2>
                            <p className="text-slate-400 text-lg font-medium">Reach 50,000+ ambitious students through India's premier merit pipeline.</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="glass-card p-10 rounded-[2.5rem] text-center border-white/5">
                                <div className="w-16 h-16 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-amber-500/20">
                                    <Users size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Academic Focus</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">Highly targeted audience of Class 9-12 students seeking elite recognition.</p>
                            </div>
                            <div className="glass-card p-10 rounded-[2.5rem] text-center border-white/5">
                                <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                                    <Shield size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">Verified Authority</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">Instant credibility through our platform's rigorous manual vetting process.</p>
                            </div>
                            <div className="glass-card p-10 rounded-[2.5rem] text-center border-white/5">
                                <div className="w-16 h-16 bg-rose-500/10 text-rose-400 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-rose-500/20">
                                    <Target size={32} />
                                </div>
                                <h3 className="text-xl font-black text-white mb-4 uppercase tracking-tight">National Reach</h3>
                                <p className="text-slate-400 text-sm leading-relaxed font-medium">Access students from top-tier institutions across every state in India.</p>
                            </div>
                        </div>

                        <div className="mt-16 text-center">
                            <button onClick={() => navigate('/submit-event')} className="btn-primary px-12 py-5 text-lg font-black rounded-2xl shadow-2xl shadow-amber-500/20">
                                Partner with EventDekho
                            </button>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-gradient-to-br from-[#0f172a] to-[#020617] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                    <div className="container-custom px-4 relative z-10 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8">
                                Join the <span className="text-amber-500 italic">Merit</span> Pipeline
                            </h2>
                            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-medium">
                                Join {stats.students} students who are already using EventDekho to discover, compete, and lead.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center gap-6">
                                <button onClick={() => navigate('/signup')} className="btn-primary text-lg px-10 py-4">
                                    Create Merit Profile
                                </button>
                                <button onClick={() => navigate('/events')} className="px-10 py-4 bg-white/5 text-white rounded-2xl font-bold hover:bg-white/10 transition-colors border border-white/10 backdrop-blur-sm">
                                    Browse Opportunities
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* SEO Comparison Table */}
                <SEOComparisonTable
                    title="Compare Online Olympiad Competitions for Class 9-12 Students"
                    data={olympiadComparisonData}
                />

                {/* SEO Internal Links */}
                <SEOInternalLinks links={internalLinks} />
            </main>

            <Footer stats={stats} />
        </div>
    );
};

export default LandingPage;
