import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'pioneers-secret-key-change-in-production';
const JWT_EXPIRY = '15m';
const REFRESH_EXPIRY = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export function generateAccessToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function generateRefreshToken(payload: { userId: string }): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRY });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
