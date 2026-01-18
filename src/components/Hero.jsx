import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero container">
            <div className="hero-content">
                <div className="badge gold-glow">The Future of Design</div>
                <h1 className="hero-title">
                    Digital Design <span className="gradient-text">Marketplace</span>
                </h1>
                <p className="hero-subtitle">
                    Discover premium logos, business cards, and posters. Customize them in real-time and own your brand identity with Creloy.
                </p>
                <div className="hero-actions">
                    <Link to="/marketplace" className="btn-main">Browse Designs</Link>
                    <Link to="/editor" className="btn-outline">Creative Mode</Link>
                </div>
            </div>

            <div className="hero-visual">
                <div className="abstract-shape"></div>
                <div className="security-shield" style={{ position: 'absolute', top: '20px', right: '20px', opacity: 0.5, fontSize: '0.8rem' }}>
                    🛡️ Protected by Creloy Security
                </div>
            </div>
        </section>
    );
};

export default Hero;
