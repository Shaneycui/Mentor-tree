import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  TreePine, 
  User, 
  MessageSquare, 
  Bookmark, 
  ThumbsUp, 
  History, 
  Bell, 
  DollarSign, 
  FileText, 
  MessageCircle, 
  Settings 
} from 'lucide-react';
import { mockProfile } from '../mock/data';

interface Profile {
  id: string;
  full_name: string;
  nickname?: string;
  avatar_url?: string;
  title?: string;
  bio?: string;
  skills?: string[];
  posts_count?: number;
  likes_count?: number;
  followers_count?: number;
  following_count?: number;
  created_at?: string;
  updated_at?: string;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const menuItems: MenuItem[] = [
  { icon: <User size={20} />, label: '个人资料', path: 'profile' },
  { icon: <MessageSquare size={20} />, label: '我的问题', path: 'questions' },
  { icon: <Bookmark size={20} />, label: '我的收藏', path: 'bookmarks' },
  { icon: <ThumbsUp size={20} />, label: '我的点赞', path: 'likes' },
  { icon: <History size={20} />, label: '浏览历史', path: 'history' },
  { icon: <Bell size={20} />, label: '消息通知', path: 'notifications' },
  { icon: <DollarSign size={20} />, label: '付费咨询', path: 'consulting' },
  { icon: <FileText size={20} />, label: '草稿箱', path: 'drafts' },
  { icon: <MessageCircle size={20} />, label: '意见反馈', path: 'feedback' },
  { icon: <Settings size={20} />, label: '个人设置', path: 'settings' },
];

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    full_name: '',
    nickname: '',
    title: '',
    bio: '',
    skills: ''
  });

  useEffect(() => {
    async function loadProfile() {
      try {
        if (!user?.id) return;
        
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        setProfile(mockProfile);
        setFormData({
          full_name: mockProfile.full_name || '',
          nickname: mockProfile.nickname || '',
          title: mockProfile.title || '',
          bio: mockProfile.bio || '',
          skills: (mockProfile.skills || []).join(', ')
        });
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user?.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const updates = {
        id: user?.id,
        full_name: formData.full_name,
        nickname: formData.nickname,
        title: formData.title,
        bio: formData.bio,
        skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        updated_at: new Date().toISOString()
      } as Profile;

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;
      setProfile(prev => prev ? { ...prev, ...updates } : updates);
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* 左侧个人信息卡片 */}
        <div className="md:col-span-1">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src={profile?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${profile?.full_name}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-4 border-emerald-100"
                />
                <button className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full hover:bg-emerald-600">
                  <User size={16} />
                </button>
              </div>
              
              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {profile?.nickname || profile?.full_name}
              </h2>
              <p className="text-sm text-gray-500">{profile?.title || '未设置头衔'}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 w-full text-center">
                <div className="border-r border-gray-200">
                  <div className="text-2xl font-semibold text-gray-900">
                    {profile?.posts_count || 0}
                  </div>
                  <div className="text-sm text-gray-500">发布</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {profile?.likes_count || 0}
                  </div>
                  <div className="text-sm text-gray-500">获赞</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 w-full text-center">
                <div className="border-r border-gray-200">
                  <div className="text-2xl font-semibold text-gray-900">
                    {profile?.followers_count || 0}
                  </div>
                  <div className="text-sm text-gray-500">粉丝</div>
                </div>
                <div>
                  <div className="text-2xl font-semibold text-gray-900">
                    {profile?.following_count || 0}
                  </div>
                  <div className="text-sm text-gray-500">关注</div>
                </div>
              </div>
            </div>
          </div>

          {/* 导航菜单 */}
          <nav className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => setActiveTab(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium ${
                  activeTab === item.path
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* 右侧内容区域 */}
        <div className="md:col-span-3">
          <div className="bg-white shadow rounded-lg">
            {activeTab === 'profile' ? (
              <div className="p-6">
                {/* 原有的编辑表单或显示内容 */}
                {editing ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="full_name"
                        value={formData.full_name}
                        onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="nickname" className="block text-sm font-medium text-gray-700">
                        Nickname
                      </label>
                      <input
                        type="text"
                        id="nickname"
                        value={formData.nickname}
                        onChange={e => setFormData(prev => ({ ...prev, nickname: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="e.g. John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="e.g. Senior Software Engineer"
                      />
                    </div>

                    <div>
                      <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="Tell us about yourself"
                      />
                    </div>

                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                        Skills (comma-separated)
                      </label>
                      <input
                        type="text"
                        id="skills"
                        value={formData.skills}
                        onChange={e => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                        placeholder="e.g. React, TypeScript, Node.js"
                      />
                    </div>

                    <div className="flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{profile?.full_name}</h3>
                      <p className="text-sm text-gray-500">{profile?.title || 'No title set'}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Bio</h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {profile?.bio || 'No bio added yet'}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-900">Skills</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {profile?.skills?.map((skill, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"
                          >
                            {skill}
                          </span>
                        )) || 'No skills added yet'}
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md hover:bg-emerald-700"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6">
                <p className="text-gray-500 text-center">
                  {menuItems.find(item => item.path === activeTab)?.label} 功能开发中...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 