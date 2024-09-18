const axios = require('axios');
const SIMKL_API_KEY = '16f7cd87841af9aa38c06d61eacce3ecc20823918147e96125aa577706b56664'; // Make sure you're accessing the correct env variable

const simklApi = axios.create({
  baseURL: 'https://api.simkl.com/',
  headers: {
    'simkl-api-key': SIMKL_API_KEY, // Include the API key in the headers
  },
});

// Function to search for movies using the API
const searchMovie = async (query) => {
  try {
    console.log(`Making request to Simkl API with query: ${query}`);
    const response = await simklApi.get(`/search/movie?q=${query}`);

    // Log the response to verify the API returns the correct data
    console.log('Simkl API response:', response.data);

    if (!response.data || response.data.length === 0) {
      throw new Error('No data received from Simkl API');
    }

    // Map the response data and handle both rating and releaseYear
    const movies = response.data.map((movie) => ({
      id: movie.imdb_id || movie.slug || null,
      title: movie.title || 'Unknown Title',
      description: movie.overview || 'No description available',
      genre: movie.genre || 'Unknown',
      releaseYear: isNaN(parseInt(movie.releaseYear)) ? null : parseInt(movie.releaseYear), // Ensure releaseYear is an integer or null
      rating: isNaN(parseFloat(movie.rating)) ? null : parseFloat(movie.rating), // Ensure rating is a number or null
    }));

    return movies;
  } catch (err) {
    console.error('Error fetching movies from Simkl:', err.response ? err.response.data : err.message);
    throw new Error('Error fetching movies from Simkl');
  }
};

module.exports = { searchMovie };