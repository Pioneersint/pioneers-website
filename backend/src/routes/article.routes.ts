import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();

// Public: List published articles
router.get('/', async (req, res) => {
  try {
    const { category, search, page = '1', limit = '10' } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const where: any = { status: 'PUBLISHED' };
    if (category) where.category = category;
    if (search) {
      where.OR = [
        { title: { contains: search as string, mode: 'insensitive' } },
        { content: { contains: search as string, mode: 'insensitive' } },
      ];
    }
    const [articles, total] = await Promise.all([
      prisma.article.findMany({ where, skip, take: parseInt(limit as string), orderBy: { publishedAt: 'desc' } }),
      prisma.article.count({ where }),
    ]);
    res.json({ success: true, data: articles, meta: { page: parseInt(page as string), limit: parseInt(limit as string), total, totalPages: Math.ceil(total / parseInt(limit as string)) } });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Public: Get single article
router.get('/:slug', async (req, res) => {
  try {
    const article = await prisma.article.findUnique({ where: { slug: req.params.slug } });
    if (!article) return res.status(404).json({ success: false, error: 'Article not found' });
    await prisma.article.update({ where: { id: article.id }, data: { views: { increment: 1 } } });
    res.json({ success: true, data: article });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin: Create article
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      title: z.string(), slug: z.string(), content: z.string(), excerpt: z.string().optional(),
      category: z.enum(['ISO_STANDARDS', 'ESG_SUSTAINABILITY', 'GOVERNANCE', 'RISK_MANAGEMENT', 'TRANSFORMATION', 'LEADERSHIP', 'CASE_STUDY', 'INDUSTRY_INSIGHT']),
      contentCluster: z.enum(['ISO_9001_CLUSTER', 'ISO_14001_CLUSTER', 'ESG_CLUSTER', 'GOVERNANCE_CLUSTER', 'RISK_CLUSTER', 'TRANSFORMATION_CLUSTER', 'GENERAL']),
      metaTitle: z.string().optional(), metaDescription: z.string().optional(),
      keywords: z.array(z.string()).optional(), authorName: z.string(),
      status: z.enum(['DRAFT', 'PENDING_REVIEW', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED']).optional(),
      readTime: z.number().optional(),
    });
    const data = schema.parse(req.body);
    const article = await prisma.article.create({
      data: { ...data, status: data.status || 'DRAFT', publishedAt: data.status === 'PUBLISHED' ? new Date() : undefined },
    });
    res.status(201).json({ success: true, data: article });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin: Update article
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const article = await prisma.article.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: article });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin: Delete article
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    await prisma.article.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Article deleted' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
