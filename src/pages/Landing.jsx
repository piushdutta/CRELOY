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
                    <div className="section-header">
                        <h2 className="section-title">Selected <span className="gradient-text">Works</span></h2>
                        <p className="section-subtitle">Coming soon... we are currently perfecting our latest creations to wow you.</p>
                    </div>
                    <div style={{
                        marginTop: '2rem',
                        minHeight: '400px',
                        background: 'rgba(212, 175, 55, 0.02)',
                        borderRadius: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed var(--glass-border)',
                        padding: '2rem'
                    }}>
                        <div className="gold-glow" style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>🎨</div>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '400px' }}>
                            Our creative gallery is under construction. Stay tuned for stunning designs!
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
