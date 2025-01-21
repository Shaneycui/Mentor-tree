import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, Eye, Search, Filter } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  tags: string[];
  votes: number;
  answers: number;
  views: number;
  createdAt: string;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    title: '医疗器械研发工程师需要掌握哪些核心技能？',
    content: '我是一名应届毕业生，想要进入医疗器械行业...',
    author: '小王',
    tags: ['医疗器械', '职业发展', '技能提升'],
    votes: 15,
    answers: 8,
    views: 234,
    createdAt: '2024-01-20'
  },
  {
    id: '2',
    title: '如何从临床医生转型到医疗投资领域？',
    content: '目前是一名骨科医生，对医疗投资很感兴趣...',
    author: '张医生',
    tags: ['医疗投资', '职业转型', '临床医生'],
    votes: 23,
    answers: 12,
    views: 456,
    createdAt: '2024-01-18'
  }
];

export default function QA() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTag = !selectedTag || question.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  const allTags = Array.from(
    new Set(mockQuestions.flatMap(question => question.tags))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">问答社区</h1>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            提问题
          </button>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索问题..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <select
                value={selectedTag || ''}
                onChange={(e) => setSelectedTag(e.target.value || null)}
                className="appearance-none pl-10 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">所有标签</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map(question => (
              <motion.div
                key={question.id}
                whileHover={{ scale: 1.01 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md"
              >
                <h3 className="text-xl font-bold mb-2 hover:text-purple-600 cursor-pointer">
                  {question.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {question.content}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-50 text-purple-600 text-sm rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      <span>{question.votes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      <span>{question.answers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{question.views}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{question.author}</span>
                    <span>·</span>
                    <span>{question.createdAt}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}