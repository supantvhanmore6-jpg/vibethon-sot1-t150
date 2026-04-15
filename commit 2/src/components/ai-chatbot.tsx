"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Send, X, Bot, Loader2 } from 'lucide-react';
import { aiChatbotAssistant } from '@/ai/flows/ai-chatbot-assistant-flow';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your AIML Quest assistant. How can I help you master AI today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const response = await aiChatbotAssistant(userMsg);
      setMessages(prev => [...prev, { role: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Sorry, I encountered an error. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] glass rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/20 animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="p-4 bg-primary/20 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary rounded-lg text-primary-foreground">
                <Bot size={20} />
              </div>
              <span className="font-headline text-sm font-bold">QUEST ASSISTANT</span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-secondary text-white rounded-tr-none' 
                    : 'bg-white/10 text-white rounded-tl-none border border-white/5'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none border border-white/5">
                  <Loader2 className="animate-spin text-primary" size={16} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 flex gap-2">
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about AIML..."
              className="bg-white/5 border-white/10"
            />
            <Button size="icon" className="btn-neon-primary shrink-0" onClick={handleSend} disabled={isLoading}>
              <Send size={18} />
            </Button>
          </div>
        </div>
      ) : (
        <Button 
          size="icon" 
          className="w-14 h-14 rounded-full btn-neon-primary shadow-xl"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare size={24} />
        </Button>
      )}
    </div>
  );
}