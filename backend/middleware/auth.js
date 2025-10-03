import jwt from 'jsonwebtoken'; // Convert from require
import User from '../models/User.js'; // Convert from require, ensure .js extension

const protect = async (req, res, next) => {
  let token;

  // Check if token exists in the header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (format is "Bearer <token>")
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch user data (excluding password) and attach to request object
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        // Token was valid, but user doesn't exist anymore
        res.status(401);
        throw new Error('Not authorized, user not found');
      }

      next(); // Move to the next middleware/route handler
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
      // Don't call next(error) here to avoid unnecessary error handler calls on 401
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
    // Don't call next() or next(error)
  }
};

// Use named export to match the import { protect } in your route files
export { protect };