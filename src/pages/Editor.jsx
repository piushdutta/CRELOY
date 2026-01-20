import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Editor.css';

const Editor = () => {
    const location = useLocation();
    const passedAsset = location.state?.asset;

    const [config, setConfig] = useState({
        primaryColor: passedAsset?.category === 'Business Card' ? '#1a1a1c' : '#c5a059',
        secondaryColor: '#ffffff',
        text: passedAsset?.title || 'YOUR BRAND NAME',
        fontSize: 42,
        borderRadius: passedAsset?.category === 'Business Card' ? 8 : 12
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setConfig(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="editor-page">
            <Navbar />

            <div className="editor-container">
                {/* Control Panel */}
                <aside className="editor-sidebar glassmorphism">
                    <div className="sidebar-header">
                        <h2>Creative Mode</h2>
                        <p>Customize your masterpiece</p>
                    </div>

                    <div className="control-group">
                        <label>Asset Text</label>
                        <input
                            type="text"
                            name="text"
                            value={config.text}
                            onChange={handleChange}
                            placeholder="Enter brand name..."
                        />
                    </div>

                    <div className="control-row">
                        <div className="control-group">
                            <label>Primary Color</label>
                            <input
                                type="color"
                                name="primaryColor"
                                value={config.primaryColor}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="control-group">
                            <label>Secondary Color</label>
                            <input
                                type="color"
                                name="secondaryColor"
                                value={config.secondaryColor}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="control-group">
                        <label>Font Size ({config.fontSize}px)</label>
                        <input
                            type="range"
                            name="fontSize"
                            min="20"
                            max="120"
                            value={config.fontSize}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="control-group">
                        <label>Edge Roundness ({config.borderRadius}px)</label>
                        <input
                            type="range"
                            name="borderRadius"
                            min="0"
                            max="100"
                            value={config.borderRadius}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="sidebar-footer">
                        <button className="btn-export">Export Draft</button>
                        <button className="btn-save-cart">Save & Add to Cart</button>
                    </div>
                </aside>

                {/* Canvas Area */}
                <main className="editor-canvas">
                    <div className="canvas-header">
                        <div className="canvas-tabs">
                            <button className="active">Front View</button>
                            <button>Back View</button>
                            <button>Mockup</button>
                        </div>
                    </div>

                    <div className="preview-container">
                        <div
                            className="design-preview"
                            style={{
                                background: `linear-gradient(135deg, ${config.primaryColor}, #050505)`,
                                borderRadius: `${config.borderRadius}px`
                            }}
                        >
                            <div className="preview-content">
                                <div className="preview-logo">C.</div>
                                <h1 style={{
                                    fontSize: `${config.fontSize}px`,
                                    color: config.secondaryColor,
                                    fontFamily: 'Outfit'
                                }}>
                                    {config.text}
                                </h1>
                                <p style={{ color: config.secondaryColor, opacity: 0.6 }}>CREATIVE STUDIO</p>
                            </div>

                            <div className="card-texture"></div>
                        </div>
                    </div>

                    <div className="canvas-footer">
                        <p>💡 Tip: Use high contrast colors for better readability.</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Editor;
