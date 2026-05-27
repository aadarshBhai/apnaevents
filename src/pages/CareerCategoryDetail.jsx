import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, Code, Stethoscope, Briefcase, Palette, Users, Zap, ArrowRight, BookOpen, TrendingUp, Award } from 'lucide-react';
import SEO from '../components/seo/SEO';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';

const CareerCategoryDetail = () => {
    const { category } = useParams();

    const categoryData = {
        engineering: {
            name: 'Engineering & Technology',
            description: 'Build the future with coding, AI, and innovation',
            icon: Code,
            color: '#721c24',
            careers: [
                'Software Engineer', 'Data Scientist', 'AI/ML Engineer', 'Full Stack Developer',
                'Mechanical Engineer', 'Electrical Engineer', 'Civil Engineer', 'Aerospace Engineer'
            ],
            exams: ['JEE Main', 'JEE Advanced', 'BITSAT', 'VITEEE', 'SRMJEEE'],
            colleges: ['IITs', 'NITs', 'IIITs', 'BITS Pilani', 'VIT Vellore']
        },
        medical: {
            name: 'Medical & Healthcare',
            description: 'Become a doctor or healthcare professional',
            icon: Stethoscope,
            color: '#721c24',
            careers: [
                'Doctor (MBBS)', 'Dentist', 'Pharmacist', 'Nurse',
                'Physiotherapist', 'Biomedical Engineer', 'Public Health Specialist'
            ],
            exams: ['NEET UG', 'AIIMS', 'JIPMER'],
            colleges: ['AIIMS', 'Maulana Azad Medical College', 'KEM Hospital', 'CMC Vellore']
        },
        commerce: {
            name: 'Commerce & Finance',
            description: 'Excel in finance, accounting, and business',
            icon: Briefcase,
            color: '#721c24',
            careers: [
                'Chartered Accountant (CA)', 'Cost Accountant (CMA)', 'Company Secretary (CS)',
                'Investment Banker', 'Financial Analyst', 'Business Manager', 'Entrepreneur'
            ],
            exams: ['CA Foundation', 'CMA Foundation', 'CS Foundation', 'CUET'],
            colleges: ['SRCC', 'Hansraj College', 'Hindu College', 'LSR College']
        },
        law: {
            name: 'Law & Justice',
            description: 'Practice law and shape society',
            icon: Scale,
            color: '#721c24',
            careers: [
                'Lawyer', 'Judge', 'Corporate Counsel', 'Legal Advisor',
                'Public Prosecutor', 'Legal Journalist', 'Human Rights Activist'
            ],
            exams: ['CLAT', 'AILET', 'LSAT', 'SLAT'],
            colleges: ['NLSIU Bangalore', 'NALSAR Hyderabad', 'NLU Delhi', 'NUJS Kolkata']
        },
        design: {
            name: 'Design & Creative',
            description: 'Express creativity in design and arts',
            icon: Palette,
            color: '#721c24',
            careers: [
                'Graphic Designer', 'UX/UI Designer', 'Fashion Designer', 'Interior Designer',
                'Architect', 'Product Designer', 'Animator', 'Film Director'
            ],
            exams: ['NIFT', 'UCEED', 'NATA', 'CEED'],
            colleges: ['NIFT', 'IIT Bombay (IDC)', 'SPA Delhi', 'CEPT Ahmedabad']
        },
        humanities: {
            name: 'Humanities & Social Sciences',
            description: 'Explore UPSC, journalism, and more',
            icon: Users,
            color: '#721c24',
            careers: [
                'IAS Officer', 'Journalist', 'Content Writer', 'Teacher/Professor',
                'Psychologist', 'Sociologist', 'Political Scientist', 'Historian'
            ],
            exams: ['UPSC Civil Services', 'CUET', 'NET', 'GATE'],
            colleges: ['St. Stephen\'s College', 'Miranda House', 'JNU', 'DU']
        },
        modern: {
            name: 'Modern & Emerging Careers',
            description: 'Content creation, gaming, startups',
            icon: Zap,
            color: '#721c24',
            careers: [
                'Content Creator', 'YouTuber', 'Gamer/Esports Athlete', 'Startup Founder',
                'Digital Marketer', 'SEO Specialist', 'Data Analyst', 'Product Manager'
            ],
            exams: ['None Required'],
            colleges: ['Any college (focus on skills and portfolio)']
        }
    };

    const data = categoryData[category] || categoryData.engineering;
    const Icon = data.icon;

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <SEO
                title={`${data.name} - Career Guide`}
                description={`Explore ${data.name} careers. Learn about requirements, exams, colleges, and salary ranges.`}
                keywords={`${data.name}, ${data.name} careers, ${data.exams.join(', ')}`}
            />
            <CareerGuidanceNavbar />
            <main className="pt-32 pb-20">
                <div className="container-custom px-4">
                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl mb-6 shadow-sm">
                            <Icon className="w-4 h-4 text-[#721c24]" />
                            <span className="text-[#721c24] text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
                                Career Category
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-[#212529] mb-6 leading-tight font-serif">
                            {data.name}
                        </h1>
                        <p className="text-xl text-[#495057] max-w-2xl mx-auto leading-relaxed font-sans">
                            {data.description}
                        </p>
                    </motion.div>

                    {/* Key Info Cards */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                                <Award className="w-6 h-6 text-[#721c24]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#212529] mb-3 font-serif">Careers</h3>
                            <ul className="space-y-2">
                                {data.careers.slice(0, 6).map((career, index) => (
                                    <li key={index} className="text-[#495057] font-sans">• {career}</li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                                <BookOpen className="w-6 h-6 text-[#721c24]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#212529] mb-3 font-serif">Entrance Exams</h3>
                            <ul className="space-y-2">
                                {data.exams.map((exam, index) => (
                                    <li key={index} className="text-[#495057] font-sans">• {exam}</li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                        >
                            <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center mb-4 border border-gray-100">
                                <TrendingUp className="w-6 h-6 text-[#721c24]" />
                            </div>
                            <h3 className="text-xl font-bold text-[#212529] mb-3 font-serif">Top Colleges</h3>
                            <ul className="space-y-2">
                                {data.colleges.slice(0, 6).map((college, index) => (
                                    <li key={index} className="text-[#495057] font-sans">• {college}</li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* CTA Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="py-20 bg-white rounded-3xl shadow-sm border border-gray-100 text-center"
                    >
                        <div className="max-w-2xl mx-auto">
                            <h2 className="text-4xl md:text-5xl font-bold text-[#212529] mb-6 font-serif">
                                Ready to Explore More?
                            </h2>
                            <p className="text-xl text-[#495057] mb-8 font-sans">
                                Take our career quiz to get personalized recommendations based on your strengths and interests.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a
                                    href="/career-quiz"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#ced4da] text-white font-semibold rounded-xl hover:bg-[#adb5bd] transition-all hover:scale-105 shadow-sm font-sans"
                                >
                                    <span>Take Career Quiz</span>
                                    <ArrowRight className="w-5 h-5" />
                                </a>
                                <a
                                    href="/careers"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#721c24] text-[#721c24] font-semibold rounded-xl hover:bg-[#721c24] hover:text-white transition-all shadow-sm font-sans"
                                >
                                    <span>Browse All Careers</span>
                                </a>
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CareerCategoryDetail;
