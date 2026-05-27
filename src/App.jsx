import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Profile from './pages/Profile';
import OrganizerDashboard from './pages/OrganizerDashboard';
import EventDetail from './pages/EventDetail';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ResetPassword from './pages/ResetPassword';
import SubmitEvent from './pages/SubmitEvent';
import CareerQuizPage from './pages/CareerQuizPage';
import CareersPage from './pages/CareersPage';
import CareerCategoryDetail from './pages/CareerCategoryDetail';
import CollegesCategoryDetail from './pages/CollegesCategoryDetail';
import ExamsCategoryDetail from './pages/ExamsCategoryDetail';
import ScholarshipsCategoryDetail from './pages/ScholarshipsCategoryDetail';
import Search from './pages/Search';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import { NotificationProvider } from './components/NotificationSystem';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <NotificationProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/reset-password" element={<ResetPassword />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/submit-event" element={<SubmitEvent />} />
                            <Route path="/career-quiz" element={<CareerQuizPage />} />
                            <Route path="/careers" element={<CareersPage />} />
                            <Route path="/careers/:category" element={<CareerCategoryDetail />} />
                            <Route path="/colleges/:category" element={<CollegesCategoryDetail />} />
                            <Route path="/exams/:category" element={<ExamsCategoryDetail />} />
                            <Route path="/scholarships/:category" element={<ScholarshipsCategoryDetail />} />
                            <Route path="/search" element={<Search />} />
                            <Route path="/event/:id" element={<EventDetail />} />
                            <Route
                                path="/profile"
                                element={
                                    <ProtectedRoute>
                                        <Profile />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="/dashboard"
                                element={
                                    <ProtectedRoute allowedRoles={['organizer', 'admin']}>
                                        <OrganizerDashboard />
                                    </ProtectedRoute>
                                }
                            />
                            <Route path="/admin" element={<AdminLogin />} />
                            <Route
                                path="/admin/dashboard"
                                element={
                                    <ProtectedRoute allowedRoles={['admin']}>
                                        <AdminDashboard />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </Layout>
                </Router>
            </NotificationProvider>
        </AuthProvider>
    );
}

export default App;
