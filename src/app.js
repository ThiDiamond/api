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

  models() {}

  middlewares() {
    this.express.use(cors({}));
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require('./routes'));
  }
}

module.exports = new AppController().express;
