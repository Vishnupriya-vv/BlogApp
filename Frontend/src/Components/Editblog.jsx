import React, { useState } from 'react';
import { TextField, Button, Box, Typography, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditBlog = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { blog } = location.state;

  const [title, setTitle] = useState(blog.Title);
  const [content, setContent] = useState(blog.Content);
  const [author, setAuthor] = useState(blog.Author);
  const [error, setError] = useState('');

  const handleSave = () => {
    axios.put(`http://localhost:4000/edit/${blog._id}`, {
      Title: title,
      Content: content,
      Author: author
    })
    .then((response) => {
      navigate('/View');
    })
    .catch((err) => {
      setError('Failed to save the blog. Please try again.');
      console.error(err);
    });
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.formContainer}>
        <IconButton
          onClick={() => navigate('/View')}
          sx={{ position: 'absolute', top: '10px', left: '10px' }}
        >
          <ArrowBack />
          <Typography variant="body1" sx={{ marginLeft: '5px' }}>Back</Typography>
        </IconButton>
        <Typography variant="h4" gutterBottom>Edit Blog</Typography>
        {error && <Typography color="error" variant="body1">{error}</Typography>}
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={styles.textField}
        />
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          sx={styles.textField}
        />
        <TextField
          label="Author"
          variant="outlined"
          fullWidth
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          sx={{ marginBottom: '20px', marginTop: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={handleSave} disabled={!title || !content || !author} sx={styles.button}>Save</Button>
      </Box>
    </Box>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#fafafa', // Light background
    padding: '20px',
  },
  formContainer: {
    width: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    position: 'relative', // Add this line
  },
  textField: {
    marginBottom: '20px',
  },
  button: {
    marginBottom: '10px',
  },
};

export default EditBlog;
