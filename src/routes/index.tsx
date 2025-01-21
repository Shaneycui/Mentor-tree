import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import CareerPath from '../pages/CareerPath';
import Mentors from '../pages/Mentors';
import QA from '../pages/QA';
import Profile from '../pages/Profile';

// 保护路由组件
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // 这里可以添加认证逻辑
  return <>{children}</>;
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
  },
  {
    path: '/auth',
    element: <Auth />
  }
]);