import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, CheckCircle, Lock, ChevronRight, ChevronLeft, FileText, Video, Download, BookOpen, Clock, Award, AlertCircle } from 'lucide-react';
import { courseVideos, standardIntroVideos } from '@/data/courseVideos';

interface Slide {
  title: string;
  bullets: string[];
  image?: string;
}

interface Module {
  id: number;
  title: string;
  duration: string;
  slides: Slide[];
  hasVideo: boolean;
  hasQuiz: boolean;
  completed: boolean;
}

interface CourseViewerProps {
  courseId: string;
  modules: Module[];
  onComplete: () => void;
  onProgress: (percent: number) => void;
}

export default function CourseViewer({ courseId, modules, onComplete, onProgress }: CourseViewerProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [completedModules, setCompletedModules] = useState<Set<number>>(new Set());
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const module = modules[currentModule];
  const slide = module?.slides?.[currentSlide];
  const videos = courseVideos[courseId] || [];
  const introVideo = standardIntroVideos[courseId];

  // Auto-advance slides when playing
  useEffect(() => {
    if (isPlaying && slide) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => {
          if (prev < (module.slides?.length || 0) - 1) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 8000);
      timerRef.current = interval;
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, currentModule, module.slides?.length]);

  // Report progress
  useEffect(() => {
    const totalSlides = modules.reduce((sum, m) => sum + (m.slides?.length || 0), 0);
    let viewedSlides = 0;
    for (let i = 0; i < currentModule; i++) viewedSlides += modules[i].slides?.length || 0;
    viewedSlides += currentSlide + 1;
    onProgress(Math.min(100, Math.round((viewedSlides / totalSlides) * 100)));
  }, [currentModule, currentSlide, modules, onProgress]);

  const handleModuleComplete = () => {
    const newCompleted = new Set(completedModules);
    newCompleted.add(currentModule);
    setCompletedModules(newCompleted);
    if (newCompleted.size === modules.length) onComplete();
  };

  const handleNext = () => {
    if (currentSlide < (module.slides?.length || 0) - 1) {
      setCurrentSlide(currentSlide + 1);
    } else if (module.hasQuiz) {
      setShowQuiz(true);
    } else {
      handleModuleComplete();
      if (currentModule < modules.length - 1) {
        setCurrentModule(currentModule + 1);
        setCurrentSlide(0);
      }
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
    else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentSlide(Math.max(0, (modules[currentModule - 1].slides?.length || 1) - 1));
    }
  };

  const handleQuizSubmit = () => {
    setShowQuiz(false);
    handleModuleComplete();
    if (currentModule < modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentSlide(0);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Top Bar */}
      <div className="bg-navy px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-emerald text-sm font-semibold">Module {currentModule + 1} of {modules.length}</span>
          <span className="text-white/40">|</span>
          <span className="text-white text-sm">{module.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <span className="text-slate-400 text-xs">{module.duration}</span>
          {completedModules.has(currentModule) && <CheckCircle className="w-4 h-4 text-emerald" />}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-0">
        {/* Slide Viewer */}
        <div className="lg:col-span-2 bg-slate-50 min-h-[450px] flex flex-col">
          {/* Video Section (YouTube Embed) */}
          {module.hasVideo && introVideo && (
            <div className="bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${introVideo.youtubeId}`}
                title={introVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {/* Slide Content */}
          <AnimatePresence mode="wait">
            {slide && (
              <motion.div
                key={`${currentModule}-${currentSlide}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 p-8 flex flex-col justify-center"
              >
                <h3 className="text-2xl font-bold text-navy mb-6">{slide.title}</h3>
                <ul className="space-y-3">
                  {slide.bullets.map((bullet, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-3 text-slate-700 text-base"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald/10 text-emerald flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {bullet}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quiz Modal */}
          <AnimatePresence>
            {showQuiz && module.hasQuiz && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white z-20 p-8 flex flex-col justify-center"
              >
                <h3 className="text-xl font-bold text-navy mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-emerald" /> Module Quiz
                </h3>
                <p className="text-slate-600 mb-6">Answer the following questions to complete this module:</p>
                {[
                  { q: 'What is the primary purpose of this standard?', options: ['Quality improvement', 'Certification only', 'Marketing advantage', 'Legal compliance'] },
                  { q: 'Who is responsible for the management system?', options: ['Top management', 'Quality manager only', 'All employees', 'External consultant'] },
                  { q: 'What does PDCA stand for?', options: ['Plan-Do-Check-Act', 'Process-Design-Control-Audit', 'Policy-Document-Check-Approve', 'Plan-Deploy-Control-Assess'] },
                ].map((question, qi) => (
                  <div key={qi} className="mb-4 p-4 bg-slate-50 rounded-xl">
                    <p className="font-medium text-slate-800 mb-3">{qi + 1}. {question.q}</p>
                    <div className="space-y-2">
                      {question.options.map((opt, oi) => (
                        <label key={oi} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={`q-${qi}`}
                            value={opt}
                            onChange={(e) => setQuizAnswers({ ...quizAnswers, [qi]: e.target.value })}
                            className="text-emerald"
                          />
                          <span className="text-sm text-slate-600">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={handleQuizSubmit}
                  className="mt-4 px-6 py-3 bg-navy text-white rounded-xl font-semibold hover:bg-navy-light transition-colors"
                >
                  Submit & Continue
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="p-4 border-t border-slate-200 bg-white flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentModule === 0 && currentSlide === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-navy disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 bg-navy text-white rounded-lg hover:bg-navy-light transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <span className="text-xs text-slate-400">
                Slide {currentSlide + 1} of {module.slides?.length || 0}
              </span>
            </div>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-emerald text-white rounded-lg text-sm font-medium hover:bg-emerald-dark transition-colors"
            >
              {currentSlide < (module.slides?.length || 0) - 1 ? 'Next' : module.hasQuiz ? 'Take Quiz' : 'Next Module'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="border-l border-slate-200 bg-white">
          {/* Progress */}
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-slate-700">Course Progress</span>
              <span className="text-sm text-emerald font-bold">{Math.round((completedModules.size / modules.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald rounded-full transition-all" style={{ width: `${(completedModules.size / modules.length) * 100}%` }} />
            </div>
          </div>

          {/* Module List */}
          <div className="max-h-[400px] overflow-y-auto">
            {modules.map((mod, i) => (
              <button
                key={i}
                onClick={() => { setCurrentModule(i); setCurrentSlide(0); setShowQuiz(false); }}
                className={`w-full text-left p-3 border-b border-slate-50 transition-colors flex items-start gap-3 ${
                  i === currentModule ? 'bg-emerald/5 border-l-4 border-l-emerald' : 'hover:bg-slate-50'
                }`}
              >
                <div className="mt-0.5">
                  {completedModules.has(i) ? (
                    <CheckCircle className="w-5 h-5 text-emerald" />
                  ) : i === currentModule ? (
                    <Play className="w-5 h-5 text-emerald" />
                  ) : (
                    <Lock className="w-5 h-5 text-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${i === currentModule ? 'text-emerald' : 'text-slate-700'}`}>
                    {mod.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {mod.duration}</span>
                    {mod.hasVideo && <span className="text-xs text-blue-500 flex items-center gap-1"><Video className="w-3 h-3" /> Video</span>}
                    {mod.hasQuiz && <span className="text-xs text-amber-500 flex items-center gap-1"><Award className="w-3 h-3" /> Quiz</span>}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Resources */}
          <div className="p-4 border-t border-slate-100">
            <h4 className="text-sm font-semibold text-slate-700 mb-3">Resources</h4>
            <div className="space-y-2">
              {videos.length > 0 && (
                <a href={`https://www.youtube.com/watch?v=${videos[0].youtubeId}`} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs text-slate-600 hover:text-navy transition-colors">
                  <Video className="w-4 h-4 text-red-500" /> Watch on YouTube
                </a>
              )}
              <button className="flex items-center gap-2 text-xs text-slate-600 hover:text-navy transition-colors w-full">
                <FileText className="w-4 h-4 text-blue-500" /> Download PDF Manual
              </button>
              <button className="flex items-center gap-2 text-xs text-slate-600 hover:text-navy transition-colors w-full">
                <BookOpen className="w-4 h-4 text-emerald" /> Study Guide
              </button>
              <button className="flex items-center gap-2 text-xs text-slate-600 hover:text-navy transition-colors w-full">
                <Download className="w-4 h-4 text-slate-400" /> Audit Checklist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
