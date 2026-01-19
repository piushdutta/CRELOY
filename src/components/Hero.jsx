import React from 'react';
import { Link } from 'react-router-dom';
import { Scene } from './ui/void-hero';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section">
            <div className="hero-blobs">
                <div className="hero-blob b1"></div>
                <div className="hero-blob b2"></div>
                <div className="hero-blob b3"></div>
            </div>
            <div className="container hero-container">
                <div className="hero-content">
                    <div className="badge">The Future of Design</div>
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

                <div className="hero-visual-side">
                    <div className="scene-container">
                        <Scene />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
