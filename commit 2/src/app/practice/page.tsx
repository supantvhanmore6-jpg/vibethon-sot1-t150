"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, RotateCcw, Lightbulb, Code, Filter, Database, Search } from 'lucide-react';
import { aiCodingHintGenerator } from '@/ai/flows/ai-coding-hint-generator';

export default function PracticePage() {
  const [code, setCode] = useState(INITIAL_CODE);
  const [output, setOutput] = useState('');
  const [hint, setHint] = useState<string | null>(null);
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  const runCode = () => {
    setOutput('Training model...\nAccuracy: 92.4%\nPrediction: "Spam"\nStatus: Model validation successful.');
  };

  const getHint = async () => {
    setIsLoadingHint(true);
    try {
      const res = await aiCodingHintGenerator({
        problemDescription: 'Build a simple spam detector using a threshold-based word counter.',
        userCode: code,
        difficulty: 'medium'
      });
      setHint(res.hint);
    } catch (e) {
      setHint('Try looking at how word frequencies are calculated.');
    } finally {
      setIsLoadingHint(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4">CODING PLAYGROUND</h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Experiment with machine learning scripts and build pipelines in our browser-based IDE.
          </p>
        </div>
        <div className="flex gap-4">
          <Badge className="bg-primary/20 text-primary border-primary/50 py-1 px-4">PYTHON PSEUDOCODE</Badge>
          <Badge className="bg-white/10 text-white py-1 px-4">SCIKIT-LEARN READY</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Editor and Output */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-2xl overflow-hidden border-white/20">
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code size={18} className="text-primary" />
                <span className="font-code text-sm">main.py</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={getHint} disabled={isLoadingHint}>
                  <Lightbulb size={16} className="mr-2" /> HINT
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setCode(INITIAL_CODE)}>
                  <RotateCcw size={16} className="mr-2" /> RESET
                </Button>
                <Button size="sm" className="btn-neon-primary" onClick={runCode}>
                  <Play size={16} className="mr-2 fill-current" /> RUN CODE
                </Button>
              </div>
            </div>
            
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-80 bg-background/50 p-6 font-code text-sm outline-none resize-none text-cyan-300"
              spellCheck="false"
            />
          </div>

          <div className="glass rounded-2xl overflow-hidden border-white/20">
            <div className="p-3 bg-white/5 border-b border-white/10 flex items-center gap-2">
              <span className="text-xs font-bold tracking-widest text-muted-foreground">TERMINAL OUTPUT</span>
            </div>
            <div className="p-6 h-32 font-code text-sm text-white/80 overflow-y-auto whitespace-pre">
              {output || 'Click "Run Code" to see results...'}
            </div>
          </div>

          {hint && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 text-sm animate-in fade-in slide-in-from-top-2">
              <p className="font-bold text-primary mb-1">AI HINT:</p>
              {hint}
            </div>
          )}
        </div>

        {/* Sidebar: Challenges & Libraries */}
        <div className="space-y-8">
          <Card className="glass border-white/10">
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-lg flex items-center gap-2">
                <Filter size={18} /> CHALLENGES
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {CHALLENGES.map((ch, i) => (
                <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:border-primary/30 cursor-pointer transition-colors group">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-bold text-sm group-hover:text-primary transition-colors">{ch.title}</p>
                    <Badge variant="outline" className="text-[10px] py-0">{ch.diff}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground">{ch.desc}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            {LIBS.map((lib, i) => (
              <div key={i} className="glass p-4 rounded-xl text-center border-white/10 hover:border-secondary transition-colors cursor-help">
                <p className="font-headline text-xs font-bold text-secondary mb-1">{lib.name}</p>
                <p className="text-[9px] text-muted-foreground uppercase">{lib.role}</p>
              </div>
            ))}
          </div>

          <Card className="glass border-white/10 bg-secondary/5">
            <CardHeader>
              <CardTitle className="font-headline text-lg flex items-center gap-2">
                <Database size={18} /> ML PIPELINE BUILDER
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <div className="p-3 border-2 border-dashed border-white/20 rounded-xl text-center text-xs text-muted-foreground hover:border-primary transition-colors cursor-pointer">
                Drag dataset here...
              </div>
              <div className="text-center">↓</div>
              <div className="p-3 border-2 border-dashed border-white/20 rounded-xl text-center text-xs text-muted-foreground">
                Select Algorithm
              </div>
              <div className="text-center">↓</div>
              <Button size="sm" variant="outline" className="glass w-full text-[10px] font-headline">START TRAINING</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

const INITIAL_CODE = `# Spam Detector Implementation
import aiml_quest as aq

# Load sample dataset
data = aq.load_dataset('emails_v1')

def classify_email(text):
    spam_words = ['free', 'win', 'cash', 'urgent', 'winner']
    count = 0
    for word in text.lower().split():
        if word in spam_words:
            count += 1
    
    # Threshold classification
    return "Spam" if count > 2 else "Not Spam"

# Run validation
results = aq.validate(classify_email, data)
print(results.summary())`;

const CHALLENGES = [
  { title: 'Spam Detector', diff: 'EASY', desc: 'Identify phishing emails using simple keywords.' },
  { title: 'House Price Predictor', diff: 'MEDIUM', desc: 'Use linear regression to estimate market value.' },
  { title: 'Sentiment Analysis', diff: 'MEDIUM', desc: 'Analyze movie reviews for positive/negative tone.' },
  { title: 'Handwritten Digits', diff: 'HARD', desc: 'Train a basic neural net to recognize MNIST digits.' },
];

const LIBS = [
  { name: 'NumPy', role: 'Math Operations' },
  { name: 'Pandas', role: 'Data Frames' },
  { name: 'Matplotlib', role: 'Data Viz' },
  { name: 'Scikit-Learn', role: 'ML Models' },
];