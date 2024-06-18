import { Router } from 'express';
import { createCategory, getCategory } from '../controllers/cagetoryController';
import authVerify from '../middlewares/authVerify';
import authorize from '../middlewares/authorize';

const router = Router();

router.post('/', [authVerify, authorize] , createCategory);
router.get('/', getCategory);

export { router as categoryRoutes }
