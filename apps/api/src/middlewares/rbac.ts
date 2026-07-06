import type { Request, Response, NextFunction } from 'express';
import { Role } from '@fln/shared';
import { ApiError } from '../utils/ApiError.js';

export const authorize =
  (...allowedRoles: Role[]) =>
  (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ApiError(401, 'Authentication required'));
    }
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'You do not have permission for this action'));
    }
    next();
  };