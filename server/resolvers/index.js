const User = require('../models/user');
const Movie = require('../models/movie');
const { signToken } = require('../utils/auth');
const { getTrendingMovies, searchMovie, getMoviesByGenre } = require('../utils/simkl'); // Import getMoviesByGenre

const resolvers = {
  Query: {
    // Fetch all users
    users: async () => {
      try {
        return await User.find().populate('favoriteMovies').populate('watchList');
      } catch (error) {
        console.error('Error fetching users:', error.message);
        throw new Error('Failed to fetch users');
      }
    },

    // Fetch a specific user by ID
    user: async (_, { id }) => {
      try {
        return await User.findById(id).populate('favoriteMovies').populate('watchList');
      } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error.message);
        throw new Error('Failed to fetch user');
      }
    },

    // Fetch all movies stored in the MongoDB database
    movies: async () => {
      try {
        return await Movie.find();
      } catch (error) {
        console.error('Error fetching movies:', error.message);
        throw new Error('Failed to fetch movies');
      }
    },

    // Fetch a single movie by ID
    movie: async (_, { id }) => {
      try {
        return await Movie.findById(id);
      } catch (error) {
        console.error(`Error fetching movie with ID ${id}:`, error.message);
        throw new Error('Failed to fetch movie');
      }
    },

    // Fetch trending movies from the Simkl API
    trendingMovies: async () => {
      try {
        const trendingMovies = await getTrendingMovies();
        console.log('Trending movies from Simkl:', trendingMovies); // Add logging
        return trendingMovies;
      } catch (error) {
        console.error('Error fetching trending movies:', error.message);
        throw new Error('Failed to fetch trending movies');
      }
    },

    // Search for movies using the Simkl API
    searchMovie: async (_, { query }) => {
      try {
        const movies = await searchMovie(query);
        console.log(`Movies found for query "${query}":`, movies); // Add logging
        return movies;
      } catch (error) {
        console.error(`Error searching for movies with query "${query}":`, error.message);
        throw new Error('Failed to search for movies');
      }
    },

    // Search for movies by genre
    searchMoviesByGenre: async (_, { genre }) => {
      try {
        const movies = await getMoviesByGenre(genre);
        console.log(`Movies found for genre "${genre}":`, movies); // Add logging
        return movies;
      } catch (error) {
        console.error(`Error searching for movies by genre "${genre}":`, error.message);
        throw new Error('Failed to search for movies by genre');
      }
    },
  },

  Mutation: {
    // User registration mutation
    register: async (_, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password });
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error registering user:', error.message);
        throw new Error('Failed to register user');
      }
    },

    // User login mutation
    login: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user || !(await user.verifyPassword(password))) {
          throw new Error('Invalid credentials');
        }
        const token = signToken(user);
        return { token, user };
      } catch (error) {
        console.error('Error logging in user:', error.message);
        throw new Error('Failed to log in');
      }
    },

    // Add a movie to the user's favorite list
    addFavoriteMovie: async (_, { userId, movieId }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { favoriteMovies: movieId } },
          { new: true }
        ).populate('favoriteMovies');
        return updatedUser;
      } catch (error) {
        console.error('Error adding favorite movie:', error.message);
        throw new Error('Failed to add favorite movie');
      }
    },

    // Add a movie to the user's watch list
    addToWatchList: async (_, { userId, movieId }) => {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $addToSet: { watchList: movieId } },
          { new: true }
        ).populate('watchList');
        return updatedUser;
      } catch (error) {
        console.error('Error adding to watch list:', error.message);
        throw new Error('Failed to add to watch list');
      }
    },

    // Add a comment to a movie
    addComment: async (_, { movieId, text }, { user }) => {
      if (!user) {
        throw new Error('You need to be logged in to comment');
      }
      try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
          throw new Error('Movie not found');
        }
        movie.comments.push({
          text,
          userId: user.id,
          date: new Date(),
        });
        await movie.save();
        return movie;
      } catch (error) {
        console.error('Error adding comment:', error.message);
        throw new Error('Failed to add comment');
      }
    },
  },
};

module.exports = resolvers;
