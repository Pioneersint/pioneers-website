import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, User, Sparkles, Minimize } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  'iso 9001': 'ISO 9001:2015 is the world\'s most recognized Quality Management System standard. We offer complete Lead Auditor training (40 hours), implementation consulting, and certification support. Would you like to book a consultation?',
  'iso 14001': 'ISO 14001:2015 is the Environmental Management System standard. We provide Lead Auditor training, gap analysis, documentation, and certification support. Note: Updates for ISO 14001:2026 are coming soon!',
  'iso 45001': 'ISO 45001:2018 is the Occupational Health & Safety Management System standard. Our Lead Auditor course is 40 hours with Exemplar Global certification.',
  'iso 22000': 'ISO 22000:2018 is the Food Safety Management System standard. We offer Lead Auditor training and HACCP integration services.',
  'iso 27001': 'ISO 27001:2022 is the Information Security Management System standard. We provide Lead Auditor training, risk assessment, and implementation support.',
  'iso 21001': 'ISO 21001:2018 is the Educational Organizations Management System standard. We offer implementation and training services.',
  'iso 50001': 'ISO 50001:2018 is the Energy Management System standard. We provide implementation consulting and training programs.',
  'haccp': 'HACCP (Hazard Analysis Critical Control Points) is a food safety management system. We offer HACCP training and integration with ISO 22000.',
  'lead auditor': 'Our Lead Auditor courses are Exemplar Global certified, 40 hours each. Available for ISO 9001, 14001, 45001, 22000, 27001, 21001, 50001 & HACCP. Contact us via WhatsApp +962 7 8159 5846 for registration.',
  'price': 'Lead Auditor courses range from $499-$799 depending on the standard. Group discounts available for 3+ participants. Contact us for a custom quote.',
  'training': 'We offer Lead Auditor training (40 hours), Internal Auditor courses, Awareness training, and customized corporate programs. All courses are Exemplar Global certified.',
  'certificate': 'You can verify any certificate issued by Pioneers International at /verify-certificate. Just enter the certificate ID (e.g., ISOTQM002).',
  'contact': 'You can reach us at:\nWhatsApp: +962 7 8159 5846\nEmail: info@pioneersint.com\nAddress: Wadi Saqra, Kalbouneh Complex, Floor 4, Amman, Jordan',
  'esg': 'Our ESG Advisory services include strategy development, sustainability reporting (GRI, SASB, TCFD), materiality assessment, and stakeholder engagement.',
  'governance': 'We provide Corporate Governance framework design, board effectiveness programs, compliance management, and policy development aligned with OECD principles.',
  'location': 'Pioneers International is located at: Wadi Saqra, Kalbouneh Complex, Floor 4, Amman, Jordan. We serve clients across the entire MENA region.',
  'verification': 'Enter your certificate ID on our Verify Certificate page. All certificates issued by Pioneers International can be instantly verified online with the certificate image.',
  'consultation': 'You can book a free consultation through our Contact page or directly via WhatsApp at +962 7 8159 5846.',
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [keyword, response] of Object.entries(botResponses)) {
    if (lower.includes(keyword)) return response;
  }
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('مرحبا') || lower.includes('سلام')) {
    return 'Hello! Welcome to Pioneers International. I\'m your AI assistant. How can I help you today? You can ask me about ISO standards, Lead Auditor courses, ESG, governance, certificate verification, or pricing.';
  }
  if (lower.includes('thank')) {
    return 'You\'re welcome! Feel free to ask if you need anything else. You can also reach us on WhatsApp at +962 7 8159 5846 for direct assistance.';
  }
  if (lower.includes('ar') || lower.includes('arabic') || lower.includes('عربي') || lower.includes('العربية')) {
    return 'نعم! نحن ندعم اللغة العربية بالكامل. يمكنك التواصل معنا عبر الواتساب على +962 7 8159 5846 للحصول على الدعم باللغة العربية. نقدم دورات Lead Auditor واستشارات ISO باللغتين العربية والإنجليزية.';
  }
  return `Thank you for your message! For detailed information about "${input}", I recommend contacting our team directly via WhatsApp at +962 7 8159 5846 or email info@pioneersint.com. Our consultants will be happy to assist you with ISO standards, Lead Auditor courses, ESG advisory, and governance services.`;
}

export default function ChatbotAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: 'Hello! Welcome to Pioneers International. I\'m your AI assistant. Ask me about ISO standards, Lead Auditor courses, pricing, certificate verification, or any of our services!',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text: input.trim(), isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(userMsg.text),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-navy rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          aria-label="Open Chat">
          <Sparkles className="w-6 h-6 text-emerald" />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200">
            {/* Header */}
            <div className="bg-navy px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-emerald" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Pioneers AI Assistant</h4>
                  <span className="text-xs text-emerald flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald rounded-full" /> Online
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-white transition-colors">
                  <Minimize className="w-4 h-4" />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-2 ${msg.isBot ? '' : 'flex-row-reverse'}`}>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.isBot ? 'bg-emerald/10' : 'bg-navy'}`}>
                    {msg.isBot ? <Bot className="w-3.5 h-3.5 text-emerald" /> : <User className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${msg.isBot ? 'bg-slate-100 text-slate-700 rounded-tl-none' : 'bg-emerald text-white rounded-tr-none'}`}>
                    {msg.text.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald/10 flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-emerald" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            {messages.length <= 2 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {['ISO 9001 Lead Auditor', 'Course Prices', 'Verify Certificate', 'Contact Info'].map(s => (
                  <button key={s} onClick={() => { setInput(s); }}
                    className="text-xs bg-emerald-light text-emerald px-2.5 py-1 rounded-full hover:bg-emerald hover:text-white transition-colors">
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 py-3 border-t border-slate-200 flex items-center gap-2 shrink-0">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 h-10 px-4 bg-slate-100 rounded-full text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald/30" />
              <button onClick={handleSend} disabled={!input.trim()}
                className="w-10 h-10 bg-emerald rounded-full flex items-center justify-center hover:bg-emerald-dark transition-colors disabled:opacity-40 shrink-0">
                <Send className="w-4 h-4 text-white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
