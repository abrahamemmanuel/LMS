/* eslint-disable no-shadow */
/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
import gravatar from 'gravatar';
import bcrypt from 'bcryptjs';
import User from '../../../database/models/User';
import jwt from 'jsonwebtoken';
import keys from '../../../config/keys';

class UsersController {
  /**
   * @params  req, res
   * @desc    RegisterUser creates and save a new user record into users collection
   * @return  200 status code if and only if a new user is created and saved to the users collection
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
          error: 'Email already exist'
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
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            // if (err) throw err;
            newUser.password = hash;

            // Save user
            newUser.save().then(user => {
              return res
                .status(200)
                .json({ message: 'User created successfully', user });
            });
          });
        });
      }
    });
  }

  /**
   * @params  req, res
   * @desc    LoginUser: find and check if user record exists in the users collection
   * @return  200 status code if and only if the user's records exists in the users collection
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
       return res.status(401).json({
          error: 'User not found'
        });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // if true then create JWT payload and sign token
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload
          // Sign the token
          jwt.sign(payload, keys.secret, { expiresIn: 3600 }, (err, token) => {
            return res.status(200).json({
              success: true,
              token: 'Bearer ' + token
            })
          });
        } else {
          // else return 404 password incorrect
          return res.status(401).json({
            error: 'Password incorrect'
          });
        }
      });
    });
  }
}

export default UsersController;
