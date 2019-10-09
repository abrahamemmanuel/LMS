"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middlewares = void 0;

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var middlewares = function middlewares(app) {
  //middleware to parse requests of extended urlencoded
  app.use(_bodyParser["default"].urlencoded({
    extended: false
  })); //middleware to parse requests of content-type - application/json

  app.use(_bodyParser["default"].json()); //passport middleware

  app.use(_passport["default"].initialize());
};

exports.middlewares = middlewares;
//# sourceMappingURL=middlewares.js.map