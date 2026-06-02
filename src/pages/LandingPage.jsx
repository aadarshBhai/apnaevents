import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { ArrowRight, Trophy, Users, Calendar, Target, Award } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';
import CareerHero from '../components/career/CareerHero';
import CareerFeatures from '../components/career/CareerFeatures';
import CareerCategories from '../components/career/CareerCategories';
import Testimonials from '../components/premium/Testimonials';
import { SEOFAQ, SEOInternalLinks } from '../components/seo/SEOComponents';
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

    const faqs = [
        {
            question: "Who should use this platform?",
            answer: "Students in Class 11-12 in India who are confused about their future, unsure which career to pursue, or want to explore options beyond JEE/NEET."
        },
        {
            question: "Do I need to be in a specific stream to use this?",
            answer: "No! We cover Science, Commerce, Humanities, and modern career options for students from all streams."
        },
        {
            question: "Is this only for JEE/NEET preparation?",
            answer: "Not at all. While we cover JEE, NEET, and other exams, we also help you explore 200+ careers including law, journalism, IAS, content creation, and startup opportunities."
        },
        {
            question: "How does the career quiz work?",
            answer: "Take a 5-minute quiz about your strengths, interests, and lifestyle. We'll match you with careers that fit your profile and show you the roadmap to achieve them."
        },
        {
            question: "Can I get personalized guidance?",
            answer: "Yes! Book a free 30-minute call with our experts who can answer specific questions about your career path, college options, and preparation strategy."
        }
    ];

    const internalLinks = [
        {
            href: '/career-quiz',
            name: 'Career Quiz',
            icon: <Trophy size={24} />,
            title: 'Take Career Quiz',
            description: 'Find careers that match your profile'
        },
        {
            href: '/careers',
            icon: <Target size={24} />,
            title: 'Explore Careers',
            description: 'Browse 200+ career options'
        },
        {
            href: '/exams',
            icon: <Award size={24} />,
            title: 'Exam Guides',
            description: 'Learn about JEE, NEET, CLAT, and more'
        },
        {
            href: '/colleges',
            icon: <Users size={24} />,
            title: 'College Finder',
            description: 'Find colleges that match your goals'
        },
        {
            href: '/mentorship',
            icon: <Calendar size={24} />,
            title: 'Book Mentorship',
            description: 'Connect with experts and mentors'
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
                title="Best Career Options After 12th | Career Guidance in India"
                description="Get expert career guidance for students in India. Explore best career options after 12th, government colleges after 12th, private colleges after 12th, high salary courses after 12th science and arts, college application guidance, and entrance exam preparation."
                keywords="career guidance for students, career counselling after 12th, best career options after 12th, career guidance in India, student mentorship platform, college application guidance, career planning for students, future career guidance, government college after 12th grade, college after 12th grade science, private college after 12th grade, college after 12th grade maths, high salary courses after 12th Science, college after 12th grade biology, best college after 12th grade, high salary courses after 12th Arts"
            />
            <CareerGuidanceNavbar />

            <main>
                <CareerHero />
                <CareerFeatures />
                <CareerCategories />
                <Testimonials />

                {/* CTA Section - Brand Identity */}
                <section className="py-20 bg-[#f8f9fa]">
                    <div className="container-custom px-4 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-2xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6 font-serif">Ready to Find Your Path?</h2>
                            <p className="text-xl text-[#495057] mb-8 font-sans">Start with a free career quiz and get personalized recommendations in 5 minutes.</p>
                            <button className="px-8 py-4 bg-[#002D62] text-white font-semibold rounded-xl hover:bg-[#721c24] transition-all hover:scale-105 flex items-center justify-center gap-2 mx-auto shadow-md font-sans">
                                <span>Get Started Now</span>
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section - Brand Identity */}
                <section className="py-20 bg-white">
                    <div className="container-custom px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-4 font-serif">
                                Frequently Asked Questions
                            </h2>
                        </motion.div>
                        <SEOFAQ faqs={faqs} />
                    </div>
                </section>

                {/* Internal Links */}
                <SEOInternalLinks links={internalLinks} />
            </main>

            <Footer />
        </div>
    );
};

export default LandingPage;
