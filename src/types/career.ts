export interface CaseStudy {
  id: string;
  industry: string;
  position: string;
  experience_years: number;
  skills: string[];
  growth_story: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  solutions: string[];
}

export interface LearningResource {
  title: string;
  description: string;
  type: '视频课程' | '在线文档' | '实践项目' | '书籍推荐';
  url: string;
  duration?: string;
}

export interface CareerStage {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  required_skills: string[];
  case_studies: CaseStudy[];
  challenges: Challenge[];
  timeframe: string;
  learning_resources?: LearningResource[];
}

export interface CareerPath {
  id: string;
  title: string;
  description: string;
  stages: CareerStage[];
}

export interface CareerStageDetail extends CareerStage {
  responsibilities: string[];
  required_skills: string[];
  case_studies: CaseStudy[];
  challenges: Challenge[];
  learning_resources?: LearningResource[];
}

export interface CareerPathDetail extends CareerPath {
  stages: CareerStageDetail[];
}

// 组织架构相关类型
export interface OrgStructure {
  title: string;
  description: string;
  governance: Department[];
}

export interface Department {
  name: string;
  description: string;
  subunits: Subunit[];
}

export interface Subunit {
  name: string;
  roles: Role[];
}

export interface Role {
  title: string;
  level: string;
  responsibilities: string[];
  requirements: string[];
  videoUrl?: string;
  skills?: string[];
  connections?: string[];
  career_path?: string[];
  salary_range?: string;
}

// 节点相关类型
export interface NodeData {
  label: string;
  type: 'root' | 'governance' | 'subunit' | 'role';
  description?: string;
  level?: string;
  responsibilities?: string[];
  requirements?: string[];
}

export interface EdgeData {
  label: string;
  type: 'reports_to' | 'collaborates_with' | 'promotes_to' | 'manages' | 
        'mentors' | 'trains' | 'supports' | 'coordinates_with' | 'leads';
}