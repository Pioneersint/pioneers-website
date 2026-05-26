import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();

// Public: Verify certificate
router.get('/verify/:certificateId', async (req, res) => {
  try {
    const cert = await prisma.certificate.findUnique({
      where: { certificateId: req.params.certificateId.toUpperCase() },
    });
    await prisma.verificationLog.create({
      data: { certificateId: req.params.certificateId, status: cert ? 'found' : 'not_found', ipAddress: req.ip },
    });
    if (!cert) {
      return res.status(404).json({ success: false, status: 'NOT_FOUND', message: 'Certificate not found' });
    }
    res.json({
      success: true,
      status: cert.status,
      certificate: {
        certificateId: cert.certificateId,
        clientName: cert.clientName,
        certificateType: cert.certificateType,
        issueDate: cert.issueDate,
        expiryDate: cert.expiryDate,
        referenceNumber: cert.referenceNumber,
        status: cert.status,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin: List all certificates
router.get('/', authenticate, requireAdmin, async (_req, res) => {
  try {
    const certs = await prisma.certificate.findMany({ orderBy: { createdAt: 'desc' } });
    res.json({ success: true, data: certs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Admin: Create certificate
router.post('/', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({
      certificateId: z.string(),
      clientName: z.string(),
      clientEmail: z.string().optional(),
      certificateType: z.enum(['ISO_9001', 'ISO_14001', 'ISO_45001', 'ISO_21001', 'ISO_22000', 'ISO_27001', 'ISO_31000', 'ISO_37301', 'TRAINING']),
      issueDate: z.string().datetime(),
      expiryDate: z.string().datetime().optional(),
      referenceNumber: z.string().optional(),
      notes: z.string().optional(),
    });
    const data = schema.parse(req.body);
    const cert = await prisma.certificate.create({ data: { ...data, status: 'ACTIVE' } });
    res.status(201).json({ success: true, data: cert });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin: Update certificate
router.put('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const cert = await prisma.certificate.update({ where: { id: req.params.id }, data: req.body });
    res.json({ success: true, data: cert });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin: Delete certificate
router.delete('/:id', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    await prisma.certificate.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Certificate deleted' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
