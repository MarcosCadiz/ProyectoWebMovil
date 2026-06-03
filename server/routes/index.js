import { Router } from 'express';
import authRoutes from './authRoutes.js';
import tramitesRoutes from './tramitesRoutes.js';
import userRoutes from './userRoutes.js';
import { jwks } from '../controllers/jwksController.js';

const router = Router();

router.get('/health', (req, res) => {
  res.json({ ok: true, service: 'dom-santo-domingo-api' });
});

router.get('/jwks', jwks);
router.get('/.well-known/jwks.json', jwks);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tramites', tramitesRoutes);

export default router;
