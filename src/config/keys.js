const key = {
  MONGODB_DEV: 'mongodb://localhost/loanApp',
  MONGODB_PROD: 'mongodb+srv://emmanuel:mypass123@lms-yultn.mongodb.net/LMS?retryWrites=true&w=majority',
  MONGODB_TEST: 'mongodb://localhost/lms_test',
  env: process.env.PORT || 5000,
  secret: 'secret'
};
export default key;
