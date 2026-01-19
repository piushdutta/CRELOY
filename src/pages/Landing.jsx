
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Footer from '../components/Footer';
import About from '../components/About';
import { useAuth } from '../context/AuthContext';

const Landing = () => {
    const { user } = useAuth();
    return (
        <div className="landing">
            <Navbar />
            <main>
                <Hero />
                <Services />
                <section id="portfolio" className="container" style={{ textAlign: 'center', marginTop: '10rem' }}>
                    <div className="section-header">
                        <h2 className="section-title">Selected <span className="gradient-text">Works</span></h2>
                        <p className="section-subtitle">Coming soon... we are currently perfecting our latest creations to wow you.</p>
                    </div>
                    <div className="works-grid" style={{
                        marginTop: '4rem',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2.5rem'
                    }}>
                        {[
                            { title: 'Aether Branding', cat: 'Logo Design', img: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
                            { title: 'Gold Reserve', cat: 'Business Card', img: 'https://images.unsplash.com/photo-1598124838120-020cb1277a94?auto=format&fit=crop&q=80&w=800' },
                            { title: 'Nova Studio', cat: 'Marketplace Asset', img: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=800' }
                        ].map((work, i) => (
                            <div key={i} className="" style={{
                                padding: '1.5rem',
                                borderRadius: '30px',
                                textAlign: 'left',
                                background: 'var(--surface)',
                                border: '1px solid var(--glass-border)',
                                transition: 'all 0.4s ease'
                            }}>
                                <img src={work.img} alt={work.title} style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '20px', marginBottom: '1.5rem' }} />
                                <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>{work.cat}</span>
                                <h3 style={{ fontSize: '1.6rem', marginTop: '0.5rem', fontFamily: 'var(--font-heading)' }}>{work.title}</h3>
                            </div>
                        ))}
                    </div>
                </section>
                <About />
                <br />
                <br />
                <br />

            </main>
            <Footer />
        </div>
    );
};

export default Landing;
