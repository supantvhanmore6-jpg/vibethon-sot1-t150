import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cpu, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Learn', href: '/learn' },
  { name: 'Practice', href: '/practice' },
  { name: 'Games', href: '/games' },
  { name: 'Simulations', href: '/simulations' },
  { name: 'Quiz Arena', href: '/quiz-arena' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'About', href: '/about' },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors duration-300">
            <Cpu className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tighter bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            AIML QUEST
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Button variant="outline" className="btn-neon-primary border-primary/50 hover:bg-primary hover:text-primary-foreground">
            Sign In
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background/95 glass border-l border-white/10">
              <div className="flex flex-col gap-6 mt-10">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-lg font-medium hover:text-primary transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button className="btn-neon-primary w-full mt-4">
                  Sign In
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}