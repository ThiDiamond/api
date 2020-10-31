const express = require('express');
const routes = express.Router();

routes.use(require('/buildbox', require('./buildbox')));
routes.use(require('./jwt'));

module.exports = routes;
