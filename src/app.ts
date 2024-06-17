import express from 'express';
import morgan from 'morgan';
// import routes from './routes';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import connectDB from './config/database';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Database connection
connectDB();

// Routes
// app.use('/api/v1', routes);

// Unknown route handler
app.use(notFoundHandler);

// Error handler
app.use(errorHandler);

export default app;
