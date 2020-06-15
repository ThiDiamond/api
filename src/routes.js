const express = require('express');
const routes = express.Router();
const ToolsController = require('./controllers/ToolsController');
const UsersController = require('./controllers/UsersController');
const AuthController = require('./controllers/AuthController');

const auth = require('./middlewares/auth');

//Login route
routes.get('/login', AuthController.login);

//Tools routes
routes.get('/tools', ToolsController.index);
routes.get('/tools/:id', ToolsController.show);
routes.post('/tools', ToolsController.store);
routes.put('/tools/:id', ToolsController.update);
routes.delete('/tools/:id', ToolsController.destroy);

//User routes
routes.get('/users', UsersController.index);
routes.get('/users/:id', UsersController.show);
routes.post('/users', UsersController.store);

//private routes
routes.use(auth);

routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.destroy);

module.exports = routes;
