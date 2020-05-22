import Joi from '@hapi/joi';
import { userModel } from './auth.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createControllerProxy } from '../helpers/controllerProxy';

class AuthController {
  async registerUser(req, res, next) {
    const { email, password } = req.body;
    console.log(req.file);

    const checkedEmailInDb = await userModel.getUserEmail(email);
    if (checkedEmailInDb) {
      return res.status(409).json('User alredy exist');
    }

    const passwordHash = await this.hashingPassword(password);

    const result = await userModel.createUser({
      email,
      password: passwordHash,
    });

    return res
      .status(201)
      .json({ user: { email, subscription: result.subscription } });
  }

  async userLogIn(req, res, next) {
    const { email, password } = req.body;
    const userAuth = await userModel.getUserEmail(email);
    if (!userAuth) {
      return res.status(409).json('User not found');
    }

    const checkedPassword = await this.passwordChecked(
      password,
      userAuth.password
    );

    if (!checkedPassword) {
      return res.status(401).json('Unauthorized');
    }
    console.log(userAuth.id);
    const token = this.generateToken(userAuth._id);
    await userModel.updateUser(userAuth.email, token);

    return res
      .status(200)
      .json({ user: { email, subscription: userAuth.subscription }, token });
  }

  async autorizate(req, res, next) {
    const authHeaders = req.get('Authorization');
    console.log(authHeaders);
    if (!authHeaders) {
      return res.status(401).json('Unauthorized');
    }
    const token = authHeaders.replace('Bearer ', '');

    const user = await userModel.findUserByToken(token);
    if (!user) {
      return res.status(401).json('Unauthorized');
    }
    try {
      jwt.verify(token, process.env.JWT_PRIVATE_KEY, user._id);
    } catch (err) {
      throw err;
    }

    req.user = user;

    next();
  }

  async userLogOut(req, res, next) {
    const userID = req.user._id;
    if (!userID) {
      return res.status(401).json('Not authorized');
    }

    await userModel.getUserByIdAndDeleteToken(userID);

    return res.status(204);
  }

  async getCurrentUserByToken(req, res, next) {
    const user = await userModel.findUserByToken(req.user.token);
    if (!user) {
      res.status(401).json('Unauthorized');
    }

    return res
      .status(200)
      .json({ email: user.email, subscription: user.subscription });
  }

  async hashingPassword(password) {
    return bcrypt.hash(password, 8);
  }

  async passwordChecked(password, userPassword) {
    return bcrypt.compare(password, userPassword);
  }

  generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_PRIVATE_KEY);
  }

  validateRequestBody(req, res, next) {
    const userRules = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });

    const userValidate = userRules.validate(req.body);
    if (userValidate.error) {
      return res.status(400).json('Invalid request body');
    }

    next();
  }
}

export const authController = createControllerProxy(new AuthController());
