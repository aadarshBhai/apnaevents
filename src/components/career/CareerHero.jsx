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

    return (
        <section className="relative min-h-[90vh] bg-[#f8f9fa] overflow-hidden pt-32 pb-20">
            <div className="container-custom px-4 relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-4xl mx-auto text-center"
                >
                    {/* Subheading - Institutional Style */}
                    <motion.div variants={itemVariants} className="mb-6 inline-block">
                        <span className="px-4 py-2 bg-[#f8f9fa] border border-[#ced4da] text-[#495057] rounded-full text-xs font-semibold uppercase tracking-[0.2em] font-sans">
                            For Class 11–12 Students in India
                        </span>
                    </motion.div>

                    {/* Main headline - Serif Font */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-7xl font-bold text-[#212529] mb-6 leading-tight font-serif"
                    >
                        Confused About Your
                        <span className="text-[#721c24]">
                            {" "}Future After 12th?
                        </span>
                    </motion.h1>

                    {/* Subheading text */}
                    <motion.p variants={itemVariants} className="text-xl md:text-2xl text-[#495057] mb-8 max-w-2xl mx-auto leading-relaxed font-sans">
                        We help you make smarter decisions. Find the right career, target the best colleges, and build your roadmap—all in one place.
                    </motion.p>

                    {/* Stats */}
                    <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4 md:gap-8 mb-12 max-w-2xl mx-auto">
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-3xl md:text-4xl font-bold text-[#721c24] font-serif">50K+</div>
                            <div className="text-[#495057] text-sm md:text-base font-sans">Students Guided</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-3xl md:text-4xl font-bold text-[#212529] font-serif">200+</div>
                            <div className="text-[#495057] text-sm md:text-base font-sans">Careers Covered</div>
                        </div>
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <div className="text-3xl md:text-4xl font-bold text-[#212529] font-serif">15+</div>
                            <div className="text-[#495057] text-sm md:text-base font-sans">Exams Explained</div>
                        </div>
                    </motion.div>

                    {/* CTA Buttons - Brand Identity */}
                    <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button
                            onClick={() => navigate('/career-quiz')}
                            onMouseEnter={() => setHoveredButton('quiz')}
                            onMouseLeave={() => setHoveredButton(null)}
                            className="group relative px-8 py-4 bg-[#ced4da] text-white font-semibold rounded-xl hover:bg-[#adb5bd] transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden shadow-sm font-sans"
                        >
                            <span className="relative z-10">Take Career Quiz</span>
                            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${hoveredButton === 'quiz' ? 'translate-x-1' : ''}`} />
                        </button>

                        <button
                            onClick={() => navigate('/careers')}
                            className="px-8 py-4 bg-white border-2 border-[#721c24] text-[#721c24] font-semibold rounded-xl hover:bg-[#721c24] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-sm font-sans"
                        >
                            <Zap className="w-5 h-5" />
                            <span>Explore Careers</span>
                        </button>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-6 text-[#495057] text-sm md:text-base font-sans"
                    >
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-[#721c24]" />
                            <span>Career Pathways</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🎓</span>
                            <span>College Finder</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-lg">📊</span>
                            <span>Exam Strategies</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default CareerHero;
