import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="home-dashboard">
            <Navbar />
            <main className="container dashboard-content">
                <div className="welcome-banner glass">
                    <div className="banner-text">
                        <h1>Welcome back, <span className="gradient-text">{user.name || user.email.split('@')[0] || 'User'}</span>!</h1>
                        <p>You have successfully logged in to your Creloy dashboard. Explore your projects and analytics below.</p>
                        <div className="banner-actions" style={{ marginTop: '2.5rem', display: 'flex', gap: '1.5rem' }}>
                            <button className="btn-main">Create New Project</button>
                            <button onClick={handleLogout} className="btn-outline" style={{ padding: '1.1rem 2.5rem' }}>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div className="stat-card glass">
                        <h3>Active Projects</h3>
                        <p className="stat-number">0</p>
                    </div>
                    <div className="stat-card glass">
                        <h3>Messages</h3>
                        <p className="stat-number">2</p>
                    </div>
                    <div className="stat-card glass">
                        <h3>Portfolio Views</h3>
                        <p className="stat-number">124</p>
                    </div>
                </div>

                <div className="recent-activity glass">
                    <h3>Recent Activity</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div className="activity-icon">🚀</div>
                            <div className="activity-info">
                                <p className="activity-title">Account Created</p>
                                <p className="activity-time">Just now</p>
                            </div>
                        </div>
                        <div className="activity-item">
                            <div className="activity-icon">✨</div>
                            <div className="activity-info">
                                <p className="activity-title">Theme Updated</p>
                                <p className="activity-time">A few moments ago</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
