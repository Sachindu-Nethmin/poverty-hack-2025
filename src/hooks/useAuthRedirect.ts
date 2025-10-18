// src/hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function useAuthRedirect() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'government_admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'hospital') {
        navigate('/submit-need');
      }
      // local_user stays on home page
    }
  }, [isAuthenticated, user, navigate]);
}
