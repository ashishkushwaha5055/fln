import jwt from 'jsonwebtoken';
import type { SignOptions } from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';
import { Role, type IUserScope } from '@fln/shared';

export function generateAccessToken(payload: {
  userId: string;
  role: Role;
  scope: IUserScope;
}): string {
  const options: SignOptions = { expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.JWT_SECRET, options);
}

export function generateRefreshToken(payload: { userId: string }): string {
  const options: SignOptions = { expiresIn: env.JWT_REFRESH_EXPIRES_IN as SignOptions['expiresIn'] };
  return jwt.sign(payload, env.JWT_REFRESH_SECRET, options);
}

export function verifyAccessToken(token: string): {
  userId: string;
  role: Role;
  scope: IUserScope;
} {
  return jwt.verify(token, env.JWT_SECRET) as {
    userId: string;
    role: Role;
    scope: IUserScope;
  };
}

export function verifyRefreshToken(token: string): { userId: string } {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as { userId: string };
}

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return next(new ApiError(401, 'Authentication required'));
  }

  const token = header.split(' ')[1];
  try {
    const decoded = verifyAccessToken(token);
    req.user = {
      _id: decoded.userId,
      role: decoded.role,
      scope: decoded.scope,
    };
    next();
  } catch {
    next(new ApiError(401, 'Invalid or expired token'));
  }
}