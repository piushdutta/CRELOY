import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Auth.css';

const AuthSection = () => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (window.location.hash === '#signup') {
            setIsLogin(false);
        } else if (window.location.hash === '#login' || window.location.hash === '#auth-section') {
            setIsLogin(true);
        }
    }, [location]);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate network delay for premium feel
        setTimeout(() => {
            if (!isLogin) {
                // Sign Up logic
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                if (users.find(u => u.email === formData.email)) {
                    setError('This email is already registered.');
                    setIsLoading(false);
                    return;
                }
                users.push({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name
                });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Account created successfully! Welcome to Creloy.');
                setIsLogin(true);
                setIsLoading(false);
            } else {
                // Login logic
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.email === formData.email && u.password === formData.password);

                if (user) {
                    login(user);
                    const origin = location.state?.from?.pathname || '/home';
                    navigate(origin);
                } else {
                    setError('Invalid email or password. Please try again.');
                    setIsLoading(false);
                }
            }
        }, 1000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="auth-section" className="auth-section-container" style={{ padding: '8rem 0', background: '#050505' }}>
            <div className="container">
                <div className="auth-wrapper glassmorphism" style={{ margin: '0 auto', gridTemplateColumns: '1fr 1fr' }}>
                    <div className="auth-card">
                        <div className="auth-tabs">
                            <button
                                className={`tab-btn ${isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </button>
                            <button
                                className={`tab-btn ${!isLogin ? 'active' : ''}`}
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </button>
                        </div>

                        <div className="auth-content">
                            <div className="auth-header">
                                <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
                                <p>{isLogin ? 'Enter your credentials to access your account' : 'Fill in the details to start your creative journey'}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="auth-form">
                                {!isLogin && (
                                    <div className="input-group">
                                        <label>Full Name</label>
                                        <div className="input-field">
                                            <i className="input-icon">👤</i>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Your Name"
                                                required
                                                onChange={handleChange}
                                                value={formData.name}
                                            />
                                        </div>
                                    </div>
                                )}
                                <div className="input-group">
                                    <label>Email Address</label>
                                    <div className="input-field">
                                        <i className="input-icon">✉️</i>
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="email@example.com"
                                            required
                                            onChange={handleChange}
                                            value={formData.email}
                                        />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Password</label>
                                    <div className="input-field">
                                        <i className="input-icon">🔒</i>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="••••••••"
                                            required
                                            onChange={handleChange}
                                            value={formData.password}
                                        />
                                    </div>
                                </div>

                                {isLogin && (
                                    <div className="forgot-pass">
                                        <a href="#">Forgot password?</a>
                                    </div>
                                )}

                                {error && (
                                    <div className="error-alert">
                                        <span className="alert-icon">⚠️</span>
                                        {error}
                                    </div>
                                )}

                                <button type="submit" className={`submit-btn ${isLoading ? 'loading' : ''}`} disabled={isLoading}>
                                    <span>{isLoading ? 'Processing...' : (isLogin ? 'Connect' : 'Get Started')}</span>
                                    {!isLoading && <span className="arrow">→</span>}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="auth-info-aside">
                        <div className="aside-content">
                            <h3>Where your ideas become <span className="gradient-text">perfect designs</span>.</h3>
                            <p>Join over 2,000+ creators and businesses who bring their vision to life with Creloy.</p>

                            <div className="trust-badges">
                                <div className="badge">
                                    <span className="badge-count">99%</span>
                                    <span className="badge-label">Precision</span>
                                </div>
                                <div className="badge">
                                    <span className="badge-count">24/7</span>
                                    <span className="badge-label">Support</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AuthSection;
