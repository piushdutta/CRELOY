import { useState, useEffect } from 'react';
import './SecurityOverlay.css';

const SecurityOverlay = () => {
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Check for PrintScreen (PrtSc) or Cmd+Shift+4 (Mac) or Win+Shift+S (Windows)
            if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
                e.preventDefault();
                triggerWarning();
            }
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                // If they switch tabs, we can optionally blur or record state
            }
        };

        // Attempting to detect screen capture usually involves looking for sudden focus losses 
        // or using specific browser APIs if available, but for most browsers, we rely on event listeners.

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('visibilitychange', handleVisibilityChange);

        // Right-click protection
        const handleContextMenu = (e) => {
            e.preventDefault();
            triggerWarning('Save-as and right-click are disabled to protect creator copyright.');
        };
        window.addEventListener('contextmenu', handleContextMenu);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    const [msg, setMsg] = useState('');

    const triggerWarning = (customMsg) => {
        setMsg(customMsg || 'Screenshots and screen recording are prohibited to protect intellectual property. Please purchase the asset to download.');
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 5000);
    };

    if (!showWarning) return (
        <div className="watermark-overlay">
            <div className="watermark-text">CRELOY EXCLUSIVE</div>
        </div>
    );

    return (
        <div className="security-alert-backdrop">
            <div className="security-alert-box glassmorphism">
                <div className="alert-icon">🚫</div>
                <h3>Security Action Detected</h3>
                <p>{msg}</p>
                <div className="alert-progress"></div>
            </div>
        </div>
    );
};

export default SecurityOverlay;
