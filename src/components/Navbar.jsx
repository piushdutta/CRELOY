import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/creloy_logo-removebg-preview.png';
import './Navbar.css';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setUser(currentUser);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        setUser(null);
        window.location.href = '/';
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
                        <a href="#services">Services</a>
                        <a href="#portfolio">Portfolio</a>
                        <div className="nav-auth">
                            {user ? (
                                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                    <Link to="/home" className="nav-item">Dashboard</Link>
                                    <button onClick={handleLogout} className="btn-primary">Logout</button>
                                </div>
                            ) : (
                                <Link to="/auth" className="btn-primary">Login / Sign Up</Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
