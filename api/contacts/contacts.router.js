import { Router } from 'express';
import { contactsController } from './contacts.controller';
import { authController } from '../auth/auth.controller';

const router = Router();

router.get(
  '/contacts',
  authController.autorizate,
  contactsController.getAllContacts
);
router.get(
  '/contacts/:id',
  authController.autorizate,
  contactsController.getContactById
);
router.post(
  '/contacts',
  authController.autorizate,
  contactsController.validateUserValue,
  contactsController.addContactToDB
);
router.delete(
  '/contacts/:id',
  authController.autorizate,
  contactsController.deleteContactFromDB
);
router.patch(
  '/contacts/:id',
  authController.autorizate,
  contactsController.validateUserUpdateValue,
  contactsController.updateContactData
);

export const contactsRouter = router;
