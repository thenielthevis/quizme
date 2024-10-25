// routes/user.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Registration Route
router.post('/register', async (req, res) => {
  const { fullName, email, username, password } = req.body;

  try {
    // Check for required fields
    if (!fullName || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Create a new user
    const newUser = new User({ fullName, email, username, password });
    await newUser.save();

    // Generate a token for the new user
    const token = newUser.generateAuthToken();

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user', details: error.message });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Log the currently logged-in user
    console.log('Logged in user:', {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
    });

    // Respond with the token and user details
    res.json({ token, user: { id: user._id, fullName: user.fullName, email: user.email, username: user.username } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
