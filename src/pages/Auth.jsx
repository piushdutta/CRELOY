import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!isLogin) {
            // Sign Up logic
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            if (users.find(u => u.email === formData.email)) {
                setError('User already exists!');
                return;
            }
            users.push({
                email: formData.email,
                password: formData.password,
                name: formData.name
            });
            localStorage.setItem('users', JSON.stringify(users));
            alert('Signup successful! Please login now.');
            setIsLogin(true);
        } else {
            // Login logic
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const user = users.find(u => u.email === formData.email && u.password === formData.password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                navigate('/home');
            } else {
                setError('Invalid credentials or user does not exist. Please sign up first.');
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="auth-container">
            <Link to="/" className="back-link">← Back to Home</Link>
            <div className="auth-card glass">
                <div className="auth-header">
                    <p dangerouslySetInnerHTML={{ __html: isLogin ? 'Login to continue your journey' : 'Join Creloy and bring your ideas to life' }} />
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    {!isLogin && (
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="John Doe"
                                required
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>
                    )}
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="hello@example.com"
                            required
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="btn-primary auth-btn">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;
