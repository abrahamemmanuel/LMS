"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
describe('homepage', function () {
  it('Welcomes the user', function (done) {
    (0, _supertest["default"])(_server["default"]).get('/').expect(200).expect(/Welcome to the Loan Management System/, done);
  });
});
//# sourceMappingURL=index.test.js.map