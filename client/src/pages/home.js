import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_TRENDING_MOVIES } from '../utils/queries';
import './Home.css';

const Home = () => {
  const { loading, data } = useQuery(QUERY_TRENDING_MOVIES);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (data) {
      setMovies(data.trendingMovies);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Trending Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <h2>{movie.title}</h2>
            <p>{movie.description}</p>
            <p>Genre: {movie.genre}</p>
            <p>Year: {movie.releaseYear}</p>
            <p>Rating: {movie.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
