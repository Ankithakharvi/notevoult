import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // Corrected from require('cors')

// Utility/Config Imports - Ensure these files also use 'export default' or 'export const'
import connectDB from './config/db.js'; // Added .js extension for ES Module compliance
import { notFound, errorHandler } from './middleware/errorHandler.js'; // Corrected to import

// Route Imports - Assuming your route files are now named (or can be treated as) authRoutes.js, etc.
import authRoutes from './routes/authRoutes.js'; 
import userRoutes from './routes/userRoutes.js'; 
import noteRoutes from './routes/noteRoutes.js'; 


dotenv.config({ path: './.env' });

// Database Connection
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Body parser
app.use(cors({
  origin: 'http://localhost:3000', // Allow only client origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);

// Global Error Handler (MUST be last)
app.use(notFound); // Adding notFound middleware here
app.use(errorHandler);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));