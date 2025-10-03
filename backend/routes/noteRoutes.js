import express from 'express'; // Converted from require('express')
import { protect } from '../middleware/auth.js'; // Converted from require, added .js extension
import Note from '../models/Note.js'; // Converted from require, added .js extension
import { check, validationResult } from 'express-validator'; // Converted from require

const router = express.Router();

// Validation middleware for Note CRUD
const noteValidation = [
  check('title', 'Title is required').notEmpty().trim().isLength({ max: 100 }),
  check('content', 'Content is required').notEmpty().trim(),
];

// @route   GET /api/notes
// @desc    Get all notes for the authenticated user (with search/filter)
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const { search, tag, completed } = req.query;
    const query = { user: req.user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] };
    }

    if (completed !== undefined) {
      query.isCompleted = completed === 'true';
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 });
    res.json(notes);

  } catch (error) {
    res.status(500).json({ message: 'Server error fetching notes' });
  }
});

// @route   POST /api/notes
// @desc    Create a new note
// @access  Private
router.post('/', protect, noteValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, content, tags, isCompleted } = req.body;

    const note = new Note({
      user: req.user._id,
      title,
      content,
      tags: Array.isArray(tags) ? tags.map(t => t.toLowerCase()) : (tags ? [tags.toLowerCase()] : []),
      isCompleted: isCompleted || false,
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);

  } catch (error) {
    res.status(500).json({ message: 'Server error creating note' });
  }
});

// @route   PUT /api/notes/:id
// @desc    Update a note
// @access  Private
router.put('/:id', protect, noteValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title, content, tags, isCompleted } = req.body;

  try {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
      note.title = title;
      note.content = content;
      note.tags = Array.isArray(tags) ? tags.map(t => t.toLowerCase()) : (tags ? [tags.toLowerCase()] : []);
      note.isCompleted = isCompleted !== undefined ? isCompleted : note.isCompleted;

      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404).json({ message: 'Note not found or user not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error updating note' });
  }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note && note.user.toString() === req.user._id.toString()) {
      await Note.deleteOne({ _id: req.params.id });
      res.json({ message: 'Note removed' });
    } else {
      res.status(404).json({ message: 'Note not found or user not authorized' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting note' });
  }
});

export default router;