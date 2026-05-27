const mongoose = require('mongoose');
const Event = require('../models/Event');
const User = require('../models/User');

// Sample events data
const sampleEvents = [
    {
        title: "National Science Olympiad 2024",
        description: "India's premier science competition for Class 9-12 students. Test your knowledge in Physics, Chemistry, and Biology. Win scholarships and recognition at national level.",
        date: new Date('2024-03-15T10:00:00Z'),
        deadline: new Date('2024-03-01T23:59:59Z'),
        location: "Online",
        category: "Science Olympiad",
        eligibility: "Class 9-12 students from recognized schools",
        prizes: "First Prize: ₹50,000, Second Prize: ₹30,000, Third Prize: ₹15,000 + Certificates for all participants",
        applicationLink: "https://apnaevents.in/register/national-science-olympiad",
        ageGroup: "Class 9-12",
        tags: ["Science", "National", "Scholarship", "Class 9-12"],
        featured: true,
        status: "upcoming",
        image: "/uploads/national-science-olympiad.jpg",
        verified: true
    },
    {
        title: "International Mathematics Competition",
        description: "Join students from across India in this prestigious mathematics competition. Problems designed to test analytical thinking and problem-solving skills.",
        date: new Date('2024-04-10T09:00:00Z'),
        deadline: new Date('2024-03-25T23:59:59Z'),
        location: "Online",
        category: "Mathematics",
        eligibility: "Class 9-12 students with strong math background",
        prizes: "Gold Medal: ₹1,00,000, Silver Medal: ₹50,000, Bronze Medal: ₹25,000 + Merit certificates",
        applicationLink: "https://apnaevents.in/register/math-competition",
        ageGroup: "Class 9-12",
        tags: ["Mathematics", "International", "Problem Solving", "Class 9-12"],
        featured: true,
        status: "upcoming",
        image: "/uploads/math-competition.jpg",
        verified: true
    },
    {
        title: "National English Essay Writing Contest",
        description: "Showcase your writing skills in this prestigious English competition. Topics focus on national development, education, and social issues.",
        date: new Date('2024-03-20T14:00:00Z'),
        deadline: new Date('2024-03-10T23:59:59Z'),
        location: "Online",
        category: "Essay Writing",
        eligibility: "Class 9-12 students from any school in India",
        prizes: "First Prize: ₹25,000, Publication机会, Second Prize: ₹15,000, Third Prize: ₹10,000 + Certificates",
        applicationLink: "https://apnaevents.in/register/english-essay",
        ageGroup: "Class 9-12",
        tags: ["English", "Writing", "Essay", "National", "Class 9-12"],
        featured: false,
        status: "upcoming",
        image: "/uploads/english-essay-contest.jpg",
        verified: true
    },
    {
        title: "Computer Science Coding Challenge",
        description: "Test your programming skills in this exciting coding competition. Open to all programming languages with algorithmic challenges.",
        date: new Date('2024-04-05T11:00:00Z'),
        deadline: new Date('2024-03-20T23:59:59Z'),
        location: "Online",
        category: "Computer Science",
        eligibility: "Class 9-12 students interested in programming",
        prizes: "First Prize: ₹75,000, Second Prize: ₹40,000, Third Prize: ₹20,000 + Tech internship opportunities",
        applicationLink: "https://apnaevents.in/register/coding-challenge",
        ageGroup: "Class 9-12",
        tags: ["Coding", "Programming", "Computer Science", "Algorithms", "Class 9-12"],
        featured: true,
        status: "upcoming",
        image: "/uploads/coding-challenge.jpg",
        verified: true
    },
    {
        title: "General Knowledge Quiz Championship",
        description: "Comprehensive quiz covering current affairs, history, geography, and general knowledge. Perfect for well-rounded students.",
        date: new Date('2024-03-25T16:00:00Z'),
        deadline: new Date('2024-03-15T23:59:59Z'),
        location: "Online",
        category: "Quiz Competition",
        eligibility: "Class 9-12 students from any board",
        prizes: "Champion: ₹30,000, Runner-up: ₹15,000, Semi-finalists: ₹5,000 each + Knowledge certificates",
        applicationLink: "https://apnaevents.in/register/gk-quiz",
        ageGroup: "Class 9-12",
        tags: ["Quiz", "General Knowledge", "Current Affairs", "Class 9-12"],
        featured: false,
        status: "upcoming",
        image: "/uploads/gk-quiz-championship.jpg",
        verified: true
    },
    {
        title: "National Science Fair 2024",
        description: "Showcase your scientific projects and innovations. Open to all science disciplines with focus on practical applications.",
        date: new Date('2024-05-01T10:00:00Z'),
        deadline: new Date('2024-04-15T23:59:59Z'),
        location: "Online + Regional Centers",
        category: "Science Fair",
        eligibility: "Class 9-12 students with science projects",
        prizes: "Best Project: ₹1,00,000, Innovation Award: ₹50,000, Regional Winners: ₹25,000 each + National recognition",
        applicationLink: "https://apnaevents.in/register/science-fair",
        ageGroup: "Class 9-12",
        tags: ["Science Fair", "Projects", "Innovation", "Research", "Class 9-12"],
        featured: true,
        status: "upcoming",
        image: "/uploads/science-fair.jpg",
        verified: true
    },
    {
        title: "Mathematics Olympiad Training Program",
        description: "Comprehensive training program for Mathematics Olympiad preparation. Includes practice tests, study materials, and expert guidance.",
        date: new Date('2024-03-30T09:00:00Z'),
        deadline: new Date('2024-03-18T23:59:59Z'),
        location: "Online",
        category: "Training Program",
        eligibility: "Class 9-12 students preparing for math competitions",
        prizes: "Certificate of Completion, Top performers get direct entry to National Math Olympiad",
        applicationLink: "https://apnaevents.in/register/math-training",
        ageGroup: "Class 9-12",
        tags: ["Training", "Mathematics", "Preparation", "Olympiad", "Class 9-12"],
        featured: false,
        status: "upcoming",
        image: "/uploads/math-training.jpg",
        verified: true
    },
    {
        title: "Environmental Awareness Essay Contest",
        description: "Write about environmental issues and solutions. Focus on sustainability, climate change, and conservation efforts.",
        date: new Date('2024-04-15T14:00:00Z'),
        deadline: new Date('2024-04-01T23:59:59Z'),
        location: "Online",
        category: "Essay Writing",
        eligibility: "Class 9-12 students passionate about environment",
        prizes: "Best Essay: ₹20,000, Publication in environmental journal, Second Prize: ₹10,000 + Tree plantation drive",
        applicationLink: "https://apnaevents.in/register/environmental-essay",
        ageGroup: "Class 9-12",
        tags: ["Environment", "Essay", "Sustainability", "Climate", "Class 9-12"],
        featured: false,
        status: "upcoming",
        image: "/uploads/environmental-essay.jpg",
        verified: true
    }
];

