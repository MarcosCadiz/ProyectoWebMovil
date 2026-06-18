import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRateLimit, sanitizeRequest, securityHeaders } from './middleware/securityMiddleware.js';
import apiRoutes from './routes/index.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(securityHeaders);
  app.use(cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('CORS_ORIGIN_NOT_ALLOWED'));
    },
    credentials: false,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
  app.use(apiRateLimit());
  app.use(express.json({ limit: '1mb' }));
  app.use(sanitizeRequest);

  app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && 'body' in error) {
      return res.status(400).json({ error: 'INVALID_JSON_BODY' });
    }

    return next(error);
  });

  app.use('/api', apiRoutes);

  app.use((req, res) => {
    res.status(404).json({ error: 'ROUTE_NOT_FOUND' });
  });

  app.use(errorHandler);

  return app;
}
