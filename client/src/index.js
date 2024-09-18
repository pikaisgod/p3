import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Import any global CSS (if you have it)
import App from './App';
import client from './utils/apolloClient'; // Import the Apollo Client setup
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
