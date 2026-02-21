import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag, BookOpen, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

const BLOG_POSTS = [
    {
        id: '1',
        title: "Top 10 Prestigious Olympiads in India for Class 9-12 Students (2026 Edition)",
        excerpt: "A comprehensive analysis of national and international olympiads that facilitate scholarship acquisition and institutional recognition.",
        date: "Feb 12, 2026",
        author: "Aadarsh Kumar",
        category: "Scholastic Merit",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
        slug: "top-10-olympiads-india-2026"
    },
    {
        id: '2',
        title: "Synthesizing Board Preparations with Competitive Excellence: An Academic Blueprint",
        excerpt: "Mastering the equilibrium between secondary board examinations and national merit contests. Strategies for long-term academic success.",
        date: "Feb 10, 2026",
        author: "Academic Council",
        category: "Pedagogy",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        slug: "balance-school-boards-and-competitions"
    },
    {
        id: '3',
        title: "The Role of Inter-School Discourse in Forging Global Academic Portfolios",
        excerpt: "Beyond quantitative metrics: how extracurricular distinction and regional wins consolidate your candidacy for premier global universities.",
        date: "Feb 08, 2026",
        author: "Meera Iyer",
        category: "Institutional Growth",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        slug: "building-college-profile-through-competitions"
    }
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans">
            <SEO
                title="Academic Repository | ApnaEvents Scholastic Journal"
                description="Scholarly articles, pedagogical guides, and updates on the national merit landscape for ambitious students across India."
            />
            <Navbar />

            <div className="pt-40 pb-24">
                <div className="container-custom px-4">
                    {/* Header */}
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg text-[#0d3862] text-[10px] font-bold uppercase tracking-[0.2em] mb-10"
                        >
                            <BookOpen size={14} /> Scholastic Intelligence Repository
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-7xl font-serif font-bold text-[#0d3862] mb-8 leading-tight"
                        >
                            Academic <span className="text-[#911116] italic">Insights</span>
                        </motion.h1>
                        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
                            Synthesized guides, pedagogical strategies, and chronological updates on the Indian merit competitive landscape.
                        </p>
                    </div>

                    {/* Blog Feed */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {BLOG_POSTS.map((post, idx) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 group hover:shadow-2xl hover:shadow-slate-200 transition-all duration-700 flex flex-col h-full"
                            >
                                <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-[16/10] relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                    />
                                    <div className="absolute inset-0 bg-[#0d3862]/10 group-hover:bg-transparent transition-colors duration-700" />
                                </Link>
                                <div className="p-10 flex flex-col flex-grow">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="px-3 py-1 bg-red-50 text-[#911116] text-[9px] font-bold uppercase tracking-widest rounded-lg border border-red-100">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                                            <Calendar size={12} /> {post.date}
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-serif font-bold text-[#0d3862] mb-6 group-hover:text-[#911116] transition-colors line-clamp-2 leading-tight">
                                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-[#0d3862] flex items-center justify-center text-[10px] font-bold text-white shadow-sm">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-[10px] font-bold text-[#0d3862] uppercase tracking-widest">{post.author}</span>
                                        </div>
                                        <Link to={`/blog/${post.slug}`} className="text-[#911116] font-bold text-[10px] uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-3 transition-all">
                                            Synthesize <ArrowRight size={14} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;
