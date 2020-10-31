const cors = require('cors');
const express = require('express');
class AppController {
  constructor() {
    require('dotenv/config');
    this.models();
    this.express = express();
    this.middlewares();
    this.routes();
  }

  models() {
    require('./models/Post');
  }

  middlewares() {
    this.express.use(cors({}));
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require('./Routes'));
  }
}

module.exports = new AppController().express;
