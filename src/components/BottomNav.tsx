import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TreePine, Users, MessageCircle, User } from 'lucide-react';

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    { path: '/career-path', icon: <TreePine size={20} />, label: '职业路径' },
    { path: '/mentors', icon: <Users size={20} />, label: '导师' },
    { path: '/qa', icon: <MessageCircle size={20} />, label: '问答' },
    { path: '/profile', icon: <User size={20} />, label: '我的' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="grid grid-cols-4 h-14">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center justify-center space-y-1 ${
              location.pathname === item.path
                ? 'text-emerald-600'
                : 'text-gray-600'
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
} 