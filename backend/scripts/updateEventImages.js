import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';

dotenv.config();

// Map of event titles to working Unsplash images
const eventImageMap = {
  "FASPE FELLOWSHIPS": "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800",
  "SONY WORLD PHOTOGRAPHY AWARDS": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
  "UNESCO ART FOR INNER PEACE COMPETITION": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=800",
  "YALE YOUNG GLOBAL SCHOLARS": "https://images.unsplash.com/photo-1541339907198-e0e1c9aa08ad?auto=format&fit=crop&q=80&w=800",
  "LEICA STREET PHOTO CONTEST": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
  "CHAMPIONING CLEAN SPORT - SLOGAN CONTEST": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800",
  "IAEA CHALLENGE: INNOVATIONS IN NUCLEAR FUEL SUPPLY CHAIN": "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
  "LOGO DESIGN CONTEST FOR SOFTWARE TECHNOLOGY PARKS OF INDIA": "https://images.unsplash.com/photo-1626785774573-4b799314346d?auto=format&fit=crop&q=80&w=800",
  "THE SIGMA AWARDS": "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800",
  "VIENNA BIOCENTER SUMMER SCHOOL": "https://images.unsplash.com/photo-1532153975070-2e9ab71f1b14?auto=format&fit=crop&q=80&w=800",
  "IIASA YOUNG SCIENTISTS SUMMER PROGRAM": "https://images.unsplash.com/photo-1532187863486-85f6c07f5cbe?auto=format&fit=crop&q=80&w=800",
  "ISRO ROBOTICS CHALLENGE": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  "MATHWORKS MATH MODELING CHALLENGE": "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=800",
  "YOUNG AUTHOR AWARDS": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  "THE NEW YORK TIMES PHOTO ESSAY CONTEST": "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
  "LEARNING PLANET YOUTH DESIGN CHALLENGE": "https://images.unsplash.com/photo-1559028012-72e4d5d4e5b7?auto=format&fit=crop&q=80&w=800",
  "HANSEN LEADERSHIP INSTITUTE": "https://images.unsplash.com/photo-1515187029135-18b2843cd066?auto=format&fit=crop&q=80&w=800",
  "WAYFINDER SOCIETY STUDENT MINI-GRANTS": "https://images.unsplash.com/photo-1542601906997-b2d866ebd319?auto=format&fit=crop&q=80&w=800",
  "ATLANTIC FELLOWS FOR SOCIAL AND ECONOMIC EQUITY PROGRAM": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800",
  "BEVISIONEERS: THE MERCEDES-BENZ FELLOWSHIP": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=800",
  "KELLOGG-MORGAN STANLEY SUSTAINABLE INVESTING CHALLENGE": "https://images.unsplash.com/photo-1611974289853-4c376614538f?auto=format&fit=crop&q=80&w=800",
  "AIF BANYAN IMPACT FELLOWSHIP": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  "BIOMIMICRY YOUTH DESIGN CHALLENGE": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
  "CWA PHOTO COMPETITION": "https://images.unsplash.com/photo-1494412651409-8e3e564a2b8a?auto=format&fit=crop&q=80&w=800",
  "RICE BUSINESS PLAN COMPETITION": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=800",
  "ASHTON AWARD FOR STUDENT RESEARCH": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
  "OHCHR MINORITIES FELLOWSHIP PROGRAM": "https://images.unsplash.com/photo-1488590538505-98d2b5aba04b?auto=format&fit=crop&q=80&w=800",
  "JOHNS HOPKINS HEALTHCARE DESIGN COMPETITION": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  "NEW MEDIA WRITING PRIZE": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  "INTERNATIONAL PHYSICS COMPETITION": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800",
  "NATIONAL GEOGRAPHIC SLINGSHOT CHALLENGE": "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
  "MILKEN-PENN GSE EDUCATION BUSINESS PLAN COMPETITION": "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  "ST. GALLEN SYMPOSIUM GLOBAL ESSAY COMPETITION": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
  "AIIB GRADUATE PROGRAM": "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80&w=800",
  "NSS SPACE SETTLEMENT CONTEST": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
  "SUNDANCE INSTITUTE IGNITE X ADOBE FELLOWSHIP": "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&q=80&w=800",
  "BLUE OCEAN STUDENT ENTREPRENEURSHIP COMPETITION": "https://images.unsplash.com/photo-1559028006-3159b0cd8663?auto=format&fit=crop&q=80&w=800",
  "MATTHEW POWER LITERARY REPORTING AWARD": "https://images.unsplash.com/photo-1481627834876-b7833e62f1da?auto=format&fit=crop&q=80&w=800",
  "GLOBAL CANVAS CHILDREN'S ART COMPETITION": "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80&w=800",
  "CANTERBURY TALES WRITING COMPETITION": "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
  "INTERNATIONAL YOUNG ECO-HERO AWARDS": "https://images.unsplash.com/photo-1542601906997-b2d866ebd319?auto=format&fit=crop&q=80&w=800",
  "JOINT JAPAN/WORLD BANK GRADUATE SCHOLARSHIP PROGRAM": "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=800"
};

async function updateEventImages() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Get all events
    const events = await Event.find({});
    console.log(`Found ${events.length} events to update`);

    // Update each event with working image
    for (const event of events) {
      const newImage = eventImageMap[event.title];
      if (newImage) {
        await Event.findByIdAndUpdate(event._id, { image: newImage });
        console.log(`Updated image for: ${event.title}`);
      } else {
        // Use a default image if no specific mapping exists
        const defaultImage = "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800";
        await Event.findByIdAndUpdate(event._id, { image: defaultImage });
        console.log(`Used default image for: ${event.title}`);
      }
    }

    console.log('Successfully updated all event images');

  } catch (error) {
    console.error('Error updating event images:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the update function
updateEventImages();
