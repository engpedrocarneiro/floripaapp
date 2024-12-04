import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getChatResponse } from '../services/chatService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface PlanningAssistantProps {
  timeWindow: {
    start: Date;
    end: Date;
    type: 'pre' | 'post';
  };
  onSuggestActivity?: (activity: string, start: Date, end: Date) => void;
}

export function PlanningAssistant({ timeWindow, onSuggestActivity }: PlanningAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([{
    role: 'assistant',
    content: `Olá! Estou aqui para ajudar você a planejar suas atividades ${
      timeWindow.type === 'pre' ? 'antes' : 'depois'
    } do evento no Sapiens Parque. Você tem disponibilidade entre ${
      format(timeWindow.start, "HH'h'mm", { locale: ptBR })
    } e ${
      format(timeWindow.end, "HH'h'mm", { locale: ptBR })
    }. Como posso ajudar?`
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getChatResponse(
        [...messages, userMessage],
        timeWindow,
        { temperature: 24, condition: 'ensolarado' } // You can integrate with real weather data
      );
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Desculpe, ocorreu um erro. Tente novamente.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-dark-900 rounded-lg border border-dark-700 overflow-hidden h-full flex flex-col">
      <div className="p-4 border-b border-dark-700 flex items-center space-x-2">
        <Bot className="w-5 h-5 text-primary" />
        <div>
          <h2 className="text-lg font-semibold text-dark-50">Assistente de Planejamento</h2>
          <p className="text-sm text-dark-400">
            Ajudando você a organizar seu tempo em Florianópolis
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-dark-800 text-dark-50'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-dark-800 rounded-lg p-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-dark-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-dark-800 border-dark-700 text-dark-50 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-primary focus:border-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="button !py-2 !px-3 disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}