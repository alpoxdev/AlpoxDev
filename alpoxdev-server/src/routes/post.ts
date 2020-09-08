import { Router } from 'express';
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    removePost
} from '../controllers';
import { AuthMiddleware } from '../middleware';

const router = Router();
router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', AuthMiddleware, createPost);
router.patch('/:id', AuthMiddleware, updatePost);
router.delete('/:id', AuthMiddleware, removePost);

export default router;
