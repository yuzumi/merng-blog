const { model, Schema } = require('mongoose');

const postSchema = new Schema({
  body: String,
  username: String,
  comments: [{
    body: String,
    username: String
  }],
  likes: [{
    username: String
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
});

module.exports = model('Post', postSchema);
