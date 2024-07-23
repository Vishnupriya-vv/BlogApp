import React, { useEffect, useState } from 'react';
import { TextField, Typography, Button, CircularProgress, Container, Paper, Grid, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const AddBlog = () => {
  const [inputs, setInputs] = useState({ Title: "", Content: "", Author: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputHandler = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setInputs({ ...inputs, Content: value });
  };

  const location = useLocation();
  const navigate = useNavigate();

  const submitHandler = () => {
    if (!inputs.Title || !inputs.Content || !inputs.Author) {
      setError("All fields are required");
      return;
    }

    setLoading(true);
    const request = location.state !== null 
      ? axios.put(`http://localhost:4000/edit/${location.state.blog._id}`, inputs)
      : axios.post("http://localhost:4000/add", inputs);
    
    request
      .then((res) => {
        alert(res.data.message);
        navigate('/View');
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (location.state !== null) {
      setInputs({
        Title: location.state.blog.Title,
        Content: location.state.blog.Content,
        Author: location.state.blog.Author
      });
    }
  }, [location.state]);

  return (
    <Container maxWidth="md" sx={{ marginTop: '50px' }}>
      <Paper elevation={3} sx={{ padding: '30px', position: 'relative' }}>
        <IconButton
          onClick={() => navigate('/View')}
          sx={{ position: 'absolute', top: '10px', left: '10px' }}
        >
          <ArrowBack />
          <Typography variant="body1" sx={{ marginLeft: '5px' }}>Back</Typography>
        </IconButton>
        <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', fontFamily: 'italic', color: '#8C6A5E' }}>
          {location.state !== null ? 'Edit Blog' : 'Add Blog'}
        </Typography>
        {error && (
          <Typography color="error" align="center" sx={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              color="secondary"
              name="Title"
              value={inputs.Title}
              onChange={inputHandler}
              required
            />
          </Grid>
          <Grid item>
            <ReactQuill
              value={inputs.Content}
              onChange={handleContentChange}
              theme="snow"
              style={{ height: '200px' }}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              color="secondary"
              name="Author"
              value={inputs.Author}
              onChange={inputHandler}
              sx={{ marginTop: '60px' }}
              required
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={submitHandler}
              fullWidth
              disabled={loading}
              sx={{ marginTop: '10px' }}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default AddBlog;
