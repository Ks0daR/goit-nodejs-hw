import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { contactsRouter } from './contacts/contacts.router';
import { authRouter } from './auth/auth.router';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 8080;
const corsOptions = {
  orgign: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

export class Server {
  constructor() {
    this.server = null;
  }

  async start() {
    this.initServer();
    this.initMiddleware();
    this.initRoutes();
    await this.initDbConnect();
    // this.controlError;
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  initMiddleware() {
    this.server.use(express.json());
    this.server.use(cors(corsOptions));
    this.server.use(morgan('tiny'));
  }

  initRoutes() {
    this.server.use('/auth', authRouter);
    this.server.use('/api', contactsRouter);
  }

  async initDbConnect() {
    try {
      mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Database connection successful');
    } catch (err) {
      console.log(err);
      process.exit(1);
    }
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log('Server started and listening on port: ', PORT);
    });
  }
}
