import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { OnboardingPage } from '../onboarding/pages/OnboardingPage';
import { HomeGatePage } from '../pages/HomeGatePage';
import { LoginPage } from '../pages/LoginPage';
import { ProductHomePage } from '../pages/ProductHomePage';
import { ProfilePage } from '../pages/ProfilePage';
import { SignupPage } from '../pages/SignupPage';
import { useAuthStore } from '../state/authStore';

void useAuthStore.getState().initialize();

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/signup', element: <SignupPage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { index: true, element: <HomeGatePage /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/onboarding', element: <OnboardingPage /> },
          { path: '/product', element: <ProductHomePage /> }
        ]
      }
    ]
  }
]);
