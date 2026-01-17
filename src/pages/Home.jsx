import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            navigate('/auth');
        } else {
            setUser(currentUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
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
                        <p>You have successfully logged in to your Creloy dashboard.</p>
                        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                            <button className="btn-primary" style={{ padding: '0.8rem 2rem', borderRadius: '12px', fontWeight: '600' }}>New Project</button>
                            <button onClick={handleLogout} className="btn-outline" style={{ border: '1px solid var(--glass-border)', background: 'var(--glass)', color: 'var(--text-dim)', padding: '0.8rem 1.5rem', borderRadius: '12px', fontSize: '0.9rem' }}>
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
                    <div className="activity-item">
                        <div className="activity-icon">🚀</div>
                        <div className="activity-info">
                            <p className="activity-title">Account Created</p>
                            <p className="activity-time">Just now</p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
