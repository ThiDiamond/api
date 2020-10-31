const express = require('express');
const routes = express.Router();
const AuthController = require('../controllers/AuthController');

const auth = require('../middlewares/auth');

//Docs route
routes.get('/docs/', (req, res) =>
  res.sendFile(`${__dirname}/docs/index.html`)
);

routes.get('/login', AuthController.login);

routes.use(auth);

routes.get('/authenticate', AuthController.authenticate);

module.exports = routes;
