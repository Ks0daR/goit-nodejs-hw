import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from './contacts';
import Joi from 'joi';

class ContactsController {
  async getAllContacts(req, res, next) {
    const response = await listContacts();
    console.log(response);
    res.status(200).json(response);
  }

  async getContactById(req, res, next) {
    const userID = Number(req.params.id);
    const response = await getContactById(userID);
    if (!response) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    res.status(200).json(response);
  }

  validateUserValue(req, res, next) {
    const validateRules = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.string().required(),
    });

    const validateReq = Joi.validate(req.body, validateRules);

    if (validateReq.error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    next();
  }

  validateUserUpdateValue(req, res, next) {
    const validateRules = Joi.object({
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.string(),
    });

    const validateReq = Joi.validate(req.body, validateRules);

    if (validateReq.error) {
      return res.status(400).json({ message: 'missing required name field' });
    }

    next();
  }

  async addContactToDB(req, res, next) {
    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
  }

  async deleteContactFromDB(req, res, next) {
    const userID = Number(req.params.id);
    const result = await removeContact(userID);
    if (result === -1) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    res.status(200).json({ message: 'contact deleted' });
  }

  async updateContactData(req, res, next) {
    if (!req.body) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const userID = Number(req.params.id);
    const result = await updateContact(userID, req.body);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.status(200).json(result);
  }
}

export const contactsController = new ContactsController();
