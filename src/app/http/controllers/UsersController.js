/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import gravatar from 'gravatar';
import bcryptjs from 'bcryptjs';
import User from '../../../database/models/User';
import encrypt from '../../../utils/helpers';

class UsersController {
  /**
   * @params req, res
   * @desc RegisterUser creates and save a new user record into users collection
   * @return 200 status code if and only if a new user is created and saved to the users collection
   */
  RegisterUser(req, res) {
    // Search users collection by email
    User.findOne({ email: req.body.email }).then(user => {
      // Check if a user already exist with the email in the users collection
      if (user) {
        // if true then
        // return 400 status code and display 'Email already exist' to the user
        return res.status(400).json({ email: 'Email already exist' });
      } else {
        // Otherwise
        // Get avatar from gravatar
        const avatar = gravatar.url(req.body.email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default
        });

        // Create a new user
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: encrypt(req.body.password) // Hash password with bcrypt
        });

        // Save User
        newUser
          .save()
          .then(user => {
            res.status(200).json(user);
          })
          .catch(err => console.log(err));
      }
    });
  }
}

export default UsersController;
