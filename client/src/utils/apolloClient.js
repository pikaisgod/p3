import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI || 'http://localhost:4000/graphql', // Use your backend URL here
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token'); // Get JWT token from local storage
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Set up Apollo Client with authorization link and cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
