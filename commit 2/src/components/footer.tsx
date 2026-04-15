import Link from 'next/link';
import { Cpu, Github, Twitter, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full glass border-t border-white/10 py-12 mt-20 relative z-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-primary" />
            <span className="font-headline font-bold text-xl tracking-tighter">
              AIML QUEST
            </span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The ultimate futuristic learning platform for mastering Artificial Intelligence and Machine Learning through immersive experiences.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="p-2 glass rounded-full hover:text-primary transition-colors"><Twitter size={18} /></Link>
            <Link href="#" className="p-2 glass rounded-full hover:text-primary transition-colors"><Github size={18} /></Link>
            <Link href="#" className="p-2 glass rounded-full hover:text-primary transition-colors"><Linkedin size={18} /></Link>
          </div>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold mb-6 tracking-wider">LEARNING PATHS</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/learn" className="hover:text-primary transition-colors">Beginner Foundations</Link></li>
            <li><Link href="/learn" className="hover:text-primary transition-colors">Intermediate ML</Link></li>
            <li><Link href="/learn" className="hover:text-primary transition-colors">Advanced Deep Learning</Link></li>
            <li><Link href="/practice" className="hover:text-primary transition-colors">Coding Challenges</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold mb-6 tracking-wider">RESOURCES</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link href="/simulations" className="hover:text-primary transition-colors">Simulations</Link></li>
            <li><Link href="/games" className="hover:text-primary transition-colors">Mini Games</Link></li>
            <li><Link href="/quiz-arena" className="hover:text-primary transition-colors">Quiz Arena</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">Community Forum</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-sm font-bold mb-6 tracking-wider">CONTACT</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail size={16} /> support@aimlquest.ai</li>
            <li className="text-xs">Silicon Valley, CA, Earth</li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} AIML QUEST. ALL RIGHTS RESERVED BY CYBERNETIC EDUCATION INC.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-white">Privacy Policy</Link>
          <Link href="#" className="hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}