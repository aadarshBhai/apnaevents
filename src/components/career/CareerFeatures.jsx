import { motion } from 'framer-motion';
import { CheckCircle, BookOpen, Users, Lightbulb, TrendingUp, Award } from 'lucide-react';

const CareerFeatures = () => {
    const features = [
        {
            icon: CheckCircle,
            title: 'Which Career Fits Me?',
            description: 'Take our career quiz and discover careers matched to your strengths, interests, and personality.'
        },
        {
            icon: BookOpen,
            title: 'Which College & Course?',
            description: 'Compare colleges, courses, fees, placements, and ROI. Find the best option for your budget and goals.'
        },
        {
            icon: Lightbulb,
            title: 'What Exams Do I Need?',
            description: 'Get detailed guides on JEE, NEET, CLAT, CUET, and 15+ other exams with strategies and timelines.'
        },
        {
            icon: TrendingUp,
            title: 'What Skills To Build Now?',
            description: 'Learn the skills that matter for your target career and where to build them—even in Class 11.'
        },
        {
            icon: Users,
            title: 'Mentorship & Guidance',
            description: 'Connect with experts, alumni, and mentors who\'ve walked your path. Get personalized advice.'
        },
        {
            icon: Award,
            title: 'Opportunities Beyond Exams',
            description: 'Discover scholarships, internships, competitions, and real opportunities you can leverage now.'
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <section className="py-20 bg-[#f8f9fa]">
            <div className="container-custom px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-4 font-serif">
                        How We Help You Decide
                    </h2>
                    <p className="text-lg text-[#495057] max-w-2xl mx-auto font-sans">
                        Answer the 5 core questions every Class 11-12 student is asking
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                                    <Icon className="w-6 h-6 text-[#721c24]" />
                                </div>
                                <h3 className="text-xl font-bold text-[#212529] mb-3 font-serif">{feature.title}</h3>
                                <p className="text-[#495057] leading-relaxed font-sans">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CareerFeatures;
