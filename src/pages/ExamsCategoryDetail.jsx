import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, Calendar, Award, Target } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';

const ExamsCategoryDetail = () => {
    const { category } = useParams();

    const examData = {
        'jee': {
            name: 'JEE (Joint Entrance Examination)',
            description: 'National level entrance exam for admission to engineering colleges in India',
            details: [
                { label: 'Conducting Body', value: 'NTA' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Online' },
                { label: 'Duration', value: '3 Hours' },
            ]
        },
        'neet': {
            name: 'NEET (National Eligibility cum Entrance Test)',
            description: 'National level entrance exam for admission to medical colleges in India',
            details: [
                { label: 'Conducting Body', value: 'NTA' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Offline' },
                { label: 'Duration', value: '3 Hours 20 Minutes' },
            ]
        },
        'cuet': {
            name: 'CUET (Common University Entrance Test)',
            description: 'Common entrance test for admission to central universities',
            details: [
                { label: 'Conducting Body', value: 'NTA' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Online' },
                { label: 'Duration', value: '2 Hours' },
            ]
        },
        'clat': {
            name: 'CLAT (Common Law Admission Test)',
            description: 'National level entrance exam for admission to law colleges',
            details: [
                { label: 'Conducting Body', value: 'CNLU' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Online' },
                { label: 'Duration', value: '2 Hours' },
            ]
        },
        'nda': {
            name: 'NDA (National Defence Academy)',
            description: 'Entrance exam for admission to Indian Armed Forces',
            details: [
                { label: 'Conducting Body', value: 'UPSC' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Offline' },
                { label: 'Duration', value: '5 Hours (2 Papers)' },
            ]
        },
        'ipmat': {
            name: 'IPMAT (Integrated Program in Management Aptitude Test)',
            description: 'Entrance exam for 5-year integrated management programs',
            details: [
                { label: 'Conducting Body', value: 'IIM Indore' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Online' },
                { label: 'Duration', value: '2 Hours' },
            ]
        },
        'nift': {
            name: 'NIFT (National Institute of Fashion Technology)',
            description: 'Entrance exam for admission to fashion design colleges',
            details: [
                { label: 'Conducting Body', value: 'NIFT' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Offline' },
                { label: 'Duration', value: '3 Hours' },
            ]
        },
        'uceed': {
            name: 'UCEED (Undergraduate Common Entrance Exam for Design)',
            description: 'Entrance exam for admission to design courses at IITs',
            details: [
                { label: 'Conducting Body', value: 'IIT Bombay' },
                { label: 'Exam Level', value: 'National' },
                { label: 'Mode', value: 'Online' },
                { label: 'Duration', value: '3 Hours' },
            ]
        },
        'sat': {
            name: 'SAT (Scholastic Assessment Test)',
            description: 'International standardized test for undergraduate admissions abroad',
            details: [
                { label: 'Conducting Body', value: 'College Board' },
                { label: 'Exam Level', value: 'International' },
                { label: 'Mode', value: 'Offline/Online' },
                { label: 'Duration', value: '3 Hours' },
            ]
        }
    };

    const data = examData[category] || {
        name: 'Entrance Exam',
        description: 'Details about this entrance exam',
        details: []
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            <CareerGuidanceNavbar />
            <main className="pt-40 pb-20">
                <div className="container-custom px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <BookOpen className="w-10 h-10 text-[#721c24]" />
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#212529]">{data.name}</h1>
                        </div>
                        <p className="text-lg text-[#495057] font-sans max-w-2xl">{data.description}</p>
                    </motion.div>

                    {data.details.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6 mb-12">
                            {data.details.map((detail, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
                                >
                                    <h3 className="text-sm font-bold text-[#495057] uppercase tracking-widest mb-2 font-sans">{detail.label}</h3>
                                    <p className="text-xl font-serif font-bold text-[#212529]">{detail.value}</p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <BookOpen className="w-16 h-16 text-[#495057] mx-auto mb-6" />
                            <h2 className="text-2xl font-serif font-bold text-[#212529] mb-2">Coming Soon</h2>
                            <p className="text-[#495057] font-sans">We're working on adding details for this exam!</p>
                        </motion.div>
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-serif font-bold text-[#212529] mb-6 flex items-center gap-3">
                            <Calendar className="w-7 h-7 text-[#721c24]" />
                            Important Dates
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                <div>
                                    <p className="text-[#212529] font-semibold font-sans">Application Start</p>
                                    <p className="text-sm text-[#495057] font-sans">Registration opens</p>
                                </div>
                                <span className="text-[#721c24] font-bold font-sans">To be announced</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-gray-100">
                                <div>
                                    <p className="text-[#212529] font-semibold font-sans">Application Deadline</p>
                                    <p className="text-sm text-[#495057] font-sans">Last date to apply</p>
                                </div>
                                <span className="text-[#721c24] font-bold font-sans">To be announced</span>
                            </div>
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <p className="text-[#212529] font-semibold font-sans">Exam Date</p>
                                    <p className="text-sm text-[#495057] font-sans">Test day</p>
                                </div>
                                <span className="text-[#721c24] font-bold font-sans">To be announced</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ExamsCategoryDetail;
