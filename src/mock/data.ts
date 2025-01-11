export const mockCareerPath = {
  id: '1',
  title: '前端开发工程师',
  description: '从初级到高级前端开发工程师的职业发展路径',
  stages: [
    {
      id: 'stage1',
      title: '初级前端工程师',
      description: '掌握基础的前端开发技能，能够独立完成简单的前端开发任务',
      timeframe: '0-2年',
      responsibilities: [
        '实现UI设计稿',
        '编写可复用的组件',
        '修复简单的bug',
        '参与代码评审'
      ],
      required_skills: [
        'HTML/CSS',
        'JavaScript',
        'React/Vue',
        'Git'
      ],
      case_studies: [
        {
          id: 'case1',
          industry: '互联网',
          position: '初级前端工程师',
          experience_years: 1,
          skills: ['React', 'TypeScript', 'CSS'],
          growth_story: '通过参与电商项目，提升了组件开发和状态管理能力'
        }
      ],
      challenges: [
        {
          id: 'challenge1',
          title: '技术栈学习曲线',
          description: '现代前端技术栈复杂，需要学习的内容较多',
          solutions: [
            '制定学习计划，循序渐进',
            '从项目实践中学习',
            '参与开源项目积累经验'
          ]
        }
      ],
      learning_resources: [
        {
          title: 'React官方文档',
          description: 'React基础知识学习',
          type: '在线文档',
          url: 'https://react.dev',
          duration: '2周'
        }
      ]
    },
    {
      id: 'stage2',
      title: '中级前端工程师',
      description: '能够独立负责中等规模的前端项目',
      timeframe: '2-4年',
      responsibilities: [
        '设计技术方案',
        '优化性能',
        '指导初级工程师',
        '参与架构决策'
      ],
      required_skills: [
        '性能优化',
        '工程化',
        '设计模式',
        'TypeScript'
      ],
      case_studies: [],
      challenges: [],
      learning_resources: []
    },
    {
      id: 'stage3',
      title: '高级前端工程师',
      description: '能够主导大型前端项目的架构设计和技术决策',
      timeframe: '4-6年',
      responsibilities: [
        '架构设计',
        '技术选型',
        '团队管理',
        '技术预研'
      ],
      required_skills: [
        '架构设计',
        '团队管理',
        '技术决策',
        '跨端开发'
      ],
      case_studies: [],
      challenges: [],
      learning_resources: []
    }
  ]
};

export const mockMentors = [
  {
    id: '1',
    fullName: '张三',
    title: '高级前端工程师',
    bio: '8年前端开发经验，专注于React生态',
    specialties: ['React', 'TypeScript', '性能优化'],
    yearsOfExperience: 8,
    availability: 'available'
  },
  {
    id: '2',
    fullName: '李四',
    title: '技术总监',
    bio: '12年开发经验，擅长架构设计',
    specialties: ['架构设计', '团队管理', 'Node.js'],
    yearsOfExperience: 12,
    availability: 'limited'
  }
];

export const mockProfile = {
  id: 'user1',
  full_name: '测试用户',
  nickname: 'Tester',
  avatar_url: null,
  title: '前端开发工程师',
  bio: '热爱技术，专注前端开发',
  skills: ['React', 'TypeScript', 'Node.js'],
  posts_count: 12,
  likes_count: 45,
  followers_count: 78,
  following_count: 34
}; 