import type {Metadata} from 'next';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import BackgroundParticles from '@/components/background-particles';
import AIChatbot from '@/components/ai-chatbot';

export const metadata: Metadata = {
  title: 'AIML Quest | Master Artificial Intelligence through Play',
  description: 'Learn Artificial Intelligence and Machine Learning through interactive games, coding challenges, and simulations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Orbitron:wght@400;500;600;700;800;900&family=Source+Code+Pro:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen relative overflow-x-hidden">
        <BackgroundParticles />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <AIChatbot />
      </body>
    </html>
  );
}