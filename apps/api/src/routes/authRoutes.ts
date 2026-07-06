import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { asyncHandler } from '../utils/asyncHandler.js';
import {
  loginUser,
  registerUser,
  getCurrentUser,
  refreshAccessToken,
} from '../controllers/authController.js';
import { authenticate } from '../middlewares/auth.js';
import { Role } from '@fln/shared';

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  message: { success: false, message: 'Too many auth attempts, please try again later.' },
});

const registerSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(6).max(64),
  phone: z.string().optional(),
  role: z.nativeEnum(Role),
  scope: z
    .object({
      stateId: z.string().optional(),
      districtId: z.string().optional(),
      blockId: z.string().optional(),
      schoolId: z.string().optional(),
      classId: z.string().optional(),
      assignedSchoolIds: z.array(z.string()).optional(),
    })
    .default({}),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post(
  '/register',
  authLimiter,
  asyncHandler(async (req, res) => {
    const input = registerSchema.parse(req.body);
    const result = await registerUser(input);
    res.status(201).json(result);
  }),
);

router.post(
  '/login',
  authLimiter,
  asyncHandler(async (req, res) => {
    const { email, password } = loginSchema.parse(req.body);
    const result = await loginUser(email, password);
    res.json(result);
  }),
);

router.post(
  '/refresh',
  authLimiter,
  asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await refreshAccessToken(refreshToken);
    res.json(result);
  }),
);

router.get(
  '/me',
  authenticate,
  asyncHandler(async (req, res) => {
    const result = getCurrentUser(req.user!);
    res.json(result);
  }),
);

export default router;