"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _UsersController = _interopRequireDefault(require("../app/http/controllers/UsersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
var router = _express["default"].Router(); // Create new instance of the controllers here


var usersController = new _UsersController["default"]();
/**
 * @route POST api/users/register
 * @desc Register User
 * @access Public
 */

router.post('/users/register', usersController.RegisterUser);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=api.js.map