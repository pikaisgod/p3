import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_MOVIE } from '../utils/queries'; // Ensure the query is correct

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, error, loading } = useQuery(QUERY_SEARCH_MOVIE, {
    variables: { query: searchQuery },
    skip: !searchQuery, // Skip the query if there's no search input
    fetchPolicy: 'no-cache', // Ensure fresh data is fetched
  });

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Log and handle error
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error('Error occurred:', error);
    return <p>Error occurred while searching for movies. Please try again later.</p>;
  }

  // Extract movies from response data
  const movies = data?.searchMovie || [];

  return (
    <div>
      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleInputChange}
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
