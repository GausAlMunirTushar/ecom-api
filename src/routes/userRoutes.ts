import { Router } from 'express';

import { getUsers } from '../controllers/userController';
import authVerify from '../middlewares/authVerify';
import authorize from '../middlewares/authorize';

const router = Router();

router.get('/', [ authVerify, authorize ], getUsers);

export { router as userRoutes}