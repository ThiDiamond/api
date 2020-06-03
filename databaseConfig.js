const mongoose = require('mongoose');
const requireDir = require('require-dir');

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

//iniciando o db
mongoose.connect(
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

requireDir('./src/models/');
