const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs'); // Schema definitions
const resolvers = require('./resolvers'); // Resolvers
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Enable CORS

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }), // Add context if needed
});

server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
});
