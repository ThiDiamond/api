const { PORT } = process.env;

//iniciando o app
const app = require('./app');

app.listen(PORT || 3000);
