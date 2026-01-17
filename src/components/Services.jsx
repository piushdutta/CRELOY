import React from 'react';
import './Services.css';

const services = [
    {
        title: 'Brand Identity',
        description: 'We craft unique visual identities that reflect your brands essence and values.',
        icon: '✨'
    },
    {
        title: 'UI/UX Design',
        description: 'Creating intuitive and engaging digital interfaces that prioritize user experience.',
        icon: '📱'
    },
    {
        title: 'Digital Strategy',
        description: 'Strategic planning to ensure your brand stands out in the digital landscape.',
        icon: '🎯'
    },
    {
        title: 'Web Development',
        description: 'Turning beautiful designs into high-performance, responsive websites.',
        icon: '💻'
    }
];

const Services = () => {
    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">What We <span className="gradient-text">Do</span></h2>
                    <p className="section-subtitle">Our expertise at your service</p>
                </div>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card glass">
                            <div className="service-icon">{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
