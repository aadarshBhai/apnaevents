import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';

const CareerHero = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    };

    const heroImage = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200";

    return (
        <section className="relative min-h-[90vh] bg-brand-bgLight overflow-hidden pt-32 pb-20">
            <div className="container-custom px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="max-w-xl"
                    >
                        {/* Subheading - Institutional Style */}
                        <motion.div variants={itemVariants} className="mb-6 inline-block">
                            <span className="px-4 py-2 bg-brand-bgLight border border-brand-cta text-brand-body rounded-full text-xs font-semibold uppercase tracking-[0.2em] font-sans">
                                For Class 11–12 Students in India
                            </span>
                        </motion.div>

                        {/* Main headline - Serif Font */}
                        <motion.h1
                            variants={itemVariants}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-heading mb-6 leading-tight font-serif"
                        >
                            Confused About Your
                            <span className="text-brand-maroon">
                                {" "}Future After 12th?
                            </span>
                        </motion.h1>

                        {/* Subheading text */}
                        <motion.p variants={itemVariants} className="text-base sm:text-lg md:text-xl text-brand-body mb-8 leading-relaxed font-sans">
                            We help you make smarter decisions. Find the right career, target the best colleges, and build your roadmap—all in one place.
                        </motion.p>

                        {/* Stats */}
                        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-3 md:gap-4 md:gap-8 mb-12">
                            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-maroon font-serif">50K+</div>
                                <div className="text-brand-body text-xs md:text-sm md:text-base font-sans">Students Guided</div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-heading font-serif">200+</div>
                                <div className="text-brand-body text-xs md:text-sm md:text-base font-sans">Careers Covered</div>
                            </div>
                            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100">
                                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-heading font-serif">15+</div>
                                <div className="text-brand-body text-xs md:text-sm md:text-base font-sans">Exams Explained</div>
                            </div>
                        </motion.div>

                        {/* CTA Buttons - Brand Identity */}
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <button
                                onClick={() => navigate('/career-quiz')}
                                onMouseEnter={() => setHoveredButton('quiz')}
                                onMouseLeave={() => setHoveredButton(null)}
                                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-brand-heading text-white font-semibold rounded-xl hover:bg-slate-700 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-sm font-sans"
                            >
                                <span className="relative z-10">Take Career Quiz</span>
                                <ArrowRight className={`w-4 sm:w-5 h-4 sm:h-5 transition-transform duration-300 ${hoveredButton === 'quiz' ? 'translate-x-1' : ''}`} />
                            </button>

                            <button
                                onClick={() => navigate('/careers')}
                                className="px-6 sm:px-8 py-3 sm:py-4 bg-white border-2 border-brand-maroon text-brand-maroon font-semibold rounded-xl hover:bg-brand-maroon hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm font-sans"
                            >
                                <Zap className="w-4 sm:w-5 h-4 sm:h-5" />
                                <span>Explore Careers</span>
                            </button>
                        </motion.div>

                        {/* Trust badges */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-6 text-brand-body text-xs md:text-sm md:text-base font-sans"
                        >
                            <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 sm:w-5 h-4 sm:h-5 text-brand-maroon" />
                                <span>Career Pathways</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-base sm:text-lg">🎓</span>
                                <span>College Finder</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-base sm:text-lg">📊</span>
                                <span>Exam Strategies</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10">
                            <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-100">
                                <img
                                    src={heroImage}
                                    alt="Student career guidance session"
                                    className="w-full h-[420px] md:h-[520px] xl:h-[600px] object-cover"
                                    loading="lazy"
                                />
                            </div>

                            {/* Floating Card - Stats */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-4 -left-4 px-5 py-4 bg-white rounded-xl shadow-lg border border-gray-100 flex items-center gap-3"
                            >
                                <div className="w-9 h-9 bg-brand-maroon/10 rounded-lg flex items-center justify-center text-brand-maroon">
                                    <Users size={18} />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-brand-heading">50K+</div>
                                    <div className="text-[9px] font-bold text-brand-body uppercase tracking-wider">Students Guided</div>
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                className="absolute -bottom-4 -right-4 px-5 py-4 bg-brand-maroon rounded-xl shadow-lg flex items-center gap-3"
                            >
                                <div className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center text-white">
                                    <Zap size={18} />
                                </div>
                                <div>
                                    <div className="text-lg font-bold text-white">200+</div>
                                    <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider">Careers Covered</div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CareerHero;
