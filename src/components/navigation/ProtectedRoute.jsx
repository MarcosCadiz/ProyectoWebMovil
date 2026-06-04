import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { paths } from '../../routes/paths';
import { getCurrentUser, isAuthenticated } from '../../services/authSession';

export default function ProtectedRoute({ allowedRoles, redirectTo = paths.loginUser }) {
  const location = useLocation();
  const user = getCurrentUser();

  if (!isAuthenticated()) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />;
  }

  if (allowedRoles?.length && !allowedRoles.includes(user.role)) {
    const fallbackPath = user.role === 'funcionario' ? paths.staffMenu : paths.userMenu;
    return <Navigate to={fallbackPath} replace />;
  }

  return <Outlet />;
}
