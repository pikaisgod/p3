const axios = require('axios');
const SIMKL_API_KEY = '16f7cd87841af9aa38c06d61eacce3ecc20823918147e96125aa577706b56664';

const simklApi = axios.create({
  baseURL: 'https://api.simkl.com/',
  headers: {
    'simkl-api-key': SIMKL_API_KEY,
  },
});

// Helper function to fetch detailed info about a movie using simkl_id
const getMovieDetails = async (id) => {
  try {
    const response = await simklApi.get(`/movies/${id}`);
    console.log(`Detailed data for movie ID ${id}:`, response.data); // Log detailed movie data
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error.message);
    return null;
  }
};

// Function to search for movies using the Simkl API
const searchMovie = async (query) => {
  try {
    console.log(`Searching for movies with query: ${query}`);
    const response = await simklApi.get(`/search/movie?q=${query}`);

    // Log raw response data for debugging
    console.log('Raw response from Simkl (Search):', response.data);

    if (!response.data || response.data.length === 0) {
      throw new Error(`No movies found for query: ${query}`);
    }

    // Map the API response to the required fields, fetching more detailed info
    const movies = await Promise.all(
      response.data.map(async (movie) => {
        const detailedMovie = await getMovieDetails(movie.ids.simkl_id); // Fetch more details using simkl_id

        return {
          id: movie.ids?.tmdb || movie.ids?.simkl_id || movie.ids?.slug || null, // Use TMDB, Simkl, or slug ID
          title: movie.title || 'Unknown Title',
          description: detailedMovie?.overview || 'No description available', // Get the description from detailed data
          genre: detailedMovie?.genres?.join(', ') || 'Unknown', // Get genre from detailed data
          releaseYear: movie.year || null, // Use year as releaseYear
          rating: detailedMovie?.rating || null, // Get rating from detailed data
        };
      })
    );

    // Log mapped movies for debugging
    console.log('Mapped searched movies:', movies);
    return movies;
  } catch (err) {
    console.error('Error searching movies from Simkl:', err.response ? err.response.data : err.message);
    throw new Error('Error searching movies from Simkl');
  }
};

// Fetch trending movies from Simkl API and limit to top 10
const getTrendingMovies = async () => {
  try {
    console.log('Fetching trending movies from Simkl...');
    const response = await simklApi.get(`/movies/trending`);

    // Log the raw response for debugging
    console.log('Raw response from Simkl (Trending Movies):', response.data);

    // Map the response data to match the required fields and limit to top 10
    const movies = response.data.slice(0, 10).map(movie => ({
      id: movie.ids?.tmdb || movie.ids?.simkl_id || movie.ids?.slug || 'Unknown ID',
      title: movie.title || 'Title not available', // Provide default title
      description: movie.overview || movie.plot || 'Description not available', // Provide default description
      genre: movie.genres?.length > 0 ? movie.genres.join(', ') : 'Genre not available', // Provide default genre
      releaseYear: Number.isInteger(movie.year) ? movie.year : null, // Ensure releaseYear is an integer or null
    }));

    console.log('Mapped top 10 trending movies:', movies);
    return movies;
  } catch (err) {
    console.error('Error fetching trending movies from Simkl:', err.response ? err.response.data : err.message);
    throw new Error('Error fetching trending movies from Simkl');
  }
};

const getMoviesByGenre = async (genre) => {
  try {
    console.log(`Fetching movies with genre: ${genre}`);
    const response = await simklApi.get(`/movies/genres/${genre}`);

    // Map the response data to match the required fields
    const movies = response.data.map(movie => ({
      id: movie.ids?.tmdb || movie.ids?.simkl_id || movie.ids?.slug || null,
      title: movie.title || 'Unknown Title',
      description: 'No description available', // Simkl may not provide descriptions
      genre: movie.genres?.join(', ') || 'Unknown', // Handle genre if available
      releaseYear: movie.year || null,
      rating: movie.rating || null,
    }));

    console.log(`Movies found for genre "${genre}":`, movies);
    return movies;
  } catch (err) {
    console.error(`Error fetching movies by genre "${genre}":`, err.response ? err.response.data : err.message);
    throw new Error('Error fetching movies by genre from Simkl');
  }
};

module.exports = { getTrendingMovies, searchMovie, getMoviesByGenre };

