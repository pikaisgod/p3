const axios = require('axios');
const SIMKL_API_KEY = '16f7cd87841af9aa38c06d61eacce3ecc20823918147e96125aa577706b56664'; // Load API key from environment variables

// Create an Axios instance with the correct Simkl API base URL
const simklApi = axios.create({
  baseURL: 'https://api.simkl.com/', 
  headers: {
    'simkl-api-key': SIMKL_API_KEY, 
  },
});

// Function to search for movies using the Simkl API
const searchMovie = async (query) => {
  try {
    console.log(`Making request to Simkl API with query: ${query}`);
    const response = await simklApi.get(`/search/movie?q=${query}`);
    console.log('Simkl API response data:', response.data); // Log the response
    return response.data;
  } catch (err) {
    if (err.response) {
      // Log the error response from the Simkl API
      console.error('Simkl API error:', err.response.status, err.response.data);
    } else if (err.request) {
      // No response from the Simkl API
      console.error('No response from Simkl API:', err.request);
    } else {
      // Other errors
      console.error('Error setting up request to Simkl API:', err.message);
    }
    throw new Error('Error searching movie from Simkl');
  }
};

module.exports = { searchMovie };
