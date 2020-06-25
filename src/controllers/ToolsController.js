const notFoundError = { error: 'Not found' };
const mongoose = require('mongoose');
const Tool = mongoose.model('Tool');

module.exports = {
  async index(req, res) {
    const { tag } = req.query;
    const filter = {};
    if (tag) filter.tags = tag;
    const tools = await Tool.find(filter);
    return res.json(tools);
  },
  async show(req, res) {
    try {
      const tool = await Tool.findById(req.params.id);
      return res.json(tool);
    } catch (error) {
      return res.status(404).send(notFoundError);
    }
  },
  async store(req, res) {
    try {
      const tool = await Tool.create(req.body);
      return res.status(201).json(tool);
    } catch (error) {
      return res.status(400).send();
    }
  },
  async update(req, res) {
    try {
      const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.status(201).json(tool);
    } catch (error) {
      return res.status(404).send(notFoundError);
    }
  },

  async destroy(req, res) {
    try {
      const tool = await Tool.findById(req.params.id);
      await tool.remove();
      return res.status(204).send();
    } catch (error) {
      return res.status(404).send(notFoundError);
    }
  },
};
