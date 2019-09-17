import express from 'express';

const app = express();

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) =>
  res.status(200).json('Welcome to the Loan Management System')
);

if (!module.parent) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
export default app;