// v0.1.1 - Minimal Express skeleton. Real server + auth + DB comes in v0.2.0.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { SHARED_PACKAGE_VERSION } from '@fln/shared';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'FLN-Assessment API is healthy',
    version: SHARED_PACKAGE_VERSION,
    timestamp: Date.now(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT} (v${SHARED_PACKAGE_VERSION})`);
});

export default app;
