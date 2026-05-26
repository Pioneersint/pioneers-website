import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '962781595846';
  const message = encodeURIComponent('Hello Pioneers International! I would like to inquire about your services.');
  const waUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a href={waUrl} target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform group"
      aria-label="Chat on WhatsApp">
      <MessageCircle className="w-7 h-7 text-white fill-white" />
      <span className="absolute left-full ml-3 px-3 py-1.5 bg-navy text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat on WhatsApp
      </span>
    </a>
  );
}
