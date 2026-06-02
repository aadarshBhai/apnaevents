import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, GraduationCap, Target } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';

// Category display names and descriptions
const categoryConfig = {
    'government': {
        name: 'Government Scholarships',
        description: 'Scholarships offered by central and state governments'
    },
    'private': {
        name: 'Private Scholarships',
        description: 'Scholarships offered by private organizations and foundations'
    },
    'international': {
        name: 'International Scholarships',
        description: 'Scholarships for studying abroad'
    },
    'minority': {
        name: 'Minority Scholarships',
        description: 'Scholarships for minority communities'
    },
    'merit': {
        name: 'Merit-Based Scholarships',
        description: 'Scholarships based on academic performance'
    }
};

const ScholarshipsCategoryDetail = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const [scholarships, setScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadScholarships = async () => {
            try {
                setLoading(true);
                const response = await fetch('/scholarships.json');
                if (!response.ok) throw new Error('Failed to load scholarships');
                
                const data = await response.json();
                const categoryScholarships = data.scholarships[category] || [];
                
                // Sort by deadline (closest first)
                const sorted = [...categoryScholarships].sort((a, b) => {
                    if (a.deadline === 'To be announced') return 1;
                    if (b.deadline === 'To be announced') return -1;
                    return new Date(a.deadline) - new Date(b.deadline);
                });
                
                setScholarships(sorted);
                setError(null);
            } catch (err) {
                console.error('Error loading scholarships:', err);
                setError('Failed to load scholarships');
                setScholarships([]);
            } finally {
                setLoading(false);
            }
        };

        loadScholarships();
    }, [category]);

    const config = categoryConfig[category] || {
        name: 'Scholarships',
        description: 'Explore scholarship opportunities'
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
                            <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#212529]">{config.name}</h1>
                        </div>
                        <p className="text-lg text-[#495057] font-sans max-w-2xl">{config.description}</p>
                    </motion.div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20 bg-red-50 rounded-2xl border border-red-200 p-6"
                        >
                            <p className="text-red-700 font-sans">{error}</p>
                        </motion.div>
                    )}

                    {loading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <div className="inline-block">
                                <div className="animate-spin">
                                    <Award className="w-12 h-12 text-[#721c24]" />
                                </div>
                            </div>
                            <p className="text-[#495057] font-sans mt-4">Loading scholarships...</p>
                        </motion.div>
                    )}

                    {!loading && !error && scholarships.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {scholarships.map((scholarship, index) => (
                                <motion.div
                                    key={scholarship.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                                >
                                    <Award className="w-10 h-10 text-[#721c24] mb-4" />
                                    <h3 className="text-xl font-serif font-bold text-[#212529] mb-2">{scholarship.name}</h3>
                                    <p className="text-sm text-[#6c757d] mb-3 font-sans">{scholarship.provider}</p>
                                    <p className="text-sm text-[#495057] mb-4 font-sans">{scholarship.description}</p>
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 text-[#495057] font-sans">
                                            <GraduationCap className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm">Amount: {scholarship.amount}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#495057] font-sans">
                                            <Calendar className="w-4 h-4 flex-shrink-0" />
                                            <span className="text-sm">Deadline: {scholarship.deadline}</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-[#495057] font-sans">
                                            <Target className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            <span className="text-sm">Eligibility: {scholarship.eligibility}</span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => scholarship.link && window.open(scholarship.link, '_blank')}
                                        className="w-full py-3 bg-[#721c24] text-white font-semibold rounded-xl hover:bg-[#5a1620] transition-all shadow-md font-sans active:scale-95"
                                    >
                                        View Details
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    ) : !loading && !error && (
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
