import { Router } from 'express';
import {
    getTags
} from '../controllers';

const router = Router();
router.get('/', getTags);

export default router;