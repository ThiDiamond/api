const faker = require('faker');

module.exports = {
  getToolData() {
    return {
      title: faker.name.findName(),
      link: faker.internet.url(),
      description: faker.lorem.text(5),
      tags: [],
    };
  },
  getUserData() {
    return {
      username: faker.internet.userName(),
      password: faker.internet.password(),
      tools: [],
    };
  },

  getRandomInt() {
    return Math.floor(Math.random() * 10) + 1;
  },
};
