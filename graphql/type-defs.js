const gql = require('graphql-tag');

const typeDefs = gql`
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Post {
    id: ID!
    body: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
  }
  type Query {
    getPosts: [Post]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
