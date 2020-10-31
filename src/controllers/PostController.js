const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = {
  async index(req, res) {
    const Posts = await Post.find();
    return res.json(Posts);
  },
  async store(req, res) {
    try {
      const Post = await Post.create(req.body);
      return res.status(201).json(Post);
    } catch (error) {
      return res.status(400).send();
    }
  },

  async destroy(req, res) {
    try {
      const Post = await Post.findById(req.params.id);
      await Post.remove();
      return res.status(204).send();
    } catch (error) {
      return res.status(404).send();
    }
  },
};
