import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, BookOpen, Star, Users, ChevronLeft, Lock, Check, Download, FileText, Award, BarChart3, HelpCircle, FileCheck, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { allCoursesData } from './LMS';
import { getExamForCourse } from '@/lib/courseExams';
import CourseQuiz from '@/components/shared/CourseQuiz';

type Tab = 'curriculum' | 'overview' | 'quiz' | 'progress';

// Local storage helpers for progress tracking
function getCourseProgress(courseId: string): Record<string, boolean> {
  try {
    const data = JSON.parse(localStorage.getItem(`courseProgress_${courseId}`) || '{}');
    return data;
  } catch { return {}; }
}
function setLessonCompleted(courseId: string, lessonIndex: number) {
  const current = getCourseProgress(courseId);
  current[lessonIndex] = true;
  localStorage.setItem(`courseProgress_${courseId}`, JSON.stringify(current));
}
function getExamResult(courseId: string): { score: number; passed: boolean; date: string } | null {
  try {
    return JSON.parse(localStorage.getItem(`examResult_${courseId}`) || 'null');
  } catch { return null; }
}

export default function CourseDetail() {
  const { t } = useTranslation();
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { items, addItem, removeItem } = useCart();
  const [activeTab, setActiveTab] = useState<Tab>('curriculum');
  const [activeLesson, setActiveLesson] = useState(0);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [lessonProgress, setLessonProgress] = useState<Record<string, boolean>>({});
  const inCart = items.some(i => i.id === courseId);

  const course = allCoursesData.find(c => c.id === courseId);
  const exam = courseId ? getExamForCourse(courseId) : undefined;
  const examResult = courseId ? getExamResult(courseId) : null;

  useEffect(() => {
    if (courseId) {
      const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
      setIsEnrolled(enrolledCourses.includes(courseId));
      setLessonProgress(getCourseProgress(courseId));
    }
  }, [courseId]);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 text-lg mb-4">Course not found</p>
          <button onClick={() => navigate('/lms')} className="text-emerald font-medium hover:underline">Back to Courses</button>
        </div>
      </div>
    );
  }

  const currentLesson = course.curriculum[activeLesson];
  const displayVideo = currentLesson?.video || course.video;
  const completedLessons = Object.values(lessonProgress).filter(Boolean).length;
  const totalLessons = course.curriculum.length;
  const courseProgressPercent = Math.round((completedLessons / totalLessons) * 100);

  const handleEnroll = () => {
    if (!course.isFree && course.price > 0) {
      // Navigate to checkout for paid courses
      navigate('/checkout', {
        state: {
          type: 'course',
          courseId: course.id,
          amount: course.price,
          description: course.title,
        }
      });
      return;
    }
    // Free course - just enroll
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolledCourses.includes(course.id)) {
      enrolledCourses.push(course.id);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    }
    setIsEnrolled(true);
  };

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'curriculum', label: t('lms.courseDetail.curriculum'), icon: BookOpen },
    { key: 'overview', label: t('lms.courseDetail.overview'), icon: FileText },
    ...(exam ? [{ key: 'quiz' as Tab, label: 'Final Exam', icon: HelpCircle }] : []),
    { key: 'progress', label: 'My Progress', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={() => navigate('/lms')} className="flex items-center gap-2 text-slate-600 hover:text-emerald transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-sm font-semibold text-slate-800 truncate max-w-md hidden sm:block">{course.title}</h1>
          <div className="flex items-center gap-3">
            {examResult && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${examResult.passed ? 'bg-emerald-light text-emerald' : 'bg-amber-light text-amber'}`}>
                <FileCheck className="w-3 h-3 inline mr-1" /> {examResult.score}%
              </span>
            )}
            <span className="text-xs text-slate-500 flex items-center gap-1"><Star className="w-3 h-3 fill-amber text-amber" />{course.rating}</span>
            <span className="text-xs text-slate-500 flex items-center gap-1"><Users className="w-3 h-3" />{course.students.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Professional Course Content Viewer */}
            <div className="bg-navy rounded-2xl overflow-hidden shadow-lg mb-6 relative">
              {displayVideo && displayVideo.includes('youtube.com') ? (
                /* Real YouTube Video Embed */
                <div className="aspect-video bg-black">
                  <iframe 
                    src={displayVideo} 
                    title={currentLesson?.title || course.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                </div>
              ) : (
                /* Interactive Slide Viewer */
                <div className="aspect-video bg-gradient-to-br from-navy to-navy-light p-8 flex flex-col justify-center">
                  <motion.div
                    key={`${activeLesson}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-emerald text-xs font-semibold uppercase tracking-wider mb-3 block">
                      Lesson {activeLesson + 1} of {totalLessons}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                      {currentLesson?.title || course.title}
                    </h2>
                    <div className="space-y-3">
                      {[
                        'Understand the requirements and implementation approach',
                        'Apply audit techniques effectively in real-world scenarios', 
                        'Identify non-conformities and write clear audit reports',
                        'Demonstrate competence as a certified Lead Auditor'
                      ].map((point, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.15 }}
                          className="flex items-start gap-3"
                        >
                          <div className="w-6 h-6 rounded-full bg-emerald/20 text-emerald flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                            {i + 1}
                          </div>
                          <p className="text-slate-300 text-sm">{point}</p>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                      <button 
                        onClick={() => {
                          setLessonCompleted(course.id, activeLesson);
                          setLessonProgress(prev => ({ ...prev, [activeLesson]: true }));
                          if (activeLesson < totalLessons - 1) {
                            setActiveLesson(activeLesson + 1);
                          }
                        }}
                        className="px-6 py-2.5 bg-emerald text-white rounded-lg text-sm font-semibold hover:bg-emerald-dark transition-colors flex items-center gap-2"
                      >
                        <Check className="w-4 h-4" /> Mark as Complete
                      </button>
                      <span className="text-slate-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {currentLesson?.duration || '45'} min read
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-slate-600 font-medium">Course Progress</span>
                <span className="text-emerald font-medium">{completedLessons}/{totalLessons} lessons completed ({courseProgressPercent}%)</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-emerald rounded-full" initial={{ width: 0 }} animate={{ width: `${courseProgressPercent}%` }} transition={{ duration: 0.5 }} />
              </div>
              {courseProgressPercent >= 100 && exam && !examResult && (
                <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  onClick={() => setActiveTab('quiz')}
                  className="mt-3 w-full py-2.5 bg-amber text-white rounded-lg text-sm font-semibold hover:bg-amber-dark transition-colors flex items-center justify-center gap-2">
                  <Award className="w-4 h-4" /> Take Final Exam to Get Your Certificate
                </motion.button>
              )}
              {examResult?.passed && (
                <div className="mt-3 flex items-center gap-2 text-emerald text-sm font-medium">
                  <FileCheck className="w-4 h-4" /> You passed the final exam with {examResult.score}%
                </div>
              )}
            </div>

            {/* Lesson Title */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-slate-800">{currentLesson?.title || course.title}</h2>
              <p className="text-slate-500 text-sm mt-1">{course.instructor} - {course.instructorTitle}</p>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="flex border-b border-slate-200 overflow-x-auto">
                {tabs.map(tab => (
                  <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key ? 'text-emerald border-b-2 border-emerald bg-emerald-light' : 'text-slate-500 hover:text-slate-700'}`}>
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </button>
                ))}
              </div>

              {/* Curriculum Tab */}
              {activeTab === 'curriculum' && (
                <div className="divide-y divide-slate-100">
                  {course.curriculum.map((lesson, i) => (
                    <button key={i}
                      onClick={() => { setActiveLesson(i); }}
                      className={`w-full flex items-center gap-4 px-5 py-4 text-left transition-colors ${activeLesson === i ? 'bg-emerald-light' : 'hover:bg-slate-50'}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs shrink-0 ${lessonProgress[i] ? 'bg-emerald text-white' : activeLesson === i ? 'bg-emerald text-white' : isEnrolled || lesson.free ? 'bg-slate-100 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
                        {lessonProgress[i] ? <Check className="w-4 h-4" /> : activeLesson === i ? <BookOpen className="w-3.5 h-3.5" /> : isEnrolled || lesson.free ? <BookOpen className="w-3.5 h-3.5" /> : <Lock className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium ${activeLesson === i ? 'text-emerald' : 'text-slate-700'}`}>{lesson.title}</p>
                      </div>
                      <span className="text-xs text-slate-400 flex items-center gap-1 shrink-0"><Clock className="w-3 h-3" />{lesson.duration} min</span>
                      {lessonProgress[i] && <Check className="w-4 h-4 text-emerald shrink-0" />}
                    </button>
                  ))}
                </div>
              )}

              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="p-6">
                  <h3 className="font-semibold text-slate-800 mb-3">{t('lms.courseDetail.whatLearn')}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{course.description}</p>
                  <h3 className="font-semibold text-slate-800 mb-3">{t('lms.courseDetail.includes')}</h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { icon: BookOpen, text: `${course.lessons} interactive lessons` },
                      { icon: Clock, text: `${Math.round(course.duration / 60)} hours of content` },
                      { icon: Download, text: 'Downloadable resources' },
                      { icon: FileText, text: 'Study materials & PDFs' },
                      { icon: exam ? Award : FileCheck, text: exam ? `Final exam (${exam.questions.length} questions)` : 'Assessments included' },
                      { icon: Award, text: 'Certificate of completion' },
                      { icon: Users, text: `${course.students.toLocaleString()} enrolled students` },
                      { icon: Star, text: `Rated ${course.rating}/5.0` },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <item.icon className="w-4 h-4 text-emerald" /> {item.text}
                      </div>
                    ))}
                  </div>
                  {exam && (
                    <div className="mt-6 p-4 bg-amber-light rounded-xl border border-amber/30">
                      <div className="flex items-center gap-2 mb-2">
                        <HelpCircle className="w-5 h-5 text-amber" />
                        <h4 className="font-semibold text-slate-800">Final Examination</h4>
                      </div>
                      <p className="text-sm text-slate-600">{exam.description}</p>
                      <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1"><HelpCircle className="w-3.5 h-3.5" /> {exam.questions.length} questions</span>
                        <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5" /> {exam.passingScore}% to pass</span>
                      </div>
                      {examResult?.passed && (
                        <div className="mt-3 flex items-center gap-2 text-emerald text-sm font-medium">
                          <FileCheck className="w-4 h-4" /> You passed with {examResult.score}%
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Quiz Tab */}
              {activeTab === 'quiz' && exam && (
                <div className="p-6">
                  {isEnrolled ? (
                    <CourseQuiz exam={exam} courseTitle={course.title} courseId={course.id} />
                  ) : (
                    <div className="text-center py-10">
                      <Lock className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <h4 className="font-semibold text-slate-800 mb-2">Enroll to Take the Exam</h4>
                      <p className="text-slate-500 text-sm mb-4">You need to enroll in this course to access the final examination.</p>
                      <button onClick={handleEnroll}
                        className="px-6 py-2.5 bg-emerald text-white rounded-full font-medium hover:bg-emerald-dark transition-colors">
                        {course.isFree ? 'Enroll Free' : `Buy Course - $${course.price}`}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Progress Tab */}
              {activeTab === 'progress' && (
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-light mb-3">
                      <BarChart3 className="w-8 h-8 text-emerald" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800">{courseProgressPercent}%</h4>
                    <p className="text-sm text-slate-500">Course Completed</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Lessons Completed</span>
                      <span className="font-medium text-slate-700">{completedLessons}/{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Videos Watched</span>
                      <span className="font-medium text-slate-700">{completedLessons}/{totalLessons}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Total Duration</span>
                      <span className="font-medium text-slate-700">{Math.round(course.duration / 60)}h {course.duration % 60}m</span>
                    </div>
                    {exam && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">Final Exam</span>
                        <span className={`font-medium ${examResult ? (examResult.passed ? 'text-emerald' : 'text-amber') : 'text-slate-700'}`}>
                          {examResult ? (examResult.passed ? `${examResult.score}% Passed` : `${examResult.score}% - Retake Available`) : 'Not Taken'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Lesson breakdown */}
                  <h5 className="font-semibold text-slate-800 mb-3">Lesson Breakdown</h5>
                  <div className="space-y-2">
                    {course.curriculum.map((lesson, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${lessonProgress[i] ? 'bg-emerald text-white' : 'bg-slate-200 text-slate-500'}`}>
                          {lessonProgress[i] ? <Check className="w-3.5 h-3.5" /> : i + 1}
                        </div>
                        <span className="text-sm text-slate-700 flex-1">{lesson.title}</span>
                        <span className="text-xs text-slate-400">{lesson.duration} min</span>
                      </div>
                    ))}
                  </div>

                  {exam && !examResult?.passed && courseProgressPercent >= 80 && (
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      onClick={() => setActiveTab('quiz')}
                      className="mt-6 w-full py-3 bg-amber text-white rounded-xl font-semibold hover:bg-amber-dark transition-colors flex items-center justify-center gap-2">
                      <Award className="w-4 h-4" /> Ready for Final Exam
                    </motion.button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-20">
              <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-xl mb-4" />

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-slate-800">{course.isFree ? t('lms.free') : `$${course.price}`}</span>
                {!course.isFree && <span className="text-sm text-slate-400 line-through">${(course.price * 1.5).toFixed(0)}</span>}
              </div>

              {isEnrolled ? (
                <div className="w-full py-3 bg-emerald text-white rounded-xl font-semibold text-center flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" /> Enrolled
                </div>
              ) : (
                <>
                  {course.isFree ? (
                    <button onClick={handleEnroll}
                      className="w-full py-3 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-colors mb-3">
                      {t('lms.enrollNow')}
                    </button>
                  ) : (
                    <>
                      {inCart ? (
                        <button onClick={() => courseId && removeItem(courseId)}
                          className="w-full py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl font-semibold hover:bg-red-100 transition-colors mb-2 flex items-center justify-center gap-2">
                          <Trash2 className="w-4 h-4" /> Remove from Cart
                        </button>
                      ) : (
                        <button onClick={() => {
                          addItem({
                            id: course.id,
                            type: 'course',
                            title: course.title,
                            price: course.price,
                            image: course.image,
                          });
                        }}
                          className="w-full py-3 bg-emerald text-white rounded-xl font-semibold hover:bg-emerald-dark transition-colors mb-2 flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" /> Add to Cart — ${course.price}
                        </button>
                      )}
                      <button onClick={handleEnroll}
                        className="w-full py-2.5 bg-navy text-white rounded-xl text-sm font-semibold hover:bg-navy-light transition-colors">
                        Buy Now — ${course.price}
                      </button>
                    </>
                  )}
                </>
              )}

              <div className="space-y-3 mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Lessons</span>
                  <span className="font-medium text-slate-700">{course.lessons}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Duration</span>
                  <span className="font-medium text-slate-700">{Math.round(course.duration / 60)}h {course.duration % 60}m</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2"><Star className="w-4 h-4" /> Level</span>
                  <span className="font-medium text-slate-700 capitalize">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2"><Users className="w-4 h-4" /> Students</span>
                  <span className="font-medium text-slate-700">{course.students.toLocaleString()}</span>
                </div>
                {exam && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 flex items-center gap-2"><HelpCircle className="w-4 h-4" /> Final Exam</span>
                    <span className="font-medium text-slate-700">{exam.questions.length} Qs ({exam.passingScore}% pass)</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Your Progress</span>
                  <span className="font-medium text-emerald">{courseProgressPercent}%</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-100">
                <p className="text-xs text-slate-400 mb-2">{t('lms.instructor')}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald flex items-center justify-center text-white font-bold text-sm">{course.instructor[0]}</div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">{course.instructor}</p>
                    <p className="text-xs text-slate-400">{course.instructorTitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
