"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passport = _interopRequireDefault(require("passport"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _passport2 = require("./config/passport");

var _api = _interopRequireDefault(require("./routes/api"));

var _middlewares = require("./app/middlewares/middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create express server instance
var app = (0, _express["default"])(); // Middlewares

(0, _middlewares.middlewares)(app); // Passport Config
//passportJwt(passport);

/**
 * @route   GET /
 * @desc    Get index route
 * @access  Public
 */

app.get('/', function (req, res) {
  return res.status(200).json('Welcome to the Loan Management System');
}); // Check env module

var newLocal = module.parent;

if (!newLocal) {
  // DB Config
  process.env.NODE_ENV = _keys["default"].MONGODB_PROD;
  var db = _keys["default"].MONGODB_DEV || process.env.NODE_ENV; // Connect to MongDB

  _mongoose["default"].connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    return console.log('MongoDB Connected');
  })["catch"](function (err) {
    return console.log(err);
  });

  app.listen(_keys["default"].env, function () {
    return console.log("Server running on port ".concat(_keys["default"].env));
  });
} else {
  _mongoose["default"].connect(_keys["default"].MONGODB_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    return console.log('MongoDB Connected');
  })["catch"](function (err) {
    return console.log(err);
  });
} // Load routes


var routes = _api["default"];
app.use('/api', routes);
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=server.js.map