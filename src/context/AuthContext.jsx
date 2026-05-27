import { createContext, useState, useContext, useEffect } from 'react';
import api from '../api/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const res = await api.get('/auth/me');
                console.log('Auth /me response:', res.data);
                setUser(res.data.user);
            } catch (err) {
                console.error('Auth /me error:', err);
                // Check for localStorage fallback (admin user)
                const isAdminPortal = typeof window !== 'undefined' && window.location && window.location.pathname.startsWith('/admin');
                if (isAdminPortal) {
                    const storedAdmin = localStorage.getItem('adminUser');
                    if (storedAdmin) {
                        try {
                            const adminUser = JSON.parse(storedAdmin);
                            setUser(adminUser);
                            return;
                        } catch (parseErr) {
                            console.error('Error parsing stored admin user:', parseErr);
                            localStorage.removeItem('adminUser');
                        }
                    }
                }
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkLoggedIn();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login', { email, password });
            setUser(res.data.user);
            return res.data;
        } catch (err) {
            console.error(err);
            // Only use fallback for admin portal when backend is unavailable
            const isAdminPortal = typeof window !== 'undefined' && window.location && window.location.pathname.startsWith('/admin');
            const ADMIN_EMAIL_FALLBACK = 'aadarshgolucky@gmail.com';
            const ADMIN_PASSWORD_FALLBACK = 'Aadarsh@123';
            
            if (isAdminPortal && email === ADMIN_EMAIL_FALLBACK && password === ADMIN_PASSWORD_FALLBACK) {
                // Create a persistent mock admin user
                const mockUser = { 
                    _id: 'admin_mock_id',
                    name: 'System Admin', 
                    email, 
                    role: 'admin',
                    isApproved: true
                };
                setUser(mockUser);
                // Store in localStorage for persistence
                localStorage.setItem('adminUser', JSON.stringify(mockUser));
                return { user: mockUser };
            }
            throw err;
        }
    };

    const register = async (userData) => {
        try {
            const res = await api.post('/auth/register', userData);
            setUser(res.data.user);
            return res.data;
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (e) {
            console.error(e);
        }
        // Clear localStorage fallback
        localStorage.removeItem('adminUser');
        setUser(null);
    };

    const forgotPassword = async (email) => {
        const res = await api.post('/auth/forgot-password', { email });
        return res.data;
    };

    const resetPassword = async ({ token, password }) => {
        const res = await api.post('/auth/reset-password', { token, password });
        return res.data;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
