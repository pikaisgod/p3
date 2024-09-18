import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_MOVIE } from '../utils/queries';

const Movie = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_MOVIE, { variables: { id } });
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (data) {
      setMovie(data.movie);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (!movie) return <div>Movie not found</div>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <p>{movie.description}</p>
      <p>Genre: {movie.genre}</p>
      <p>Year: {movie.releaseYear}</p>
      <p>Rating: {movie.rating}</p>

      <h2>Comments</h2>
      <ul>
        {movie.comments.map((comment, idx) => (
          <li key={idx}>
            <p>{comment.text}</p>
            <p>By: {comment.user.username}</p>
            <p>Date: {new Date(comment.date).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movie;
