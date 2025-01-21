import React from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  Users, 
  MessageSquare, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import Carousel from '../components/home/Carousel';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: <Building className="w-8 h-8" />,
    title: '组织架构探索',
    description: '深入了解医疗行业领先企业的组织结构和职业发展路径'
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: '导师指导',
    description: '与行业专家一对一交流，获取职业发展建议'
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: '专业社区',
    description: '加入活跃的医疗行业社区，分享经验与见解'
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: '职业机会',
    description: '发现医疗行业最新的职业发展机会'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Carousel />
      
      {/* 特色功能 */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            探索医疗行业职业发展新可能
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 开始探索 */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">准备好开启你的职业发展之旅了吗？</h2>
          <Link
            to="/career-path"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            立即开始 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}