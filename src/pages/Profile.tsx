import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Briefcase, 
  GraduationCap,
  Award,
  MessageCircle,
  BookOpen,
  Settings
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserProfile {
  fullName: string;
  email: string;
  title: string;
  company: string;
  education: string;
  skills: string[];
  certifications: string[];
  bio: string;
}

const mockProfile: UserProfile = {
  fullName: '张医生',
  email: 'zhang@example.com',
  title: '资深医疗器械研发专家',
  company: '美敦力',
  education: '清华大学 生物医学工程 博士',
  skills: ['医疗器械研发', '项目管理', '产品设计', '临床试验'],
  certifications: ['PMP认证', 'FDA法规专家认证'],
  bio: '15年医疗器械行业经验，专注于心血管介入器械研发...'
};

export default function Profile() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'info' | 'activity' | 'settings'>('info');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* 个人信息卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-md p-8 mb-8"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">{mockProfile.fullName}</h1>
                  <p className="text-gray-600 mb-1">{mockProfile.title}</p>
                  <p className="text-gray-600">{mockProfile.company}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                退出登录
              </button>
            </div>
          </motion.div>

          {/* 标签页导航 */}
          <div className="flex gap-8 mb-8 border-b">
            <button
              onClick={() => setActiveTab('info')}
              className={`pb-4 px-2 ${
                activeTab === 'info'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              基本信息
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`pb-4 px-2 ${
                activeTab === 'activity'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              活动记录
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-2 ${
                activeTab === 'settings'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              设置
            </button>
          </div>

          {/* 内容区域 */}
          <div className="space-y-6">
            {activeTab === 'info' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-purple-600" />
                    联系方式
                  </h2>
                  <p className="text-gray-600">{mockProfile.email}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-purple-600" />
                    教育背景
                  </h2>
                  <p className="text-gray-600">{mockProfile.education}</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-purple-600" />
                    专业技能
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {mockProfile.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-purple-600" />
                    专业认证
                  </h2>
                  <div className="space-y-2">
                    {mockProfile.certifications.map(cert => (
                      <div key={cert} className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-600" />
                        <span className="text-gray-600">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'activity' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                    最近问答
                  </h2>
                  {/* 添加问答记录 */}
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                    学习记录
                  </h2>
                  {/* 添加学习记录 */}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-xl p-6 shadow-sm"
              >
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-purple-600" />
                  账号设置
                </h2>
                {/* 添加设置选项 */}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 