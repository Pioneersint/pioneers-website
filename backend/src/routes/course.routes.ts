import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, type AuthRequest } from '../middleware/auth';

const router = Router();

// Public: List published courses
router.get('/', async (_req, res) => {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      include: { modules: { include: { lessons: { select: { id: true, title: true, duration: true, order: true } } }, orderBy: { order: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: courses });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Public: Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await prisma.course.findUnique({
      where: { id: req.params.id },
      include: { modules: { include: { lessons: true }, orderBy: { order: 'asc' } } },
    });
    if (!course) return res.status(404).json({ success: false, error: 'Course not found' });
    res.json({ success: true, data: course });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Enroll in course
router.post('/:id/enroll', authenticate, async (req: AuthRequest, res) => {
  try {
    const enrollment = await prisma.enrollment.create({
      data: { userId: req.user!.userId, courseId: req.params.id },
    });
    res.status(201).json({ success: true, data: enrollment });
  } catch (error: any) {
    if (error.code === 'P2002') return res.status(400).json({ success: false, error: 'Already enrolled' });
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get my enrolled courses
router.get('/my/enrolled', authenticate, async (req: AuthRequest, res) => {
  try {
    const enrollments = await prisma.enrollment.findMany({
      where: { userId: req.user!.userId },
      include: { course: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ success: true, data: enrollments });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update lesson progress
router.post('/progress', authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({ lessonId: z.string(), completed: z.boolean().optional(), watchedSeconds: z.number().optional() });
    const data = schema.parse(req.body);
    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: req.user!.userId, lessonId: data.lessonId } },
      update: { completed: data.completed, watchedSeconds: data.watchedSeconds, completedAt: data.completed ? new Date() : undefined },
      create: { userId: req.user!.userId, lessonId: data.lessonId, completed: data.completed || false, watchedSeconds: data.watchedSeconds || 0 },
    });
    res.json({ success: true, data: progress });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
