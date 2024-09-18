const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  genre: String,
  releaseYear: Number,
  rating: Number,
  comments: [
    {
      text: String,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      date: { type: Date, default: Date.now },
    },
  ],
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
