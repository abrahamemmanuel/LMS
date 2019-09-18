"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("./config/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Create express server instance
var app = (0, _express["default"])();
/**
 * @description Get index route
 */

app.get('/', function (req, res) {
  return res.status(200).json('Welcome to the Loan Management System');
}); // DB Config

var db = _keys["default"].LOCALDB_URI;
var newLocal = module.parent;

if (!newLocal) {
  app.listen(_keys["default"].env, function () {
    return console.log("Server running on port ".concat(_keys["default"].env));
  }); // Connect to MongDB

  _mongoose["default"].connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(function () {
    return console.log('MongoDB Connected');
  })["catch"](function (err) {
    return console.log(err);
  });
}

var _default = app;
exports["default"] = _default;
//# sourceMappingURL=server.js.map