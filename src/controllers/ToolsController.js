const mongoose = require('mongoose');
const Tool = mongoose.model('Tool');

module.exports = {
  async index(req, res) {
    const { tag } = req.query;
    const userId = req.header('userId');
    const filter = { userId };
    if (tag) filter.tag = tag;
    const tools = await Tool.find(filter);
    res.json(tools);
  },
  async show(req, res) {
    try {
      const tool = await Tool.findById(req.params.id);
      return res.json(tool);
    } catch (error) {
      res.status(404).send();
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
      return res.json(tool);
    } catch (error) {
      return res.status(404).send();
    }
  },

  async destroy(req, res) {
    try {
      const tool = await Tool.findById(req.params.id);
      await tool.remove();
      return res.status(204).send();
    } catch (error) {
      res.status(404).send();
    }
  },
};
