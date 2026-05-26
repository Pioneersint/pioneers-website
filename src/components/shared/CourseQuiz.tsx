import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, AlertCircle, ChevronRight } from 'lucide-react';
import type { CourseExam, QuizQuestion } from '@/lib/courseExams';
import { calculateScore } from '@/lib/courseExams';
import CompletionCertificate from './CompletionCertificate';

interface CourseQuizProps {
  exam: CourseExam;
  courseTitle: string;
  courseId: string;
}

export default function CourseQuiz({ exam, courseTitle, courseId }: CourseQuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [hasPassed, setHasPassed] = useState(false);

  const question: QuizQuestion = exam.questions[currentQ];
  const isAnswered = answers[question.id] !== undefined;
  const score = showResult ? finalScore : calculateScore(answers, exam.questions);
  const passed = showResult ? hasPassed : score >= exam.passingScore;
  const progress = ((currentQ + 1) / exam.questions.length) * 100;

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setAnswers(prev => ({ ...prev, [question.id]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQ < exam.questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      const final = calculateScore(answers, exam.questions);
      const didPass = final >= exam.passingScore;
      setFinalScore(final);
      setHasPassed(didPass);
      setShowResult(true);
      localStorage.setItem(`examResult_${courseId}`, JSON.stringify({ score: final, passed: didPass, date: new Date().toISOString() }));
    }
  };

  const handleRestart = () => {
    setCurrentQ(0); setAnswers({}); setShowResult(false);
    setSelectedOption(null); setShowExplanation(false); setFinalScore(0); setHasPassed(false);
    localStorage.removeItem(`examResult_${courseId}`);
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
      setSelectedOption(answers[exam.questions[currentQ - 1].id] ?? null);
      setShowExplanation(true);
    }
  };

  if (showResult) {
    return (
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className={`rounded-2xl p-8 text-center ${passed ? 'bg-emerald-light border-2 border-emerald' : 'bg-amber-light border-2 border-amber'}`}>
          {passed ? <Trophy className="w-16 h-16 text-emerald mx-auto mb-4" /> : <AlertCircle className="w-16 h-16 text-amber mx-auto mb-4" />}
          <h3 className="text-2xl font-bold text-slate-800 mb-2">{passed ? 'Congratulations! You Passed!' : 'Keep Learning!'}</h3>
          <p className="text-slate-600 mb-6">{passed ? `You scored ${score}% and met the passing requirement of ${exam.passingScore}%.` : `You scored ${score}%. You need ${exam.passingScore}% to pass.`}</p>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center"><div className={`text-4xl font-bold ${passed ? 'text-emerald' : 'text-amber'}`}>{score}%</div><div className="text-xs text-slate-500 mt-1">Your Score</div></div>
            <div className="w-px h-12 bg-slate-300" />
            <div className="text-center"><div className="text-4xl font-bold text-slate-700">{exam.passingScore}%</div><div className="text-xs text-slate-500 mt-1">Passing Score</div></div>
            <div className="w-px h-12 bg-slate-300" />
            <div className="text-center"><div className="text-4xl font-bold text-slate-700">{Object.values(answers).filter((a, i) => a === exam.questions[i].correctIndex).length}/{exam.questions.length}</div><div className="text-xs text-slate-500 mt-1">Correct</div></div>
          </div>
          <div className="flex items-center justify-center gap-3">
            <button onClick={handleRestart} className="flex items-center gap-2 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-full font-medium hover:bg-slate-50 transition-colors"><RotateCcw className="w-4 h-4" /> Retake Quiz</button>
          </div>
        </motion.div>

        <div className="space-y-3">
          <h4 className="font-semibold text-slate-800">Answer Review</h4>
          {exam.questions.map((q, i) => {
            const userAnswer = answers[q.id];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className={`border rounded-xl p-4 ${isCorrect ? 'border-emerald/30 bg-emerald-light' : 'border-red/20 bg-red-light'}`}>
                <div className="flex items-start gap-3">
                  {isCorrect ? <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
                  <div>
                    <p className="text-sm font-medium text-slate-800 mb-2">{q.question}</p>
                    <p className="text-xs text-slate-500">Your answer: <span className={isCorrect ? 'text-emerald font-medium' : 'text-red-500 font-medium'}>{q.options[userAnswer]}</span>{!isCorrect && <> | Correct: <span className="text-emerald font-medium">{q.options[q.correctIndex]}</span></>}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {passed && <CompletionCertificate studentName="Student" courseName={courseTitle} completionDate={new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} score={score} />}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-slate-500">Question {currentQ + 1} of {exam.questions.length}</span>
          <span className="text-slate-500">{Math.round(progress)}% Complete</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div className="h-full bg-emerald rounded-full" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-4">
            <h4 className="text-lg font-semibold text-slate-800 mb-4">{question.question}</h4>
            <div className="space-y-3">
              {question.options.map((option, i) => {
                const isSel = selectedOption === i;
                const isCorr = i === question.correctIndex;
                const showRes = isAnswered;
                let btnClass = 'border-slate-200 hover:border-emerald hover:bg-emerald-light';
                if (showRes && isCorr) btnClass = 'border-emerald bg-emerald-light';
                else if (showRes && isSel && !isCorr) btnClass = 'border-red-300 bg-red-50';
                else if (isSel) btnClass = 'border-emerald bg-emerald-light';
                return (
                  <button key={i} onClick={() => handleSelect(i)} disabled={isAnswered}
                    className={`w-full flex items-center gap-3 p-4 border rounded-xl text-left transition-all ${btnClass} ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${showRes && isCorr ? 'bg-emerald text-white' : showRes && isSel && !isCorr ? 'bg-red-500 text-white' : isSel ? 'bg-emerald text-white' : 'bg-slate-100 text-slate-600'}`}>
                      {showRes && isCorr ? <CheckCircle className="w-5 h-5" /> : showRes && isSel && !isCorr ? <XCircle className="w-5 h-5" /> : String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-slate-700">{option}</span>
                    {showRes && isCorr && <CheckCircle className="w-5 h-5 text-emerald ml-auto shrink-0" />}
                    {showRes && isSel && !isCorr && <XCircle className="w-5 h-5 text-red-500 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-5 mb-6 ${answers[question.id] === question.correctIndex ? 'bg-emerald-light border border-emerald/30' : 'bg-amber-light border border-amber/30'}`}>
              <div className="flex items-start gap-3">
                {answers[question.id] === question.correctIndex ? <CheckCircle className="w-5 h-5 text-emerald shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-amber shrink-0 mt-0.5" />}
                <div>
                  <p className={`text-sm font-medium ${answers[question.id] === question.correctIndex ? 'text-emerald' : 'text-amber'}`}>{answers[question.id] === question.correctIndex ? 'Correct!' : 'Incorrect'}</p>
                  <p className="text-sm text-slate-600 mt-1">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <button onClick={handlePrev} disabled={currentQ === 0}
              className="flex items-center gap-2 px-5 py-2.5 text-slate-500 text-sm font-medium hover:text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
              <ChevronRight className="w-4 h-4 rotate-180" /> Previous
            </button>
            <button onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-emerald text-white rounded-full text-sm font-medium hover:bg-emerald-dark transition-colors">
              {currentQ < exam.questions.length - 1 ? (<>Next <ArrowRight className="w-4 h-4" /></>) : 'Finish'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
