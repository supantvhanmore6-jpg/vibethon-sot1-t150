"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Car, Hospital, Mail, Scan, Wheat, Play, Info } from 'lucide-react';
import { aiSpamDetectorSimulation } from '@/ai/flows/ai-spam-detector-simulation';

export default function SimulationsPage() {
  const [spamInput, setSpamInput] = useState('');
  const [spamResult, setSpamResult] = useState<{ status: string, explanation: string } | null>(null);
  const [isSpamLoading, setIsSpamLoading] = useState(false);

  const checkSpam = async () => {
    if (!spamInput) return;
    setIsSpamLoading(true);
    try {
      const res = await aiSpamDetectorSimulation({ message: spamInput });
      setSpamResult({ status: res.classification, explanation: res.explanation });
    } catch (e) {
      setSpamResult({ status: 'Error', explanation: 'Failed to simulate.' });
    } finally {
      setIsSpamLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-16">
        <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">AI SIMULATIONS</h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          Interact with practical applications of artificial intelligence in real-world environments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Simulation 1: Self Driving */}
        <Card className="glass overflow-hidden border-white/10 group">
          <div className="h-48 relative overflow-hidden bg-black">
            <img 
              src="https://picsum.photos/seed/car-sim/800/400" 
              className="w-full h-full object-cover opacity-60"
              alt="Self Driving Car"
              data-ai-hint="Self driving car dashboard"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-primary rounded-full animate-pulse-glow flex items-center justify-center">
                <Car size={48} className="text-primary" />
              </div>
            </div>
            <Badge className="absolute top-4 left-4 btn-neon-primary">LIVE SIMULATION</Badge>
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2">
              Autonomous Navigation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">Adjust environmental variables to see how the car's computer vision reacts.</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Weather Intensity (Rain/Snow)</span>
                  <span className="text-primary">40%</span>
                </div>
                <Slider defaultValue={[40]} max={100} step={1} className="py-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span>Obstacle Density</span>
                  <span className="text-primary">15%</span>
                </div>
                <Slider defaultValue={[15]} max={100} step={1} className="py-2" />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs flex gap-3">
              <Info className="text-primary shrink-0" size={16} />
              <p>AI Status: <span className="text-green-400 font-bold">DRIVING SAFELY</span>. Obstacle detected in 45m. Decelerating smoothly.</p>
            </div>
          </CardContent>
        </Card>

        {/* Simulation 2: Spam Detector */}
        <Card className="glass overflow-hidden border-white/10">
          <div className="h-48 relative overflow-hidden bg-gradient-to-br from-indigo-900 to-background">
             <div className="absolute inset-0 flex items-center justify-center">
               <Mail size={80} className="text-white/20 animate-float" />
             </div>
             <Badge className="absolute top-4 left-4 bg-secondary">INTELLIGENT FILTER</Badge>
          </div>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Neural Spam Guard</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Type a suspicious message below to see if the AI classifies it as malicious.</p>
            <div className="flex gap-2">
              <Input 
                value={spamInput}
                onChange={(e) => setSpamInput(e.target.value)}
                placeholder="Win $1,000,000 now! Click here..." 
                className="bg-white/5 border-white/10"
              />
              <Button onClick={checkSpam} className="btn-neon-secondary" disabled={isSpamLoading}>
                {isSpamLoading ? 'Scanning...' : 'ANALYZE'}
              </Button>
            </div>
            {spamResult && (
              <div className={`p-4 rounded-xl border animate-in fade-in slide-in-from-top-4 ${
                spamResult.status === 'Spam' ? 'bg-destructive/10 border-destructive/30' : 'bg-green-500/10 border-green-500/30'
              }`}>
                <p className="font-headline font-bold mb-1">
                  CLASSIFICATION: <span className={spamResult.status === 'Spam' ? 'text-destructive' : 'text-green-400'}>{spamResult.status.toUpperCase()}</span>
                </p>
                <p className="text-xs text-muted-foreground">{spamResult.explanation}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Other simulations placeholders */}
        <SimulationSmallCard icon={Hospital} title="Smart Hospital" tags={['Medical AI', 'Diagnosis']} />
        <SimulationSmallCard icon={Scan} title="Facial Recognition" tags={['Vision', 'Emotion']} />
        <SimulationSmallCard icon={Wheat} title="Crop Prediction" tags={['Agri-Tech', 'Sustainability']} />
      </div>
    </div>
  );
}

function SimulationSmallCard({ icon: Icon, title, tags }: { icon: any, title: string, tags: string[] }) {
  return (
    <Card className="glass border-white/10 p-6 flex items-center justify-between hover:border-primary/50 transition-all cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-2xl glass border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
          <Icon size={32} />
        </div>
        <div>
          <h3 className="font-headline text-xl mb-1">{title}</h3>
          <div className="flex gap-2">
            {tags.map(t => <span key={t} className="text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">{t}</span>)}
          </div>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full"><Play size={20} className="fill-current" /></Button>
    </Card>
  );
}