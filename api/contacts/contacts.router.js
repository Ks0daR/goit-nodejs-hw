import { Router } from 'express';
import { contactsController } from './contacts.controller';

const router = Router();

router.get('/contacts', contactsController.getAllContacts);
router.get('/contacts/:id', contactsController.getContactById);
router.post(
  '/contacts',
  contactsController.validateUserValue,
  contactsController.addContactToDB
);
router.delete('/contacts/:id', contactsController.deleteContactFromDB);
router.patch('/contacts/:id', contactsController.updateContactData)

export const contactsRouter = router;
