import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Target, Award, Globe, Linkedin, Mail, ShieldCheck, Rocket, ArrowRight, Shield } from 'lucide-react';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

const About = () => {
    const stats = [
        { label: "Active Scholars", value: "50K+" },
        { label: "Verified Programs", value: "1.2K+" },
        { label: "Partner Schools", value: "500+" },
        { label: "Research Grants", value: "₹2Cr+" }
    ];

    const values = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-[#0d3862]" />,
            title: "Veritas First",
            description: "Manually vetting every academic opportunity. We prioritize intellectual integrity and student data protection as our primary mandate."
        },
        {
            icon: <Target className="w-8 h-8 text-[#911116]" />,
            title: "Meritocracy",
            description: "Forging a level playing field where talent and critical thinking are the only prerequisites for national and international recognition."
        },
        {
            icon: <Award className="w-8 h-8 text-[#fcb900]" />,
            title: "Holistic Growth",
            description: "Beyond competition, we emphasize the synthesis of knowledge, portfolio building, and the cultivation of an academic legacy."
        }
    ];

    const team = [
        {
            name: "Aadarsh Kumar",
            role: "Founder & Chancellor",
            title: "Pioneer in Scholastic Merit Distribution",
            image: "/images/team/aadarsh-kumar.jpg",
            bio: "Aadarsh Kumar is an educator and technologist dedicated to democratizing access to high-value academic competitions across the Indian subcontinent. His vision is to bridge the resource gap for ambitious students.",
            social: {
                linkedin: "https://linkedin.com/in/aadarshkumar",
                email: "aadarshgolucky@gmail.com"
            }
        },
        {
            name: "Priya Sharma",
            role: "Provost of Operations",
            image: "/images/team/priya-sharma.jpg",
            bio: "Priya oversees the institutional protocol and operational integrity of the ApnaEvents Network, ensuring an elite experience for all stakeholders.",
        },
        {
            name: "Rahul Verma",
            role: "Director of Systems",
            image: "/images/team/rahul-verma.jpg",
            bio: "Rahul spearheads the technical architecture, focusing on secure, scalable, and decentralized delivery of academic merit data.",
        }
    ];

    return (
        <div className="bg-white min-h-screen text-slate-800">
            <SEO
                title="Institutional Mission - ApnaEvents Academic Network"
                description="Discover our commitment to democratizing scholastic opportunities and fostering a new generation of leaders through the ApnaEvents Academic Network."
            />
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-48 pb-24 overflow-hidden bg-slate-50 border-b border-slate-100">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm text-[#0d3862] text-[10px] font-bold uppercase tracking-[0.2em] mb-10">
                            <Shield size={14} /> Fostering Intellectual Excellence
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-bold text-[#0d3862] mb-10 leading-[1.1]">
                            The Premier Gateway to <br />
                            <span className="text-[#911116] italic">Academic Distinction</span>
                        </h1>
                        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto font-medium">
                            ApnaEvents is the official repository for high-value merit opportunities, designed to connect the brightest Class 8–12 minds with world-class academic institutions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white relative">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-6xl font-serif font-bold text-[#0d3862] mb-3">{stat.value}</div>
                                <div className="text-[#911116] font-bold uppercase tracking-[0.2em] text-[10px]">{stat.label}</div>
                                <div className="w-10 h-1 bg-slate-100 mx-auto mt-6 rounded-full" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 bg-slate-50 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0d3862] mb-10">
                                Institutional <span className="text-[#911116] italic">Pedagogy</span>
                            </h2>
                            <div className="space-y-8 text-lg text-slate-600 leading-relaxed font-medium">
                                <p>
                                    Our methodology centers on the manual verification of every contest, ensuring candidates focus their cognitive labor on preparation rather than legitimacy research.
                                </p>
                                <p>
                                    We maintain that academic excellence should be decoupled from geographical constraints. Our network provides an equitable distribution of merit data to all eligible students.
                                </p>
                                <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-[#911116]">
                                    <p className="text-[#0d3862] font-serif font-bold italic">
                                        "Rigorous. Transparent. Dedicated to Scholastic Discovery."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-[#fcb900]/10 rounded-[3rem] blur-2xl" />
                            <img
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                                alt="Institutional collaboration"
                                className="relative rounded-[2.5rem] border border-white shadow-2xl z-10"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-32 bg-white relative">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0d3862] mb-4">Core Principles</h2>
                        <p className="text-slate-500 max-w-xl mx-auto text-lg font-medium">Our foundational values represent the ethos of the ApnaEvents Academic Network.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-slate-50 p-10 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:bg-white transition-all group"
                            >
                                <div className="bg-white w-20 h-20 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                    {value.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-[#0d3862] mb-4">{value.title}</h3>
                                <p className="text-slate-600 font-medium leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32 bg-slate-50 border-y border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0d3862] mb-4">Administrative Council</h2>
                        <p className="text-slate-500 text-lg font-medium">The intellectual architects behind India's merit-based future.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-16">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group text-center"
                            >
                                <div className="relative mb-8 mx-auto w-56 h-56 lg:w-64 lg:h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0d3862&color=fff&size=512&bold=true`;
                                        }}
                                    />
                                </div>
                                <h3 className="text-3xl font-serif font-bold text-[#0d3862] mb-2">{member.name}</h3>
                                <p className="text-[#911116] font-bold uppercase tracking-[0.2em] text-[10px] mb-6">{member.role}</p>

                                <div className="flex gap-4 justify-center mb-6">
                                    <a href="#" className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#0d3862] hover:border-[#0d3862] transition-colors"><Linkedin size={18} /></a>
                                    <a href="#" className="p-2.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-[#0d3862] hover:border-[#0d3862] transition-colors"><Mail size={18} /></a>
                                </div>
                                <p className="text-slate-500 font-medium leading-relaxed italic max-w-sm mx-auto">"{member.bio}"</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 bg-white relative overflow-hidden text-center">
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-7xl font-serif font-bold text-[#0d3862] mb-12 tracking-tight">
                            Commence Your <span className="text-[#911116]">Legacy</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <Link to="/auth" className="btn-primary px-12 py-5 text-sm uppercase tracking-[0.2em] font-bold rounded-xl shadow-xl shadow-blue-900/10">
                                Institutional Access
                            </Link>
                            <Link to="/events" className="px-12 py-5 bg-white text-[#0d3862] border border-slate-200 rounded-xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-slate-50 transition-all shadow-sm">
                                Discovery Pipeline
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
