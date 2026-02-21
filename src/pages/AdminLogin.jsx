import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, AlertCircle, ShieldCheck, ArrowRight, Loader2, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/premium/Navbar';

const AdminLogin = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login, logout, user, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && user?.role === 'admin') {
            navigate('/admin/dashboard');
        }
    }, [loading, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await login(formData.email, formData.password);

            // Strictly enforce Admin role
            if (res.user.role !== 'admin') {
                await logout();
                setError('Institutional Access Denied. Administrative credentials required.');
                return;
            }

            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            const message = err.response?.data?.message || 'Authentication protocol failed. Verify secure credentials.';
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-red-50">
            <Navbar />

            <div className="pt-40 pb-20 min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md relative z-10 px-4"
                >
                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] text-center">
                        <div className="mb-10">
                            <div className="w-20 h-20 bg-[#911116] rounded-[1.5rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-red-900/10">
                                <ShieldCheck className="text-white" size={40} />
                            </div>
                            <h1 className="text-3xl font-serif font-bold text-[#0d3862] mb-3 tracking-tight">
                                High-Level Access
                            </h1>
                            <p className="text-slate-500 text-sm font-medium uppercase tracking-widest leading-none">
                                Secure Administrative Portal
                            </p>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mb-8 overflow-hidden text-left"
                                >
                                    <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-[#911116] text-[10px] font-bold uppercase tracking-widest">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        <span>{error}</span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                                    Official Credential
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0d3862] font-bold placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] shadow-inner transition-all"
                                        placeholder="admin@apnaevents.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3 ml-1">
                                    Secure Key
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-xl text-[#0d3862] font-bold placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] shadow-inner transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-5 bg-[#911116] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-red-900/10 hover:shadow-red-900/20 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3 mt-10"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : (
                                    <>
                                        Establish Link <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="mt-12 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-center gap-3">
                            <Shield className="text-[#0d3862] shrink-0" size={16} />
                            <p className="text-[9px] font-bold text-[#0d3862] uppercase tracking-widest">Encrypted Institutional Connection Active</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminLogin;
