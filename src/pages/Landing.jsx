import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';

const Landing = () => {
    return (
        <div className="landing">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <section id="portfolio" className="container" style={{ textAlign: 'center' }}>
                    <h2 className="section-title">Selected <span className="gradient-text">Works</span></h2>
                    <p className="section-subtitle">Coming soon... we are currently perfecting our latest creations.</p>
                    <div style={{
                        marginTop: '4rem',
                        height: '400px',
                        background: 'var(--glass)',
                        borderRadius: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed var(--glass-border)'
                    }}>
                        <p style={{ color: 'var(--text-dim)' }}>Project Showcase Gallery</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
