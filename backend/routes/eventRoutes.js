import express from 'express';
import Event from '../models/Event.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Get public platform stats
router.get('/stats', async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments({ status: 'upcoming' });
        const totalUsers = await User.countDocuments();
        res.json({
            events: totalEvents,
            students: totalUsers + 50000, // Offset for legacy/imported students
            schools: 500
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all events with filtering and pagination
router.get('/', async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            category,
            status = 'upcoming',
            featured,
            search,
            sortBy = 'date',
            sortOrder = 'asc'
        } = req.query;

        // Build query
        const query = {};

        if (category) query.category = category;
        if (status) query.status = status;
        if (featured === 'true') query.featured = true;
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { tags: { $in: [new RegExp(search, 'i')] } }
            ];
        }

        // Build sort options
        const sortOptions = {};
        sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Execute query with pagination
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

// Get featured events
router.get('/featured', async (req, res) => {
    try {
        const events = await Event.find({ featured: true, status: 'upcoming' })
            .populate('organizer', 'name email')
            .sort({ date: 1 })
            .limit(6);
        res.json({ events });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get single event
router.get('/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id)
            .populate('organizer', 'name email');
        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware to check if organizer is approved
const organizerAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        if (user.role !== 'organizer' && user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Organizer privileges required.' });
        }

        if (user.role === 'organizer' && !user.isApproved) {
            return res.status(403).json({ message: 'Access denied. Organizer account is not approved.' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

// Create event
router.post('/', organizerAuth, async (req, res) => {
    try {
        const event = new Event(req.body);
        const createdEvent = await event.save();
        const populatedEvent = await Event.findById(createdEvent._id)
            .populate('organizer', 'name email');
        res.status(201).json(populatedEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update event
router.put('/:id', organizerAuth, async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('organizer', 'name email');

        if (event) {
            res.json(event);
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete event
router.delete('/:id', organizerAuth, async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);
        if (event) {
            res.json({ message: 'Event deleted successfully' });
        } else {
            res.status(404).json({ message: 'Event not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get event categories
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await Event.distinct('category');
        res.json({ categories });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
