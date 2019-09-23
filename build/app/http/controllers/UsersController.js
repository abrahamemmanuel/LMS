"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gravatar = _interopRequireDefault(require("gravatar"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _User = _interopRequireDefault(require("../../../database/models/User"));

var _helpers = _interopRequireDefault(require("../../../utils/helpers"));

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
     * @params req, res
     * @desc RegisterUser creates and save a new user record into users collection
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
            password: (0, _helpers["default"])(req.body.password)
          }); // Hash password with bcrypt
          // const bcrypt = bcryptjs;
          // bcrypt.genSalt(10, (err, salt) => {
          //   bcrypt.hash(newUser.password, salt, (err, hash) => {
          //     newUser.password = hash;
          //     // Save user
          //     newUser
          //       .save()
          //       .then(user => res.status(200).json(user))
          //       .catch(err => console.log(err));
          //   });
          // });
          // Save User

          newUser.save().then(function (user) {
            res.status(200).json(user);
          })["catch"](function (err) {
            return console.log(err);
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