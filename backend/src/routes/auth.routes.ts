import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt';
import { authenticate, type AuthRequest } from '../middleware/auth';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  jobTitle: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// Register
router.post('/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        subscription: { create: { plan: 'FREE', currentPeriodStart: new Date(), currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } },
      },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });
    res.status(201).json({ success: true, data: { user, accessToken, refreshToken } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Registration failed' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });
    res.json({ success: true, data: { user: { id: user.id, name: user.name, email: user.email, role: user.role }, accessToken, refreshToken } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message || 'Login failed' });
  }
});

// Me
router.get('/me', authenticate, async (req: AuthRequest, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      select: { id: true, name: true, email: true, role: true, phone: true, avatar: true, companyName: true, jobTitle: true, industry: true, status: true, lastLogin: true, createdAt: true, subscription: true },
    });
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Refresh
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ success: false, error: 'Refresh token required' });
    const { verifyToken } = await import('../utils/jwt');
    const payload = verifyToken(refreshToken);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user) return res.status(401).json({ success: false, error: 'User not found' });
    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    res.json({ success: true, data: { accessToken } });
  } catch {
    res.status(401).json({ success: false, error: 'Invalid refresh token' });
  }
});

export default router;
