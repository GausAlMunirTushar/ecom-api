import { Router } from 'express';

import {
	registerUser,
	loginUser,
	resendVerficationCode,
	verifyUser,
} from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/resend-code', resendVerficationCode);
router.post('/verify', verifyUser);

export { router as authRoutes };
