import { Router } from 'express';

import authRouter from './auth';
import postRouter from './post';
import tagRouter from './tag';
import yourfaceRouter from './yourface';
import apickRouter from './apick';

const router = Router();
router.use('/auth', authRouter);
router.use('/posts', postRouter);
router.use('/tags', tagRouter);
router.use('/yourface', yourfaceRouter);
router.use('/apick', apickRouter);

export default router;