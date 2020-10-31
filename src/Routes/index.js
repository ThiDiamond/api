const express = require('express');
const routes = express.Router();

routes.use('/buildbox', require('./buildbox'));
routes.use(require('./jwt'));

module.exports = routes;
