import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
    return (
        <section id="home" className="hero">
            <div className="container hero-content">
                <div className="badge glass">Design Redefined</div>
                <h1 className="hero-title">
                    Where Your <span className="gradient-text">Ideas</span> <br />
                    Become <span className="gradient-text">Perfect Designs</span>
                </h1>
                <p className="hero-subtitle">
                    At Creloy, we merge creativity with precision to craft digital experiences
                    that captivate, inspire, and deliver results.
                </p>
                <div className="hero-actions">
                    <Link to="/auth" className="btn-main">Start a Project</Link>
                    <a href="#portfolio" className="btn-outline">View Portfolio</a>
                </div>
                <div className="hero-visual glass">
                    {/* A placeholder for a 3D-like or abstract element */}
                    <div className="abstract-shape"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
