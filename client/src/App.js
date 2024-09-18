import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import client from './utils/apolloClient'; // Apollo Client setup
import Home from './pages/home'; // Home page component
import Profile from './pages/profile'; // Profile page component
import Movie from './pages/movie'; // Movie details page component
import Login from './pages/login'; // Login page component
import Register from './pages/register'; // Register page component
import Search from './pages/search'; // Search page component
import Navbar from './components/navbar'; // Navbar component for navigation

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Navbar /> {/* Navigation bar */}
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home page */}
            <Route path="/profile/:id" element={<Profile />} /> {/* User Profile page */}
            <Route path="/movie/:id" element={<Movie />} /> {/* Movie details page */}
            <Route path="/login" element={<Login />} /> {/* Login page */}
            <Route path="/register" element={<Register />} /> {/* Register page */}
            <Route path="/search" element={<Search />} /> {/* Search page */}
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
