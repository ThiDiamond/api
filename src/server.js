const { SERVER_PORT } = process.env;

//iniciando o app
const app = require('./app');

app.listen(SERVER_PORT || 3000);
