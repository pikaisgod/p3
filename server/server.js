const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs'); // Schema definitions
const resolvers = require('./resolvers'); // Resolvers
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-client-url.onrender.com'], // Adjust your client URL if necessary
  credentials: true, // Allow credentials (important for sending cookies)
}));

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // Extract the token from the headers (if any)
    const token = req.headers.authorization || '';

    // Try to verify the token and add the user to the context
    let user = null;
    if (token) {
      try {
        user = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      } catch (error) {
        console.error('Invalid or expired token');
      }
    }

    // Return the context with user (if authenticated)
    return { req, user };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
});
