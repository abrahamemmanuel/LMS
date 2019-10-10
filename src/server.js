import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import key from './config/keys';
import { passportJwt } from './config/passport';
import router from './routes/api';
import { middlewares } from './app/middlewares/middlewares';

// Create express server instance
const app = express();

// Middlewares
 middlewares(app);

// Passport Config
//passportJwt(passport);

/**
 * @route   GET /
 * @desc    Get index route
 * @access  Public
 */
app.get('/', (req, res) =>
  res.status(200).json('Welcome to the Loan Management System')
);
// connect to test database
    mongoose
      .connect(key.MONGODB_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));

// Check env module
const newLocal = module.parent;
if (!newLocal) {
  // DB Config
  process.env.NODE_ENV = key.MONGODB_PROD;
  const db = key.MONGODB_DEV || process.env.NODE_ENV;

  // Connect to MongDB
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
  app.listen(key.env, () => console.log(`Server running on port ${key.env}`));
} 

// Load routes
const routes = router;
app.use('/api', routes);

export default app;
