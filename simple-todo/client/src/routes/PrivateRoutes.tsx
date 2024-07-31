import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoutes() {
  const currentUsername = localStorage.getItem('username');
  return currentUsername ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoutes;
