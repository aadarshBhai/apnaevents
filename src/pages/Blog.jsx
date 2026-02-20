import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

const BLOG_POSTS = [
    {
        id: '1',
        title: "Top 10 Prestigious Olympiads in India for Class 9-12 Students (2026 Edition)",
        excerpt: "Discover the most recognized national and international olympiads that can help you secure scholarships and build an elite academic profile.",
        date: "Feb 12, 2026",
        author: "Aadarsh Kumar",
        category: "Olympiads",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
        slug: "top-10-olympiads-india-2026"
    },
    {
        id: '2',
        title: "How to Balance School Boards and Competitive Exams: A Student's Guide",
        excerpt: "Mastering the art of time management between your 10th/12th Board exams and competitions like NTSE or JEE. Tips from top scorers.",
        date: "Feb 10, 2026",
        author: "Team ApnaEvents",
        category: "Study Tips",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        slug: "balance-school-boards-and-competitions"
    },
    {
        id: '3',
        title: "Why Inter-School Competitions are Key to Building a Strong College Profile",
        excerpt: "Your grades are only half the story. Learn how extracurricular achievements and competition wins can get you into top universities in India and abroad.",
        date: "Feb 08, 2026",
        author: "Meera Iyer",
        category: "Career Guidance",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
        slug: "building-college-profile-through-competitions"
    }
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-navy-950 text-slate-300">
            <SEO
                title="Resources & Guides for School Students | ApnaEvents Blog"
                description="Expert advice on Olympiads, competitive exams, and building a strong academic profile for Class 9-12 students in India."
            />
            <Navbar />

            <div className="pt-32 pb-24">
                <div className="container-custom px-4">
                    {/* Header */}
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl md:text-6xl font-display font-black text-white mb-6"
                        >
                            Student <span className="text-emerald-400">Resources</span>
                        </motion.h1>
                        <p className="text-slate-400 text-lg">
                            Expert guides, study tips, and updates on the latest competitions across India.
                        </p>
                    </div>

                    {/* Blog Feed */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {BLOG_POSTS.map((post, idx) => (
                            <motion.article
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="glass-card rounded-[2rem] overflow-hidden border-white/5 group hover:border-emerald-500/30 transition-all duration-500 flex flex-col"
                            >
                                <Link to={`/blog/${post.slug}`} className="block overflow-hidden aspect-video">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </Link>
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-emerald-500/20">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold">
                                            <Calendar size={12} /> {post.date}
                                        </div>
                                    </div>
                                    <h2 className="text-xl font-bold text-white mb-4 group-hover:text-emerald-400 transition-colors line-clamp-2">
                                        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-navy-800 border border-white/10 flex items-center justify-center text-[10px] font-bold text-slate-300">
                                                {post.author.charAt(0)}
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">{post.author}</span>
                                        </div>
                                        <Link to={`/blog/${post.slug}`} className="text-emerald-400 font-black text-xs uppercase tracking-widest flex items-center gap-2 hover:gap-3 transition-all">
                                            Read More <ArrowRight size={14} />
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
