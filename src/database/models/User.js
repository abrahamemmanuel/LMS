import mongodb from 'mongodb';
import mongoose from 'mongoose';

const {
  Schema
} = mongoose;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('users', UserSchema);

// Export UserSchema
export default User;