import { Router } from 'express';
import {
    register,
    login,
    social,
    refresh,
} from '../controllers';
import { AuthMiddleware } from '../middleware';

const router = Router();
router.post('/login', login);
router.post('/register', register);
router.post('/social', social);
router.post('/refresh', AuthMiddleware, refresh);

export default router;
