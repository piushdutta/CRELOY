import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

import Navbar from '../components/Navbar';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { addAsset, deleteAsset, assets } = useCart();
    const [newItem, setNewItem] = useState({
        title: '',
        category: 'Logo',
        price: '',
        image: ''
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) navigate('/admin-login');
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin-login');
    };

    const handleAdd = (e) => {
        e.preventDefault();
        if (!newItem.title || !newItem.price || !newItem.image) return;

        addAsset({
            ...newItem,
            price: parseFloat(newItem.price)
        });

        setNewItem({ title: '', category: 'Logo', price: '', image: '' });
        alert('Product added successfully!');
    };

    return (
        <div className="admin-page">
            <Navbar />
            <div className="admin-container container">
                <header className="admin-header">
                    <button onClick={handleLogout} className="admin-logout-btn">Logout Dashboard</button>
                    <h1>Admin <span className="gradient-text">Dashboard</span></h1>
                    <p>Manage your marketplace assets</p>
                </header>

                <div className="admin-grid">
                    {/* Add Item Form */}
                    <div className="admin-card glassmorphism add-form">
                        <h3>Add New Asset</h3>
                        <form onSubmit={handleAdd} className="admin-form">
                            <div className="input-group">
                                <label>Title</label>
                                <input
                                    type="text"
                                    value={newItem.title}
                                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                    placeholder="Blue Tech Logo"
                                />
                            </div>
                            <div className="input-group">
                                <label>Category</label>
                                <select
                                    value={newItem.category}
                                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                                >
                                    <option>Logo</option>
                                    <option>Business Card</option>
                                    <option>Poster</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Price ($)</label>
                                <input
                                    type="number"
                                    step="0.01"
                                    value={newItem.price}
                                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                                    placeholder="49.99"
                                />
                            </div>
                            <div className="input-group">
                                <label>Image URL</label>
                                <input
                                    type="text"
                                    value={newItem.image}
                                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>
                            <button type="submit" className="btn-main">Add to Marketplace</button>
                        </form>
                    </div>

                    {/* Stats/Current Assets */}
                    <div className="admin-card glassmorphism asset-list">
                        <h3>Active Assets ({assets.length})</h3>
                        <div className="assets-table-wrapper">
                            <table className="assets-table">
                                <thead>
                                    <tr>
                                        <th>Asset</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[...assets].reverse().slice(0, 15).map(asset => (
                                        <tr key={asset.id}>
                                            <td>{asset.title}</td>
                                            <td>{asset.category}</td>
                                            <td>${asset.price.toFixed(2)}</td>
                                            <td>
                                                <button
                                                    className="btn-delete"
                                                    onClick={() => {
                                                        if (window.confirm(`Delete "${asset.title}" permanently?`)) {
                                                            deleteAsset(asset.id);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
