import React from 'react';
import { Button, Typography, Container, Box, Grid, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const testimonials = [
  {
    name: 'John Doe',
    content: 'This blog has amazing content. It has helped me learn a lot!',
  },
  {
    name: 'Jane Smith',
    content: 'A great resource for staying updated with the latest trends.',
  },
  {
    name: 'Alice Johnson',
    content: 'The articles are very well-written and informative.',
  },
];

const Welcome = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <Box
      sx={{
        backgroundImage: 'url("/src/Components/img/bg2.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        padding: '50px 0',
      }}
    >
      <Container maxWidth="lg" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', padding: '20px' }}>
        <Box sx={{ textAlign: 'center', marginBottom: '40px' }}>
          <Typography variant="h2" gutterBottom sx={{ fontFamily: 'Pacifico', color: '#8C6A5E' }}>
            Welcome to Our Blog!
          </Typography>
          <Typography variant="h5" sx={{ marginBottom: '20px', color: '#7D6A5E' }}>
            Discover the latest news, trends, and insights from industry experts.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: '#6E4A40', '&:hover': { backgroundColor: '#4D2D23' } }}
            size="large"
            onClick={() => navigate('/login')} // Use navigate for redirection
          >
            Get Started
          </Button>
        </Box>
        
        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center' }}>
                <Typography variant="body1" sx={{ marginBottom: '10px', fontStyle: 'italic', color: '#8C6A5E' }}>
                  "{testimonial.content}"
                </Typography>
                <Typography variant="body2" sx={{ color: '#7D6A5E' }}>
                  - {testimonial.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ textAlign: 'center', marginTop: '40px' }}>
          <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Dancing Script', color: '#8C6A5E' }}>
            Start Your Journey with Us
          </Typography>
          <Typography variant="body1" sx={{ color: '#7D6A5E' }}>
            Join our community of readers and stay informed with the latest updates.
          </Typography>
        </Box>
      </Container>
      
      <Box sx={{ backgroundColor: '#222', color: '#8C6A5E', py: 6, mt: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#8C6A5E' }}>
                About Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#7D6A5E' }}>
                We are a dedicated team of bloggers passionate about sharing knowledge and insights on a wide range of topics.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#8C6A5E' }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ color: '#7D6A5E' }}>
                Email: contact@ourblogplatform.com <br />
                Phone: +123 456 7890
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#8C6A5E' }}>
                Follow Us
              </Typography>
              <Typography variant="body2" sx={{ color: '#7D6A5E' }}>
                Stay connected through our social media channels for the latest updates.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom sx={{ color: '#8C6A5E' }}>
                Subscribe
              </Typography>
              <Typography variant="body2" sx={{ color: '#7D6A5E' }}>
                Join our newsletter to get the latest blog posts and updates directly to your inbox.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Welcome;
