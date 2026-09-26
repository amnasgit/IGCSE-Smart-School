import { Navigate } from 'react-router-dom';
import { useAdminAuth } from './AuthContext.jsx';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-navy-700">Loading…</div>;
  }
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="text-lg font-semibold text-navy">Access restricted</p>
        <p className="mt-1 text-sm text-navy-700/70">Your role doesn't have permission to view this page.</p>
      </div>
    );
  }
  return children;
}
