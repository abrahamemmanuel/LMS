import express from 'express';
import mongoose from 'mongoose';
import key from './config/keys';

// Create express server instance
const app = express();

/**
 * @description Get index route
 */
app.get('/', (req, res) =>
  res.status(200).json('Welcome to the Loan Management System')
);

// DB Config
const db = key.LOCALDB_URI;
// Check env
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
export default app;
