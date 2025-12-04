import { Navigate } from 'react-router-dom';
import { useAuth } from './useAuth';

/**
 * Protected Route Component
 * Restricts access to routes based on authentication and role
 *
 * @param {ReactNode} children - Components to render if authorized
 * @param {Array<string>} allowedRoles - Array of roles allowed to access this route (e.g., ['admin'])
 */
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
