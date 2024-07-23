import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import blogLogo from './img/bloglogo.png';
import { useAuth } from '../AuthContext'; // Import useAuth

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#8C6A5E' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt="Blog Logo"
            src={blogLogo}
            sx={{ width: 40, height: 40, marginRight: '10px', borderRadius: '50%' }}
          />
          <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white', fontFamily: 'Pacifico', fontSize: '1.5rem' }}>
            Blogger
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/" sx={{ fontFamily: 'Arial', fontSize: '1rem' }}>Home</Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout} sx={{ fontFamily: 'Arial', fontSize: '1rem' }}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" component={Link} to="/login" sx={{ fontFamily: 'Arial', fontSize: '1rem' }}>
            Login/Signup
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
