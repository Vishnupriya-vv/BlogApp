import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext'; // Import useAuth

const Loginuser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", { Email: email, Password: password });
      const { token, role, message } = response.data;
      localStorage.setItem('token', token);
      login(); // Set authentication state

      if (role === 'admin') {
        alert(message);
        navigate('/admin-home');
      } else {
        alert(message);
        navigate('/View');
      }
    } catch (error) {
      console.error(error);
      alert("Incorrect email or password.");
    }
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px' }} >
      <Paper elevation={3} sx={{ padding: '30px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Arial', fontSize: '2rem', marginBottom: '20px' }}>
          Login
        </Typography>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#8C6A5E', '&:hover': { backgroundColor: '#8C6A5E' } }}
        >
          Login
        </Button>
        <Typography variant="body2">
          Need an account?{' '}
          <span
            onClick={handleRegisterClick}
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Register
          </span>
        </Typography>
        {error && (
          <Typography color="error" sx={{ marginTop: '20px' }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Loginuser;
