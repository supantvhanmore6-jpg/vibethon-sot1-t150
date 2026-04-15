import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  Play, 
  Rocket, 
  Brain, 
  Code, 
  Gamepad2, 
  Cpu, 
  Target, 
  BarChart3,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
        <div className="flex-1 space-y-8 animate-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Next-Gen Learning
          </div>
          
          <h1 className="text-4xl md:text-7xl font-headline font-black leading-tight">
            Learn <span className="animated-gradient-text">Artificial Intelligence</span> Through Immersive Play
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Master AIML concepts with interactive lessons, coding playgrounds, mini-games, and real-world simulations. The future is yours to build.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link href="/learn">
              <Button size="lg" className="btn-neon-primary px-8 h-14 font-headline text-lg group">
                START LEARNING <Rocket className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="h-14 glass border-white/20 hover:bg-white/10 px-8 font-headline">
              WATCH DEMO <Play className="ml-2 fill-current" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex-1 relative animate-in zoom-in duration-1000">
          <div className="relative z-10 w-full max-w-[500px] mx-auto">
            <img 
              src="https://picsum.photos/seed/ai-brain/600/600" 
              alt="AI Neural Network Illustration" 
              className="rounded-3xl shadow-2xl neon-glow-primary border border-white/10"
              data-ai-hint="Neural Network brain futuristic"
            />
            {/* Floating stats card over hero image */}
            <div className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl border-white/20 shadow-2xl animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <Target className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Course Progress</p>
                  <p className="font-headline font-bold">87% COMPLETED</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Background glows behind image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary/20 blur-[100px] rounded-full -z-10" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-headline font-bold">CORE PLATFORM FEATURES</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Explore our specialized modules designed for comprehensive AI mastery.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <Link key={i} href={feature.href}>
              <Card className="glass h-full group hover:border-primary/50 transition-all duration-300 cursor-pointer hover:-translate-y-2">
                <CardHeader className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${feature.color} text-white shadow-lg`}>
                    <feature.icon size={24} />
                  </div>
                  <CardTitle className="font-headline group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  <CardDescription className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="flex items-center text-xs font-bold text-primary group-hover:gap-2 transition-all">
                    EXPLORE MODULE <ChevronRight size={14} />
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

const FEATURES = [
  {
    title: 'Interactive Lessons',
    description: 'Learn the fundamentals with modular, visual explanations that make complex math easy to grasp.',
    icon: Brain,
    color: 'from-blue-500 to-cyan-400',
    href: '/learn'
  },
  {
    title: 'Coding Playground',
    description: 'Write Python-style pseudocode and train actual models in our secure, browser-based editor.',
    icon: Code,
    color: 'from-emerald-500 to-teal-400',
    href: '/practice'
  },
  {
    title: 'Mini Games',
    description: 'Gamified labs that teach classification, regression, and pattern recognition through play.',
    icon: Gamepad2,
    color: 'from-violet-500 to-purple-400',
    href: '/games'
  },
  {
    title: 'AI Simulations',
    description: 'Witness AI in action through self-driving cars, medical diagnosis, and object detection sims.',
    icon: Cpu,
    color: 'from-rose-500 to-pink-400',
    href: '/simulations'
  },
  {
    title: 'Quiz Arena',
    description: 'Compete with others and test your knowledge in timed battles and leaderboard challenges.',
    icon: Target,
    color: 'from-orange-500 to-amber-400',
    href: '/quiz-arena'
  },
  {
    title: 'Progress Tracker',
    description: 'Monitor your XP, level up your profile, and earn certificates as you master new skills.',
    icon: BarChart3,
    color: 'from-indigo-500 to-blue-400',
    href: '/dashboard'
  }
];