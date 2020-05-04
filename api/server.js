import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { contactsRouter } from './contacts/contacts.router';

const PORT = 3000;
const corsOptions = {
  orgign: 'http://localhost:3000',
  optionsSuccessStatus: 200,
};

export class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    this.initMiddleware();
    this.initRoutes();
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
    this.server.use('/api', contactsRouter);
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log('Server started and listening on port: ', PORT);
    });
  }
}