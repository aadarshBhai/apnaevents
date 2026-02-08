// SEO metadata configuration for different pages
export const SEO_CONFIG = {
  home: {
    title: "Online Olympiad Competitions for Class 6–10 Students in India | ApnaEvents",
    description: "Discover and participate in verified online olympiad competitions for Class 6-10 students across India. Build your academic profile with ApnaEvents.",
    keywords: "online olympiad, class 6 olympiad, class 7 olympiad, class 8 olympiad, class 9 olympiad, class 10 olympiad, india competitions, student competitions"
  },
  events: {
    title: "Browse School Competitions in India | Academic Events for Students",
    description: "Browse verified school competitions, academic contests, and olympiads for Indian students. Filter by class, subject, and location on ApnaEvents.",
    keywords: "school competitions, academic contests, student events, class competitions, inter-school competitions, india student events"
  },
  about: {
    title: "About ApnaEvents - Empowering Indian Students Through Verified Competitions",
    description: "Learn how ApnaEvents is democratizing access to verified academic competitions for students across India. Our mission and impact.",
    keywords: "about apnaevents, student platform, education competitions india, academic opportunities, student development"
  },
  contact: {
    title: "Contact ApnaEvents - Support for Student Competitions in India",
    description: "Get in touch with ApnaEvents for support, partnerships, or questions about student competitions and academic events in India.",
    keywords: "contact apnaevents, student support, competition help, education partnership, apnaevents team"
  },
  auth: {
    title: "Student Login & Registration | Join ApnaEvents Competitions",
    description: "Create your free student account on ApnaEvents to participate in verified competitions and build your academic profile.",
    keywords: "student registration, student login, create account, join competitions, student profile"
  },
  admin: {
    title: "Admin Dashboard - Manage Student Competitions | ApnaEvents",
    description: "Administrative dashboard for managing student competitions, events, and user accounts on ApnaEvents platform.",
    keywords: "admin login, competition management, event dashboard, administrator portal"
  }
};

// Function to update page metadata
export const updatePageSEO = (pageKey) => {
  const config = SEO_CONFIG[pageKey];
  if (!config) return;

  // Update title
  document.title = config.title;
  
  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = config.description;
  
  // Update or create meta keywords
  let metaKeywords = document.querySelector('meta[name="keywords"]');
  if (!metaKeywords) {
    metaKeywords = document.createElement('meta');
    metaKeywords.name = 'keywords';
    document.head.appendChild(metaKeywords);
  }
  metaKeywords.content = config.keywords;
};

export default SEO_CONFIG;
