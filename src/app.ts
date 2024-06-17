import express from 'express';
import morgan from 'morgan';

import { healthCheck } from './controllers/healthController';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/database';
import { authRoutes } from './routes/authRoutes';
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database connection
connectDB();

// Routes
app.use('/api/v1', authRoutes);

// Home route
app.get('/', (_req, res) => {
	res.send('Hello World');
});

// Health check endpoint
app.get('/health', healthCheck);

// Unknown route handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
