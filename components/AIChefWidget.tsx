import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, ChefHat, Sparkles } from 'lucide-react';
import { ChatMessage } from '../types';
import { getChefResponse } from '../services/geminiService';

interface AIChefWidgetProps {
  initialQuery?: string;
  onClearInitialQuery: () => void;
}

const AIChefWidget: React.FC<AIChefWidgetProps> = ({ initialQuery, onClearInitialQuery }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Bon appétit! I am your AI Concierge. How may I assist you with the menu today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle opening and pre-filling if initialQuery is provided from parent
  useEffect(() => {
    if (initialQuery) {
      if (!isOpen) setIsOpen(true);
      setInputValue(`Tell me more about the ${initialQuery}`);
      onClearInitialQuery(); // Reset so it doesn't loop
    }
  }, [initialQuery, isOpen, onClearInitialQuery]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userText = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newMessages = [
      ...messages,
      { id: Date.now().toString(), role: 'user' as const, text: userText }
    ];
    setMessages(newMessages);
    setIsLoading(true);

    // Get API response
    // Transform chat history for the service
    const historyForService = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const aiText = await getChefResponse(userText, historyForService);

    setMessages(prev => [
      ...prev,
      { id: (Date.now() + 1).toString(), role: 'model', text: aiText }
    ]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 group ${
          isOpen ? 'bg-secondary text-white rotate-90' : 'bg-gold-500 text-black hover:bg-gold-400 hover:scale-105'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} className="fill-current" />}
        {!isOpen && (
            <span className="hidden group-hover:block text-sm font-bold whitespace-nowrap pr-1 animate-fade-in">
                Ask Chef
            </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 w-[90vw] md:w-96 max-h-[60vh] h-[500px] bg-secondary border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-40 animate-slide-up">
          {/* Header */}
          <div className="bg-primary/50 p-4 border-b border-white/5 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center border border-gold-500/20">
              <ChefHat size={20} className="text-gold-500" />
            </div>
            <div>
              <h3 className="text-white font-serif font-bold">AI Concierge</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gold-600 text-black rounded-tr-sm font-medium'
                      : 'bg-white/5 text-gray-200 rounded-tl-sm border border-white/5'
                  }`}
                >
                  {msg.role === 'model' && (
                     <div className="mb-1 opacity-50 text-[10px] uppercase tracking-wider font-bold">
                        Lumière Bot
                     </div>
                  )}
                  {msg.text.split('\n').map((line, i) => (
                    <p key={i} className="mb-1 last:mb-0">{line}</p>
                  ))}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/5 rounded-2xl p-4 rounded-tl-sm flex gap-1 items-center">
                  <Sparkles size={16} className="text-gold-400 animate-spin" />
                  <span className="text-xs text-gray-400">Chef is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 bg-primary/30 border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask for recommendations..."
                className="w-full bg-black/20 text-white border border-white/10 rounded-full py-3 pl-4 pr-12 focus:outline-none focus:border-gold-500/50 focus:ring-1 focus:ring-gold-500/50 transition-all placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputValue.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gold-500 text-black rounded-full hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChefWidget;