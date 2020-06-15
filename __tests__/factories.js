const faker = require('faker');
const { factory } = require('factory-girl');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Tool = mongoose.model('Tool');

factory.define('User', User, {
  username: faker.name.findName(),
  password: faker.internet.password(),
  tools: [],
});

factory.define('Tool', Tool, {
  title: faker.name.findName(),
  link: faker.internet.url(),
  description: faker.lorem.text(5),
  tags: [],
});

module.exports = factory;
