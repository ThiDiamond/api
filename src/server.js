const { PORT } = process.env;

const configDB = require('../databaseConfig');

configDB();

//iniciando o app
const app = require('./app');

app.listen(PORT || 3000);
