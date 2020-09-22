const Post = require('../../models/post');

const posts = {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();

        return posts;
      } catch (error) {
        throw error;
      }
    }
  }  
};

module.exports = posts;
