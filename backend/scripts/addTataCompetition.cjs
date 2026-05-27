const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');
require('dotenv').config();

const tataCompetition = {
    title: "Tata Building India School Essay Competition",
    description: "Essay writing competition hosted by the Tata Group to instill a sense of pride and spirit of nation building in India's youth. This prestigious competition encourages students to express their thoughts on nation building, democracy, and India's future through compelling essays.",
    date: new Date('2024-12-15T10:00:00Z'),
    deadline: new Date('2024-12-10T23:59:59Z'),
    location: "Online",
    category: "Essay Writing",
    eligibility: "Open to all students from Class 6 to 12. Two participating categories: Junior (Classes 6th-8th) and Senior (Classes 9th-12th).",
    prizes: "National recognition, certificates, and prestigious Tata Building India awards. Winners get opportunities to present their essays at national level.",
    applicationLink: "https://www.tatabuildingindia.com/school-essay-competition",
    ageGroup: "Class 6-12",
    tags: ["Essay Competition", "National Level", "Tata Group", "Nation Building", "Writing Competition", "Junior Category", "Senior Category"],
    featured: true,
    status: "upcoming",
    image: "/uploads/tata-building-india-competition.jpg",
    verified: true
};

async function addTataCompetition() {
    try {
        // Connect to MongoDB using production URI
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://aadarsh:aadarsh123@apnaevents.8m1c.mongodb.net/apnaevents?retryWrites=true&w=majority');
        
        // Find or create Tata Group as organizer
        let tataOrganizer = await User.findOne({ email: 'tata@buildindia.com' });
        
        if (!tataOrganizer) {
            tataOrganizer = new User({
                name: 'Tata Group',
                email: 'tata@buildindia.com',
                role: 'organizer',
                organization: 'Tata Group',
                verified: true
            });
            await tataOrganizer.save();
        }
        
        // Assign organizer to competition
        tataCompetition.organizer = tataOrganizer._id;
        
        // Check if competition already exists
        const existingCompetition = await Event.findOne({ 
            title: tataCompetition.title,
            description: tataCompetition.description 
        });
        
        if (existingCompetition) {
            console.log('Tata Building India Competition already exists');
            console.log('Competition ID:', existingCompetition._id);
            return;
        }
        
        // Create new competition
        const competition = new Event(tataCompetition);
        await competition.save();
        
        console.log('✅ Tata Building India School Essay Competition added successfully!');
        console.log('📋 Competition Details:');
        console.log('   Title:', competition.title);
        console.log('   Category:', competition.category);
        console.log('   Classes:', competition.ageGroup);
        console.log('   Deadline:', competition.deadline.toLocaleDateString());
        console.log('   Status:', competition.status);
        console.log('   Featured:', competition.featured);
        console.log('🆔 Competition ID:', competition._id);
        
    } catch (error) {
        console.error('❌ Error adding Tata competition:', error.message);
    } finally {
        await mongoose.disconnect();
    }
}

// Run the function
addTataCompetition();
