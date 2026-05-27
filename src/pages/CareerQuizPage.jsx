import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';
import CareerQuiz from '../components/career/CareerQuiz';
import SEO from '../components/seo/SEO';

const CareerQuizPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <SEO
                title="Career Quiz - Find Your Perfect Career Path"
                description="Take our 5-minute career quiz and discover careers that match your strengths, interests, and lifestyle."
                keywords="career quiz, career finder, career assessment, Class 11-12"
            />
            <CareerGuidanceNavbar />
            <main>
                <CareerQuiz />
            </main>
            <Footer />
        </div>
    );
};

export default CareerQuizPage;
