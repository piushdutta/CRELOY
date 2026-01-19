import React from 'react';
import './About.css';

const About = () => {
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
                        <button className="btn-main know-more-btn">
                            Know More <span className="arrow">→</span>
                        </button>
                    </div>
                    <div className="about-visual">
                        <div className="about-image-wrapper">
                            <img
                                src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=1000"
                                alt="Creative Design Workspace"
                                className="about-img"
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
