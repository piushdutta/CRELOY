import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const { cart, removeFromCart, cartTotal, clearCart } = useCart();

    return (
        <div className="cart-page">
            <Navbar />

            <header className="cart-header container">
                <h1>My <span className="gradient-text">Selection</span></h1>
                <p>Complete your purchase to unlock your high-resolution assets.</p>
            </header>

            <main className="cart-container container">
                {cart.length === 0 ? (
                    <div className="empty-cart text-center">
                        <div className="cart-icon">🛒</div>
                        <h2>Your cart is empty</h2>
                        <p>Discover unique designs in our marketplace</p>
                        <button className="btn-primary" onClick={() => window.location.href = '/marketplace'}>Browse Marketplace</button>
                    </div>
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items">
                            {cart.map(item => (
                                <div key={item.id} className="cart-item glassmorphism">
                                    <img src={item.image} alt={item.title} />
                                    <div className="item-details">
                                        <span className="category">{item.category}</span>
                                        <h3>{item.title}</h3>
                                        <p>Commercial License Included</p>
                                    </div>
                                    <div className="item-price">
                                        <span>${item.price}</span>
                                        <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <aside className="cart-summary glassmorphism">
                            <h3>Order Summary</h3>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Platform Fee</span>
                                <span>$0.00</span>
                            </div>
                            <div className="summary-total">
                                <span>Total Amount</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <button className="btn-checkout">Secure Checkout</button>
                            <button className="btn-clear" onClick={clearCart}>Clear All</button>
                            <p className="secure-text">🔒 Encrypted payment processing</p>
                        </aside>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default Cart;
