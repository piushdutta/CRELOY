import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SecurityOverlay from '../components/SecurityOverlay';
import { useCart } from '../context/CartContext';
import './Marketplace.css';

const Marketplace = () => {
    const [filter, setFilter] = useState('All');
    const { assets, addToCart } = useCart();

    const filteredAssets = filter === 'All' ? assets : assets.filter(a => a.category === filter);

    const navigate = useNavigate();

    return (
        <div className="marketplace-page">
            <SecurityOverlay />
            <Navbar />

            <header className="marketplace-header">
                <div className="container">
                    <span className="badge">Premium Assets</span>
                    <h1>Digital <span className="gradient-text">Design Marketplace</span></h1>
                    <p>Exclusive templates and custom designs for modern businesses.</p>
                </div>
            </header>

            <section className="marketplace-content container">
                <div className="filter-bar">
                    {['All', 'Business Card', 'Logo', 'Poster'].map(cat => (
                        <button
                            key={cat}
                            className={`filter-btn ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="assets-grid">
                    {filteredAssets.map(asset => (
                        <div key={asset.id} className="asset-card glassmorphism">
                            <div className="asset-image">
                                <img src={asset.image} alt={asset.title} />
                                <div className="asset-overlay">
                                    <button onClick={() => addToCart(asset)} className="btn-cart">Add to Cart</button>
                                    <button className="btn-editor" onClick={() => navigate('/editor')}>Customize</button>
                                </div>
                            </div>
                            <div className="asset-info">
                                <span className="category">{asset.category}</span>
                                <h3>{asset.title}</h3>
                                <div className="price-row">
                                    <span className="price">${asset.price}</span>
                                    <button className="btn-view">Details</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Marketplace;
