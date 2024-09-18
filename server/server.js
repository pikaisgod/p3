const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
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
  persistedQueries: false, // Disable persisted queries to avoid memory issues
});

server.start().then(() => {
  server.applyMiddleware({ app });

  // Serve static files from the React app (client/build)
  app.use(express.static(path.join(__dirname, '../client/build')));

  // For any other routes, return the React app's index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`);
  });
});
