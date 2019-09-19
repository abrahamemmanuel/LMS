import express from 'express';
import mongoose from 'mongoose';
import key from './config/keys';
import router from './routes/api';

// Create express server instance
const app = express();

/**
 * @route GET /
 * @desc Get index route
 * @access Public
 */
app.get('/', (req, res) =>
  res.status(200).json('Welcome to the Loan Management System')
);

// Bodyparser
app.use(
  express.urlencoded({
    extended: true
  })
);

// DB Config
const db = key.LOCALDB_URI;

// Check env module
const newLocal = module.parent;
if (!newLocal) {
  app.listen(key.env, () => console.log(`Server running on port ${key.env}`));
  // Connect to MongDB
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
}

// Load routes
const route = router;
app.use('/api', route);

export default app;
