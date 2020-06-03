/* eslint-disable no-undef */
require('dotenv/config');
const express = require('express');

const { SERVER_PORT } = process.env;

//iniciando o app
const app = express();
app.use(express.json());

require('./databaseConfig');

//rotas
app.use('/api', require('./src/routes'));

app.listen(SERVER_PORT || 3000);
