const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
// This middleware checks for a valid JWT token in the request header.
// If the token is valid, it decodes the user information and attaches it to the request object.
// If the token is missing or invalid, it returns a 401 Unauthorized response.
// This is useful for protecting routes that require authentication, ensuring that only users with a valid token can access them.
// This middleware is used to protect routes by verifying the JWT token provided in the request header.
// It ensures that only authenticated users can access certain routes in the application.
// This middleware is essential for securing API endpoints and ensuring that only authorized users can perform actions that require authentication.
// This middleware is used to protect routes by verifying the JWT token provided in the request header.