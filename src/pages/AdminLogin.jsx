import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css'; // Reusing Auth styles

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
            <Link to="/" className="back-home-btn" style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', zIndex: 10 }}>
                <span className="icon">←</span>
                <span className="text">Back to Home</span>
            </Link>

            <div className="auth-card glassmorphism">
                <div className="auth-header text-center">
                    <h2>Admin Access</h2>
                    <p>Enter administrative credentials</p>
                </div>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        <label>Admin Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-alert">{error}</p>}
                    <button type="submit" className="submit-btn">Login as Admin</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
