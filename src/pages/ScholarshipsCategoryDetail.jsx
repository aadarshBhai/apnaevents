import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Calendar, GraduationCap, Target } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';

const ScholarshipsCategoryDetail = () => {
    const { category } = useParams();

    const scholarshipData = {
        'government': {
            name: 'Government Scholarships',
            description: 'Scholarships offered by central and state governments',
            scholarships: [
                { name: 'PMSSS', amount: 'Up to ₹1.25 LPA', deadline: 'To be announced' },
                { name: 'NSP Scholarships', amount: 'Varies', deadline: 'To be announced' },
                { name: 'MCM Scholarship', amount: '₹10,000 per year', deadline: 'To be announced' },
                { name: 'SC/ST Scholarship', amount: 'Varies', deadline: 'To be announced' },
                { name: 'OBC Scholarship', amount: 'Varies', deadline: 'To be announced' },
            ]
        },
        'private': {
            name: 'Private Scholarships',
            description: 'Scholarships offered by private organizations and foundations',
            scholarships: [
                { name: 'Tata Scholarship', amount: 'Up to ₹5 LPA', deadline: 'To be announced' },
                { name: 'Aditya Birla Scholarship', amount: '₹1.5 LPA', deadline: 'To be announced' },
                { name: 'Infosys Foundation Scholarship', amount: 'Varies', deadline: 'To be announced' },
                { name: 'Reliance Foundation Scholarship', amount: 'Varies', deadline: 'To be announced' },
                { name: 'Mahindra Scholarship', amount: 'Varies', deadline: 'To be announced' },
            ]
        },
        'international': {
            name: 'International Scholarships',
            description: 'Scholarships for studying abroad',
            scholarships: [
                { name: 'Fulbright Scholarship', amount: 'Full Tuition', deadline: 'To be announced' },
                { name: 'Chevening Scholarship', amount: 'Full Tuition', deadline: 'To be announced' },
                { name: 'Commonwealth Scholarship', amount: 'Full Tuition', deadline: 'To be announced' },
                { name: 'Erasmus Mundus Scholarship', amount: 'Full Tuition', deadline: 'To be announced' },
                { name: 'DAAD Scholarship', amount: 'Varies', deadline: 'To be announced' },
            ]
        },
        'minority': {
            name: 'Minority Scholarships',
            description: 'Scholarships for minority communities',
            scholarships: [
                { name: 'Maulana Azad Scholarship', amount: '₹12,000 per year', deadline: 'To be announced' },
                { name: 'Post Matric Scholarship', amount: 'Varies', deadline: 'To be announced' },
                { name: 'Merit Scholarship', amount: 'Varies', deadline: 'To be announced' },
                { name: 'Pre Matric Scholarship', amount: 'Varies', deadline: 'To be announced' },
                { name: 'Minority Scholarship', amount: 'Varies', deadline: 'To be announced' },
            ]
        },
        'merit': {
            name: 'Merit-Based Scholarships',
            description: 'Scholarships based on academic performance',
            scholarships: [
                { name: 'CBSE Merit Scholarship', amount: '₹1,000 per month', deadline: 'To be announced' },
                { name: 'INSPIRE Scholarship', amount: '₹80,000 per year', deadline: 'To be announced' },
                { name: 'KVPY Scholarship', amount: '₹5,000 per month', deadline: 'To be announced' },
                { name: 'NTSE Scholarship', amount: '₹1,250 per month', deadline: 'To be announced' },
                { name: 'Olympiad Scholarship', amount: 'Varies', deadline: 'To be announced' },
            ]
        }
    };

    const data = scholarshipData[category] || {
        name: 'Scholarships',
        description: 'Explore scholarship opportunities',
        scholarships: []
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
                            <Award className="w-10 h-10 text-[#721c24]" />
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#212529]">{data.name}</h1>
                        </div>
                        <p className="text-lg text-[#495057] font-sans max-w-2xl">{data.description}</p>
                    </motion.div>

                    {data.scholarships.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.scholarships.map((scholarship, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                                >
                                    <Award className="w-10 h-10 text-[#721c24] mb-4" />
                                    <h3 className="text-xl font-serif font-bold text-[#212529] mb-3">{scholarship.name}</h3>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-[#495057] font-sans">
                                            <GraduationCap className="w-4 h-4" />
                                            <span>Amount: {scholarship.amount}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#495057] font-sans">
                                            <Calendar className="w-4 h-4" />
                                            <span>Deadline: {scholarship.deadline}</span>
                                        </div>
                                    </div>
                                    <button className="w-full py-3 bg-[#ced4da] text-white font-semibold rounded-xl hover:bg-[#adb5bd] transition-all shadow-sm font-sans">
                                        View Details
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Award className="w-16 h-16 text-[#495057] mx-auto mb-6" />
                            <h2 className="text-2xl font-serif font-bold text-[#212529] mb-2">Coming Soon</h2>
                            <p className="text-[#495057] font-sans">We're working on adding scholarships for this category!</p>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ScholarshipsCategoryDetail;
