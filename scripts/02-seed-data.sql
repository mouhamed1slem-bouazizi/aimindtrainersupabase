-- Seed data for MindTrainer app

-- Insert games
INSERT INTO games (id, name, description, domain, duration, difficulty, image_url, is_premium)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Memory Match', 'Test your visual memory by matching pairs of cards', 'Memory', 3, 'Medium', '/placeholder.svg?height=100&width=100', FALSE),
  ('00000000-0000-0000-0000-000000000002', 'Attention Grid', 'Find targets among distractors as quickly as possible', 'Attention', 4, 'Hard', '/placeholder.svg?height=100&width=100', FALSE),
  ('00000000-0000-0000-0000-000000000003', 'Speed Sort', 'Sort items into categories as fast as you can', 'Processing Speed', 2, 'Easy', '/placeholder.svg?height=100&width=100', FALSE),
  ('00000000-0000-0000-0000-000000000004', 'Reflex Tap', 'Test your reaction time with this tapping game', 'Reflexes', 3, 'Medium', '/placeholder.svg?height=100&width=100', FALSE),
  ('00000000-0000-0000-0000-000000000005', 'Task Switch', 'Practice switching between different tasks quickly', 'Executive Control', 5, 'Hard', '/placeholder.svg?height=100&width=100', FALSE),
  ('00000000-0000-0000-0000-000000000006', 'Pattern Solver', 'Identify and complete complex patterns', 'Problem-Solving', 4, 'Hard', '/placeholder.svg?height=100&width=100', FALSE),
  ('00000000-0000-0000-0000-000000000007', 'Space Navigator', 'Navigate through 3D space using mental rotation', 'Spatial Reasoning', 3, 'Medium', '/placeholder.svg?height=100&width=100', TRUE),
  ('00000000-0000-0000-0000-000000000008', 'Word Builder', 'Create words from letter sets to improve vocabulary', 'Language', 4, 'Medium', '/placeholder.svg?height=100&width=100', TRUE),
  ('00000000-0000-0000-0000-000000000009', 'Number Crunch', 'Solve math problems quickly to improve numerical skills', 'Numerical Skills', 3, 'Medium', '/placeholder.svg?height=100&width=100', TRUE),
  ('00000000-0000-0000-0000-000000000010', 'Breath Pacer', 'Follow guided breathing patterns to reduce stress', 'Stress Regulation', 5, 'Easy', '/placeholder.svg?height=100&width=100', FALSE)
ON CONFLICT (id) DO NOTHING;

-- Insert achievements
INSERT INTO achievements (id, name, description, icon)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Consistent Learner', 'Complete a 7-day training streak', 'Calendar'),
  ('00000000-0000-0000-0000-000000000002', 'Speed Demon', 'Improve reaction time by 20%', 'Zap'),
  ('00000000-0000-0000-0000-000000000003', 'Memory Master', 'Score 90+ in 5 memory games', 'Brain'),
  ('00000000-0000-0000-0000-000000000004', 'Attention Expert', 'Complete 10 attention games', 'Target'),
  ('00000000-0000-0000-0000-000000000005', 'Brain Trainer', 'Complete 50 training sessions', 'Trophy'),
  ('00000000-0000-0000-0000-000000000006', 'All-Rounder', 'Train all 10 cognitive domains', 'Star')
ON CONFLICT (id) DO NOTHING;
