import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Gamepad2, Coins, Target, Zap, Medal } from 'lucide-react';

export default function GamesPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">GAME DASHBOARD</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Learn high-level concepts through interactive mini-games. Earn XP and unlock achievements!
          </p>
        </div>
        <div className="flex gap-4">
          <div className="glass px-6 py-4 rounded-2xl flex items-center gap-3 border-primary/30">
            <div className="p-2 bg-primary/20 rounded-lg text-primary"><Zap size={24} /></div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total XP</p>
              <p className="font-headline font-bold text-xl">12,450</p>
            </div>
          </div>
          <div className="glass px-6 py-4 rounded-2xl flex items-center gap-3 border-secondary/30">
            <div className="p-2 bg-secondary/20 rounded-lg text-secondary"><Coins size={24} /></div>
            <div>
              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Quest Coins</p>
              <p className="font-headline font-bold text-xl">420</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {GAMES.map((game, i) => (
          <Card key={i} className="glass group hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <img 
                src={`https://picsum.photos/seed/game-${game.id}/600/300`} 
                alt={game.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                data-ai-hint={`${game.title} game art`}
              />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1">
                <Target size={12} className="text-primary" /> {game.difficulty}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className="bg-white/10 text-xs">{game.category}</Badge>
                <span className="text-xs font-bold text-primary">+{game.xp} XP</span>
              </div>
              <CardTitle className="font-headline text-2xl">{game.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {game.description}
              </p>
            </CardContent>
            <CardFooter className="pt-0">
              <Button className="w-full btn-neon-primary font-headline group">
                PLAY NOW <Gamepad2 size={18} className="ml-2 group-hover:scale-125 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-20 space-y-8">
        <h2 className="text-3xl font-headline font-bold flex items-center gap-3">
          <Medal className="text-secondary" /> RECENT ACHIEVEMENTS
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {BADGES.map((badge, i) => (
            <div key={i} className="glass p-6 rounded-2xl flex flex-col items-center gap-3 text-center border-white/5 hover:border-white/20 transition-all">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br ${badge.color} shadow-lg mb-2`}>
                <badge.icon size={32} className="text-white" />
              </div>
              <p className="text-xs font-headline font-bold">{badge.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase">{badge.rank}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const GAMES = [
  { 
    id: 1, 
    title: 'Train The Robot', 
    category: 'Supervised Learning', 
    xp: 500, 
    difficulty: 'EASY',
    description: 'Teach a cleaning robot to differentiate between trash and treasures through real-time labeling.' 
  },
  { 
    id: 2, 
    title: 'Sort The Data', 
    category: 'Classification', 
    xp: 750, 
    difficulty: 'MEDIUM',
    description: 'Drifting objects are appearing! Sort them into correct category boxes before they reach the data incinerator.' 
  },
  { 
    id: 3, 
    title: 'Find The Pattern', 
    category: 'Pattern Recognition', 
    xp: 600, 
    difficulty: 'MEDIUM',
    description: 'Analyze sequences of neural pulses and predict the next burst to keep the network stable.' 
  },
  { 
    id: 4, 
    title: 'Neural Maze', 
    category: 'Deep Learning', 
    xp: 1200, 
    difficulty: 'HARD',
    description: 'Navigate a signal through layers of neurons. Balance the weights to avoid dead ends and reach the output node.' 
  },
  { 
    id: 5, 
    title: 'Quiz Battle: AI vs Human', 
    category: 'General AI', 
    xp: 1000, 
    difficulty: 'COMPETITIVE',
    description: 'A high-speed trivia battle against our specialized GPT opponent. Who has the faster processing speed?' 
  },
];

const BADGES = [
  { name: 'AI BEGINNER', rank: 'BRONZE', icon: Zap, color: 'from-amber-400 to-orange-500' },
  { name: 'DATA WIZARD', rank: 'SILVER', icon: Trophy, color: 'from-blue-400 to-cyan-500' },
  { name: 'ML MASTER', rank: 'GOLD', icon: Medal, color: 'from-purple-400 to-violet-500' },
  { name: 'NEURAL HERO', rank: 'ELITE', icon: Brain, color: 'from-rose-400 to-pink-500' },
  { name: 'CODE NINJA', rank: 'GOLD', icon: Code, color: 'from-emerald-400 to-teal-500' },
  { name: 'QUICK THINKER', rank: 'SILVER', icon: Target, color: 'from-indigo-400 to-blue-500' },
];