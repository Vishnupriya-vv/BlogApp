// FullBlog.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const FullBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:4000/view/${id}`)
      .then((res) => {
        setBlog(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleBack = () => {
    navigate('/View');
  };

  if (!blog) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>{blog.Title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">By {blog.Author}</Typography>
      <Typography variant="body1" style={{ marginTop: '20px' }}>{blog.Content}</Typography>
      <Button variant="outlined" color="primary" onClick={handleBack} style={{ marginTop: '20px' }}>Back to Posts</Button>
    </div>
  );
};

export default FullBlog;
