import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';
import { authenticate, requireAdmin, type AuthRequest } from '../middleware/auth';

const router = Router();

// AI Chat completion
router.post('/chat', authenticate, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({ chatId: z.string().optional(), message: z.string() });
    const { chatId, message } = schema.parse(req.body);

    // Get or create chat
    let chat = chatId ? await prisma.aIChat.findFirst({ where: { id: chatId, userId: req.user!.userId } }) : null;
    if (!chat) {
      chat = await prisma.aIChat.create({
        data: { userId: req.user!.userId, title: message.slice(0, 50) + '...' },
      });
    }

    // Save user message
    await prisma.chatMessage.create({ data: { chatId: chat.id, role: 'user', content: message } });

    // Generate AI response (using OpenAI if available, otherwise fallback)
    let aiResponse: string;
    try {
      const OpenAI = (await import('openai')).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are Pioneers AI, an expert consulting assistant specializing in ISO standards, ESG, corporate governance, and business transformation. Provide professional, accurate, and actionable advice.' },
          { role: 'user', content: message },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      });
      aiResponse = completion.choices[0]?.message?.content || 'I apologize, I could not generate a response.';
    } catch {
      // Fallback responses for demo
      const fallbacks: Record<string, string> = {
        'iso 9001': 'ISO 9001:2015 is a quality management system standard. To implement it:\n\n1. **Leadership Commitment** - Top management must demonstrate leadership and commitment.\n2. **Context Analysis** - Understand internal and external issues affecting your QMS.\n3. **Risk-Based Thinking** - Identify risks and opportunities.\n4. **Process Approach** - Define and manage processes.\n5. **Documentation** - Maintain required documented information.\n6. **Internal Audit** - Regular audits to ensure effectiveness.\n7. **Management Review** - Periodic reviews by leadership.\n\nWould you like me to elaborate on any specific step?',
        'esg': 'ESG (Environmental, Social, Governance) strategy development involves:\n\n1. **Materiality Assessment** - Identify the most relevant ESG issues for your industry.\n2. **Stakeholder Engagement** - Understand expectations of investors, employees, and communities.\n3. **Goal Setting** - Define measurable targets aligned with frameworks like GRI, SASB, or TCFD.\n4. **Integration** - Embed ESG into business operations and decision-making.\n5. **Reporting** - Transparent disclosure of ESG performance.\n\nI can help you develop a tailored ESG strategy. What industry are you in?',
        'governance': 'Corporate governance best practices include:\n\n1. **Board Composition** - Diverse, independent directors with relevant expertise.\n2. **Committee Structure** - Audit, Risk, Compensation, and Nomination committees.\n3. **Code of Conduct** - Clear ethical guidelines for all stakeholders.\n4. **Risk Management** - Comprehensive enterprise risk management framework.\n5. **Transparency** - Regular disclosures and stakeholder communication.\n6. **Compliance** - Adherence to regulatory requirements and international standards.\n\nWould you like guidance on a specific governance area?',
      };
      const key = Object.keys(fallbacks).find(k => message.toLowerCase().includes(k));
      aiResponse = key ? fallbacks[key] : `Thank you for your question about "${message}". As your consulting assistant, I'd be happy to help. Could you provide more details so I can give you the most relevant guidance?\n\nI specialize in:\n- ISO standards implementation\n- ESG strategy development\n- Corporate governance frameworks\n- Risk management\n- Business transformation`;
    }

    // Save AI response
    await prisma.chatMessage.create({ data: { chatId: chat.id, role: 'assistant', content: aiResponse } });

    res.json({ success: true, data: { chatId: chat.id, response: aiResponse } });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Get user's chats
router.get('/chats', authenticate, async (req: AuthRequest, res) => {
  try {
    const chats = await prisma.aIChat.findMany({
      where: { userId: req.user!.userId },
      orderBy: { updatedAt: 'desc' },
    });
    res.json({ success: true, data: chats });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get chat with messages
router.get('/chats/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const chat = await prisma.aIChat.findFirst({
      where: { id: req.params.id, userId: req.user!.userId },
      include: { messages: { orderBy: { createdAt: 'asc' } } },
    });
    if (!chat) return res.status(404).json({ success: false, error: 'Chat not found' });
    res.json({ success: true, data: chat });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete chat
router.delete('/chats/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    await prisma.aIChat.deleteMany({ where: { id: req.params.id, userId: req.user!.userId } });
    res.json({ success: true, message: 'Chat deleted' });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Admin: Generate article with AI
router.post('/generate-article', authenticate, requireAdmin, async (req: AuthRequest, res) => {
  try {
    const schema = z.object({ topic: z.string(), keywords: z.array(z.string()).optional(), wordCount: z.number().optional() });
    const { topic, keywords, wordCount = 1500 } = schema.parse(req.body);

    let generated: { title: string; content: string; excerpt: string; seoScore: number };

    try {
      const OpenAI = (await import('openai')).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: process.env.AI_MODEL || 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `You are an expert SEO content writer for a management consulting firm. Generate a complete article in JSON format with fields: title, content (HTML with h2/h3 tags), excerpt (2 sentences), seoScore (0-100). Target word count: ${wordCount}. Target keywords: ${keywords?.join(', ') || topic}.` },
          { role: 'user', content: `Write an article about: ${topic}` },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });
      const response = completion.choices[0]?.message?.content || '{}';
      generated = JSON.parse(response);
    } catch {
      generated = {
        title: topic,
        content: `<h2>Introduction</h2><p>This article provides a comprehensive overview of ${topic}. Understanding this subject is essential for organizations seeking to improve their operations and achieve excellence.</p><h2>Key Concepts</h2><p>The fundamentals include proper planning, implementation, and continuous monitoring. Organizations should focus on aligning their processes with international best practices.</p><h2>Implementation Steps</h2><p>1. Assess current state<br>2. Identify gaps<br>3. Design solutions<br>4. Implement changes<br>5. Monitor and improve</p><h2>Conclusion</h2><p>By following these guidelines, organizations can achieve significant improvements in their operations and compliance posture.</p>`,
        excerpt: `A comprehensive guide to ${topic}, covering key concepts, implementation steps, and best practices for organizational excellence.`,
        seoScore: 75,
      };
    }

    const article = await prisma.article.create({
      data: {
        title: generated.title,
        slug: generated.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
        content: generated.content,
        excerpt: generated.excerpt,
        category: 'ISO_STANDARDS',
        contentCluster: 'GENERAL',
        keywords: keywords || [topic],
        authorName: 'AI Assistant',
        status: 'PENDING_REVIEW',
        isAiGenerated: true,
        seoScore: generated.seoScore,
        metaTitle: generated.title,
        metaDescription: generated.excerpt,
      },
    });
    res.status(201).json({ success: true, data: article });
  } catch (error: any) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;
