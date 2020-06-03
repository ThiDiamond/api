/* eslint-disable no-undef */
const { DB_USER, DB_PASS, DB_NAME } = process.env;

db.createUser({
  user: DB_USER,
  pwd: DB_PASS,
  roles: [
    {
      role: 'readWrite',
      db: DB_NAME,
    },
  ],
});
