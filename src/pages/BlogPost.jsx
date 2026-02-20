import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowLeft, Share2, Bookmark, Clock, Tag, ChevronRight } from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

const POSTS_DATA = {
    'top-10-olympiads-india-2026': {
        title: "Top 10 Prestigious Olympiads in India for Class 9-12 Students (2026 Edition)",
        date: "Feb 12, 2026",
        author: "Aadarsh Kumar",
        readTime: "8 min read",
        category: "Olympiads",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200",
        content: `
            <p>Participating in Olympiads is one of the most effective ways for students in Class 9-12 to test their knowledge on a national and international level. Not only do these competitions enhance your problem-solving skills, but they also significantly strengthen your college applications and portfolio.</p>
            
            <h2>1. National Standard Examination in Junior Science (NSEJS)</h2>
            <p>The NSEJS is the first step towards representing India in the International Junior Science Olympiad. It is conducted by the IAPT and is aimed at students up to Class 10.</p>
            
            <h2>2. International Mathematical Olympiad (IMO)</h2>
            <p>Conducted by the Science Olympiad Foundation (SOF), the IMO is globally recognized. For students aiming for engineering or pure mathematics, a high rank here is invaluable.</p>
            
            <h2>3. Kishore Vaigyanik Protsahan Yojana (KVPY)</h2>
            <p>Though the structure has evolved into INSPIRE, the competitive spirit remain the same. It identifies students with talent and aptitude for research.</p>
            
            <h2>4. National Science Olympiad (NSO)</h2>
            <p>Focusing on Physics, Chemistry, and Biology, the NSO tests foundation and application concepts of science.</p>
            
            <h2>5. NTSE (National Talent Search Examination)</h2>
            <p>A flagship scholarship program by NCERT for Class 10 students. The NTSE scholar tag is highly respected across India.</p>
            
            <h2>Conclusion</h2>
            <p>Preparing for these exams requires consistent effort and a focus on concepts rather than rote learning. Start early, use the right resources, and track upcoming deadlines on ApnaEvents.</p>
        `
    },
    'balance-school-boards-and-competitions': {
        title: "How to Balance School Boards and Competitive Exams: A Student's Guide",
        date: "Feb 10, 2026",
        author: "Team ApnaEvents",
        readTime: "6 min read",
        category: "Study Tips",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
        content: `
            <p>The pressure of board exams combined with the ambition to crack competitive exams can be overwhelming. However, with the right strategy, you can excel in both.</p>
            
            <h2>1. Create a Master Schedule</h2>
            <p>Divide your day into dedicated blocks for school subjects and competitive prep. Ensure you spend at least 2 hours on your competitive subjects daily.</p>
            
            <h2>2. Leverage Overlapping Syllabus</h2>
            <p>Most competitive exams like JEE, NEET, or NSO follow the NCERT curriculum. Strengthening your base for boards naturally helps your competition prep.</p>
            
            <h2>3. Master the Weekends</h2>
            <p>Use Saturdays and Sundays for mock tests and in-depth revision of tough topics that you couldn't cover during the school week.</p>
            
            <h2>4. Don't Ignore Health</h2>
            <p>A tired brain cannot retain information. Ensure 7 hours of sleep and regular breaks.</p>
        `
    },
    'building-college-profile-through-competitions': {
        title: "Why Inter-School Competitions are Key to Building a Strong College Profile",
        date: "Feb 08, 2026",
        author: "Meera Iyer",
        readTime: "5 min read",
        category: "Career Guidance",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
        content: `
            <p>In today's competitive landscape, high grades are no longer enough to secure admission into top-tier universities. Admissions officers are looking for "well-rounded" students who have demonstrated passion and excellence outside the classroom.</p>
            
            <h2>Demonstrating Initiative</h2>
            <p>Participating in competitions shows that you are proactive and willing to go beyond the school curriculum.</p>
            
            <h2>Practical Application of Knowledge</h2>
            <p>Competitions like Hackathons or Science Fairs demonstrate that you can apply theoretical knowledge to solve real-world problems.</p>
            
            <h2>Networking and Exposure</h2>
            <p>Inter-school events allow you to meet like-minded peers, mentors, and experts in various fields, expanding your horizons significantly.</p>
            
            <h2>The 'Verified' Advantage</h2>
            <p>Platforms like ApnaEvents help you find verified competitions, ensuring your certificates are legitimate and valued by institutions.</p>
        `
    }
};

const BlogPost = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = POSTS_DATA[slug];

    if (!post) {
        return (
            <div className="min-h-screen bg-navy-950 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl text-white font-bold mb-4">Post Not Found</h1>
                    <Link to="/blog" className="text-emerald-400 font-bold">Back to Blog</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-navy-950 text-slate-300 selection:bg-emerald-500/30">
            <SEO
                title={`${post.title} | ApnaEvents Blog`}
                description={post.content.replace(/<[^>]*>/g, '').substring(0, 160)}
            />
            <Navbar />

            <div className="pt-32 pb-24">
                <article className="container-custom px-4">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/blog')}
                        className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 font-bold mb-8 transition-colors"
                    >
                        <ArrowLeft size={20} /> Back to Blog
                    </motion.button>

                    <div className="max-w-4xl mx-auto">
                        {/* Header */}
                        <header className="mb-12">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 text-xs font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                                    {post.category}
                                </span>
                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium border-l border-white/10 pl-4">
                                    <Clock size={16} /> {post.readTime}
                                </div>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-black text-white mb-8 leading-[1.1]">
                                {post.title}
                            </h1>
                            <div className="flex items-center justify-between py-6 border-y border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white font-black text-xl">
                                        {post.author.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-white font-bold text-lg">{post.author}</div>
                                        <div className="text-slate-500 text-sm font-medium">{post.date}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                                        <Share2 size={20} />
                                    </button>
                                    <button className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                                        <Bookmark size={20} />
                                    </button>
                                </div>
                            </div>
                        </header>

                        {/* Image */}
                        <div className="aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-12 border border-white/10">
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Content */}
                        <div
                            className="blog-content prose prose-invert prose-emerald max-w-none text-slate-300 leading-relaxed text-lg
                            prose-headings:text-white prose-headings:font-display prose-headings:font-black
                            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                            prose-p:mb-6 prose-strong:text-emerald-400"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Footer */}
                        <footer className="mt-16 pt-16 border-t border-white/10 text-center">
                            <h3 className="text-2xl font-bold text-white mb-6">Ready to find your next opportunity?</h3>
                            <Link to="/events" className="btn-primary inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold">
                                Discover Competitions <ChevronRight size={20} />
                            </Link>
                        </footer>
                    </div>
                </article>
            </div>

            <Footer />
        </div>
    );
};

export default BlogPost;
