"use client";

import { useEffect, useState } from 'react';
import { Brain, Code, Database, Network, Bot, Zap } from 'lucide-react';

const icons = [Brain, Code, Database, Network, Bot, Zap];

export default function BackgroundParticles() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
      {/* Radial Gradient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      {/* Floating Icons */}
      {[...Array(12)].map((_, i) => {
        const Icon = icons[i % icons.length];
        return (
          <div
            key={i}
            className="absolute animate-float opacity-5 text-white"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${10 + Math.random() * 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              transform: `scale(${0.5 + Math.random() * 1.5})`,
            }}
          >
            <Icon size={48} />
          </div>
        );
      })}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
    </div>
  );
}