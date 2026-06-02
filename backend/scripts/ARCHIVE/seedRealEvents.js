import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import User from '../models/User.js';

dotenv.config();

const realEvents = [
    // JANUARY 2026 EVENTS - PART 1
    {
        title: "FASPE FELLOWSHIPS",
        description: "Fellowships at Auschwitz for the Study of Professional Ethics (FASPE) invites candidates for a two-week program across six fields: Business, Medical, Clergy, Design & Technology, Journalism, and Law. Selected fellows will receive full funding to participate in the program in Germany and Poland.",
        date: new Date('2026-01-04'),
        deadline: new Date('2026-01-04'),
        location: "Germany and Poland",
        category: "Fellowship",
        eligibility: "Graduate Students & Early Career Professionals",
        prizes: "Full funding for program participation",
        applicationLink: "bit.ly/faspefellowships",
        ageGroup: "GRADUATE STUDENTS & EARLY CAREER PROFESSIONALS",
        tags: ["fellowship", "ethics", "professional", "international"],
        featured: true,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/faspe-fellowships"
    },
    {
        title: "SONY WORLD PHOTOGRAPHY AWARDS",
        description: "The award invites participants to submit up to three striking single images taken within the past year. Winners from each category will receive Sony's digital imaging kit as well as fully paid travel and accommodation to the awards ceremony in London.",
        date: new Date('2026-01-06'),
        deadline: new Date('2026-01-06'),
        location: "London, UK",
        category: "Photography",
        eligibility: "OPEN TO ALL",
        prizes: "Sony digital imaging kit + travel & accommodation",
        applicationLink: "bit.ly/sonyphotographyawards",
        ageGroup: "OPEN TO ALL",
        tags: ["photography", "competition", "international", "awards"],
        featured: true,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/sony-photography"
    },
    {
        title: "UNESCO ART FOR INNER PEACE COMPETITION",
        description: "The contest invites entries in the form of music, photos, videos, paintings, poetry, or sculptures on the theme 'Inner Peace'. First prize winners will receive a membership letter to the UNESCO BMW Club.",
        date: new Date('2026-01-07'),
        deadline: new Date('2026-01-07'),
        location: "UNESCO Headquarters",
        category: "Arts",
        eligibility: "16 - 18 YEARS",
        prizes: "UNESCO BMW Club membership",
        applicationLink: "bit.ly/unescoinnerpeacecompetition",
        ageGroup: "16 - 18 YEARS",
        tags: ["art", "peace", "unesco", "competition"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/unesco-art-peace"
    },
    {
        title: "YALE YOUNG GLOBAL SCHOLARS",
        description: "The program aims to bring outstanding high school students from around the world to engage in an interdisciplinary, two-week session at Yale University's historic campus. Students with demonstrated financial need are eligible for fee waiver and full financial aid.",
        date: new Date('2026-01-07'),
        deadline: new Date('2026-01-07'),
        location: "Yale University, USA",
        category: "Academic",
        eligibility: "High School Students",
        prizes: "Full financial aid including travel and accommodation",
        applicationLink: "bit.ly/yaleyoungglobalscholars",
        ageGroup: "HIGH SCHOOL STUDENTS",
        tags: ["yale", "academic", "scholars", "international"],
        featured: true,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/yale-scholars"
    },
    {
        title: "LEICA STREET PHOTO CONTEST",
        description: "The contest invites up to five images on the theme of street photography, capturing everyday life in public space. The winner will receive a Leica camera, and the top 30 pictures will be presented at exhibitions in Warsaw and Vienna.",
        date: new Date('2026-01-09'),
        deadline: new Date('2026-01-09'),
        location: "Warsaw, Poland & Vienna, Austria",
        category: "Photography",
        eligibility: "OPEN TO ALL",
        prizes: "Leica camera + exhibition opportunities",
        applicationLink: "bit.ly/leicastreetphotocontest",
        ageGroup: "OPEN TO ALL",
        tags: ["photography", "street", "leica", "exhibition"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/leica-street-photo"
    },
    {
        title: "CHAMPIONING CLEAN SPORT - SLOGAN CONTEST",
        description: "The National Anti-Doping Agency invites slogans promoting the values of fair play, integrity, and a doping-free sporting environment. Entries should be less than 10 words in English or Hindi.",
        date: new Date('2026-01-10'),
        deadline: new Date('2026-01-10'),
        location: "Online",
        category: "Creative Writing",
        eligibility: "OPEN TO ALL",
        prizes: "₹3,000, ₹2,000, ₹1,000 for top 3 winners",
        applicationLink: "bit.ly/cleansportslogancontest",
        ageGroup: "OPEN TO ALL",
        tags: ["slogan", "sports", "anti-doping", "creative"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/clean-sport-contest"
    },
    {
        title: "IAEA CHALLENGE: INNOVATIONS IN NUCLEAR FUEL SUPPLY CHAIN",
        description: "The competition invites participants to solve advanced physics problems testing conceptual understanding and mathematical reasoning. Participants can compete in three age categories with cash prizes from $1,500 pool.",
        date: new Date('2026-01-10'),
        deadline: new Date('2026-01-10'),
        location: "Online",
        category: "Science",
        eligibility: "BELOW 35 YEARS",
        prizes: "Cash prizes from $1,500 pool",
        applicationLink: "bit.ly/iaeachallenge",
        ageGroup: "BELOW 35 YEARS",
        tags: ["nuclear", "physics", "innovation", "science"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/iaea-challenge"
    },
    {
        title: "LOGO DESIGN CONTEST FOR SOFTWARE TECHNOLOGY PARKS OF INDIA",
        description: "The Ministry of Electronics & Information Technology invites bilingual logos in Hindi and English reflecting STPI's role and excellence. Winning entry receives ₹25,000 cash prize and certificate.",
        date: new Date('2026-01-10'),
        deadline: new Date('2026-01-10'),
        location: "Online",
        category: "Design",
        eligibility: "OPEN TO ALL",
        prizes: "₹25,000 + certificate",
        applicationLink: "bit.ly/softwarelogodesigncontest",
        ageGroup: "OPEN TO ALL",
        tags: ["logo", "design", "software", "government"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/logo-design-contest"
    },
    {
        title: "THE SIGMA AWARDS",
        description: "The awards invite journalistic pieces using rigorous data collection and analysis to uncover public-interest facts. Winners receive awards from a total prize pool of $5,000.",
        date: new Date('2026-01-11'),
        deadline: new Date('2026-01-11'),
        location: "Online",
        category: "Journalism",
        eligibility: "OPEN TO ALL",
        prizes: "Awards from $5,000 prize pool",
        applicationLink: "bit.ly/thesigmaawards",
        ageGroup: "OPEN TO ALL",
        tags: ["journalism", "data", "storytelling", "awards"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/sigma-awards"
    },
    {
        title: "VIENNA BIOCENTER SUMMER SCHOOL",
        description: "The 9-week summer program provides Life Sciences students opportunity to work alongside leading researchers. Selected participants receive free accommodation, €1,400 stipend, and medical insurance.",
        date: new Date('2026-01-11'),
        deadline: new Date('2026-01-11'),
        location: "Vienna, Austria",
        category: "Research",
        eligibility: "COLLEGE STUDENTS",
        prizes: "Free accommodation + €1,400 stipend + medical insurance",
        applicationLink: "bit.ly/viennabiocenterprogram",
        ageGroup: "COLLEGE STUDENTS",
        tags: ["biology", "research", "summer", "vienna"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/vienna-biocenter"
    }
];

async function seedEvents() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Get or create admin user
        let adminUser = await User.findOne({ email: 'aadarshgolucky@gmail.com' });
        if (!adminUser) {
            console.log('Admin user not found. Please create admin user first.');
            return;
        }

        // Clear existing events
        await Event.deleteMany({});
        console.log('Cleared existing events');

        // Insert new events
        const eventsWithOrganizer = realEvents.map(event => ({
            ...event,
            organizer: adminUser._id
        }));

        const insertedEvents = await Event.insertMany(eventsWithOrganizer);
        console.log(`Successfully inserted ${insertedEvents.length} events`);

        // Display inserted events
        insertedEvents.forEach((event, index) => {
            console.log(`${index + 1}. ${event.title} - ${event.category} - ${event.date.toDateString()}`);
        });

    } catch (error) {
        console.error('Error seeding events:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the seeding function
seedEvents();
