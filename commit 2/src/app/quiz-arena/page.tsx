import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Target, Timer, Users, Flame, Trophy, Star, ChevronRight } from 'lucide-react';

export default function QuizArenaPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">QUIZ ARENA</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Test your neural processing speed. Compete in timed challenges and climb the global leaderboards.
          </p>
        </div>
        <div className="flex gap-4">
          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 flex gap-2 items-center py-2 px-4">
            <Flame size={16} /> DAILY STREAK: 7
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Quiz Sections */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <QuizSectionCard 
              icon={Timer} 
              title="Timed Blitz" 
              desc="10 questions, 60 seconds. Pure speed."
              count="1.2k Active"
              color="text-rose-400"
            />
            <QuizSectionCard 
              icon={Users} 
              title="Multiplayer Battle" 
              desc="Face off against other students live."
              count="428 Waiting"
              color="text-cyan-400"
            />
          </div>

          <h3 className="font-headline text-2xl mt-12 mb-6">TOPIC-WISE CHALLENGES</h3>
          <div className="space-y-4">
            {TOPIC_QUIZZES.map((quiz, i) => (
              <Card key={i} className="glass border-white/5 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center text-primary">
                      <quiz.icon size={28} />
                    </div>
                    <div>
                      <h4 className="font-headline text-lg group-hover:text-primary transition-colors">{quiz.title}</h4>
                      <p className="text-xs text-muted-foreground">{quiz.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="hidden md:block text-center">
                      <p className="text-[10px] text-muted-foreground uppercase font-bold">XP REWARD</p>
                      <p className="text-sm font-headline text-secondary">+{quiz.xp}</p>
                    </div>
                    <Button size="icon" variant="ghost" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground">
                      <ChevronRight />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="space-y-8">
          <Card className="glass border-primary/20 overflow-hidden">
            <CardHeader className="bg-primary/10 border-b border-white/10">
              <CardTitle className="font-headline text-lg flex items-center gap-2">
                <Trophy size={20} className="text-amber-500" /> GLOBAL LEADERBOARD
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-white/5">
                {LEADERBOARD.map((user, i) => (
                  <div key={i} className={`flex items-center justify-between p-4 ${i === 0 ? 'bg-primary/5' : ''}`}>
                    <div className="flex items-center gap-4">
                      <span className={`w-6 text-center font-headline text-sm font-bold ${i < 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                        #{i + 1}
                      </span>
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={`https://picsum.photos/seed/user-${i}/100/100`} />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-bold">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">LVL {user.lvl}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-headline font-bold text-primary">{user.xp.toLocaleString()}</p>
                      <p className="text-[9px] text-muted-foreground uppercase">XP TOTAL</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-white/5 text-center">
                <Button variant="link" className="text-primary text-xs font-bold uppercase tracking-wider">VIEW FULL RANKINGS</Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10 bg-secondary/5">
            <CardContent className="p-6 text-center space-y-4">
              <Star className="mx-auto text-secondary animate-pulse-glow" size={40} />
              <h4 className="font-headline font-bold">DAILY CHALLENGE</h4>
              <p className="text-xs text-muted-foreground">Complete today's specialized "Neural Filter" quiz to earn a 2x XP multiplier for 1 hour!</p>
              <Button className="w-full btn-neon-secondary font-headline">START CHALLENGE</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function QuizSectionCard({ icon: Icon, title, desc, count, color }: any) {
  return (
    <Card className="glass border-white/10 hover:border-white/30 transition-all cursor-pointer relative overflow-hidden group">
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
        <Icon size={80} />
      </div>
      <CardContent className="p-8 space-y-4">
        <div className={`p-3 w-fit rounded-xl bg-white/5 ${color}`}>
          <Icon size={32} />
        </div>
        <div>
          <h3 className="font-headline text-2xl">{title}</h3>
          <p className="text-sm text-muted-foreground">{desc}</p>
        </div>
        <div className="flex items-center justify-between pt-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{count}</span>
          <Button size="sm" variant="outline" className="glass text-[10px] font-headline">ENTER</Button>
        </div>
      </CardContent>
    </Card>
  );
}

const TOPIC_QUIZZES = [
  { title: 'Decision Tree Logic', desc: 'Predict outcomes using logical branching.', xp: 250, icon: Target },
  { title: 'Neural Weighting', desc: 'Fine-tune signal propagation layers.', xp: 500, icon: Flame },
  { title: 'Data Cleaning Pro', desc: 'Remove outliers and handle missing values.', xp: 300, icon: Target },
  { title: 'CNN Architecture', desc: 'Identify components of a Vision model.', xp: 600, icon: Target },
];

const LEADERBOARD = [
  { name: 'Neural_Ninja', lvl: 84, xp: 94250 },
  { name: 'Data_Daemon', lvl: 79, xp: 88100 },
  { name: 'Logic_Lord', lvl: 72, xp: 72400 },
  { name: 'ML_Maverick', lvl: 65, xp: 61000 },
  { name: 'Tensor_Titan', lvl: 58, xp: 54900 },
];