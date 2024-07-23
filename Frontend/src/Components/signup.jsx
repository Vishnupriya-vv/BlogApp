import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../AuthContext'; // Import useAuth

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Get login function from AuthContext
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formValidation = () => {
    let isValid = true;

    if (!firstName) {
      toast.warn('First name is required');
      isValid = false;
    }

    if (!lastName) {
      toast.warn('Last name is required');
      isValid = false;
    }

    if (!email) {
      toast.warn('Email is required');
      isValid = false;
    }

    if (!password) {
      toast.warn('Password is required');
      isValid = false;
    }

    return isValid;
  };

  const handleSignup = async () => {
    if (!formValidation()) return;
  
    const inputs = {
      Firstname: firstName,
      Lastname: lastName,
      Email: email,
      Password: password
    };
  
    try {
      const response = await axios.post("http://localhost:4000/addlogin", inputs);
      toast.success(response.data.message);
      login(); // Set authentication state after successful signup
      navigate('/login'); // Navigate to the ViewBlog page or another appropriate page
    } catch (error) {
      toast.error("Signup failed. Please try again.");
      console.error("Error: ", error);
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '50px' }}>
      <Paper elevation={3} sx={{ padding: '30px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Arial', fontSize: '2rem', marginBottom: '20px' }}>
          Sign Up
        </Typography>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ marginBottom: '20px' }}
        />
        <TextField
          label="Email"
          type="email"
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
          onClick={handleSignup}
          fullWidth
          sx={{ marginBottom: '20px', backgroundColor: '#8C6A5E', '&:hover': { backgroundColor: 'darkbrown' } }}
        >
          Sign Up
        </Button>
        <Typography variant="body2">
          Already have an account?{' '}
          <span
            onClick={handleLoginClick}
            style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Login
          </span>
        </Typography>
        <ToastContainer />
      </Paper>
    </Container>
  );
};

export default Signup;
