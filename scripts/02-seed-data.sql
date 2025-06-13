-- Seed cognitive domains
INSERT INTO cognitive_domains (name, description, icon)
VALUES
  ('Memory', 'The ability to encode, store, and recall information', 'brain'),
  ('Attention', 'The ability to focus on specific stimuli while ignoring distractions', 'eye'),
  ('Processing Speed', 'The ability to quickly perform cognitive tasks', 'zap'),
  ('Executive Function', 'The ability to plan, organize, and complete tasks', 'layout-dashboard'),
  ('Problem Solving', 'The ability to find solutions to complex problems', 'puzzle')
ON CONFLICT DO NOTHING;

-- Get domain IDs
DO $$
DECLARE
  memory_id UUID;
  attention_id UUID;
  processing_id UUID;
  executive_id UUID;
  problem_id UUID;
BEGIN
  SELECT id INTO memory_id FROM cognitive_domains WHERE name = 'Memory' LIMIT 1;
  SELECT id INTO attention_id FROM cognitive_domains WHERE name = 'Attention' LIMIT 1;
  SELECT id INTO processing_id FROM cognitive_domains WHERE name = 'Processing Speed' LIMIT 1;
  SELECT id INTO executive_id FROM cognitive_domains WHERE name = 'Executive Function' LIMIT 1;
  SELECT id INTO problem_id FROM cognitive_domains WHERE name = 'Problem Solving' LIMIT 1;

  -- Seed games
  INSERT INTO games (name, description, instructions, difficulty_levels, domain_id)
  VALUES
    ('Memory Match', 'Test and improve your visual memory by matching pairs of cards', 'Click on cards to flip them and find matching pairs. Remember the positions to match all pairs as quickly as possible.', ARRAY['Easy', 'Medium', 'Hard'], memory_id),
    ('Attention Spotlight', 'Enhance your selective attention by identifying targets among distractors', 'Tap on the target shapes as they appear among distractors. Be quick and accurate!', ARRAY['Easy', 'Medium', 'Hard'], attention_id),
    ('Speed Sort', 'Improve your processing speed by sorting items into categories', 'Sort the items into their correct categories as quickly as possible. Swipe left or right to categorize.', ARRAY['Easy', 'Medium', 'Hard'], processing_id),
    ('Task Manager', 'Strengthen your executive function by managing multiple tasks simultaneously', 'Complete multiple tasks according to their priority and deadline. Switch between tasks efficiently.', ARRAY['Easy', 'Medium', 'Hard'], executive_id),
    ('Pattern Solver', 'Enhance your problem-solving skills by identifying patterns and relationships', 'Identify the pattern in the sequence and select the item that comes next.', ARRAY['Easy', 'Medium', 'Hard'], problem_id)
  ON CONFLICT DO NOTHING;

  -- Seed achievements
  INSERT INTO achievements (name, description, icon)
  VALUES
    ('First Steps', 'Complete your first training session', 'baby'),
    ('Memory Master', 'Achieve a perfect score in Memory Match on Hard difficulty', 'trophy'),
    ('Focus Champion', 'Complete 10 Attention Spotlight sessions with 90% accuracy', 'target'),
    ('Speed Demon', 'Sort 100 items in under 60 seconds in Speed Sort', 'timer'),
    ('Multitasker', 'Successfully manage 5 tasks simultaneously in Task Manager', 'layers'),
    ('Problem Solver', 'Solve 50 Pattern Solver puzzles', 'puzzle-piece'),
    ('Daily Streak: 7 Days', 'Complete daily training for 7 consecutive days', 'calendar'),
    ('Daily Streak: 30 Days', 'Complete daily training for 30 consecutive days', 'calendar-check'),
    ('Cognitive Explorer', 'Try all available games at least once', 'compass'),
    ('Brain Transformer', 'Improve scores in all cognitive domains by at least 20%', 'brain')
  ON CONFLICT DO NOTHING;

  -- Seed neuroscience insights
  INSERT INTO neuroscience_insights (title, content)
  VALUES
    ('Neuroplasticity: Your Brain''s Superpower', 'Neuroplasticity is your brain''s ability to reorganize itself by forming new neural connections. This allows the neurons in your brain to adjust their activities in response to new situations or changes in their environment. Through consistent cognitive training, you can strengthen these neural pathways and enhance your cognitive abilities.'),
    ('The Science of Memory Formation', 'Memory formation occurs in three main stages: encoding, storage, and retrieval. When you encounter new information, your brain processes it (encoding), maintains it over time (storage), and then accesses it when needed (retrieval). Memory games specifically target and strengthen these processes, particularly in the hippocampus region of your brain.'),
    ('Attention and the Prefrontal Cortex', 'Your prefrontal cortex plays a crucial role in attention control. This brain region helps you focus on relevant information while filtering out distractions. Attention training exercises strengthen the neural networks in this area, improving your ability to maintain focus and resist distractions in daily life.'),
    ('Sleep and Cognitive Performance', 'Quality sleep is essential for optimal cognitive function. During sleep, your brain consolidates memories, clears out toxins, and prepares for the next day''s cognitive challenges. Research shows that even a single night of poor sleep can reduce attention, working memory, and decision-making abilities by up to 30%.'),
    ('The Cognitive Benefits of Exercise', 'Physical exercise doesn''t just benefit your body—it significantly enhances brain function too. Exercise increases blood flow to the brain, promotes the growth of new neurons, and triggers the release of brain-derived neurotrophic factor (BDNF), which supports learning and memory. Just 30 minutes of moderate exercise can immediately boost cognitive performance.')
  ON CONFLICT DO NOTHING;
END $$;
