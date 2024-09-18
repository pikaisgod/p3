const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // Set strictQuery to true or false based on your preference
    mongoose.set('strictQuery', false);

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI || "mongodb+srv:dilan:kirit1221@project3.l3zfq.mongodb.net/mydatabase?retryWrites=true&w=majority&appName=project3", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
