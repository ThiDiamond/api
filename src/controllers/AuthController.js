const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res) {
    const { username } = req.body;
    const token = jwt.sign({ username }, process.env.APP_SECRET, {
      expiresIn: 86400,
    });

    return res.status(200).send({ username, token });
  },

  async authenticate(req, res) {
    const { username } = req.body;
    const { username: decodedUsername } = req;

    const status = username === decodedUsername ? 200 : 400;

    return res.status(status).send();
  },
};
