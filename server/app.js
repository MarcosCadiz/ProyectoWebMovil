import cors from 'cors';
import express from 'express';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';

export function createApp() {
  const app = express();

  app.use(cors({ origin: env.corsOrigin, credentials: true }));
  app.use(express.json());

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
