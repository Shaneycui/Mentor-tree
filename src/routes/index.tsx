import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import CareerPath from '../pages/CareerPath';
import Mentors from '../pages/Mentors';
import QA from '../pages/QA';
import Profile from '../pages/Profile';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'career-path',
        element: (
          <ProtectedRoute>
            <CareerPath />
          </ProtectedRoute>
        )
      },
      {
        path: 'mentors',
        element: (
          <ProtectedRoute>
            <Mentors />
          </ProtectedRoute>
        )
      },
      {
        path: 'qa',
        element: (
          <ProtectedRoute>
            <QA />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        )
      }
    ]
  }
]);