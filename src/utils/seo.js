// SEO metadata configuration for different pages
export const SEO_CONFIG = {
  home: {
    title: "Online Olympiad Competitions for Class 9–12 Students India | ApnaEvents",
    description: "Participate in verified online olympiad competitions for Class 9-12 students in India. Find student competitions online and boost your academic profile with ApnaEvents.",
    keywords: "school competitions India, class 9–12 Olympiad, student competitions online, online olympiad, class 9 olympiad, class 10 olympiad, class 11 olympiad, class 12 olympiad, india competitions, student competitions"
  },
  events: {
    title: "Browse School Competitions India | Class 9–12 Olympiads & Contests",
    description: "Explore a directory of school competitions in India. From class 9–12 Olympiads to student competitions online, find every academic opportunity on ApnaEvents.",
    keywords: "school competitions India, student competitions online, class 9–12 Olympiad, academic contests, student events, class competitions, inter-school competitions"
  },
  about: {
    title: "About ApnaEvents - Verified Student Competitions Online in India",
    description: "ApnaEvents connects Indian students with verified school competitions and online Olympiads. Our mission is to democratize academic opportunities for Class 9-12.",
    keywords: "about apnaevents, student platform, school competitions India, academic opportunities, student development, class 9-12 competitions"
  },
  contact: {
    title: "Contact ApnaEvents | Support for School Competitions India",
    description: "Need help with online Olympiad registrations or student competitions in India? Contact the ApnaEvents support team for assistance.",
    keywords: "contact apnaevents, student support, competition help, school competitions India, student competitions online"
  },
  auth: {
    title: "Student Registration | Join Online Olympiad Competitions India",
    description: "Create your ApnaEvents account to register for school competitions in India and online Olympiads for Class 9-12 students.",
    keywords: "student registration, student login, school competitions India, class 9-12 Olympiad, join competitions"
  },
  admin: {
    title: "Admin Dashboard | Manage School Competitions India",
    description: "Administrative portal for managing student competitions, event listings, and user registrations on the ApnaEvents platform.",
    keywords: "admin login, competition management, event dashboard, administrator portal, school competitions hub"
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
