// Importing necessary modules
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('./connection');
const User = require('./model/user');
const Request = require('./model/Request');

// Initializing the app
const app = express();

// Middleware
app.use(express.json()); // Enable JSON parsing
app.use(cors()); // Enable CORS

// Predefined admin credentials
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin'; 

// Route to handle user signup
app.post('/addlogin', async (req, res) => {
    try {
        console.log(req.body);
        await Request(req.body).save();
        res.send({ message: 'User added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to add user' });
    }
});

// Route to handle user login
app.post('/login', async (req, res) => {
    try {
        const { Email, Password } = req.body;
        const existingUser = await Request.findOne({ Email });
        if (Email === ADMIN_EMAIL && Password === ADMIN_PASSWORD) {
            const token = jwt.sign({ email: Email, role: 'admin' }, 'secret_key', { expiresIn: '1h' });
            return res.send({ message: 'Admin login successful', token, role: 'admin' });
        }

        if (!existingUser) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        if (Password !== existingUser.Password) {
            return res.status(400).send({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: existingUser._id }, 'secret_key', { expiresIn: '1h' });
        res.send({ message: 'Login successful', token, role: 'user' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'An error occurred while logging in' });
    }
});

// Route to add data to the database
app.post('/add', async (req, res) => {
    try {
        console.log(req.body);
        await User(req.body).save();
        res.send({ message: 'Data added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to add data' });
    }
});

// Route to view all users
app.get('/view', async (req, res) => {
    try {
        const data = await User.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});

// Route to delete a user by ID
app.delete('/remove/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        await User.findByIdAndDelete(req.params.id);
        res.send({ message: 'User deleted' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
});

// Route to update a user by ID
app.put('/edit/:id', async (req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body);
        res.send({ message: 'User updated', data });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to update user' });
    }
});

// Route to fetch all login users (for admin view)
app.get('/getloginusers', async (req, res) => {
    try {
        
        const data = await Request.find();
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});

// Starting the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});
