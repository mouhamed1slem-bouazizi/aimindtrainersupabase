-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  preferences JSONB DEFAULT '{}'::JSONB
);

-- Create cognitive domains table
CREATE TABLE IF NOT EXISTS cognitive_domains (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  instructions TEXT,
  thumbnail_url TEXT,
  difficulty_levels JSONB DEFAULT '[{"name": "Easy", "value": 1}, {"name": "Medium", "value": 2}, {"name": "Hard", "value": 3}]'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_domains junction table
CREATE TABLE IF NOT EXISTS game_domains (
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  domain_id INTEGER REFERENCES cognitive_domains(id) ON DELETE CASCADE,
  impact_level INTEGER NOT NULL DEFAULT 1, -- 1-5 scale of how much this game impacts this domain
  PRIMARY KEY (game_id, domain_id)
);

-- Create brain_regions table
CREATE TABLE IF NOT EXISTS brain_regions (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Create game_brain_regions junction table
CREATE TABLE IF NOT EXISTS game_brain_regions (
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  region_id INTEGER REFERENCES brain_regions(id) ON DELETE CASCADE,
  PRIMARY KEY (game_id, region_id)
);

-- Create game_sessions table
CREATE TABLE IF NOT EXISTS game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  difficulty_level INTEGER NOT NULL,
  score INTEGER NOT NULL,
  duration_seconds INTEGER NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::JSONB
);

-- Create domain_progress table
CREATE TABLE IF NOT EXISTS domain_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  domain_id INTEGER REFERENCES cognitive_domains(id) ON DELETE CASCADE,
  score INTEGER NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, domain_id)
);

-- Create achievements table
CREATE TABLE IF NOT EXISTS achievements (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  criteria JSONB NOT NULL
);

-- Create user_achievements junction table
CREATE TABLE IF NOT EXISTS user_achievements (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  achievement_id INTEGER REFERENCES achievements(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  PRIMARY KEY (user_id, achievement_id)
);

-- Create training_plans table
CREATE TABLE IF NOT EXISTS training_plans (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training_plan_games junction table
CREATE TABLE IF NOT EXISTS training_plan_games (
  plan_id INTEGER REFERENCES training_plans(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES games(id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  PRIMARY KEY (plan_id, game_id, day_number)
);

-- Create user_training_plans table
CREATE TABLE IF NOT EXISTS user_training_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id INTEGER REFERENCES training_plans(id) ON DELETE CASCADE,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_day INTEGER DEFAULT 1,
  completed BOOLEAN DEFAULT FALSE,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create streaks table
CREATE TABLE IF NOT EXISTS streaks (
  user_id UUID PRIMARY KEY REFERENCES profiles(id) ON DELETE CASCADE,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_activity_date DATE DEFAULT CURRENT_DATE
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE domain_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_training_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" 
  ON profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Game sessions policies
CREATE POLICY "Users can view their own game sessions" 
  ON game_sessions FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own game sessions" 
  ON game_sessions FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Domain progress policies
CREATE POLICY "Users can view their own domain progress" 
  ON domain_progress FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own domain progress" 
  ON domain_progress FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own domain progress" 
  ON domain_progress FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- User achievements policies
CREATE POLICY "Users can view their own achievements" 
  ON user_achievements FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own achievements" 
  ON user_achievements FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- User training plans policies
CREATE POLICY "Users can view their own training plans" 
  ON user_training_plans FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own training plans" 
  ON user_training_plans FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own training plans" 
  ON user_training_plans FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Streaks policies
CREATE POLICY "Users can view their own streaks" 
  ON streaks FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own streaks" 
  ON streaks FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own streaks" 
  ON streaks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
  ON notifications FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create functions and triggers
CREATE OR REPLACE FUNCTION update_domain_progress() RETURNS TRIGGER AS $$
BEGIN
  -- Update domain progress based on game session results
  INSERT INTO domain_progress (user_id, domain_id, score)
  SELECT 
    NEW.user_id, 
    gd.domain_id, 
    COALESCE(
      (SELECT score FROM domain_progress WHERE user_id = NEW.user_id AND domain_id = gd.domain_id),
      0
    ) + (NEW.score * gd.impact_level / 10)
  FROM game_domains gd
  WHERE gd.game_id = NEW.game_id
  ON CONFLICT (user_id, domain_id) 
  DO UPDATE SET 
    score = domain_progress.score + (NEW.score * (
      SELECT impact_level FROM game_domains 
      WHERE game_id = NEW.game_id AND domain_id = domain_progress.domain_id
    ) / 10),
    updated_at = NOW();
    
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_domain_progress_trigger
AFTER INSERT ON game_sessions
FOR EACH ROW
EXECUTE FUNCTION update_domain_progress();

CREATE OR REPLACE FUNCTION update_streak() RETURNS TRIGGER AS $$
DECLARE
  last_date DATE;
BEGIN
  -- Get the user's last activity date
  SELECT last_activity_date INTO last_date FROM streaks WHERE user_id = NEW.user_id;
  
  IF NOT FOUND THEN
    -- First activity, create streak record
    INSERT INTO streaks (user_id, current_streak, longest_streak, last_activity_date)
    VALUES (NEW.user_id, 1, 1, CURRENT_DATE);
  ELSE
    -- Check if this is a consecutive day
    IF last_date = CURRENT_DATE THEN
      -- Already recorded today, do nothing
      NULL;
    ELSIF last_date = CURRENT_DATE - INTERVAL '1 day' THEN
      -- Consecutive day, increment streak
      UPDATE streaks 
      SET 
        current_streak = current_streak + 1,
        longest_streak = GREATEST(longest_streak, current_streak + 1),
        last_activity_date = CURRENT_DATE
      WHERE user_id = NEW.user_id;
    ELSE
      -- Streak broken, reset to 1
      UPDATE streaks 
      SET 
        current_streak = 1,
        last_activity_date = CURRENT_DATE
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_streak_trigger
AFTER INSERT ON game_sessions
FOR EACH ROW
EXECUTE FUNCTION update_streak();
