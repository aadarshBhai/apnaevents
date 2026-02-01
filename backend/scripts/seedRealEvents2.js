import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import User from '../models/User.js';

dotenv.config();

const moreRealEvents = [
    // MORE JANUARY 2026 EVENTS
    {
        title: "IIASA YOUNG SCIENTISTS SUMMER PROGRAM",
        description: "The program invites scientific projects on topics ranging from Economic Frontiers to Applied Systems Analysis. Selected candidates stay at IIASA headquarters in Austria for 3 months.",
        date: new Date('2026-01-12'),
        deadline: new Date('2026-01-12'),
        location: "Austria",
        category: "Research",
        eligibility: "PHD STUDENTS",
        prizes: "3-month program at IIASA headquarters",
        applicationLink: "bit.ly/iiasascientistsummerprogram",
        ageGroup: "PHD STUDENTS",
        tags: ["research", "systems", "analysis", "summer"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/iiasa-summer"
    },
    {
        title: "ISRO ROBOTICS CHALLENGE",
        description: "ISRO invites teams of 3-10 members for a multi-round space robotics challenge. First prize team receives ₹10 Lakh, runner-ups receive ₹7 Lakh and ₹5 Lakh respectively.",
        date: new Date('2026-01-12'),
        deadline: new Date('2026-01-12'),
        location: "Online",
        category: "Technology",
        eligibility: "COLLEGE STUDENTS",
        prizes: "₹10 Lakh, ₹7 Lakh, ₹5 Lakh for top 3 teams",
        applicationLink: "bit.ly/isroroboticschallenge",
        ageGroup: "COLLEGE STUDENTS",
        tags: ["robotics", "isro", "space", "technology"],
        featured: true,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/isro-robotics"
    },
    {
        title: "THE NEW YORK TIMES PHOTO ESSAY CONTEST",
        description: "Students spotlight something interesting about their hometowns through 6-8 captioned photographs and 300-word introduction. Winners get featured in The New York Times.",
        date: new Date('2026-01-14'),
        deadline: new Date('2026-01-14'),
        location: "Online",
        category: "Photography",
        eligibility: "13 - 19 YEARS",
        prizes: "Feature in The New York Times",
        applicationLink: "bit.ly/newyorktimesphotoessaycontest",
        ageGroup: "13 - 19 YEARS",
        tags: ["photography", "essay", "new york times", "hometown"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/nyt-photo-essay"
    },
    {
        title: "LEARNING PLANET YOUTH DESIGN CHALLENGE",
        description: "Submit projects on Community Impact, Well-Being, or Sustainability themes. Sixty shortlisted participants receive mentorship and top twelve get $1,000 grants each.",
        date: new Date('2026-01-15'),
        deadline: new Date('2026-01-15'),
        location: "Online",
        category: "Design",
        eligibility: "15 - 26 YEARS",
        prizes: "Mentorship + $1,000 grant for top 12",
        applicationLink: "bit.ly/youthdesignchallenge",
        ageGroup: "15 - 26 YEARS",
        tags: ["design", "sustainability", "mentorship", "youth"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/learning-planet"
    },
    {
        title: "HANSEN LEADERSHIP INSTITUTE",
        description: "3-week program training future leaders to promote world peace and international cooperation. Selected candidates get fully funded trip to University of San Diego.",
        date: new Date('2026-01-15'),
        deadline: new Date('2026-01-15'),
        location: "University of San Diego, USA",
        category: "Leadership",
        eligibility: "20 - 25 YEARS",
        prizes: "Fully funded program + training",
        applicationLink: "bit.ly/hansenleadershipinstitute",
        ageGroup: "20 - 25 YEARS",
        tags: ["leadership", "peace", "cooperation", "funded"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/hansen-institute"
    },
    {
        title: "WAYFINDER SOCIETY STUDENT MINI-GRANTS",
        description: "Fund projects helping students understand plastic pollution and take action in communities. Top 10 applicants receive $500 each to support their projects.",
        date: new Date('2026-01-15'),
        deadline: new Date('2026-01-15'),
        location: "Online",
        category: "Environment",
        eligibility: "11 - 25 YEARS",
        prizes: "$500 each for top 10 applicants",
        applicationLink: "bit.ly/wayfinderstudentminigrants",
        ageGroup: "11 - 25 YEARS",
        tags: ["environment", "plastic", "pollution", "grants"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/wayfinder-grants"
    },
    {
        title: "ATLANTIC FELLOWS FOR SOCIAL AND ECONOMIC EQUITY PROGRAM",
        description: "Fully-funded fellowship addressing social and economic inequalities through intensive learning at London School of Economics for one year.",
        date: new Date('2026-01-16'),
        deadline: new Date('2026-01-16'),
        location: "London School of Economics, UK",
        category: "Fellowship",
        eligibility: "MID-CAREER PROFESSIONALS",
        prizes: "Fully funded fellowship at LSE",
        applicationLink: "bit.ly/atlanticfellowsprogram",
        ageGroup: "MID-CAREER PROFESSIONALS",
        tags: ["fellowship", "social", "economic", "london"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/atlantic-fellows"
    },
    {
        title: "BEVISIONEERS: THE MERCEDES-BENZ FELLOWSHIP",
        description: "12-month program for young people implementing environmental sustainability and decarbonisation projects with industry mentorship.",
        date: new Date('2026-01-16'),
        deadline: new Date('2026-01-16'),
        location: "Global",
        category: "Fellowship",
        eligibility: "16 - 28 YEARS",
        prizes: "12-month program + industry mentorship",
        applicationLink: "bit.ly/bevisioneersbenzfellowship",
        ageGroup: "16 - 28 YEARS",
        tags: ["fellowship", "mercedes", "sustainability", "mentorship"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/bevisioneers"
    },
    {
        title: "KELLOGG-MORGAN STANLEY SUSTAINABLE INVESTING CHALLENGE",
        description: "Creative financial approaches to tackle social and environmental problems. Teams pitch solutions in London for $10,000, $5,000, $2,500 prizes.",
        date: new Date('2026-01-25'),
        deadline: new Date('2026-01-25'),
        location: "London, UK",
        category: "Finance",
        eligibility: "GRADUATE STUDENTS",
        prizes: "$10,000, $5,000, $2,500 for top 3 teams",
        applicationLink: "bit.ly/kellogginvestingchallenge",
        ageGroup: "GRADUATE STUDENTS",
        tags: ["finance", "sustainable", "investing", "kellogg"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/kellogg-challenge"
    },
    {
        title: "AIF BANYAN IMPACT FELLOWSHIP",
        description: "Binational fellowship enhancing US-India relations through service roles across India focusing on sustainability, social justice, and leadership development.",
        date: new Date('2026-01-30'),
        deadline: new Date('2026-01-30'),
        location: "India",
        category: "Fellowship",
        eligibility: "21 - 35 YEARS",
        prizes: "Monthly stipend + service roles",
        applicationLink: "bit.ly/aifbanyanimpactindiafellowship",
        ageGroup: "21 - 35 YEARS",
        tags: ["fellowship", "india", "impact", "service"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/aif-banyan"
    },
    {
        title: "BIOMIMICRY YOUTH DESIGN CHALLENGE",
        description: "Teams of 2-8 students apply biomimicry to solve social or environmental issues related to Sustainable Development Goals with project overview and video pitch.",
        date: new Date('2026-01-31'),
        deadline: new Date('2026-01-31'),
        location: "Online",
        category: "Design",
        eligibility: "CLASS 6 - 12",
        prizes: "Recognition on Biomimicry Institute website",
        applicationLink: "bit.ly/biomimicryyouthdesignchallenge",
        ageGroup: "CLASS 6 - 12",
        tags: ["biomimicry", "design", "sustainability", "students"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/biomimicry-challenge"
    },
    {
        title: "CWA PHOTO COMPETITION",
        description: "Archaeology-themed photography competition. Top 4 images featured in Current World Archaeology magazine and at CA Live Conference in London with trophy and tickets.",
        date: new Date('2026-01-26'),
        deadline: new Date('2026-01-26'),
        location: "London, UK",
        category: "Photography",
        eligibility: "ABOVE 18 YEARS",
        prizes: "Trophy + conference tickets",
        applicationLink: "bit.ly/cwaarchaeologyphotocompetition",
        ageGroup: "ABOVE 18 YEARS",
        tags: ["photography", "archaeology", "conference", "magazine"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/cwa-photo"
    },
    {
        title: "RICE BUSINESS PLAN COMPETITION",
        description: "Student startup competition for Energy, Cleantech, Hard Tech, Life Sciences, Digital Enterprise, and Consumer Products. Cash prizes from $1 Million pool.",
        date: new Date('2026-01-31'),
        deadline: new Date('2026-02-01'),
        location: "Rice University, USA",
        category: "Business",
        eligibility: "GRADUATE STUDENTS",
        prizes: "Cash prizes from $1 Million pool",
        applicationLink: "bit.ly/ricebusinessstartupcompetition",
        ageGroup: "GRADUATE STUDENTS",
        tags: ["business", "startup", "competition", "rice"],
        featured: true,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/rice-business"
    },
    {
        title: "ASHTON AWARD FOR STUDENT RESEARCH",
        description: "Harvard's Arnold Arboretum supports students investigating Asian tropical forest biology with awards up to $4,000 for research proposals.",
        date: new Date('2026-01-31'),
        deadline: new Date('2026-02-01'),
        location: "Harvard University, USA",
        category: "Research",
        eligibility: "COLLEGE STUDENTS",
        prizes: "Up to $4,000 research award",
        applicationLink: "bit.ly/ashtonaward",
        ageGroup: "COLLEGE STUDENTS",
        tags: ["research", "biology", "harvard", "forest"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/ashton-award"
    },
    {
        title: "OHCHR MINORITIES FELLOWSHIP PROGRAM",
        description: "Program providing understanding of international human rights instruments with focus on minority rights. Fully funded program in Geneva, Switzerland.",
        date: new Date('2026-01-31'),
        deadline: new Date('2026-01-31'),
        location: "Geneva, Switzerland",
        category: "Fellowship",
        eligibility: "OPEN TO ALL",
        prizes: "Fully funded program in Geneva",
        applicationLink: "bit.ly/ohchrminoritiesfellowship",
        ageGroup: "OPEN TO ALL",
        tags: ["fellowship", "human rights", "minorities", "geneva"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/ohchr-fellowship"
    },
    {
        title: "JOHNS HOPKINS HEALTHCARE DESIGN COMPETITION",
        description: "Healthcare design competition with three tracks: Advanced Health Systems, Humanitarian Design, and Digital Health. $5,000, $3,000, $1,000 prizes for top solutions.",
        date: new Date('2026-02-01'),
        deadline: new Date('2026-02-01'),
        location: "Online",
        category: "Healthcare",
        eligibility: "COLLEGE STUDENTS",
        prizes: "$5,000, $3,000, $1,000 for top 3",
        applicationLink: "bit.ly/johnshopkinsdesignchallenge",
        ageGroup: "COLLEGE STUDENTS",
        tags: ["healthcare", "design", "johns hopkins", "competition"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/johns-hopkins"
    },
    {
        title: "NEW MEDIA WRITING PRIZE",
        description: "Competition for inventive stories and poetry incorporating digital formats and media. Grand prize winner receives £1,000 with additional cash awards for runners-up.",
        date: new Date('2026-02-01'),
        deadline: new Date('2026-02-01'),
        location: "Online",
        category: "Writing",
        eligibility: "OPEN TO ALL",
        prizes: "£1,000 for grand prize winner",
        applicationLink: "bit.ly/newmediawritingprizecontest",
        ageGroup: "OPEN TO ALL",
        tags: ["writing", "digital", "media", "prize"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/new-media-writing"
    },
    {
        title: "INTERNATIONAL PHYSICS COMPETITION",
        description: "Advanced physics problems competition with three age categories: Under 16, Under 19, and Above 19 Years. Category-specific cash prizes for winners.",
        date: new Date('2026-02-01'),
        deadline: new Date('2026-02-01'),
        location: "Online",
        category: "Science",
        eligibility: "HIGH SCHOOL & COLLEGE STUDENTS",
        prizes: "Category-specific cash prizes",
        applicationLink: "bit.ly/internationalphysicscontest",
        ageGroup: "HIGH SCHOOL & COLLEGE STUDENTS",
        tags: ["physics", "competition", "international", "science"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/physics-competition"
    },
    {
        title: "NATIONAL GEOGRAPHIC SLINGSHOT CHALLENGE",
        description: "1-minute video entries describing ideas for solving environmental issues. Teams of up to 6 members can win cash prizes from $10,000 pool.",
        date: new Date('2026-02-06'),
        deadline: new Date('2026-02-11'),
        location: "Online",
        category: "Environment",
        eligibility: "13 - 18 YEARS",
        prizes: "Cash prizes from $10,000 pool",
        applicationLink: "bit.ly/natgeoslingshotchallenge",
        ageGroup: "13 - 18 YEARS",
        tags: ["environment", "national geographic", "video", "challenge"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/natgeo-slingshot"
    },
    {
        title: "MILKEN-PENN GSE EDUCATION BUSINESS PLAN COMPETITION",
        description: "Innovative solutions for educational inequity with slide deck and 60-second video pitch. Finalists receive funding and up to $2,000 cash awards.",
        date: new Date('2026-02-11'),
        deadline: new Date('2026-02-11'),
        location: "University of Pennsylvania, USA",
        category: "Education",
        eligibility: "ABOVE 18 YEARS",
        prizes: "Funding + up to $2,000 for finalists",
        applicationLink: "bit.ly/milkenbusinessplancompetition",
        ageGroup: "ABOVE 18 YEARS",
        tags: ["education", "business", "milken", "penn"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/milken-penn"
    },
    {
        title: "ST. GALLEN SYMPOSIUM GLOBAL ESSAY COMPETITION",
        description: "Essay competition on 'Disruption in Tech + Politics + Demography'. Top 100 get fully funded trip to Switzerland. Top 3 win cash prizes from CHF 20,000.",
        date: new Date('2026-02-01'),
        deadline: new Date('2026-02-01'),
        location: "Switzerland",
        category: "Essay",
        eligibility: "GRADUATE STUDENTS",
        prizes: "Fully funded trip + cash prizes from CHF 20,000",
        applicationLink: "bit.ly/globalsymposiumcompetition",
        ageGroup: "GRADUATE STUDENTS",
        tags: ["essay", "symposium", "st gallen", "switzerland"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/st-gallen"
    },
    {
        title: "AIIB GRADUATE PROGRAM",
        description: "Two-year rotational program at Asia Infrastructure Investment Bank with hands-on experience, classroom training, and mentorship in various development work aspects.",
        date: new Date('2026-02-15'),
        deadline: new Date('2026-02-15'),
        location: "Various locations",
        category: "Banking",
        eligibility: "COLLEGE STUDENTS",
        prizes: "Two-year rotational program",
        applicationLink: "bit.ly/aiibgraduaterotationalprogram",
        ageGroup: "COLLEGE STUDENTS",
        tags: ["banking", "aiib", "graduate", "rotational"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/aiib-graduate"
    },
    {
        title: "NSS SPACE SETTLEMENT CONTEST",
        description: "Annual contest for space settlement designs including research, essays, stories, models, artwork. Grand prize winner receives Herman Rubin Award of $5,000.",
        date: new Date('2026-02-15'),
        deadline: new Date('2026-02-15'),
        location: "Online",
        category: "Space",
        eligibility: "CLASS 1 - 12",
        prizes: "Herman Rubin Award of $5,000",
        applicationLink: "bit.ly/spacesettlementchallenge",
        ageGroup: "CLASS 1 - 12",
        tags: ["space", "settlement", "nss", "contest"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/nss-space"
    },
    {
        title: "SUNDANCE INSTITUTE IGNITE X ADOBE FELLOWSHIP",
        description: "One-year fellowship for emerging filmmakers with 15-minute video showcasing artistic vision. Selected candidates get $5,000 grant and mentorship.",
        date: new Date('2026-02-13'),
        deadline: new Date('2026-02-13'),
        location: "USA",
        category: "Filmmaking",
        eligibility: "18 - 25 YEARS",
        prizes: "$5,000 grant + mentorship",
        applicationLink: "bit.ly/ignitexadobefellowship",
        ageGroup: "18 - 25 YEARS",
        tags: ["filmmaking", "sundance", "adobe", "fellowship"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/sundance-fellowship"
    },
    {
        title: "BLUE OCEAN STUDENT ENTREPRENEURSHIP COMPETITION",
        description: "Business ideas competition for unsolved problems with 5-minute video pitch. $1,000, $750, $500 prizes for top 3 teams.",
        date: new Date('2026-02-22'),
        deadline: new Date('2026-02-22'),
        location: "Online",
        category: "Entrepreneurship",
        eligibility: "14 - 18 YEARS",
        prizes: "$1,000, $750, $500 for top 3",
        applicationLink: "bit.ly/blueoceanstudentcompetition",
        ageGroup: "14 - 18 YEARS",
        tags: ["entrepreneurship", "blue ocean", "student", "competition"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/blue-ocean"
    },
    {
        title: "MATTHEW POWER LITERARY REPORTING AWARD",
        description: "Support for promising nonfiction writer on story uncovering truths about human condition. Selected candidate receives $15,000 cash prize.",
        date: new Date('2026-02-22'),
        deadline: new Date('2026-02-22'),
        location: "Online",
        category: "Journalism",
        eligibility: "OPEN TO ALL",
        prizes: "$15,000 cash prize",
        applicationLink: "bit.ly/matthewpowerliteraryaward",
        ageGroup: "OPEN TO ALL",
        tags: ["journalism", "literary", "reporting", "award"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/matthew-power"
    },
    {
        title: "GLOBAL CANVAS CHILDREN'S ART COMPETITION",
        description: "Art competition on 'The Book of Life' theme with various techniques. Winners receive certificates and cash prizes or art supply vouchers.",
        date: new Date('2026-02-19'),
        deadline: new Date('2026-02-19'),
        location: "Online",
        category: "Arts",
        eligibility: "4 - 16 YEARS",
        prizes: "Certificate + cash prizes or art vouchers",
        applicationLink: "bit.ly/globalcanvasartcompetition",
        ageGroup: "4 - 16 YEARS",
        tags: ["art", "children", "competition", "global"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/global-canvas"
    },
    {
        title: "CANTERBURY TALES WRITING COMPETITION",
        description: "Writing competition on 'Happily Ever After?' theme with three age categories. Top three winners receive £300, £150, £100 respectively.",
        date: new Date('2026-02-28'),
        deadline: new Date('2026-02-28'),
        location: "Online",
        category: "Writing",
        eligibility: "5 - 18 YEARS",
        prizes: "£300, £150, £100 for top 3 in each category",
        applicationLink: "bit.ly/canterburytalescompetition",
        ageGroup: "5 - 18 YEARS",
        tags: ["writing", "canterbury tales", "competition", "story"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/canterbury-tales"
    },
    {
        title: "INTERNATIONAL YOUNG ECO-HERO AWARDS",
        description: "Recognizes young leaders for innovative environmental initiatives. Winners receive up to $1,000, certificate, and global recognition.",
        date: new Date('2026-02-28'),
        deadline: new Date('2026-02-28'),
        location: "Online",
        category: "Environment",
        eligibility: "8 - 16 YEARS",
        prizes: "Up to $1,000 + certificate + global recognition",
        applicationLink: "bit.ly/youngecoheroawards",
        ageGroup: "8 - 16 YEARS",
        tags: ["environment", "eco-hero", "young", "awards"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/eco-hero"
    },
    {
        title: "JOINT JAPAN/WORLD BANK GRADUATE SCHOLARSHIP PROGRAM",
        description: "Scholarship supporting candidates pursuing degrees in selected programs with tuition, monthly stipend, round-trip airfare, health insurance, and travel allowance.",
        date: new Date('2026-02-27'),
        deadline: new Date('2026-02-27'),
        location: "Various",
        category: "Scholarship",
        eligibility: "MID-CAREER PROFESSIONALS",
        prizes: "Full scholarship with living expenses",
        applicationLink: "bit.ly/jointjapanwbgscholarship",
        ageGroup: "MID-CAREER PROFESSIONALS",
        tags: ["scholarship", "japan", "world bank", "graduate"],
        featured: false,
        status: "upcoming",
        image: "https://res.cloudinary.com/demo/image/upload/f_auto,q_auto,w_800,h_600,c_fill/japan-world-bank"
    }
];

async function seedMoreEvents() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Get admin user
        let adminUser = await User.findOne({ email: 'aadarshgolucky@gmail.com' });
        if (!adminUser) {
            console.log('Admin user not found. Please create admin user first.');
            return;
        }

        // Insert additional events
        const eventsWithOrganizer = moreRealEvents.map(event => ({
            ...event,
            organizer: adminUser._id
        }));

        const insertedEvents = await Event.insertMany(eventsWithOrganizer);
        console.log(`Successfully inserted ${insertedEvents.length} additional events`);

        // Display inserted events
        insertedEvents.forEach((event, index) => {
            console.log(`${index + 1}. ${event.title} - ${event.category} - ${event.date.toDateString()}`);
        });

        // Count total events
        const totalEvents = await Event.countDocuments();
        console.log(`Total events in database: ${totalEvents}`);

    } catch (error) {
        console.error('Error seeding additional events:', error);
    } finally {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
    }
}

// Run the seeding function
seedMoreEvents();
