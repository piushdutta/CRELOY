import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/creloy_logo-removebg-preview.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-content">
                <div className="footer-brand">
                    <img src={logo} alt="Creloy Logo" className="footer-logo" />
                    <p>Where your ideas become perfect designs.</p>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Creloy. All rights reserved.</p>
                    <div className="social-links">
                        <a href="#">Twitter</a>
                        <a href="#">Instagram</a>
                        <a href="#">LinkedIn</a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
