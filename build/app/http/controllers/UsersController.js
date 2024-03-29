"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gravatar = _interopRequireDefault(require("gravatar"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../../../database/models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _keys = _interopRequireDefault(require("../../../config/keys"));

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
     * @return  200 status code if and only if a new user is created and saved to the users collection
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
            error: 'Email already exist'
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

          _bcryptjs["default"].genSalt(10, function (err, salt) {
            _bcryptjs["default"].hash(newUser.password, salt, function (err, hash) {
              // if (err) throw err;
              newUser.password = hash; // Save user

              newUser.save().then(function (user) {
                return res.status(200).json({
                  message: 'User created successfully',
                  user: user
                });
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
          return res.status(401).json({
            error: 'User not found'
          });
        }

        _bcryptjs["default"].compare(password, user.password).then(function (isMatch) {
          if (isMatch) {
            // if true then create JWT payload and sign token
            var payload = {
              id: user.id,
              name: user.name,
              avatar: user.avatar
            }; // Create JWT payload
            // Sign the token

            _jsonwebtoken["default"].sign(payload, _keys["default"].secret, {
              expiresIn: 3600
            }, function (err, token) {
              return res.status(200).json({
                success: true,
                token: 'Bearer ' + token
              });
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
  }]);

  return UsersController;
}();

var _default = UsersController;
exports["default"] = _default;
//# sourceMappingURL=UsersController.js.map