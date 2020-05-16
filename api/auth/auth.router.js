import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();

router.post(
  '/register',
  authController.validateRequestBody,
  authController.registerUser
);
router.post(
  '/login',
  authController.validateRequestBody,
  authController.userLogIn
);
router.patch('/logout', authController.autorizate, authController.userLogOut);
export const authRouter = router;
