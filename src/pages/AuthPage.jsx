import AuthSection from '../components/AuthSection';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Auth.css';

const AuthPage = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-page">
            <button
                onClick={() => navigate(-1)}
                className="back-home-btn"
                style={{ cursor: 'pointer', border: 'none', background: 'none' }}
            >
                <span style={{ fontSize: '1.2rem' }}>←</span> Back
            </button>
            <Navbar />
            <div className="auth-bg-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>
            <AuthSection />
        </div>
    );
};

export default AuthPage;
