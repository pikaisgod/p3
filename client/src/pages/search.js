// src/pages/search.js
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_MOVIE } from '../utils/queries'; // Correct import name

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { loading, error, data } = useQuery(QUERY_SEARCH_MOVIE, {
    variables: { query: searchTerm }, // Pass the search term as a query variable
    skip: !searchTerm, // Skip the query execution if the search term is empty
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.elements.query.value); // Update the search term based on input
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="query" placeholder="Search for a movie..." />
        <button type="submit">Search</button>
      </form>

      {data && data.searchMovie.length > 0 ? (
        data.searchMovie.map((movie) => (
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            <p>Release Year: {movie.releaseYear}</p>
            <p>Rating: {movie.rating}</p>
            <p>Genre: {movie.genre}</p>
            <p>Description: {movie.description}</p>
          </div>
        ))
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default Search;
