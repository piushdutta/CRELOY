import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/creloy_logo-removebg-preview.png';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const { cart } = useCart();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setUser(currentUser);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        navigate('/');
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
                        <Link to="/auth?mode=login" className="nav-item">Login</Link>
                        <Link to="/auth?mode=signup" className="btn-primary">Sign Up</Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
