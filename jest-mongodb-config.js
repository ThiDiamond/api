const { DB_NAME } = process.env;

module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: DB_NAME,
    },
    binary: {
      version: '4.0.2', // Version of MongoDB
      skipMD5: true,
    },
    autoStart: false,
  },
};
