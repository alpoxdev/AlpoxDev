import { Router } from 'express';
import { getPosts, getPost, createPost, updatePost } from '../controllers';
import { AuthMiddleware } from '../middleware';

const router = Router();
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', AuthMiddleware, createPost);
router.patch('/:id', AuthMiddleware, updatePost);

export default router;
