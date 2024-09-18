// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
const cors = require('cors');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./resolvers');

const app = express();

// Middleware for CORS
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Apollo Server Setup
const server = new ApolloServer({ typeDefs, resolvers });
server.start().then(() => {
  server.applyMiddleware({ app });

  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/build')));

  // Handle any request that doesn’t match an API route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

  // Start the server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
});
