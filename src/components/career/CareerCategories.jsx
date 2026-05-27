import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Stethoscope, Briefcase, Scale, Palette, Users, Zap } from 'lucide-react';

const CareerCategories = () => {
    const navigate = useNavigate();

    const categories = [
        {
            id: 'engineering',
            name: 'Engineering & Technology',
            description: 'Build the future with coding, AI, and innovation',
            icon: Code,
            careers: 18,
            exams: ['JEE Main', 'JEE Advanced', 'BITSAT'],
        },
        {
            id: 'medical',
            name: 'Medical & Healthcare',
            description: 'Become a doctor or healthcare professional',
            icon: Stethoscope,
            careers: 15,
            exams: ['NEET UG'],
        },
        {
            id: 'commerce',
            name: 'Commerce & Finance',
            description: 'Excel in finance, accounting, and business',
            icon: Briefcase,
            careers: 12,
            exams: ['CA', 'CMA', 'CS'],
        },
        {
            id: 'law',
            name: 'Law & Justice',
            description: 'Practice law and shape society',
            icon: Scale,
            careers: 10,
            exams: ['CLAT', 'AILET', 'LSAT'],
        },
        {
            id: 'design',
            name: 'Design & Creative',
            description: 'Express creativity in design and arts',
            icon: Palette,
            careers: 14,
            exams: ['NIFT', 'UCEED', 'NATA'],
        },
        {
            id: 'humanities',
            name: 'Humanities & Social Sciences',
            description: 'Explore UPSC, journalism, and more',
            icon: Users,
            careers: 16,
            exams: ['UPSC', 'NET', 'GATE'],
        },
        {
            id: 'modern',
            name: 'Modern & Emerging Careers',
            description: 'Content creation, gaming, startups',
            icon: Zap,
            careers: 20,
            exams: 'None Required',
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
            transition: { duration: 0.5 },
        },
    };

    return (
        <section className="py-20 bg-white">
            <div className="container-custom px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-4 font-serif">
                        Explore <span className="text-[#721c24]">200+ Careers</span>
                    </h2>
                    <p className="text-lg text-[#495057] max-w-2xl mx-auto font-sans">
                        Whether it's engineering, medicine, law, or emerging fields—find your path and see what's required to get there.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {categories.map((category) => {
                        const Icon = category.icon;
                        return (
                            <motion.div
                                key={category.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                onClick={() => navigate(`/careers/${category.id}`)}
                                className="group bg-white border-2 border-gray-100 rounded-2xl p-6 cursor-pointer hover:border-[#721c24] hover:shadow-md transition-all duration-300"
                            >
                                {/* Icon background */}
                                <div className="w-14 h-14 bg-[#f8f9fa] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#721c24] transition-colors border border-gray-100">
                                    <Icon className="w-8 h-8 text-[#721c24] group-hover:text-white transition-colors" />
                                </div>

                                {/* Title and description */}
                                <h3 className="text-xl font-bold text-[#212529] mb-2 font-serif">{category.name}</h3>
                                <p className="text-[#495057] text-sm mb-4 font-sans">{category.description}</p>

                                {/* Stats */}
                                <div className="space-y-2 mb-6 pb-6 border-b border-gray-100">
                                    <div className="text-sm">
                                        <span className="font-semibold text-[#212529] font-sans">{category.careers} Careers</span>
                                        <span className="text-[#495057] font-sans"> • {Array.isArray(category.exams) ? category.exams.join(', ') : category.exams}</span>
                                    </div>
                                </div>

                                {/* CTA */}
                                <button className="w-full flex items-center justify-center gap-2 text-[#721c24] font-semibold group-hover:text-[#5a161d] transition-colors font-sans">
                                    <span>Explore</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
};

export default CareerCategories;
