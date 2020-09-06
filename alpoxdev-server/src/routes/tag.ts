import { Router } from 'express';
import { getTags, getTag } from '../controllers';

const router = Router();
router.get('/', getTags);
router.get('/:id', getTag);

export default router;
