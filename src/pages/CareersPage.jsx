import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';
import CareerCategories from '../components/career/CareerCategories';
import SEO from '../components/seo/SEO';
import { motion } from 'framer-motion';

const CareersPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Explore 200+ Careers - Find Your Perfect Fit"
                description="Browse over 200 career options from engineering to law to emerging fields. Learn about requirements, exams, and salary ranges."
                keywords="careers, career options, engineering careers, medical careers, law careers, emerging careers"
            />
            <CareerGuidanceNavbar />
            <main>
                <section className="pt-40 pb-20 bg-[#f8f9fa]">
                    <div className="container-custom px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-3xl mx-auto text-center"
                        >
                            <h1 className="text-5xl md:text-6xl font-bold text-[#212529] mb-6 font-serif">
                                Explore <span className="text-[#721c24]">200+ Careers</span>
                            </h1>
                            <p className="text-xl text-[#495057] mb-8 font-sans">
                                Whether you're in Science, Commerce, or Humanities—find careers that match your interests and build your roadmap.
                            </p>
                            <div className="flex gap-4 justify-center flex-wrap">
                                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#495057] border border-gray-100 shadow-sm font-sans">
                                    Engineering & Tech
                                </span>
                                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#495057] border border-gray-100 shadow-sm font-sans">
                                    Medical & Healthcare
                                </span>
                                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#495057] border border-gray-100 shadow-sm font-sans">
                                    Law & Justice
                                </span>
                                <span className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-[#495057] border border-gray-100 shadow-sm font-sans">
                                    Emerging Fields
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                <CareerCategories />

                {/* Sample career cards detail section */}
                <section className="py-20 bg-[#f8f9fa]">
                    <div className="container-custom px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-4xl font-bold text-[#212529] mb-4 font-serif">Every Career Page Includes</h2>
                            <p className="text-lg text-[#495057] font-sans">Everything you need to make an informed decision</p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: 'Eligibility & Stream',
                                    desc: 'Know if the career is right for your stream and background'
                                },
                                {
                                    title: 'Entrance Exams',
                                    desc: 'All exams you need to prepare for with difficulty levels'
                                },
                                {
                                    title: 'Top Colleges',
                                    desc: 'List of best colleges and institutions for this career'
                                },
                                {
                                    title: 'Salary Range',
                                    desc: 'Expected salary in India with career growth projections'
                                },
                                {
                                    title: 'Roadmap',
                                    desc: 'Year-by-year plan from Class 12 to career start'
                                },
                                {
                                    title: 'Day in the Life',
                                    desc: 'Real stories from professionals in this field'
                                },
                            ].map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                >
                                    <h3 className="text-lg font-bold text-[#212529] mb-2 font-serif">{item.title}</h3>
                                    <p className="text-[#495057] font-sans">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default CareersPage;
