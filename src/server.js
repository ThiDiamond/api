const { SERVER_PORT } = process.env;

const configDB = require('../databaseConfig');

configDB();

//iniciando o app
const app = require('./app');

app.listen(SERVER_PORT || 3000);
