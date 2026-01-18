import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Services.css';

const Services = () => {
    const navigate = useNavigate();
    const services = [
        {
            title: "Exclusive Logos",
            description: "Unique, vector-ready visual identities crafted for high-end brands. Fully customizable in our Creative Mode.",
            icon: "💎",
            link: "/marketplace?category=Logo"
        },
        {
            title: "Business Cards",
            description: "Sophisticated stationery designs that leave a lasting impression. Available in various finishes and textures.",
            icon: "📇",
            link: "/marketplace?category=Business Card"
        },
        {
            title: "Posters & Media",
            description: "Dynamic visual assets for digital marketing and print. High-resolution exports guaranteed.",
            icon: "🖼️",
            link: "/marketplace?category=Poster"
        }
    ];

    return (
        <section id="services" className="container h-full">
            <div className="section-header">
                <span className="badge">Our Expertise</span>
                <h2 className="section-title">Elevate Your <span className="gradient-text">Brand</span></h2>
                <p className="section-subtitle">Choose from our curated collection of elite design assets or create something entirely new.</p>
            </div>
            <div className="services-grid">
                {services.map((service, index) => (
                    <div className="service-card glass" key={index} onClick={() => navigate(service.link)}>
                        <div className="service-icon">{service.icon}</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Services;
