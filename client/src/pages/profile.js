import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER_PROFILE } from '../utils/queries';
import './Profile.css';

const Profile = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_USER_PROFILE, { variables: { id } });
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (data) {
      setProfile(data.user);
    }
  }, [data]);

  if (loading) return <div>Loading...</div>;
  if (!profile) return <div>No user found</div>;

  return (
    <div>
      <h1>{profile.username}'s Profile</h1>
      <h2>Favorite Movies</h2>
      <ul>
        {profile.favoriteMovies.map((movie, idx) => (
          <li key={idx}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </li>
        ))}
      </ul>

      <h2>Watch List</h2>
      <ul>
        {profile.watchList.map((movie, idx) => (
          <li key={idx}>
            <h3>{movie.title}</h3>
            <p>{movie.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
