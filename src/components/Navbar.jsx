import React, { useState } from 'react';
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



    const [activeLink, setActiveLink] = useState('signup');

    return (
        <>
            <div className="logo-fixed">
                <Link to="/admin-login">
                    <img src={logo} alt="Creloy Logo" className="logo-img" />
                </Link>
            </div>
            <nav className="navbar">
                <div className="container nav-content">
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <a href="#about">About</a>
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
                    <div className="auth-guest-links" onMouseLeave={() => setActiveLink('signup')}>
                        <div className="auth-highlight" style={{
                            transform: `translateX(${activeLink === 'signup' ? '100%' : '0%'})`
                        }} />
                        <Link
                            to="/auth#login"
                            className={`nav-item ${activeLink === 'login' ? 'active-link' : ''}`}
                            onMouseEnter={() => setActiveLink('login')}
                        >
                            Login
                        </Link>
                        <Link
                            to="/auth#signup"
                            className={`btn-primary ${activeLink === 'signup' ? 'active-link' : ''}`}
                            onMouseEnter={() => setActiveLink('signup')}
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
};

export default Navbar;
