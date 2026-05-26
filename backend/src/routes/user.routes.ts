import { Router } from 'express';
import { prisma } from '../utils/prisma';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();

// Admin: List all users
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { page = '1', limit = '20', role, status } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const where: any = {};
    if (role) where.role = role;
    if (status) where.status = status;
    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, skip, take: parseInt(limit as string), orderBy: { createdAt: 'desc' }, select: { id: true, name: true, email: true, role: true, status: true, companyName: true, jobTitle: true, createdAt: true, lastLogin: true, subscription: true } }),
      prisma.user.count({ where }),
    ]);
    res.json({ success: true, data: users, meta: { page: parseInt(page as string), limit: parseInt(limit as string), total } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin: Update user
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const { role, status, ...data } = req.body;
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { role, status, ...data },
      select: { id: true, name: true, email: true, role: true, status: true },
    });
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin: Delete user
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'User deleted' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get dashboard stats (admin)
router.get('/stats/dashboard', authenticate, requireAdmin, async (_req, res) => {
  try {
    const [totalUsers, totalCourses, totalCertificates, totalArticles, activeSubs] = await Promise.all([
      prisma.user.count(),
      prisma.course.count(),
      prisma.certificate.count(),
      prisma.article.count(),
      prisma.subscription.count({ where: { status: 'ACTIVE' } }),
    ]);
    res.json({ success: true, data: { totalUsers, totalCourses, totalCertificates, totalArticles, activeSubs } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
