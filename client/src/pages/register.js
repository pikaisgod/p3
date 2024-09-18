import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MUTATION_REGISTER } from '../utils/queries';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [register, { error }] = useMutation(MUTATION_REGISTER);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await register({
        variables: { ...formState },
      });
      localStorage.setItem('id_token', data.register.token);
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="username"
          value={formState.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formState.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <div>Registration failed</div>}
    </div>
  );
};

export default Register;