async function addEventsToProduction() {
    try {
        console.log('🚀 Connecting to production database...');
        
        // Connect to production MongoDB
        await mongoose.connect('mongodb+srv://aadarsh:aadarsh123@cluster0.mongodb.net/apnaevents?retryWrites=true&w=majority');
        console.log('✅ Connected to production database');
        
        // Find admin user
        const adminUser = await User.findOne({ email: 'aadarshgolucky@gmail.com' });
        
        if (!adminUser) {
            console.log('❌ Admin user not found. Creating admin user first...');
            
            // Create admin user if not exists
            const newAdmin = new User({
                name: 'Aadarsh Kumar',
                email: 'aadarshgolucky@gmail.com',
                password: 'admin123', // You should change this
                role: 'admin',
                verified: true
            });
            
            await newAdmin.save();
            console.log('✅ Admin user created');
            
            const admin = await User.findOne({ email: 'aadarshgolucky@gmail.com' });
            
            // Add events with admin as organizer
            const eventsToAdd = sampleEvents.map(event => ({
                ...event,
                organizer: admin._id
            }));
            
            const result = await Event.insertMany(eventsToAdd);
            
            console.log('✅ Sample events added to production!');
            console.log(`📋 Added ${result.length} events to production database`);
            console.log('');
            console.log('🎉 Your live ApnaEvents platform now has content for users to browse!');
            
        } else {
            console.log('✅ Admin user found');
            
            // Check existing events
            const existingCount = await Event.countDocuments();
            console.log(`📊 Current events in production database: ${existingCount}`);
            
            if (existingCount > 0) {
                console.log('ℹ️ Events already exist in production. Skipping sample event creation.');
                return;
            }
            
            // Add events with admin as organizer
            const eventsToAdd = sampleEvents.map(event => ({
                ...event,
                organizer: adminUser._id
            }));
            
            const result = await Event.insertMany(eventsToAdd);
            
            console.log('✅ Sample events added to production!');
            console.log(`📋 Added ${result.length} events to production database`);
            console.log('');
            console.log('🎉 Your live ApnaEvents platform now has content for users to browse!');
            console.log('📈 Analytics should improve immediately with new events.');
            console.log('');
            console.log('📋 Added Events:');
            result.forEach((event, index) => {
                console.log(`${index + 1}. ${event.title}`);
                console.log(`   📅 Date: ${event.date.toLocaleDateString()}`);
                console.log(`   ⏰ Deadline: ${event.deadline.toLocaleDateString()}`);
                console.log(`   🏆 Prizes: ${event.prizes.substring(0, 50)}...`);
                console.log(`   ⭐ Featured: ${event.featured ? 'Yes' : 'No'}`);
                console.log('');
            });
        }
        
    } catch (error) {
        console.error('❌ Error adding events to production:', error.message);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from database');
    }
}

// Run the function
addEventsToProduction();
