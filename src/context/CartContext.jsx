import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const DEFAULT_ASSETS = [
    { id: 1, title: 'Minimalist Corporate', category: 'Business Card', price: 29.99, image: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'Modern Tech Logo', category: 'Logo', price: 49.99, image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Golden Luxury Card', category: 'Business Card', price: 34.99, image: 'https://images.unsplash.com/photo-1598124838120-020cb1277a94?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Cyberpunk Poster', category: 'Poster', price: 19.99, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Abstract Studio', category: 'Logo', price: 59.99, image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bde2?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Organic Cafe Poster', category: 'Poster', price: 24.99, image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800' },
];

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('creloy_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [assets, setAssets] = useState(() => {
        const savedAssets = localStorage.getItem('creloy_assets');
        return savedAssets ? JSON.parse(savedAssets) : DEFAULT_ASSETS;
    });

    useEffect(() => {
        localStorage.setItem('creloy_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem('creloy_assets', JSON.stringify(assets));
    }, [assets]);

    const addToCart = (product) => {
        setCart((prev) => {
            if (prev.find(item => item.id === product.id)) return prev;
            return [...prev, product];
        });
    };

    const addAsset = (newAsset) => {
        setAssets((prev) => [...prev, { ...newAsset, id: Date.now() }]);
    };

    const deleteAsset = (assetId) => {
        setAssets((prev) => prev.filter(asset => asset.id !== assetId));
    };

    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter(item => item.id !== productId));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

    return (
        <CartContext.Provider value={{ cart, assets, addToCart, removeFromCart, clearCart, cartTotal, addAsset, deleteAsset }}>
            {children}
        </CartContext.Provider>
    );
};
