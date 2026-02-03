import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/User.js';
import authRoutes from './routes/authRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://localhost:3002',
            'http://localhost:3003',
            'http://localhost:3004',
            'http://localhost:3005'
        ],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Make io available to routes
app.set('io', io);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Allow requests from Vite (3000) or if it switches ports (3001-3005)
const envOrigins = process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',') : [];
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://localhost:3004',
    'http://localhost:3005',
    ...envOrigins
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eventdekho')
    .then(async () => {
        console.log('MongoDB Connected Successfully');
        // One-time admin seeder
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (adminEmail && adminPassword) {
            const existingAdmin = await User.findOne({ email: adminEmail });
            if (!existingAdmin) {
                const hashedPassword = await bcrypt.hash(adminPassword, 10);
                await User.create({
                    name: 'System Admin',
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'admin'
                });
                console.log(`✅ Admin user created: ${adminEmail}`);
            } else {
                console.log(`ℹ️ Admin user already exists: ${adminEmail}`);
            }
        } else {
            console.warn('⚠️ ADMIN_EMAIL or ADMIN_PASSWORD not set in .env');
        }
    })
    .catch((err) => {
        console.error('-------------------------------------');
        console.error('❌ MONGODB CONNECTION FAILED');
        console.error('-------------------------------------');
        console.error('It looks like you do not have MongoDB running locally.');
        console.error('1. If you have MongoDB installed, run: net start MongoDB');
        console.error('2. Or use MongoDB Atlas (Cloud) and update backend/.env with your URI.');
        console.error('-------------------------------------');
        // Do not exit process, let the server run so endpoints don't crash immediately (though they will fail later)
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinAdminRoom', () => {
        socket.join('admin');
        console.log('Admin joined room:', socket.id);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
