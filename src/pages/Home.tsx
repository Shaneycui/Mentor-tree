import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, TreePine, Users, MessageCircle, 
  Target, Book, Zap, CheckCircle, Star, Building 
} from 'lucide-react';

export default function Home() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activePlan, setActivePlan] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-16">
          医疗行业职业发展平台
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link to="/career-path">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600 w-fit">
                <Building className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mt-4 mb-2">职业路径</h2>
              <p className="text-gray-600 mb-4">
                探索医疗行业不同公司和岗位的发展路径
              </p>
              <div className="flex items-center text-purple-600">
                了解更多 <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          </Link>

          <Link to="/mentors">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600 w-fit">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mt-4 mb-2">导师咨询</h2>
              <p className="text-gray-600 mb-4">
                与行业专家一对一交流，获取职业建议
              </p>
              <div className="flex items-center text-purple-600">
                了解更多 <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          </Link>

          <Link to="/qa">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="p-3 rounded-lg bg-purple-50 text-purple-600 w-fit">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold mt-4 mb-2">问答社区</h2>
              <p className="text-gray-600 mb-4">
                分享经验，解答疑惑，共同成长
              </p>
              <div className="flex items-center text-purple-600">
                了解更多 <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// 新增的可复用按钮组件
function ActionButton({ 
  children, 
  to, 
  primary = false, 
  icon 
}: {
  children: React.ReactNode;
  to: string;
  primary?: boolean;
  icon?: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`
        group inline-flex items-center justify-center px-8 py-4 text-lg font-medium 
        rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5
        ${primary 
          ? 'text-white bg-purple-600 hover:bg-purple-700' 
          : 'text-gray-700 bg-white border border-gray-200 hover:border-purple-300 hover:text-purple-600'
        }
      `}
    >
      {children}
      {icon && (
        <span className={`
          ml-2 transition-transform duration-200
          ${primary ? 'group-hover:translate-x-1' : 'group-hover:scale-110'}
        `}>
          {icon}
        </span>
      )}
    </Link>
  );
}

// 数据定义
const features = [
  {
    icon: <TreePine className="h-8 w-8 text-purple-600" />,
    title: "职业路径可视化",
    description: "通过鱼骨图直观展示职业发展路径，清晰了解每个阶段的要求和机会"
  },
  // ... 其他特性
];

const plans = [
  {
    title: "基础会员",
    description: "适合初步探索职业方向的用户",
    features: [
      "基础职业路径查看",
      "有限的案例学习",
      "社区问答功能",
      "基础职业模拟工具"
    ],
    price: "免费",
    isPopular: false
  },
  // ... 其他计划
];

const stats = [
  { number: "1000+", label: "职业路径" },
  { number: "500+", label: "认证导师" },
  { number: "10000+", label: "学员" },
  { number: "50000+", label: "问答解析" }
];

// 添加自定义动画类型到 tailwind.config.js:
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  }
}
*/

function FeatureCard({ icon, title, description, isHovered, onHover, onLeave, delay }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  delay: number;
}) {
  return (
    <div className={`group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 cursor-pointer ${isHovered ? 'border-purple-200 ring-2 ring-purple-500 hover:ring-purple-600' : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{ animation: `fade-in-up ${delay}ms ease-out forwards` }}
    >
      <div className="mb-4 transform group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
        {description}
      </p>
    </div>
  );
}

function PlanCard({ title, description, features, price, isPopular, isActive, onMouseEnter, onMouseLeave }: {
  title: string;
  description: string;
  features: string[];
  price: string;
  isPopular: boolean;
  isActive: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div className={`group bg-white p-8 rounded-2xl shadow-sm border 
      ${isActive ? 'border-purple-200 ring-2 ring-purple-500 hover:ring-purple-600' : 'border-gray-100 hover:border-purple-200'} relative transition-all duration-200 hover:shadow-lg transform hover:-translate-y-1`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPopular && (
        <span className="absolute top-0 right-0 -translate-y-1/2 px-4 py-1 bg-purple-600 text-white text-sm font-medium rounded-full group-hover:bg-purple-700 transition-colors">
          推荐
        </span>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors">
        {description}
      </p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
            <svg 
              className="h-5 w-5 text-purple-600 mr-2 group-hover:scale-110 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold text-purple-600 group-hover:text-purple-700 transition-colors">
        {price}
      </div>
    </div>
  );
}

function StatCard({ number, label, delay }: { number: string; label: string; delay: number }) {
  return (
    <div className="text-center group cursor-pointer transform hover:-translate-y-1 transition-all duration-200" style={{ animation: `fade-in-up ${delay}ms ease-out forwards` }}>
      <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:text-purple-700 transition-colors">
        {number}
      </div>
      <div className="text-gray-600 group-hover:text-gray-700 transition-colors">
        {label}
      </div>
    </div>
  );
}