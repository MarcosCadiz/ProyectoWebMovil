import { Router } from 'express';
import {
  createTramite,
  decideTramite,
  deleteTramite,
  getTramite,
  listTramites,
  updateTramite,
} from '../controllers/tramitesController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/', requireAuth, listTramites);
router.post('/', requireAuth, createTramite);
router.get('/:id', requireAuth, getTramite);
router.put('/:id', requireAuth, updateTramite);
router.patch('/:id', requireAuth, updateTramite);
router.post('/:id/decision', requireAuth, requireRole('funcionario'), decideTramite);
router.delete('/:id', requireAuth, deleteTramite);

export default router;
