const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    favoriteMovies: [Movie]
    watchList: [Movie]
  }

 type Movie {
  id: ID
  title: String!
  description: String
  genre: String
  releaseYear: Int
  rating: Float
}
 type Query {
    searchMovie(query: String!): [Movie]
    trendingMovies: [Movie]
    searchMoviesByGenre(genre: String!): [Movie] # Add this for genre search
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    date: String!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    movies: [Movie]
    movie(id: ID!): Movie
    trendingMovies: [Movie]           # Fetch trending movies from Simkl
    searchMovie(query: String!): [Movie] # Search for movies from Simkl
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFavoriteMovie(userId: ID!, movieId: ID!): User
    addToWatchList(userId: ID!, movieId: ID!): User
    addComment(movieId: ID!, text: String!): Movie
  }
`;

module.exports = typeDefs;
