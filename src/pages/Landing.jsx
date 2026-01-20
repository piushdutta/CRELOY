
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
                <About />
            </main>
            <Footer />
        </div>
    );
};

export default Landing;
