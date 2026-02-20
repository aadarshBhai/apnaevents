import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Event from '../models/Event.js';
import User from '../models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const newEvents = [
    {
        title: "SOF National Science Olympiad 2025-26",
        description: "Annual science olympiad testing physics, chemistry, and biology knowledge. Level 2 for top performers, scholarships available. Source: https://sofworld.org. Exam Dates: 13-11-2025, 27-11-2025, 11-12-2025. Notes: Level 2 for top performers, scholarships available.",
        date: new Date('2025-11-13T10:00:00Z'),
        location: "School-based across India",
        category: "Academic",
        eligibility: "Class 9-12",
        applicationLink: "https://sofworld.org",
        ageGroup: "9-12",
        registrationFee: "125",
        mode: "Offline",
        contactInfo: "info@sofworld.org, -4951233",
        tags: ["Science", "Olympiad", "Academic"],
        featured: true,
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1200",
        verified: true
    },
    {
        title: "SOF International Mathematics Olympiad 2025-26",
        description: "International mathematics olympiad testing mathematical reasoning and problem-solving. Level 2 for top performers, scholarships available. Source: https://sofworld.org. Exam Dates: 12-11-2025, 28-11-2025, 12-12-2025. Notes: Level 2 for top performers, scholarships available.",
        date: new Date('2025-11-12T09:00:00Z'),
        location: "School-based across India",
        category: "Academic",
        eligibility: "Class 9-12",
        applicationLink: "https://sofworld.org",
        ageGroup: "9-12",
        registrationFee: "125",
        mode: "Offline",
        contactInfo: "info@sofworld.org, -4951233",
        tags: ["Mathematics", "Olympiad", "Academic"],
        featured: true,
        status: "upcoming",
        image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1200",
        verified: true
    }
];

const updateEvents = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const adminUser = await User.findOne({ email: 'aadarshgolucky@gmail.com' });
        if (!adminUser) {
            console.error('Admin user not found. Please ensure aadarshgolucky@gmail.com exists.');
            process.exit(1);
        }

        console.log('Deleting all existing (demo) events...');
        await Event.deleteMany({});
        console.log('Deleted all old events.');

        const eventsToAdd = newEvents.map(event => ({
            ...event,
            organizer: adminUser._id
        }));

        console.log(`Adding ${eventsToAdd.length} new events...`);
        const result = await Event.insertMany(eventsToAdd);
        console.log(`✅ Success! Added ${result.length} events.`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error updating events:', error);
        process.exit(1);
    }
};

updateEvents();
