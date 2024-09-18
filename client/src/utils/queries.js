import { gql } from '@apollo/client';

// Query to get trending movies from Simkl API
export const QUERY_TRENDING_MOVIES = gql`
  query GetTrendingMovies {
    trendingMovies {
      id
      title
      description
      genre
      releaseYear
      rating
    }
  }
`;

// Query to get user profile with their favorite movies and watch list
export const QUERY_USER_PROFILE = gql`
  query GetUserProfile($id: ID!) {
    user(id: $id) {
      username
      favoriteMovies {
        title
        description
      }
      watchList {
        title
        description
      }
    }
  }
`;

// Query to get details of a single movie
export const QUERY_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      title
      description
      genre
      releaseYear
      rating
      comments {
        text
        user {
          username
        }
        date
      }
    }
  }
`;

// Mutation for user login
export const MUTATION_LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

// Mutation for user registration
export const MUTATION_REGISTER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

// Query to search for movies based on a search query
export const QUERY_SEARCH_MOVIE = gql`
  query SearchMovie($query: String!) {
    searchMovie(query: $query) {
      id
      title
      description
      genre
      releaseYear
      rating
    }
  }
`;
