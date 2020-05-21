import { Router } from 'express';
import { authController } from './auth.controller';
import { upload } from '../helpers/multer';
import { imgCompressor } from '../helpers/imagemin';

const router = Router();

router.post(
  '/register',
  upload.single('avatar'),
  imgCompressor,
  authController.validateRequestBody,
  authController.registerUser
);
router.post(
  '/login',
  authController.validateRequestBody,
  authController.userLogIn
);
router.patch('/logout', authController.autorizate, authController.userLogOut);

router.get(
  '/users/current',
  authController.autorizate,
  authController.getCurrentUserByToken
);
export const authRouter = router;
