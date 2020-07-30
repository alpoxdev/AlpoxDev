import { Router } from 'express';
import { register, login, social, refreshAuth } from '../controllers';
import { AuthMiddleware } from '../middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.post('/social', AuthMiddleware, social);
router.post('/refresh', refreshAuth);

export default router;
