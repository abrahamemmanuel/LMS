import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import key from './config/keys';
import router from './routes/api';

// Create express server instance
const app = express();

//middleware to parse requests of extended urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
//middleware to parse requests of content-type - application/json
app.use(bodyParser.json())

/**
 * @route GET /
 * @desc Get index route
 * @access Public
 */
app.get('/', (req, res) =>
  res.status(200).json('Welcome to the Loan Management System')
);

// DB Config
const db = key.LOCALDB_URI || key.MONGODB_URI;

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
const routes = router;
app.use('/api', routes);

export default app;
