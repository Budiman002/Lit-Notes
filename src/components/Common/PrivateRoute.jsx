import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="auth-loading">
        <LoadingSpinner size="large" message="Memeriksa status login..." />
      </div>
    );
  }

  return isAuthenticated ? children : null;
}

export default PrivateRoute;