import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search as SearchIcon, ArrowRight } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';

const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const mockResults = [
        { type: 'career', title: 'Software Engineer', description: 'Build the future with coding and AI' },
        { type: 'career', title: 'Doctor (MBBS)', description: 'Become a healthcare professional' },
        { type: 'college', title: 'IIT Bombay', description: 'Top engineering college in India' },
        { type: 'exam', title: 'JEE Advanced', description: 'Entrance exam for IITs' },
        { type: 'career', title: 'Lawyer', description: 'Practice law and justice' },
        { type: 'exam', title: 'NEET UG', description: 'Entrance exam for medical colleges' }
    ];

    const filteredResults = mockResults.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );

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
                        <div className="flex items-center gap-3 mb-4">
                            <SearchIcon className="w-6 h-6 text-[#721c24]" />
                            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#212529]">
                                Search Results for "{query}"
                            </h1>
                        </div>
                        <p className="text-[#495057] text-lg font-sans">
                            {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
                        </p>
                    </motion.div>

                    {filteredResults.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredResults.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all"
                                >
                                    <span className="inline-block px-3 py-1 bg-[#f8f9fa] text-[#721c24] text-xs font-bold uppercase tracking-wider rounded-lg mb-3 font-sans">
                                        {item.type}
                                    </span>
                                    <h3 className="text-xl font-serif font-bold text-[#212529] mb-2">{item.title}</h3>
                                    <p className="text-[#495057] mb-4 font-sans">{item.description}</p>
                                    <button className="text-[#721c24] font-semibold flex items-center gap-2 hover:gap-3 transition-all font-sans">
                                        View Details <ArrowRight className="w-4 h-4" />
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
                            <SearchIcon className="w-16 h-16 text-[#495057] mx-auto mb-6" />
                            <h2 className="text-2xl font-serif font-bold text-[#212529] mb-2">No results found</h2>
                            <p className="text-[#495057] font-sans">Try using different keywords</p>
                        </motion.div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Search;
