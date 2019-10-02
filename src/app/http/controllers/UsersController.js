/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import User from '../../../database/models/User';

class UsersController {
  /**
   * @params  req, res
   * @desc    RegisterUser creates and save a new user record into users collection
   * @return 200 status code if and only if a new user is created and saved to the users collection
   */
  RegisterUser(req, res) {
    // Search users collection by email
    User.findOne({
      email: req.body.email
    }).then(user => {
      // Check if a user already exist with the email in the users collection
      if (user) {
        // if true then
        // return 400 status code and display 'Email already exist' to the user
        return res.status(400).json({
          email: 'Email already exist'
        });
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
          password: req.body.password
        });

        // hash password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        // set hash password to the newUser object
        newUser.password = hash;

        // Save User
        newUser
          .save()
          .then(user => {
           return res.status(201).json(user);
          })
          .catch(err => console.log(err));
      }
    });
  }

  /**
   * @params  req, res
   * @desc    LoginUser: find and check if user record exists in the users collection
   * @return 200 status code if and only if the user's records exists in the users collection
   */
  LoginUser(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({
      email
    }).then(user => {
      if (!user) {
        // if user's does not exists then
        // return a 404 status code to the user
         res.status(401).json({
          message: 'User not found'
        });
      }
      const isMatch = bcrypt.compareSync(password.toString(), user.password);
      if (isMatch) {
        // if true then
        // return 200 status code
         res.status(200).json({
          message: 'Success'
        });
      } else {
        // else return 404 password incorrect
        return res.status(401).json({
          message: 'Password Incorrect'
        });
      }
    });
  }
}

export default UsersController;
