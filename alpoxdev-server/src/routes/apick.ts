import { Router } from 'express';
import{
    getApickPosts,
    getApickPost,
    createApickPost,
    getApickTags,
    createApickTag
} from '../controllers';

const router = Router();
router.get("/posts", getApickPosts);
router.get("/posts/:id", getApickPost);
router.post("/posts", createApickPost);
router.get("/tags", getApickTags);
router.post("/tags", createApickTag);

export default router;