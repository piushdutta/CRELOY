import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './About.css';
import creolyVideo from '../assets/creoly video.mp4';

const About = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleKnowMore = () => {
        if (!user) {
            navigate('/auth#login');
        } else {
            // Logic for authenticated users - could scroll to more info or navigate to a dashboard
            console.log("Logged in user clicked Know More");
        }
    };

    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="about-grid">
                    <div className="about-content">
                        <div className="badge">Behind the Vision</div>
                        <h2 className="section-title" style={{ textAlign: 'left', marginLeft: '0' }}>
                            Crafting Excellence at <span className="gradient-text">Creloy</span>
                        </h2>
                        <p className="about-description">
                            Creloy is a premier digital marketplace where creativity meets precision. We empower designers and businesses by providing high-end, customizable assets that define brand identities. Our platform is built on the belief that every idea deserves to be perfect, and every creator deserves a secure space to showcase their brilliance.
                        </p>
                        <button className="btn-main know-more-btn" onClick={handleKnowMore}>
                            Know More <span className="arrow">→</span>
                        </button>
                    </div>
                    <div className="about-visual">
                        <div className="about-image-wrapper">
                            <video
                                src={creolyVideo}
                                className="about-img"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <div className="about-accent-box"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
