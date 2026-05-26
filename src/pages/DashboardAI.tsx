import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Loader2, Plus } from 'lucide-react';
import { api } from '@/context/AuthContext';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const suggestedPrompts = [
  'Explain ISO 9001 requirements',
  'ESG strategy for manufacturing',
  'Governance framework for family business',
  'Risk assessment methodology',
  'ISO 45001 implementation steps',
  'Sustainability reporting standards',
];

export default function DashboardAI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatId, setChatId] = useState<string | undefined>();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', content: messageText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/ai/chat', { chatId, message: messageText });
      if (data.data?.chatId) setChatId(data.data.chatId);
      const aiMsg: Message = { role: 'assistant', content: data.data?.response || 'I apologize, I could not process your request.', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const aiMsg: Message = { role: 'assistant', content: 'I apologize, the AI service is currently unavailable. Please try again later.', timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } finally { setIsLoading(false); }
  };

  const newChat = () => { setMessages([]); setChatId(undefined); };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-140px)]">
        {/* Chat Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-light flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">AI Consulting Assistant</h3>
              <p className="text-xs text-slate-500">Powered by AI • Ask me anything about consulting</p>
            </div>
          </div>
          <button onClick={newChat} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors">
            <Plus className="w-4 h-4" /> New Chat
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-slate-200 p-4 mb-4 space-y-4">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-light flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-emerald" />
              </div>
              <h4 className="text-lg font-semibold text-slate-700 mb-2">How can I help you today?</h4>
              <p className="text-sm text-slate-500 max-w-md mb-6">Ask me about ISO standards, ESG frameworks, corporate governance, risk management, or business transformation.</p>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg">
                {suggestedPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 rounded-full text-sm hover:bg-emerald-light hover:text-emerald transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                msg.role === 'user'
                  ? 'bg-emerald text-white rounded-br-md'
                  : 'bg-slate-100 text-slate-800 rounded-bl-md'
              }`}>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                <span className={`text-[10px] mt-1 block ${msg.role === 'user' ? 'text-white/60' : 'text-slate-400'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-5 py-4">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce animation-delay-200" />
                  <div className="w-2 h-2 rounded-full bg-slate-400 animate-bounce animation-delay-400" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask about ISO, ESG, governance..."
            rows={1}
            className="flex-1 min-h-[48px] max-h-32 px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald focus:ring-2 focus:ring-emerald/10 outline-none resize-none transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            className="h-12 w-12 bg-emerald text-white rounded-xl flex items-center justify-center hover:bg-emerald-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all flex-shrink-0"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
