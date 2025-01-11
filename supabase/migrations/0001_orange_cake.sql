/*
  # Initial Schema for Mentor Tree

  1. New Tables
    - users
      - id (uuid, primary key)
      - email (text, unique)
      - full_name (text)
      - role (enum: student, mentor)
      - created_at (timestamp)
    - career_paths
      - id (uuid, primary key)
      - title (text)
      - description (text)
      - stages (jsonb)
      - created_at (timestamp)
    - questions
      - id (uuid, primary key)
      - title (text)
      - content (text)
      - user_id (uuid, foreign key)
      - created_at (timestamp)
    - answers
      - id (uuid, primary key)
      - content (text)
      - question_id (uuid, foreign key)
      - user_id (uuid, foreign key)
      - created_at (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('student', 'mentor');

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  created_at timestamptz DEFAULT now()
);

-- Create career_paths table
CREATE TABLE IF NOT EXISTS career_paths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  stages jsonb NOT NULL DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create questions table
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create answers table
CREATE TABLE IF NOT EXISTS answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read all users"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read career paths"
  ON career_paths
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create questions"
  ON questions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read questions"
  ON questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create answers"
  ON answers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Anyone can read answers"
  ON answers
  FOR SELECT
  TO authenticated
  USING (true);

-- 创建用户配置表
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  nickname text,
  avatar_url text,
  title text,
  bio text,
  skills text[],
  posts_count int DEFAULT 0,
  likes_count int DEFAULT 0,
  followers_count int DEFAULT 0,
  following_count int DEFAULT 0,
  created_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL,
  updated_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL
);

-- 创建职业路径表
CREATE TABLE IF NOT EXISTS public.career_paths (
  id uuid DEFAULT UUID_GENERATE_V4() PRIMARY KEY,
  title text NOT NULL,
  description text,
  created_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL,
  updated_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL
);

-- 创建职业阶段表
CREATE TABLE IF NOT EXISTS public.career_stages (
  id uuid DEFAULT UUID_GENERATE_V4() PRIMARY KEY,
  career_path_id uuid REFERENCES public.career_paths ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  timeframe text,
  responsibilities text[],
  required_skills text[],
  order_index int NOT NULL,
  created_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL,
  updated_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL
);

-- 创建案例研究表
CREATE TABLE IF NOT EXISTS public.case_studies (
  id uuid DEFAULT UUID_GENERATE_V4() PRIMARY KEY,
  career_stage_id uuid REFERENCES public.career_stages ON DELETE CASCADE,
  industry text NOT NULL,
  position text NOT NULL,
  experience_years int,
  skills text[],
  growth_story text,
  created_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL
);

-- 创建职业挑战表
CREATE TABLE IF NOT EXISTS public.challenges (
  id uuid DEFAULT UUID_GENERATE_V4() PRIMARY KEY,
  career_stage_id uuid REFERENCES public.career_stages ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  solutions text[],
  created_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL
);

-- 创建学习资源表
CREATE TABLE IF NOT EXISTS public.learning_resources (
  id uuid DEFAULT UUID_GENERATE_V4() PRIMARY KEY,
  career_stage_id uuid REFERENCES public.career_stages ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  type text NOT NULL,
  url text NOT NULL,
  duration text,
  created_at timestamp WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()) NOT NULL
);

-- 启用 RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.career_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_resources ENABLE ROW LEVEL SECURITY;

-- 创建策略
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Career paths are viewable by everyone"
  ON public.career_paths FOR SELECT
  USING (true);

CREATE POLICY "Career stages are viewable by everyone"
  ON public.career_stages FOR SELECT
  USING (true);

CREATE POLICY "Case studies are viewable by everyone"
  ON public.case_studies FOR SELECT
  USING (true);

CREATE POLICY "Challenges are viewable by everyone"
  ON public.challenges FOR SELECT
  USING (true);

CREATE POLICY "Learning resources are viewable by everyone"
  ON public.learning_resources FOR SELECT
  USING (true);