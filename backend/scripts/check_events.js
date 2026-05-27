import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Event from '../models/Event.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const checkEvents = async () => {
    try {
        console.log('Connecting to MongoDB...');
        console.log('URI:', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected!');

        const allEvents = await Event.find({});
        console.log(`Total events in DB: ${allEvents.length}`);
        allEvents.forEach(e => {
            console.log(`- Title: ${e.title}, Status: ${e.status}, Featured: ${e.featured}`);
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

checkEvents();
