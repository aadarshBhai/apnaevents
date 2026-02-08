import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import { ShieldCheck, Users, Target, Rocket, Award, Globe, ArrowRight } from 'lucide-react';

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const stats = [
        { label: "Active Students", value: "50K+" },
        { label: "Verified Events", value: "1.2K+" },
        { label: "Partner Schools", value: "500+" },
        { label: "Scholarships", value: "₹2Cr+" }
    ];

    const values = [
        {
            icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
            title: "Trust First",
            description: "Every competition on our platform is manually vetted. We prioritize student safety and data privacy above all else."
        },
        {
            icon: <Target className="w-8 h-8 text-blue-400" />,
            title: "Meritocracy",
            description: "We believe in a level playing field. Opportunities should be accessible to talent, regardless of geography or background."
        },
        {
            icon: <Rocket className="w-8 h-8 text-amber-400" />,
            title: "Student Growth",
            description: "More than just winning, we focus on the journey. Building portfolios, gaining skills, and earning verified credentials."
        }
    ];

    const team = [
        {
            name: "Aadarsh Kumar",
            role: "Founder & CEO",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
            bio: "Former National Olympiad winner with a vision to democratize access to opportunities."
        },
        {
            name: "Sarah Chen",
            role: "Head of Partnerships",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400",
            bio: "Building bridges between top institutions and student talent across the globe."
        },
        {
            name: "David Miller",
            role: "Tech Lead",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
            bio: "Architecting the future of secure, verifiable digital student credentials."
        }
    ];

    return (
        <div className="bg-navy-950 min-h-screen text-slate-300 selection:bg-emerald-500/30">
            <Navbar />
            
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden min-h-[60vh] flex items-center">
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/50 to-navy-950 pointer-events-none" />
                
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -100, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -100, 0],
                            y: [0, 100, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-wider mb-8">
                            <Globe size={16} /> Democratizing Opportunity
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
                            We are building the <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                                Infrastructure of Merit
                            </span>
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                            ApnaEvents is India's first unified platform for students to discover verified competitions, build professional passports, and secure their future through merit.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 border-y border-white/5 bg-navy-900/30">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-emerald-500 font-bold uppercase tracking-widest text-xs">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                                The <span className="text-emerald-400">Problem</span> We Solve
                            </h2>
                            <div className="space-y-6 text-lg text-slate-400">
                                <p>
                                    For decades, student opportunities have been fragmented. Talented students in smaller cities miss out on national competitions simply because they never hear about them.
                                </p>
                                <p>
                                    On the other side, organizers struggle to reach meritocratic talent pools, relying on outdated networks.
                                </p>
                                <p className="text-white font-medium border-l-4 border-emerald-500 pl-4">
                                    ApnaEvents bridges this gap. We are the digital highway connecting ambition with opportunity.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full" />
                            <img 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                                alt="Students collaborating" 
                                className="relative rounded-3xl border border-white/10 shadow-2xl z-10"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-navy-900 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Core Values</h2>
                        <p className="text-slate-400 max-w-xl mx-auto">The principles that guide every feature we build and every partnership we make.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-navy-800/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-emerald-500/30 transition-all group"
                            >
                                <div className="bg-navy-950 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Meet The Builders</h2>
                        <p className="text-slate-400">A passionate team of educators, engineers, and dreamers.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {team.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="group"
                            >
                                <div className="relative mb-6 overflow-hidden rounded-3xl aspect-[4/5]">
                                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60 z-10" />
                                    <img 
                                        src={member.image} 
                                        alt={member.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-0 left-0 p-6 z-20">
                                        <h3 className="text-2xl font-display font-bold text-white">{member.name}</h3>
                                        <p className="text-emerald-400 font-medium">{member.role}</p>
                                    </div>
                                </div>
                                <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-emerald-900/10" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="bg-gradient-to-br from-navy-800 to-navy-900 rounded-[3rem] p-12 md:p-20 text-center border border-white/5 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative z-10 max-w-3xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                                Join thousands of students who are building their future with ApnaEvents.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                <Link to="/auth" className="btn-primary px-8 py-4 text-lg rounded-xl flex items-center justify-center gap-2 group-hover:scale-105 transition-transform">
                                    Create Free Account <ArrowRight size={20} />
                                </Link>
                                <Link to="/discover" className="px-8 py-4 bg-navy-950 text-white rounded-xl font-medium border border-navy-700 hover:border-emerald-500/50 hover:text-emerald-400 transition-all flex items-center justify-center">
                                    Explore Events
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default About;
