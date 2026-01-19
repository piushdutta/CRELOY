import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/creloy_logo-removebg-preview.png';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const scrollToAuth = (e) => {
        const hash = e.currentTarget.getAttribute('href').split('#')[1];
        if (location.pathname === '/') {
            e.preventDefault();
            window.location.hash = hash;
            const section = document.getElementById('auth-section');
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <div className="logo-fixed">
                <Link to="/">
                    <img src={logo} alt="Creloy Logo" className="logo-img" />
                </Link>
            </div>
            <nav className="navbar glass">
                <div className="container nav-content">
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/marketplace">Marketplace</Link>
                        <Link to="/editor">Creative Mode</Link>
                        <Link to="/cart" className="nav-cart">
                            <span>Cart</span>
                            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="auth-fixed">
                {user ? (
                    <div className="auth-user-links">
                        <Link to="/home" className="nav-item">Dashboard</Link>
                        <button onClick={handleLogout} className="btn-primary">Logout</button>
                    </div>
                ) : (
                    <div className="auth-guest-links">
                        <Link to="/#login" onClick={scrollToAuth} className="nav-item">Login</Link>
                        <Link to="/#signup" onClick={scrollToAuth} className="btn-primary">Sign Up</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
