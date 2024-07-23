import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Modal,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Favorite, FavoriteBorder, Share, Edit, Delete, Add } from '@mui/icons-material';

const ViewBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [likedBlogs, setLikedBlogs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:4000/view')
      .then((res) => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to fetch blogs. Please try again.');
        setLoading(false);
      });
  }, []);

  const deleteBlog = (id) => {
    axios.delete(`http://localhost:4000/remove/${id}`)
      .then((res) => {
        setSuccess(res.data.message);
        setBlogs(blogs.filter((blog) => blog._id !== id));
      })
      .catch((err) => {
        console.error(err);
        setError('Failed to delete blog. Please try again.');
      });
  };

  const updateBlog = (blog) => {
    navigate('/edit', { state: { blog } });
  };

  const handleLike = (id) => {
    setLikedBlogs(prevLikedBlogs => ({
      ...prevLikedBlogs,
      [id]: !prevLikedBlogs[id]
    }));
    // Optionally, you can send a request to your backend to update the like count
  };

  const handleShare = (id) => {
    const shareData = {
      title: 'Blog Post',
      text: 'Check out this blog post!',
      url: `http://localhost:4000/blog/${id}`,
    };

    if (navigator.share) {
      navigator.share(shareData).then(() => {
        console.log('Blog post shared successfully');
      }).catch((err) => {
        console.error('Error sharing blog post:', err);
      });
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert('Link copied to clipboard');
      }).catch((err) => {
        console.error('Error copying link to clipboard:', err);
      });
    }
  };

  const handleOpen = (blog) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedBlog(null);
  };

  return (
    <div className="BlogContainer">
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/addblog')}
          sx={{ backgroundColor: '#8C6A5E', color: 'white', '&:hover': { backgroundColor: '#8C6A5E' } }}
        >
          Add Blog
        </Button>
      </Box>
      <Typography variant="h4" className="Myblog" marginTop={1}>My Blogs</Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {blogs.map((blog, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card className="BlogCard">
                <CardContent onClick={() => handleOpen(blog)}>
                  <Typography variant="h5" className="BlogTitle">{blog.Title}</Typography><br></br>
                  <Typography variant="caption" className="BlogAuthor">Author: {blog.Author}</Typography>
                </CardContent>
                <CardActions className="CardActions">
                  <IconButton onClick={() => handleLike(blog._id)} className="IconButton">
                    {likedBlogs[blog._id] ? <Favorite sx={{ color: 'red' }} /> : <FavoriteBorder />}
                  </IconButton>
                  <IconButton onClick={() => handleShare(blog._id)} className="IconButton">
                    <Share />
                  </IconButton>
                  <IconButton onClick={() => updateBlog(blog)} className="IconButton">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => deleteBlog(blog._id)} className="IconButton">
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      {error && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error">
            {error}
          </Alert>
        </Snackbar>
      )}
      {success && (
        <Snackbar open={true} autoHideDuration={6000} onClose={() => setSuccess('')}>
          <Alert onClose={() => setSuccess('')} severity="success">
            {success}
          </Alert>
        </Snackbar>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          {selectedBlog && (
            <>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {selectedBlog.Title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {selectedBlog.Content}
              </Typography>
              <Typography id="modal-modal-author" sx={{ mt: 2 }}>
                Author: {selectedBlog.Author}
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default ViewBlog;
