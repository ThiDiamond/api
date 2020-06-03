const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  async index(req, res) {
    const users = await User.find();
    res.json(users);
  },
  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);
      return res.json(user);
    } catch (error) {
      res.status(404).send();
    }
  },
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      user.password = undefined;
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).send();
    }
  },
  async update(req, res) {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json(user);
    } catch (error) {
      return res.status(404).send();
    }
  },

  async destroy(req, res) {
    try {
      const user = await User.findById(req.params.id);
      await user.remove();
      return res.status(204).send();
    } catch (error) {
      res.status(404).send();
    }
  },
};
