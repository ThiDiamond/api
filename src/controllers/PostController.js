const mongoose = require('mongoose');
const Post = mongoose.model('Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find();
    return res.json(posts);
  },
  async store(req, res) {
    try {
      const post = await Post.create(req.body);
      return res.status(201).json(post);
    } catch (error) {
      return res.status(400).send();
    }
  },

  async destroy(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      await post.remove();
      return res.status(204).send();
    } catch (error) {
      return res.status(404).send();
    }
  },
};
