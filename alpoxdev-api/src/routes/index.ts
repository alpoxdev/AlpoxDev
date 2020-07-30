import { Router } from 'express';

import authRouter from './auth';
import userRouter from './users';
import postRouter from './posts';
import tagRouter from './tags';

const router = Router();
router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/tags', tagRouter);

export default router;
