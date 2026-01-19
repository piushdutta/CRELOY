import AuthSection from '../components/AuthSection';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Auth.css';

const AuthPage = () => {
    return (
        <div className="auth-page-container">
            <Navbar />
            <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '100px' }}>
                <AuthSection />
            </main>
            <Footer />
        </div>
    );
};

export default AuthPage;
