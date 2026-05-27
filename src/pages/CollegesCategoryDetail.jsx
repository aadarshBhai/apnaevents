import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, MapPin, Award, GraduationCap } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';

const CollegesCategoryDetail = () => {
    const { category } = useParams();

    const categoryData = {
        'engineering': {
            name: 'Engineering Colleges',
            description: 'Top engineering colleges in India with excellent infrastructure and placement records',
            colleges: [
                { name: 'IIT Bombay', location: 'Mumbai', ranking: 1, fee: '₹2.5 LPA' },
                { name: 'IIT Delhi', location: 'Delhi', ranking: 2, fee: '₹2.4 LPA' },
                { name: 'IIT Madras', location: 'Chennai', ranking: 3, fee: '₹2.3 LPA' },
                { name: 'NIT Trichy', location: 'Trichy', ranking: 4, fee: '₹1.8 LPA' },
                { name: 'BITS Pilani', location: 'Pilani', ranking: 5, fee: '₹4.5 LPA' },
            ]
        },
        'medical': {
            name: 'Medical Colleges',
            description: 'Prestigious medical colleges offering MBBS and other medical courses',
            colleges: [
                { name: 'AIIMS Delhi', location: 'Delhi', ranking: 1, fee: '₹1.5 LPA' },
                { name: 'PGIMER Chandigarh', location: 'Chandigarh', ranking: 2, fee: '₹1.4 LPA' },
                { name: 'CMC Vellore', location: 'Vellore', ranking: 3, fee: '₹2.0 LPA' },
                { name: 'KEM Hospital Mumbai', location: 'Mumbai', ranking: 4, fee: '₹1.3 LPA' },
                { name: 'MGIMS Wardha', location: 'Wardha', ranking: 5, fee: '₹1.6 LPA' },
            ]
        },
        'law': {
            name: 'Law Colleges',
            description: 'Top law colleges in India offering 5-year integrated and 3-year LLB courses',
            colleges: [
                { name: 'NLSIU Bangalore', location: 'Bangalore', ranking: 1, fee: '₹2.8 LPA' },
                { name: 'NLU Delhi', location: 'Delhi', ranking: 2, fee: '₹2.7 LPA' },
                { name: 'NALSAR Hyderabad', location: 'Hyderabad', ranking: 3, fee: '₹2.6 LPA' },
                { name: 'NUJS Kolkata', location: 'Kolkata', ranking: 4, fee: '₹2.5 LPA' },
                { name: 'GNLU Gandhinagar', location: 'Gandhinagar', ranking: 5, fee: '₹2.4 LPA' },
            ]
        },
        'commerce': {
            name: 'Commerce Colleges',
            description: 'Best colleges for commerce and management studies',
            colleges: [
                { name: 'SRCC Delhi', location: 'Delhi', ranking: 1, fee: '₹1.2 LPA' },
                { name: 'Hindu College Delhi', location: 'Delhi', ranking: 2, fee: '₹1.0 LPA' },
                { name: 'LSR College Delhi', location: 'Delhi', ranking: 3, fee: '₹1.1 LPA' },
                { name: 'St. Xavier\'s College Mumbai', location: 'Mumbai', ranking: 4, fee: '₹1.3 LPA' },
                { name: 'Christ University Bangalore', location: 'Bangalore', ranking: 5, fee: '₹1.5 LPA' },
            ]
        },
        'government': {
            name: 'Government Colleges',
            description: 'Affordable and high-quality government colleges across India',
            colleges: [
                { name: 'Hindu College Delhi', location: 'Delhi', fee: '₹40,000 PA' },
                { name: 'St. Stephen\'s College Delhi', location: 'Delhi', fee: '₹45,000 PA' },
                { name: 'Miranda House Delhi', location: 'Delhi', fee: '₹38,000 PA' },
                { name: 'Madras Christian College', location: 'Chennai', fee: '₹35,000 PA' },
                { name: 'Fergusson College Pune', location: 'Pune', fee: '₹30,000 PA' },
            ]
        },
        'affordable': {
            name: 'Affordable Colleges',
            description: 'High-quality colleges with low fee structures',
            colleges: [
                { name: 'Fergusson College Pune', location: 'Pune', fee: '₹30,000 PA' },
                { name: 'St. Xavier\'s College Kolkata', location: 'Kolkata', fee: '₹32,000 PA' },
                { name: 'Loyola College Chennai', location: 'Chennai', fee: '₹35,000 PA' },
                { name: 'Christ University Bangalore', location: 'Bangalore', fee: '₹40,000 PA' },
                { name: 'Hindu College Delhi', location: 'Delhi', fee: '₹40,000 PA' },
            ]
        },
        'scholarship': {
            name: 'Scholarship Colleges',
            description: 'Colleges offering excellent scholarship opportunities',
            colleges: [
                { name: 'BITS Pilani', location: 'Pilani', scholarships: 'Merit Scholarships' },
                { name: 'VIT Vellore', location: 'Vellore', scholarships: '100% Fee Waiver' },
                { name: 'SRM University', location: 'Chennai', scholarships: 'Sports & Academic' },
                { name: 'Manipal University', location: 'Manipal', scholarships: 'Merit-Cum-Means' },
                { name: 'Amity University', location: 'Noida', scholarships: '100% to 25%' },
            ]
        }
    };

    const data = categoryData[category] || {
        name: 'Colleges',
        description: 'Explore colleges in India',
        colleges: []
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
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#212529] mb-4">{data.name}</h1>
                        <p className="text-lg text-[#495057] font-sans max-w-2xl">{data.description}</p>
                    </motion.div>

                    {data.colleges.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.colleges.map((college, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <Building2 className="w-10 h-10 text-[#721c24]" />
                                        {college.ranking && (
                                            <span className="bg-[#f8f9fa] text-[#721c24] text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-lg font-sans">
                                                Rank {college.ranking}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-[#212529] mb-2">{college.name}</h3>
                                    {college.location && (
                                        <div className="flex items-center gap-2 text-[#495057] mb-3 font-sans">
                                            <MapPin className="w-4 h-4" />
                                            <span>{college.location}</span>
                                        </div>
                                    )}
                                    {college.fee && (
                                        <div className="flex items-center gap-2 text-[#495057] mb-4 font-sans">
                                            <GraduationCap className="w-4 h-4" />
                                            <span>{college.fee}</span>
                                        </div>
                                    )}
                                    {college.scholarships && (
                                        <div className="flex items-center gap-2 text-[#721c24] font-semibold mb-4 font-sans">
                                            <Award className="w-4 h-4" />
                                            <span>{college.scholarships}</span>
                                        </div>
                                    )}
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
                            <Building2 className="w-16 h-16 text-[#495057] mx-auto mb-6" />
                            <h2 className="text-2xl font-serif font-bold text-[#212529] mb-2">Coming Soon</h2>
                            <p className="text-[#495057] font-sans">We're working on adding colleges for this category!</p>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CollegesCategoryDetail;
