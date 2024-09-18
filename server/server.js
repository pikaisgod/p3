const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path'); // To serve the React app
require('dotenv').config();
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

const app = express();

// Middleware for CORS
app.use(cors());

// MongoDB connection (no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  persistedQueries: false, // Disable persisted queries
});

server.start().then(() => {
  server.applyMiddleware({ app });

  // Serve static files from the React app (client/build)
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Catch-all route to send back React's index.html file for any unknown routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
});
