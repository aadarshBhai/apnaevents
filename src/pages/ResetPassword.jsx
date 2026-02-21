import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Lock, Eye, EyeOff, ShieldAlert, Loader2 } from 'lucide-react';
import api from '../api/config';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = useMemo(() => searchParams.get('token') || '', [searchParams]);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!token) {
            setError('The institutional reset token is absent. Please reference the secure link in your primary email.');
            return;
        }
        if (!password || password.length < 8) {
            setError('Credentials must meet the 8-character minimum security threshold.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Credential mismatch. Please verify inputs.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/reset-password', { token, password });
            setSuccess('Security credentials updated successfully. Initiating portal redirection...');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Access synchronization failed. Please request a new token.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen text-slate-800 font-sans selection:bg-blue-50">
            <Navbar />
            <div className="pt-48 pb-24">
                <div className="container-custom px-4">
                    <div className="max-w-xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-slate-50 border border-slate-100 p-10 md:p-12 rounded-[2.5rem] shadow-xl shadow-slate-200/50"
                        >
                            <div className="text-center mb-10">
                                <div className="w-16 h-16 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#0d3862]">
                                    <Lock size={32} />
                                </div>
                                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-[#0d3862]">Credential Recovery</h1>
                                <p className="text-slate-500 font-medium">
                                    Establish a new academic access key for your verified profile.
                                </p>
                            </div>

                            {error && (
                                <div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-xl text-[#911116] flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                                    <ShieldAlert size={18} className="shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {success && (
                                <div className="mb-8 p-4 bg-blue-50 border border-blue-100 rounded-xl text-[#0d3862] flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest">
                                    <CheckCircle2 size={18} className="shrink-0" />
                                    <span>{success}</span>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">New Scholastic Key</label>
                                    <div className="relative group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Min. 8 alphanumeric characters"
                                            className="w-full pl-6 pr-14 py-4 bg-white border border-slate-200 rounded-xl text-[#0d3862] font-bold placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] shadow-inner transition-all"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0d3862] transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 ml-1">Verify Security Key</label>
                                    <div className="relative group">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Duplicate new key"
                                            className="w-full pl-6 pr-14 py-4 bg-white border border-slate-200 rounded-xl text-[#0d3862] font-bold placeholder:text-slate-300 focus:outline-none focus:border-[#fcb900] shadow-inner transition-all"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            disabled={loading}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#0d3862] transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="w-full bg-[#0d3862] text-white py-5 rounded-xl font-bold uppercase tracking-[0.2em] text-xs shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 active:scale-[0.98] transition-all disabled:opacity-70 flex items-center justify-center gap-3"
                                    >
                                        {loading ? (
                                            <Loader2 className="w-6 h-6 animate-spin" />
                                        ) : (
                                            'Authorize Update'
                                        )}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate('/')}
                                        className="w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-[#0d3862] transition-colors"
                                    >
                                        Cancel Protocol
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ResetPassword;
