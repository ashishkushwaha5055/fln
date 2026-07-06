import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import { env } from './config/env.js';
import { connectDB } from './config/db.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import authRoutes from './routes/authRoutes.js';
import { SHARED_PACKAGE_VERSION } from '@fln/shared';

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: 'Too many requests, please try again later.' },
  }),
);

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'FLN-Assessment API is healthy',
    version: SHARED_PACKAGE_VERSION,
    timestamp: Date.now(),
  });
});

app.get('/api/v1', (_req, res) => {
  res.json({ success: true, message: 'FLN-Assessment API v1', version: SHARED_PACKAGE_VERSION });
});

app.use('/api/v1/auth', authRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function start() {
  try {
    await connectDB();
    app.listen(env.PORT, () => {
      console.log(`🚀 API running on http://localhost:${env.PORT} (v${SHARED_PACKAGE_VERSION})`);
      console.log(`   Health: http://localhost:${env.PORT}/health`);
      console.log(`   Env:    ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

export default app;