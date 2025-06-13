-- Create cognitive domains table
CREATE TABLE IF NOT EXISTS cognitive_domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  instructions TEXT NOT NULL,
  thumbnail TEXT,
  difficulty_levels TEXT[] NOT NULL,
  domain_id UUID NOT NULL REFERENCES cognitive_domains(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  preferences JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE
);

-- Create game sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  game_id UUID NOT NULL REFERENCES games(id),
  score INTEGER NOT NULL,
  duration INTEGER NOT NULL, -- in seconds
  difficulty TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training plans table
CREATE TABLE IF NOT EXISTS training_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  games UUID[] NOT NULL,
  schedule JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  achievement_id UUID NOT NULL REFERENCES achievements(id),
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, achievement_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create neuroscience insights table
CREATE TABLE IF NOT EXISTS neuroscience_insights (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up Row Level Security (RLS)
-- Enable RLS on all tables
ALTER TABLE cognitive_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE neuroscience_insights ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Cognitive domains and games are readable by all authenticated users
CREATE POLICY "Cognitive domains are viewable by all users" 
  ON cognitive_domains FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Games are viewable by all users" 
  ON games FOR SELECT 
  USING (auth.role() = 'authenticated');

-- User profiles are viewable by the owner
CREATE POLICY "User profiles are viewable by owner" 
  ON user_profiles FOR SELECT 
  USING (auth.uid() = user_id);

-- User profiles are insertable and updatable by the owner
CREATE POLICY "User profiles are insertable by owner" 
  ON user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "User profiles are updatable by owner" 
  ON user_profiles FOR UPDATE 
  USING (auth.uid() = user_id);

-- Game sessions are viewable, insertable, and updatable by the owner
CREATE POLICY "Game sessions are viewable by owner" 
  ON game_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Game sessions are insertable by owner" 
  ON game_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Game sessions are updatable by owner" 
  ON game_sessions FOR UPDATE 
  USING (auth.uid() = user_id);

-- Training plans are viewable, insertable, updatable, and deletable by the owner
CREATE POLICY "Training plans are viewable by owner" 
  ON training_plans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Training plans are insertable by owner" 
  ON training_plans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Training plans are updatable by owner" 
  ON training_plans FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Training plans are deletable by owner" 
  ON training_plans FOR DELETE 
  USING (auth.uid() = user_id);

-- Achievements are viewable by all authenticated users
CREATE POLICY "Achievements are viewable by all users" 
  ON achievements FOR SELECT 
  USING (auth.role() = 'authenticated');

-- User achievements are viewable and insertable by the owner
CREATE POLICY "User achievements are viewable by owner" 
  ON user_achievements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "User achievements are insertable by owner" 
  ON user_achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Notifications are viewable, updatable, and deletable by the owner
CREATE POLICY "Notifications are viewable by owner" 
  ON notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Notifications are updatable by owner" 
  ON notifications FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Notifications are deletable by owner" 
  ON notifications FOR DELETE 
  USING (auth.uid() = user_id);

-- Neuroscience insights are viewable by all authenticated users
CREATE POLICY "Neuroscience insights are viewable by all users" 
  ON neuroscience_insights FOR SELECT 
  USING (auth.role() = 'authenticated');
