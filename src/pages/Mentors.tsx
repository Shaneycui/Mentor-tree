import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Star } from 'lucide-react';
import type { Mentor } from '../types/mentor';

const mockMentors: Mentor[] = [
  {
    id: '1',
    userId: 'user1',
    fullName: '张医生',
    title: '资深医疗器械研发专家',
    specialties: ['医疗器械', '产品研发', '项目管理'],
    yearsOfExperience: 15,
    bio: '前美敦力高级研发经理，20年医疗器械行业经验',
    availability: 'available'
  },
  {
    id: '2',
    userId: 'user2',
    fullName: '李教授',
    title: '医疗投资顾问',
    specialties: ['医疗投资', '市场分析', '商业战略'],
    yearsOfExperience: 12,
    bio: '知名医疗投资机构合伙人，专注医疗健康领域投资',
    availability: 'limited'
  }
];

export default function Mentors() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = !selectedSpecialty || 
      mentor.specialties.includes(selectedSpecialty);

    return matchesSearch && matchesSpecialty;
  });

  const allSpecialties = Array.from(
    new Set(mockMentors.flatMap(mentor => mentor.specialties))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-12">导师咨询</h1>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索导师..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={selectedSpecialty || ''}
                onChange={(e) => setSelectedSpecialty(e.target.value || null)}
                className="appearance-none pl-10 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">所有专业</option>
                {allSpecialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="grid gap-6">
            {filteredMentors.map(mentor => (
              <motion.div
                key={mentor.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold mb-1">{mentor.fullName}</h3>
                    <p className="text-gray-600 mb-2">{mentor.title}</p>
                    <div className="flex gap-2 mb-4">
                      {mentor.specialties.map(specialty => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-600">{mentor.bio}</p>
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="ml-1 text-gray-600">
                      {mentor.yearsOfExperience}年经验
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className={`
                    px-3 py-1 rounded-full text-sm
                    ${mentor.availability === 'available'
                      ? 'bg-green-50 text-green-600'
                      : mentor.availability === 'limited'
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'bg-red-50 text-red-600'
                    }
                  `}>
                    {mentor.availability === 'available'
                      ? '可预约'
                      : mentor.availability === 'limited'
                      ? '部分时段可约'
                      : '暂不可约'
                    }
                  </span>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    预约咨询
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}