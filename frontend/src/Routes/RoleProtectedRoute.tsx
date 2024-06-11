import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/useAuth';

type Props = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const RoleProtectedRoute: React.FC<Props> = ({ children, allowedRoles }) => {
  const location = useLocation();
  const { user } = useAuth();

  if (user && allowedRoles.includes(user.accountType)) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RoleProtectedRoute;
