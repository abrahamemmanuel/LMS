"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/test', function (req, res) {
  res.status(200).json({
    msg: 'succcess'
  });
});
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=api.js.map