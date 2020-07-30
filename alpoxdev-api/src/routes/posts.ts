import { Router } from 'express';
import { getPosts, getPost, createPost } from '../controllers';
import { AuthMiddleware } from '../middleware';

const router = Router();
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', AuthMiddleware, createPost);

export default router;
