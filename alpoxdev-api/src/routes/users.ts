import { Router } from 'express';

import { getUsers, getUser } from '../controllers';

import { AuthMiddleware, OnlyAdminMiddleware } from '../middleware';

const router = Router();
router.get('/', AuthMiddleware, OnlyAdminMiddleware, getUsers);
router.get('/:id', AuthMiddleware, OnlyAdminMiddleware, getUser);

export default router;
