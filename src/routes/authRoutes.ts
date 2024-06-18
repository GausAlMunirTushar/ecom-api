import { Router } from 'express';

import { registerUser, loginUser, resendVerficationCode } from '../controllers/authController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/resend-code', resendVerficationCode);

export { router as authRoutes };
