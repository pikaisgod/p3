import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_MOVIE } from '../utils/queries'; // Import the correct query

const Search = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State to store the user's input
  const { data, error, loading } = useQuery(QUERY_SEARCH_MOVIE, {
    variables: { query: searchQuery },
    skip: !searchQuery, // Skip the query if no input
    fetchPolicy: 'no-cache', // Always fetch fresh data
  });

  // Handle input change for search bar
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // Update searchQuery with user's input
  };

  // If the data is still loading
  if (loading) return <p>Loading...</p>;

  // If there's an error fetching the data
  if (error) {
    console.error('Error:', error);
    return <p>Error occurred while searching for movies. Please try again later.</p>;
  }

  // Extract the movies from the search query response
  const movies = data?.searchMovie || [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleInputChange} // Update search query on input change
      />
      {movies.length > 0 ? (
        <div>
          {movies.map((movie) => (
            <div key={movie.id}>
              <h3>{movie.title}</h3>
              <p>{movie.description}</p>
              <p>Genre: {movie.genre}</p>
              <p>Release Year: {movie.releaseYear}</p>
              <p>Rating: {movie.rating}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found</p>
      )}
    </div>
  );
};

export default Search;
