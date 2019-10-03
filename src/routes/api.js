import express from 'express';
import UsersController from '../app/http/controllers/UsersController';

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| This is where API routes for the application is been registered. These
| routes are loaded in the server.js file and 
| is assigned the '/api' prefix. Now build awsome API(s)!
|
*/

// create a new instance of express router
const router = express.Router();

// Create new instance of the controllers here
const usersController = new UsersController();

/**
 * @route   POST api/users/register
 * @desc    Register User
 * @access  Public
 */
router.post('/auth/register', usersController.RegisterUser);

/**
 * @route   POST api/users/login
 * @desc    Login User
 * @access  Public
 */
router.post('/auth/login', usersController.LoginUser);

export default router;
