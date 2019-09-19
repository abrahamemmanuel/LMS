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

const router = express.Router();

// Create new instance of the controllers here
const usersController = new UsersController();

/**
 * @route POST api/users/register
 * @desc Register User
 * @access Public
 */
router.get('/users/register', usersController.RegisterUser);

export default router;
