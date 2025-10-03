import express from 'express'; // Converted from require('express')
import { protect } from '../middleware/auth.js'; // Converted from require, added .js
import User from '../models/User.js'; // Converted from require, added .js, assumed default export
import { check, validationResult } from 'express-validator'; // Converted from require

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  // req.user is set by the protect middleware
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

// @route   PUT /api/users/profile
// @desc    Update user profile (username/email)
// @access  Private
router.put(
  '/profile',
  protect,
  [
    check('username', 'Username must be 3+ characters').optional().isLength({ min: 3 }),
    check('email', 'Must be a valid email').optional().isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // Find the user using the ID set by the protect middleware
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;

      // NOTE: This assumes your User model has a pre-save hook to hash the password
      if (req.body.password) {
        user.password = req.body.password; 
      }
      
      const updatedUser = await user.save();
      
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
      });

    } else {
      res.status(404).json({ message: 'User not found' });
    }
  }
);

export default router;