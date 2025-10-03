
require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Note = require('../models/Note');

const seedData = async () => {
  await connectDB();

  try {
    console.log('Clearing existing data...');
    await User.deleteMany();
    await Note.deleteMany();

    const hashedPassword = await bcrypt.hash('password123', 10);

    const internUser = await User.create({
      username: 'intern_user',
      email: 'intern@example.com',
      password: hashedPassword,
      role: 'intern',
    });

    const adminUser = await User.create({
      username: 'admin_user',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });

    const notes = [
      {
        user: internUser._id,
        title: 'Complete React Components',
        content: 'Implement all required components: Button, Input, Card, Modal.',
        tags: ['frontend', 'react'],
        isCompleted: false,
      },
      {
        user: internUser._id,
        title: 'Setup API Integration',
        content: 'Configure Axios interceptors and integrate AuthContext.',
        tags: ['frontend', 'backend', 'auth'],
        isCompleted: true,
      },
      {
        user: adminUser._id,
        title: 'Review Intern Code',
        content: 'Check for security best practices and scalability issues.',
        tags: ['backend', 'security'],
        isCompleted: false,
      },
      {
        user: internUser._id,
        title: 'Tailwind Styling Pass',
        content: 'Ensure responsiveness and clean, modern look across all pages.',
        tags: ['frontend', 'css'],
        isCompleted: false,
      },
    ];

    await Note.insertMany(notes);

    console.log('Database seeded successfully!');
    console.log('Default User: intern@example.com / password123');
    process.exit();

  } catch (error) {
    console.error('Error during seeding:', error.message);
    process.exit(1);
  }
};

seedData();