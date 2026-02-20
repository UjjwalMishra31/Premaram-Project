import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../state/authStore';

export const HomeGatePage = () => {
  const user = useAuthStore((s) => s.user);

  if (!user) return <Navigate to="/login" replace />;
  if (!user.role || !user.goal) return <Navigate to="/profile" replace />;
  if (!user.onboardingCompleted) return <Navigate to="/onboarding" replace />;

  return <Navigate to="/product" replace />;
};
