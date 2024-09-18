const User = require('../models/user');
const Movie = require('../models/movie');
const { signToken } = require('../utils/auth');
const { getTrendingMovies, searchMovie } = require('../utils/simkl'); // Import Simkl functions

const resolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      return await User.find().populate('favoriteMovies').populate('watchList');
    },
    
    // Fetch a specific user by ID
    user: async (_, { id }) => {
      return await User.findById(id).populate('favoriteMovies').populate('watchList');
    },
    
    // Fetch all movies stored in the MongoDB database
    movies: async () => {
      return await Movie.find();
    },
    
    // Fetch a single movie by ID
    movie: async (_, { id }) => {
      return await Movie.findById(id);
    },
    
    // Fetch trending movies from the Simkl API
    trendingMovies: async () => {
      return await getTrendingMovies();
    },
    
    // Search for movies using the Simkl API
    searchMovie: async (_, { query }) => {
      return await searchMovie(query);
    },
  },

  Mutation: {
    // User registration mutation
    register: async (_, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    
    // User login mutation
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.verifyPassword(password))) {
        throw new Error('Invalid credentials');
      }
      const token = signToken(user);
      return { token, user };
    },
    
    // Add a movie to the user's favorite list
    addFavoriteMovie: async (_, { userId, movieId }) => {
      return await User.findByIdAndUpdate(
        userId,
        { $addToSet: { favoriteMovies: movieId } },
        { new: true }
      ).populate('favoriteMovies');
    },
    
    // Add a movie to the user's watch list
    addToWatchList: async (_, { userId, movieId }) => {
      return await User.findByIdAndUpdate(
        userId,
        { $addToSet: { watchList: movieId } },
        { new: true }
      ).populate('watchList');
    },
    
    // Add a comment to a movie
    addComment: async (_, { movieId, text }, { user }) => {
      if (!user) {
        throw new Error('You need to be logged in to comment');
      }
      const movie = await Movie.findById(movieId);
      movie.comments.push({
        text,
        userId: user.id,
        date: new Date(),
      });
      await movie.save();
      return movie;
    },
  },
};

module.exports = resolvers;
