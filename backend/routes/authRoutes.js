import express from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            name,
            email,
            password,
            role
        });

        if (user) {
            const token = generateToken(user._id);
            const isProduction = process.env.NODE_ENV === 'production' || !!process.env.RENDER || !!process.env.VERCEL;
            res.cookie('token', token, {
                httpOnly: true,
                secure: isProduction, // true for production (HTTPS)
                sameSite: isProduction ? 'none' : 'lax', // 'none' for cross-site production
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            });
            res.status(201).json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id);
            const isProduction = process.env.NODE_ENV === 'production' || !!process.env.RENDER || !!process.env.VERCEL;
            res.cookie('token', token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            });
            res.json({
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    isApproved: user.isApproved
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get Current User
router.get('/me', async (req, res) => {
    let token;

    // Check for token in cookies first (HTTP-only)
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }
    // Fallback to Bearer token in headers for compatibility
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.json({ user: null });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        res.json({ user });
    } catch (error) {
        res.json({ user: null });
    }
});

// Logout User (clear cookie)
router.post('/logout', (req, res) => {
    res.clearCookie('token', { path: '/' });
    res.json({ message: 'Logged out successfully' });
});

// Forgot Password (Generate reset token)
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        // Always respond with success to avoid leaking whether a user exists
        if (!user) {
            return res.json({ message: 'If that email exists, a reset token has been generated.' });
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        await user.save();

        const frontendOrigin = (process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',')[0] : '') || 'http://localhost:3000';
        const resetUrl = `${frontendOrigin.replace(/\/$/, '')}/reset-password?token=${rawToken}`;

        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
                <h2 style="margin: 0 0 12px;">Reset your ApnaEvents password</h2>
                <p style="margin: 0 0 12px;">We received a request to reset your password. Click the button below to set a new password.</p>
                <p style="margin: 0 0 16px;">
                    <a href="${resetUrl}" style="display:inline-block; background:#f27244; color:#fff; padding:12px 18px; border-radius:10px; text-decoration:none; font-weight:700;">Reset Password</a>
                </p>
                <p style="margin: 0 0 12px;">This link will expire in 15 minutes.</p>
                <p style="margin: 0; font-size: 12px; color:#475569;">If you didn’t request this, you can ignore this email.</p>
            </div>
        `;

        await sendEmail({
            to: user.email,
            subject: 'Reset your ApnaEvents password',
            html,
        });

        return res.json({ message: 'If that email exists, a password reset link has been sent.' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Reset Password (Verify token and set new password)
router.post('/reset-password', async (req, res) => {
    const { token, password } = req.body;

    try {
        if (!token || !password) {
            return res.status(400).json({ message: 'Token and password are required' });
        }

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        user.password = password;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await user.save();

        return res.json({ message: 'Password reset successfully' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export default router;
