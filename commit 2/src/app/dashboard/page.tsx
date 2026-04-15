"use client";

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Zap, Clock, BookOpen, Target, ChevronRight, Award } from 'lucide-react';
import { aiPersonalizedLearningRecommendation } from '@/ai/flows/ai-personalized-learning-recommendation';

export default function DashboardPage() {
  const [recommendation, setRecommendation] = useState<any>(null);

  useEffect(() => {
    async function getRec() {
      const rec = await aiPersonalizedLearningRecommendation({
        completedTopics: ['What is AI?', 'Supervised Learning'],
        quizPerformance: { 'What is AI?': 95, 'Supervised Learning': 60 },
        allAvailableTopics: {
          beginner: ['What is ML?', 'Dataset Basics', 'Labels'],
          intermediate: ['Linear Regression', 'Decision Trees'],
          advanced: ['CNN', 'NLP']
        }
      });
      setRecommendation(rec);
    }
    getRec();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Profile Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="glass border-primary/20 p-6 text-center">
            <div className="relative inline-block mb-6">
              <Avatar className="w-32 h-32 border-4 border-primary shadow-2xl">
                <AvatarImage src="https://picsum.photos/seed/user-avatar/200/200" />
                <AvatarFallback>UN</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-secondary text-white px-2 py-1 rounded-lg text-xs font-headline font-bold border-2 border-background">
                LVL 12
              </div>
            </div>
            <h2 className="font-headline text-2xl font-bold mb-1">QuestMaster_24</h2>
            <p className="text-sm text-muted-foreground mb-6">Aspiring AI Engineer</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass p-3 rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">XP Points</p>
                <p className="font-headline text-lg text-primary">12,450</p>
              </div>
              <div className="glass p-3 rounded-xl">
                <p className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Streak</p>
                <p className="font-headline text-lg text-secondary">7 Days</p>
              </div>
            </div>
            
            <Button className="w-full btn-neon-primary mb-4">EDIT PROFILE</Button>
            <Button variant="ghost" className="w-full text-xs text-muted-foreground">VIEW PUBLIC PROFILE</Button>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="font-headline text-sm flex items-center gap-2">
                <Award className="text-secondary" /> EARNED BADGES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="aspect-square glass rounded-lg flex items-center justify-center grayscale hover:grayscale-0 transition-all cursor-pointer bg-gradient-to-br from-white/5 to-white/10">
                    <Trophy size={20} className="text-amber-500" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <StatCard icon={BookOpen} label="Completed Lessons" value="14" color="text-blue-400" />
             <StatCard icon={Target} label="Quiz Success Rate" value="84%" color="text-green-400" />
             <StatCard icon={Clock} label="Learning Time" value="28h 15m" color="text-purple-400" />
          </div>

          <Card className="glass border-white/10 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-headline text-xl">CURRENT PATH: ML BASICS</CardTitle>
              <Badge variant="secondary" className="bg-primary/20 text-primary">60% COMPLETE</Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={60} className="h-4 bg-white/5" />
              <div className="space-y-4">
                <p className="text-sm font-bold text-muted-foreground tracking-widest uppercase">LAST COMPLETED</p>
                <div className="flex items-center justify-between p-4 glass rounded-xl border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center">
                      <Target size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Supervised Learning Quiz</p>
                      <p className="text-[10px] text-muted-foreground">Completed 2 hours ago • Score: 85%</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">REVIEW</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendation */}
          <Card className="relative overflow-hidden border-none shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-secondary/30" />
            <div className="absolute inset-0 glass" />
            <CardContent className="relative p-8 flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                <Zap size={48} className="text-primary animate-pulse-glow" />
              </div>
              <div className="flex-grow space-y-3 text-center md:text-left">
                <p className="text-xs font-bold text-primary tracking-[0.2em] uppercase">AI NEXT STEP RECOMMENDATION</p>
                {recommendation ? (
                  <>
                    <h3 className="text-3xl font-headline font-bold">NEXT: {recommendation.recommendedTopic}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                      {recommendation.reason}
                    </p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                      <Button className="btn-neon-primary px-8 group font-headline">
                        START NOW <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                      <Badge className="bg-white/10 px-4 py-2 uppercase tracking-wider">{recommendation.recommendationType}</Badge>
                    </div>
                  </>
                ) : (
                  <div className="animate-pulse space-y-2">
                    <div className="h-8 bg-white/10 rounded w-1/2" />
                    <div className="h-4 bg-white/10 rounded w-full" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) {
  return (
    <Card className="glass border-white/10 p-6 space-y-2">
      <div className={`p-2 w-fit rounded-lg bg-white/5 ${color}`}>
        <Icon size={20} />
      </div>
      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">{label}</p>
      <p className="text-3xl font-headline font-bold">{value}</p>
    </Card>
  );
}