import { Router } from 'express';
import {
  createTramite,
  deleteTramite,
  getTramite,
  listTramites,
  updateTramite,
} from '../controllers/tramitesController.js';
import { requireAuth } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, listTramites);
router.post('/', requireAuth, createTramite);
router.get('/:id', requireAuth, getTramite);
router.put('/:id', requireAuth, updateTramite);
router.patch('/:id', requireAuth, updateTramite);
router.delete('/:id', requireAuth, deleteTramite);

export default router;
