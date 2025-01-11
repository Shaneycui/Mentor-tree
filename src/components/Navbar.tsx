import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TreePine, Users, MessageCircle, LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/auth';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <TreePine className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-bold">Mentor Tree</span>
          </Link>
          
          {/* 桌面端导航 */}
          <div className="hidden md:flex items-center space-x-8">
            {user ? (
              <>
                <Link to="/career-path" className="text-gray-600 hover:text-emerald-600">
                  职业路径
                </Link>
                <Link to="/mentors" className="text-gray-600 hover:text-emerald-600">
                  导师
                </Link>
                <Link to="/qa" className="text-gray-600 hover:text-emerald-600">
                  问答
                </Link>
                <Link to="/profile" className="text-gray-600 hover:text-emerald-600">
                  个人中心
                </Link>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 hover:text-emerald-600"
                >
                  退出
                </button>
              </>
            ) : (
              <Link to="/auth" className="text-emerald-600 hover:text-emerald-700">
                登录
              </Link>
            )}
          </div>

          {/* 移动端只显示登录/退出按钮 */}
          {user ? (
            <button
              className="md:hidden text-gray-600"
              onClick={handleSignOut}
            >
              <LogOut className="h-5 w-5" />
            </button>
          ) : (
            <Link
              to="/auth"
              className="md:hidden text-emerald-600"
            >
              登录
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}