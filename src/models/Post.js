const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  message: {
    type: String,
    required: true,
  },

  thumbUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model('Post', PostSchema);
