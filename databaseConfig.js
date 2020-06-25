const mongoose = require('mongoose');

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, MONGO_URL } = process.env;
const url =
  MONGO_URL ||
  `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

module.exports = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};
