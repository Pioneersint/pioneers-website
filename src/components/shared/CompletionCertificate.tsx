import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, CheckCircle, Share2 } from 'lucide-react';

interface CompletionCertificateProps {
  studentName: string;
  courseName: string;
  completionDate: string;
  score: number;
}

export default function CompletionCertificate({ studentName, courseName, completionDate, score }: CompletionCertificateProps) {
  const certRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    // Simulate certificate download
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: `Certificate of Completion - ${courseName}`,
        text: `I successfully completed ${courseName} with a score of ${score}%!`,
        url: window.location.href,
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      <h4 className="font-semibold text-slate-800 flex items-center gap-2">
        <Award className="w-5 h-5 text-emerald" /> Your Certificate of Completion
      </h4>

      {/* Certificate Preview */}
      <div ref={certRef} className="relative bg-white border-4 border-emerald/20 rounded-2xl overflow-hidden">
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-emerald rounded-tl-2xl" />
        <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-emerald rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-emerald rounded-bl-2xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-emerald rounded-br-2xl" />

        <div className="relative z-10 p-8 md:p-12 text-center">
          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src="/assets/images/logo-main.png" alt="Pioneers" className="h-10 w-auto" />
            <span className="text-xs font-medium text-slate-500">PIONEERS INTERNATIONAL</span>
          </div>

          <Award className="w-16 h-16 text-emerald mx-auto mb-4" />

          <p className="text-caption uppercase tracking-widest text-slate-500 mb-2">Certificate of Completion</p>
          <p className="text-lg text-slate-700 mb-6">This certifies that</p>

          <h3 className="text-2xl md:text-3xl font-bold text-navy mb-3 font-serif">{studentName}</h3>

          <p className="text-slate-600 mb-4">has successfully completed</p>

          <h4 className="text-xl font-bold text-emerald mb-4">{courseName}</h4>

          <div className="flex items-center justify-center gap-2 text-emerald font-semibold mb-6">
            <CheckCircle className="w-5 h-5" />
            <span>Score: {score}%</span>
          </div>

          <p className="text-sm text-slate-500 mb-2">Completed on {completionDate}</p>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between max-w-xs mx-auto">
              <div className="text-center">
                <div className="text-sm font-medium text-slate-800">Dr. Ahmad Hassan</div>
                <div className="text-xs text-slate-500">Chief Examiner</div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-slate-800">ID: PI-{Date.now().toString(36).slice(-6).toUpperCase()}</div>
                <div className="text-xs text-slate-500">Certificate ID</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-center gap-3">
        <button onClick={handleDownload}
          className="flex items-center gap-2 px-6 py-3 bg-navy text-white rounded-full font-medium hover:bg-navy-light transition-colors">
          {downloaded ? <><CheckCircle className="w-4 h-4" /> Downloaded</> : <><Download className="w-4 h-4" /> Download Certificate</>}
        </button>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button onClick={handleShare}
            className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 rounded-full font-medium hover:bg-slate-50 transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
        )}
      </div>
    </motion.div>
  );
}
