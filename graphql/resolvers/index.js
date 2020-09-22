const user = require('../../models/user');
const posts = require('./posts');
const users = require('./users');

const resolvers = {
  ...posts,
  ...users
};

module.exports = resolvers;
