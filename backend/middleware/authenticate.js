const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as necessary

// Middleware to authenticate requests
const authenticate = async (req, res, next) => {
  // Get the token from the headers
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in your .env
    req.user = await User.findById(decoded.id); // Attach the user object to the request

    if (!req.user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    next(); // Continue to the next middleware or route
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticate;
