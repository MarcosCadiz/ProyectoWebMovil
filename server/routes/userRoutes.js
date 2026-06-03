import { Router } from 'express';
import { me, users } from '../controllers/userController.js';
import { requireAuth, requireRole } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/me', requireAuth, me);
router.get('/', requireAuth, requireRole('funcionario'), users);

export default router;
