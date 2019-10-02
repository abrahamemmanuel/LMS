"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gravatar = _interopRequireDefault(require("gravatar"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../../../database/models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UsersController =
/*#__PURE__*/
function () {
  function UsersController() {
    _classCallCheck(this, UsersController);
  }

  _createClass(UsersController, [{
    key: "RegisterUser",

    /**
     * @params  req, res
     * @desc    RegisterUser creates and save a new user record into users collection
     * @return 200 status code if and only if a new user is created and saved to the users collection
     */
    value: function RegisterUser(req, res) {
      // Search users collection by email
      _User["default"].findOne({
        email: req.body.email
      }).then(function (user) {
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
          var avatar = _gravatar["default"].url(req.body.email, {
            s: '200',
            // Size
            r: 'pg',
            // Rating
            d: 'mm' // Default

          }); // Create a new user


          var newUser = new _User["default"]({
            name: req.body.name,
            email: req.body.email,
            avatar: avatar,
            password: req.body.password
          }); // hash password

          var salt = _bcryptjs["default"].genSaltSync(10);

          var hash = _bcryptjs["default"].hashSync(newUser.password, salt); // set hash password to the newUser object


          newUser.password = hash; // Save User

          newUser.save().then(function (user) {
            return res.status(201).json(user);
          })["catch"](function (err) {
            return console.log(err);
          });
        }
      });
    }
    /**
     * @params  req, res
     * @desc    LoginUser: find and check if user record exists in the users collection
     * @return 200 status code if and only if the user's records exists in the users collection
     */

  }, {
    key: "LoginUser",
    value: function LoginUser(req, res) {
      var email = req.body.email;
      var password = req.body.password; // Find user by email

      _User["default"].findOne({
        email: email
      }).then(function (user) {
        if (!user) {
          // if user's does not exists then
          // return a 404 status code to the user
          res.status(401).json({
            message: 'User not found'
          });
        }

        var isMatch = _bcryptjs["default"].compareSync(password.toString(), user.password);

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
  }]);

  return UsersController;
}();

var _default = UsersController;
exports["default"] = _default;
//# sourceMappingURL=UsersController.js.map