"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _keys = _interopRequireDefault(require("./config/keys"));

var _api = _interopRequireDefault(require("./routes/api"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create express server instance
var app = (0, _express["default"])(); //middleware to parse requests of extended urlencoded

app.use(_bodyParser["default"].urlencoded({
  extended: true
})); //middleware to parse requests of content-type - application/json

app.use(_bodyParser["default"].json());
/**
 * @route GET /
 * @desc Get index route
 * @access Public
 */

app.get('/', function (req, res) {
  return res.status(200).json('Welcome to the Loan Management System');
}); // DB Config

var db = process.env.MONGODB_URI || _keys["default"].LOCALDB_URI; // Connect to MongDB

_mongoose["default"].connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('MongoDB Connected');
})["catch"](function (err) {
  return console.log(err);
}); // Check env module


var newLocal = module.parent;

if (!newLocal) {
  app.listen(_keys["default"].env, function () {
    return console.log("Server running on port ".concat(_keys["default"].env));
  });
} else {} // Load routes


var routes = _api["default"];
app.use('/api', routes);
var _default = app;
exports["default"] = _default;
//# sourceMappingURL=server.js.map