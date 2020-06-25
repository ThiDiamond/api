const notFoundError = { error: 'Not found' };
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
  async index(req, res) {
    const users = await User.find();
    return res.json(users);
  },
  async show(req, res) {
    try {
      const user = await User.findById(req.params.id);
      const processedUser = await user.populate('tools').execPopulate();

      return res.json(processedUser);
    } catch (error) {
      res.status(404).send(notFoundError);
    }
  },
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      user.password = undefined;
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).send(notFoundError);
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req;

      await User.findById(id);

      if (id !== userId) {
        return res.status(400).send({ error: 'Unauthorized' });
      }

      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.json(user);
    } catch (error) {
      return res.status(404).send(notFoundError);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req;

      const user = await User.findById(id);

      if (id !== userId) {
        return res.status(400).send({ error: 'Unauthorized' });
      }

      await user.remove();
      return res.status(204).send();
    } catch (error) {
      res.status(404).send(notFoundError);
    }
  },
};
