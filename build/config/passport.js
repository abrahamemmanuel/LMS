"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportJwt = void 0;

var _passportJwt = require("passport-jwt");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("./keys"));

var _User = _interopRequireDefault(require("../database/models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// create empty options
var opts = {};
opts.jwtFromRequest = _passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = _keys["default"].secret;

var passportJwt = function passportJwt(passport) {
  passport.use(new _passportJwt.JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
  }));
};

exports.passportJwt = passportJwt;
//# sourceMappingURL=passport.js.map