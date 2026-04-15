import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight, Star, Play, Trophy } from 'lucide-react';
import Link from 'next/link';

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">LEARNING PATH</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Follow our carefully structured curriculum from fundamentals to bleeding-edge deep learning.
        </p>
      </div>

      <div className="space-y-20">
        {LEARNING_LEVELS.map((level, i) => (
          <div key={i} className="space-y-8">
            <div className="flex items-center gap-4">
              <div className={`px-4 py-1 rounded-full bg-gradient-to-r ${level.color} text-white font-headline text-xs font-bold tracking-widest`}>
                LEVEL 0{i + 1}
              </div>
              <h2 className="text-3xl font-headline font-bold">{level.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {level.topics.map((topic, j) => (
                <Card key={j} className="glass hover:border-primary/50 transition-all duration-300 group overflow-hidden">
                  <div className="h-40 overflow-hidden relative">
                    <img 
                      src={`https://picsum.photos/seed/learn-${topic.title}/400/200`} 
                      alt={topic.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      data-ai-hint={`AI ${topic.title} illustration`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="bg-white/10 text-xs">{topic.category}</Badge>
                      <div className="flex gap-1">
                        {[...Array(topic.difficulty)].map((_, k) => (
                          <Star key={k} size={10} className="fill-primary text-primary" />
                        ))}
                      </div>
                    </div>
                    <CardTitle className="font-headline text-xl">{topic.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      {topic.description}
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="glass flex-1 gap-2 text-xs font-headline">
                        <Play size={12} className="fill-current" /> TRY DEMO
                      </Button>
                      <Button size="sm" className="btn-neon-primary flex-1 gap-2 text-xs font-headline">
                        <Trophy size={12} /> TAKE QUIZ
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const LEARNING_LEVELS = [
  {
    title: 'BEGINNER FOUNDATIONS',
    color: 'from-cyan-500 to-blue-500',
    topics: [
      { title: 'What is AI?', category: 'Introduction', description: 'Explore the basics of intelligence simulation in machines.', difficulty: 1 },
      { title: 'Supervised Learning', category: 'ML Basics', description: 'Teaching machines using labeled examples and data.', difficulty: 1 },
      { title: 'Dataset & Features', category: 'Data Science', description: 'Understanding how data is structured for training.', difficulty: 1 },
      { title: 'Labels & Classification', category: 'ML Basics', description: 'Predicting categories and sorting information.', difficulty: 2 },
      { title: 'Unsupervised Learning', category: 'ML Basics', description: 'Finding hidden patterns in unlabeled data structures.', difficulty: 2 },
      { title: 'Reinforcement Learning', category: 'Advanced Basics', description: 'Learning through rewards and penalties in environments.', difficulty: 2 },
    ]
  },
  {
    title: 'INTERMEDIATE MASTERY',
    color: 'from-violet-500 to-purple-500',
    topics: [
      { title: 'Linear Regression', category: 'Regression', description: 'Predicting continuous values like house prices or stock trends.', difficulty: 3 },
      { title: 'Decision Trees', category: 'Algorithms', description: 'Flowchart-like models for making complex logical choices.', difficulty: 3 },
      { title: 'Neural Networks', category: 'DL Foundations', description: 'Introduction to biologically inspired computing models.', difficulty: 4 },
      { title: 'KNN Algorithm', category: 'Classification', description: 'Identifying neighbors to classify points in multidimensional space.', difficulty: 3 },
    ]
  },
  {
    title: 'ADVANCED APPLICATIONS',
    color: 'from-rose-500 to-orange-500',
    topics: [
      { title: 'Computer Vision', category: 'Applied AI', description: 'How computers see and understand images and video.', difficulty: 5 },
      { title: 'NLP Foundations', category: 'Applied AI', description: 'Processing human language with semantic understanding.', difficulty: 5 },
      { title: 'Deep Learning', category: 'Neural Nets', description: 'Building multi-layered architectures for complex tasks.', difficulty: 5 },
      { title: 'Recommendation Systems', category: 'Applied AI', description: 'Building engines like Netflix or Spotify algorithms.', difficulty: 4 },
    ]
  }
];