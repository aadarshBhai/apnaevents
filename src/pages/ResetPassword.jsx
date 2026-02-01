import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Lock } from 'lucide-react';
import api from '../api/config';
import Navbar from '../components/Navbar';

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
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <div className="pt-28 pb-16">
                <div className="container">
                    <div className="max-w-xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-200/40 p-8"
                        >
                            <h1 className="text-3xl font-black text-slate-800">Reset Password</h1>
                            <p className="text-sm font-medium text-slate-500 mt-2">
                                Set a new password for your account.
                            </p>

                            {error && (
                                <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl text-sm font-medium flex items-start gap-3">
                                    <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Error</div>
                                        <div className="text-red-600 mt-1">{error}</div>
                                    </div>
                                </div>
                            )}

                            {success && (
                                <div className="mt-6 p-4 bg-green-50 border border-green-200 text-green-800 rounded-2xl text-sm font-medium flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                                    <div>
                                        <div className="font-semibold">Success</div>
                                        <div className="text-green-700 mt-1">{success}</div>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-3 flex items-center gap-2">
                                        <Lock size={14} />
                                        New Password
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        className="w-full py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-widest pl-3 flex items-center gap-2">
                                        <Lock size={14} />
                                        Confirm New Password
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="Re-enter your password"
                                        className="w-full py-4 px-6 bg-white border-2 border-slate-200 rounded-2xl font-medium text-slate-700 placeholder:text-slate-400 outline-none transition-all duration-300 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="w-full py-4 text-base font-semibold rounded-2xl shadow-xl flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-primary to-blue-600 text-white"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Resetting...
                                        </>
                                    ) : (
                                        'Reset Password'
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="w-full text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    Back to Home
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
