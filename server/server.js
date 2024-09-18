// server.js
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose'); // Add Mongoose for MongoDB
require('dotenv').config(); // Load environment variables from .env
const cors = require('cors');
const typeDefs = require('./schema/typeDefs'); // Import GraphQL schema
const resolvers = require('./resolvers'); // Import GraphQL resolvers

const app = express(); // Initialize Express

app.use(cors()); // Enable CORS middleware

// MongoDB Connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.start().then(() => {
  server.applyMiddleware({ app });
  
  // Start the Express server
  app.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT || 4000}${server.graphqlPath}`)
  );
});
