import { Router } from 'express';
import { createTramite, listTramites } from '../controllers/tramitesController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, listTramites);
router.post('/', requireAuth, createTramite);

export default router;
