import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TreePine, Users, MessageCircle, LogOut, Menu, X, User, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/auth';

const navItems = [
  { path: '/career-path', label: '职业路径', icon: Building },
  { path: '/mentors', label: '导师咨询', icon: Users },
  { path: '/qa', label: '问答社区', icon: MessageCircle },
  { path: '/profile', label: '个人中心', icon: User }
];

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-purple-600">
            MentorTree
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg transition-colors
                  ${location.pathname === path
                    ? 'text-purple-600 bg-purple-50'
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}