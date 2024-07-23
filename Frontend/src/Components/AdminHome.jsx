import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button,IconButton, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminHome = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ Firstname: '', Lastname: '', Email: '', Password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/getloginusers'); // Replace with your actual endpoint
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/remove/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post("http://localhost:4000/addlogin", newUser);
      setUsers([...users, response.data]);
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Container maxWidth="lg" sx={{ marginTop: '50px' }}>
      <Paper elevation={3} sx={{ padding: '30px', textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Arial', fontSize: '2rem', marginBottom: '20px' }}>
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickOpen}
          sx={{ marginBottom: '20px', backgroundColor: '#8C6A5E', '&:hover': { backgroundColor: 'darkbrown' } }}
        >
          Add User
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user.Firstname}</TableCell>
                  <TableCell>{user.Lastname}</TableCell>
                  <TableCell>{user.Email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteUser(user._id)} >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details of the new user.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="Firstname"
            label="First Name"
            type="text"
            fullWidth
            value={newUser.Firstname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Lastname"
            label="Last Name"
            type="text"
            fullWidth
            value={newUser.Lastname}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Email"
            label="Email"
            type="email"
            fullWidth
            value={newUser.Email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="Password"
            label="Password"
            type="password"
            fullWidth
            value={newUser.Password}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminHome;
