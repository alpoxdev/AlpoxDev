import { Router } from 'express';
import { getResult, getHistoryCount } from '../controllers';

const router = Router();
router.get('/', getHistoryCount);
router.post('/', getResult);

export default router;