const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
  async login(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).select('+password');

    if (!user)
      return res.status(400).send({ error: 'User or password invalid' });

    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).send({ error: 'User or password invalid' });

    user.password = undefined;

    const token = await jwt.sign({ id: user.id }, process.env.APP_SECRET, {
      expiresIn: 86400,
    });

    return res.send({ user, token });
  },
};
