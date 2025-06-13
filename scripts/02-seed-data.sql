-- Seed cognitive domains
INSERT INTO cognitive_domains (name, description, icon) VALUES
('Memory', 'The ability to encode, store, and recall information', 'brain'),
('Attention', 'The ability to focus on specific stimuli while ignoring distractions', 'eye'),
('Processing Speed', 'The speed at which you can understand and react to information', 'zap'),
('Problem Solving', 'The ability to find solutions to difficult or complex issues', 'puzzle-piece'),
('Flexibility', 'The ability to adapt to new situations and think about things in different ways', 'refresh-cw')
ON CONFLICT (name) DO NOTHING;

-- Seed brain regions
INSERT INTO brain_regions (name, description) VALUES
('Prefrontal Cortex', 'Responsible for executive functions like planning and decision-making'),
('Hippocampus', 'Critical for learning and memory formation'),
('Amygdala', 'Processes emotions and emotional memories'),
('Cerebellum', 'Coordinates movement and some cognitive functions'),
('Parietal Lobe', 'Processes sensory information and spatial awareness')
ON CONFLICT (name) DO NOTHING;

-- Seed games
INSERT INTO games (name, description, instructions, thumbnail_url) VALUES
('Memory Match', 'Test and improve your visual memory by matching pairs of cards', 'Click on cards to flip them and find matching pairs. Remember the positions to match all pairs as quickly as possible.', '/placeholder.svg?height=200&width=200'),
('Attention Grid', 'Enhance your focus by finding specific targets in a grid of distractors', 'Find and click on all instances of the target symbol as quickly as possible while avoiding distractors.', '/placeholder.svg?height=200&width=200'),
('Speed Sort', 'Improve processing speed by sorting items into categories quickly', 'Sort the falling objects into the correct categories by swiping left or right before they reach the bottom.', '/placeholder.svg?height=200&width=200'),
('Logic Puzzles', 'Strengthen problem-solving skills with challenging puzzles', 'Solve the puzzle by arranging the pieces according to the given rules and constraints.', '/placeholder.svg?height=200&width=200'),
('Pattern Switch', 'Develop cognitive flexibility by adapting to changing patterns', 'Respond to the changing patterns according to the rules. The rules will switch periodically, requiring you to adapt.', '/placeholder.svg?height=200&width=200')
ON CONFLICT DO NOTHING;

-- Link games to cognitive domains
INSERT INTO game_domains (game_id, domain_id, impact_level) VALUES
(1, 1, 5), -- Memory Match strongly impacts Memory
(1, 2, 2), -- Memory Match moderately impacts Attention
(2, 2, 5), -- Attention Grid strongly impacts Attention
(2, 3, 3), -- Attention Grid moderately impacts Processing Speed
(3, 3, 5), -- Speed Sort strongly impacts Processing Speed
(3, 5, 2), -- Speed Sort moderately impacts Flexibility
(4, 4, 5), -- Logic Puzzles strongly impacts Problem Solving
(4, 1, 2), -- Logic Puzzles moderately impacts Memory
(5, 5, 5), -- Pattern Switch strongly impacts Flexibility
(5, 2, 3)  -- Pattern Switch moderately impacts Attention
ON CONFLICT DO NOTHING;

-- Link games to brain regions
INSERT INTO game_brain_regions (game_id, region_id) VALUES
(1, 2), -- Memory Match impacts Hippocampus
(1, 5), -- Memory Match impacts Parietal Lobe
(2, 1), -- Attention Grid impacts Prefrontal Cortex
(2, 5), -- Attention Grid impacts Parietal Lobe
(3, 1), -- Speed Sort impacts Prefrontal Cortex
(3, 4), -- Speed Sort impacts Cerebellum
(4, 1), -- Logic Puzzles impacts Prefrontal Cortex
(4, 2), -- Logic Puzzles impacts Hippocampus
(5, 1), -- Pattern Switch impacts Prefrontal Cortex
(5, 4)  -- Pattern Switch impacts Cerebellum
ON CONFLICT DO NOTHING;

-- Seed achievements
INSERT INTO achievements (name, description, icon, criteria) VALUES
('First Steps', 'Complete your first training session', 'award', '{"game_sessions": 1}'),
('Memory Master', 'Score over 90% in a Memory Match game', 'brain', '{"game_id": 1, "min_score": 90}'),
('Focus Champion', 'Complete 5 Attention Grid sessions', 'eye', '{"game_id": 2, "game_sessions": 5}'),
('Speed Demon', 'Complete a Speed Sort game in under 60 seconds', 'zap', '{"game_id": 3, "max_duration": 60}'),
('Problem Solver', 'Solve 10 Logic Puzzles', 'puzzle-piece', '{"game_id": 4, "game_sessions": 10}'),
('Adaptable Mind', 'Switch between 3 different games in one day', 'refresh-cw', '{"unique_games_per_day": 3}'),
('Consistency King', 'Maintain a 7-day streak', 'calendar', '{"min_streak": 7}'),
('Cognitive Explorer', 'Try all available games at least once', 'compass', '{"try_all_games": true}')
ON CONFLICT DO NOTHING;

-- Seed training plans
INSERT INTO training_plans (name, description, duration_days) VALUES
('Memory Boost', 'A 7-day plan focused on improving memory', 7),
('Attention Builder', 'A 7-day plan to enhance focus and attention', 7),
('Speed Training', 'A 7-day plan to improve processing speed', 7),
('Problem Solving Challenge', 'A 14-day plan for developing problem-solving skills', 14),
('Cognitive Flexibility Program', 'A 14-day plan to improve adaptability and flexibility', 14),
('All-Around Cognitive Enhancement', 'A 30-day comprehensive plan targeting all cognitive domains', 30)
ON CONFLICT DO NOTHING;

-- Link training plans to games
INSERT INTO training_plan_games (plan_id, game_id, day_number) VALUES
-- Memory Boost plan
(1, 1, 1), (1, 1, 2), (1, 1, 3), (1, 4, 4), (1, 1, 5), (1, 1, 6), (1, 1, 7),
-- Attention Builder plan
(2, 2, 1), (2, 2, 2), (2, 2, 3), (2, 5, 4), (2, 2, 5), (2, 2, 6), (2, 2, 7),
-- Speed Training plan
(3, 3, 1), (3, 3, 2), (3, 3, 3), (3, 2, 4), (3, 3, 5), (3, 3, 6), (3, 3, 7)
ON CONFLICT DO NOTHING;

-- Seed insights
INSERT INTO insights (title, content, source) VALUES
('The Spacing Effect', 'Studying or practicing with breaks in between sessions leads to better long-term retention than cramming.', 'Journal of Memory and Language'),
('Exercise and Brain Health', 'Regular physical exercise has been shown to improve cognitive function and protect against cognitive decline.', 'Neuroscience & Biobehavioral Reviews'),
('Sleep and Memory Consolidation', 'Quality sleep is essential for memory consolidation, the process of converting short-term memories to long-term memories.', 'Nature Neuroscience'),
('The Mozart Effect Myth', 'Contrary to popular belief, listening to Mozart does not make you smarter. However, music can improve mood and temporarily enhance spatial reasoning.', 'Scientific American'),
('Neuroplasticity', 'The brain continues to form new neural connections throughout life, allowing for continued learning and adaptation.', 'Annual Review of Psychology')
ON CONFLICT DO NOTHING;
