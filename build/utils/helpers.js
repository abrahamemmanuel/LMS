"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-shadow */

/* eslint-disable no-param-reassign */

/* eslint-disable no-return-assign */
var encrypt = function encrypt(password) {
  // Hash password with bcrypt
  var bcrypt = _bcryptjs["default"];
  bcrypt.genSalt(10, function (_err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      password = hash;
      return password;
    });
  });
};

var _default = encrypt;
exports["default"] = _default;
//# sourceMappingURL=helpers.js.map