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