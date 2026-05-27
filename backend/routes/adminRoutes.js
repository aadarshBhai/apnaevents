import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Event from '../models/Event.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Admin authentication middleware
const adminAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admin privileges required.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// Get admin dashboard stats
router.get('/stats', adminAuth, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalEvents = await Event.countDocuments();
        const pendingEvents = await Event.countDocuments({ verified: false });
        const upcomingEvents = await Event.countDocuments({ status: 'upcoming' });
        
        res.json({
            totalUsers,
            totalEvents,
            pendingEvents,
            upcomingEvents,
            recentEvents: await Event.find()
                .populate('organizer', 'name email')
                .sort({ createdAt: -1 })
                .limit(5)
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all events for admin management
router.get('/events', adminAuth, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            category,
            status,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        const query = {};
        
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (category) query.category = category;
        if (status) query.status = status;

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const events = await Event.find(query)
            .populate('organizer', 'name email')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Event.countDocuments(query);

        res.json({
            events,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalItems: total,
                hasNext: skip + events.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create event with image upload
router.post('/events', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const eventData = {
            ...req.body,
            image: req.file ? `/uploads/events/${req.file.filename}` : '',
            organizer: req.user._id
        };

        const event = new Event(eventData);
        const savedEvent = await event.save();
        const populatedEvent = await Event.findById(savedEvent._id)
            .populate('organizer', 'name email');

        // Emit real-time update
        req.app.get('io').emit('eventCreated', populatedEvent);

        res.status(201).json(populatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update event with optional image upload
router.put('/events/:id', adminAuth, upload.single('image'), async (req, res) => {
    try {
        const updateData = { ...req.body };
        
        if (req.file) {
            updateData.image = `/uploads/events/${req.file.filename}`;
        }

        const event = await Event.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).populate('organizer', 'name email');

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Emit real-time update
        req.app.get('io').emit('eventUpdated', event);

        res.json(event);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete event
router.delete('/events/:id', adminAuth, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        
        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        // Emit real-time update
        req.app.get('io').emit('eventDeleted', { id: req.params.id });

        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all users for admin management
router.get('/users', adminAuth, async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            search,
            role,
            sortBy = 'createdAt',
            sortOrder = 'desc'
        } = req.query;

        const query = {};
        
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }
        
        if (role) query.role = role;

        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const users = await User.find(query)
            .select('-password')
            .sort(sortOptions)
            .skip(skip)
            .limit(parseInt(limit));

        const total = await User.countDocuments(query);

        res.json({
            users,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(total / parseInt(limit)),
                totalItems: total,
                hasNext: skip + users.length < total,
                hasPrev: parseInt(page) > 1
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update user role/status
router.put('/users/:id', adminAuth, async (req, res) => {
    try {
        const { role, isApproved } = req.body;
        const updateData = {};
        
        if (role) updateData.role = role;
        if (typeof isApproved === 'boolean') updateData.isApproved = isApproved;
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        ).select('-password');
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get pending organizers
router.get('/organizers/pending', adminAuth, async (req, res) => {
    try {
        const pendingOrganizers = await User.find({
            role: 'organizer',
            isApproved: false
        }).select('-password');
        
        res.json(pendingOrganizers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Approve organizer
router.put('/organizers/:id/approve', adminAuth, async (req, res) => {
    try {
        const organizer = await User.findByIdAndUpdate(
            req.params.id,
            { isApproved: true },
            { new: true }
        ).select('-password');
        
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }
        
        // Emit real-time update
        req.app.get('io').emit('organizerApproved', organizer);
        
        res.json(organizer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete user
router.delete('/users/:id', adminAuth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
