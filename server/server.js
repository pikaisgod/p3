// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const connectDB = require('./config/db');

const app = express();

// Middleware for CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
  persistedQueries: false,  // Disable persisted queries to prevent unbounded cache issues
});

server.start().then(() => {
  server.applyMiddleware({ app });

  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
});
