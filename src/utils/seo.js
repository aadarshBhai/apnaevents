// SEO metadata configuration for different pages
export const SEO_CONFIG = {
  home: {
    title: "Best Career Options After 12th | Career Guidance in India",
    description: "Get expert career guidance for students in India. Explore best career options after 12th, government colleges after 12th, private colleges after 12th, high salary courses after 12th science and arts, college application guidance, and entrance exam preparation.",
    keywords: "career guidance for students, career counselling after 12th, best career options after 12th, career guidance in India, student mentorship platform, college application guidance, career planning for students, future career guidance, government college after 12th grade, college after 12th grade science, private college after 12th grade, college after 12th grade maths, high salary courses after 12th Science, college after 12th grade biology, best college after 12th grade, high salary courses after 12th Arts"
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
