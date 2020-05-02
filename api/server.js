import express from 'express';
const PORT = 3000;

export class Server {
  constructor() {
    this.server = null;
  }

  start() {
    this.initServer();
    // this.initMiddleware;
    // this.initRoutes;
    // this.controlError;
    this.startListening();
  }

  initServer() {
    this.server = express();
  }

  startListening() {
    this.server.listen(PORT, () => {
      console.log('Server started and listening on port: ', PORT);
    });
  }
}
