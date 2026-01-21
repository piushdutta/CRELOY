import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Auth.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'creloy2025@gmail.com' && password === 'Creloy@2025') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/dashboard');
        } else {
            setError('Unauthorized access. Only admins can enter.');
        }
    };

    return (
        <div className="auth-page">
            <Navbar />

            <button
                onClick={() => navigate(-1)}
                className="back-home-btn"
                style={{ cursor: 'pointer', border: 'none', background: 'none' }}
            >
                <span style={{ fontSize: '1.2rem' }}>←</span> Back
            </button>

            <div className="auth-bg-elements">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <section className="auth-section-container">
                <div className="auth-wrapper">
                    <div className="auth-card">
                        <div className="auth-header">
                            <h2>Admin Access</h2>
                            <p>Enter administrative credentials to proceed</p>
                        </div>

                        <form onSubmit={handleSubmit} className="auth-form">
                            <div className="input-group">
                                <label>Admin Email</label>
                                <div className="input-field">
                                    <i className="input-icon">✉️</i>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="admin@creloy.com"
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Password</label>
                                <div className="input-field">
                                    <i className="input-icon">🔒</i>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="error-alert">
                                    <span className="alert-icon">⚠️</span>
                                    {error}
                                </div>
                            )}

                            <button type="submit" className="submit-btn">
                                <span>Login as Admin</span>
                                <span className="arrow">→</span>
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdminLogin;

