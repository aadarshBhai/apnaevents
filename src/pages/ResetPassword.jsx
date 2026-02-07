import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!token) {
            setError('Reset token is missing. Please use the link from your email.');
            return;
        }
        if (!password || password.length < 8) {
            setError('Password must be at least 8 characters.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/auth/reset-password', { token, password });
            setSuccess('Password reset successfully. You can now sign in.');
            setTimeout(() => navigate('/'), 1200);
        } catch (err) {
            setError(err.response?.data?.message || 'Unable to reset password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-navy-950 min-h-screen text-slate-300 selection:bg-emerald-500/30">
            <Navbar />
            <div className="pt-24 md:pt-32 pb-12">
                <div className="container-custom px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card p-8 rounded-2xl"
                        >
                            <h1 className="text-3xl md:text-5xl font-black mb-6 text-white text-center">Reset Password</h1>
                            <p className="text-slate-400 text-lg text-center mb-12">
                                Set a new password for your account.
                            </p>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 flex items-start gap-3">
                                    <AlertCircle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-white">Error</div>
                                        <div className="text-red-300 mt-1">{error}</div>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-bold text-white">Success</div>
                                        <div className="text-emerald-300 mt-1">{success}</div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        className="input-field"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-white mb-2">Confirm New Password</label>
                                    <input
                                        type="password"
                                        placeholder="Re-enter your password"
                                        className="input-field"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={loading}
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="w-full text-sm font-medium text-slate-400 hover:text-white transition-colors"
                                >
                                    Back to Home
                                </button>
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
