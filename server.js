const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/type-defs');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
  typeDefs,
  resolvers
});

(async () => {
  await mongoose.connect('mongodb://localhost:27017/merng-blog', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  });

  console.log(`Database connected`);
  
  const { url } = await server.listen({ port: 5000 });

  console.log(`Server running at ${url}`);
})();
