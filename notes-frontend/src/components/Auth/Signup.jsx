import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.module.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/notes_api/signup.php',
        JSON.stringify(formData),
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.success) {
        alert(response.data.message);
        navigate('/login');  // Redirect to Login page
      } else {
        setError(response.data.message || 'Failed to register user');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error connecting to the server. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <button type="submit">Signup</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Signup;
