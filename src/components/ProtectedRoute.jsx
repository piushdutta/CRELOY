import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="loading-screen" style={{
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#0a0a0b',
                color: 'var(--primary)'
            }}>
                <div className="loader">Loading...</div>
            </div>
        );
    }

    if (!user) {
        // Redirect to Landing page with #login hash
        return <Navigate to="/#login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
