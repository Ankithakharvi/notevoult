import express from 'express'; // Correct import
import { check, validationResult } from 'express-validator'; // Correct import
import jwt from 'jsonwebtoken'; // Correct import
import User from '../models/User.js'; // Assuming '../models/User.js' is the correct path and uses default export

const router = express.Router();

// Helper to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1h',
  });
};

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post(
  '/register',
  [
    check('username', 'Username is required and must be 3+ chars').isLength({ min: 3 }),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      user = new User({ username, email, password });
      await user.save();

      // Successful registration, automatically log in
      res.status(201).json({
        user: { // Nesting the user data under a 'user' key for cleaner client-side handling
          _id: user._id,
          username: user.username,
          email: user.email,
        },
        token: generateToken(user._id),
      });

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check for user
      const user = await User.findOne({ email });

      // Note: user.matchPassword is a method typically added to the User schema
      if (user && (await user.matchPassword(password))) {
        res.json({
          user: { // Nesting the user data under a 'user' key
            _id: user._id,
            username: user.username,
            email: user.email,
          },
          token: generateToken(user._id),
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Default export required for ES Modules
export default router;