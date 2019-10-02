"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _faker = _interopRequireDefault(require("faker"));

var _chai = require("chai");

var _server = _interopRequireDefault(require("../server"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
describe('App basics', function () {
  it('should be able to sign up a new user', function (done) {
    var email = _faker["default"].internet.email();

    var name = "test";
    var user = {
      name: name,
      email: email,
      password: "123456"
    };
    (0, _supertest["default"])(_server["default"]).post('/api/auth/register/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      done();
    });
  });
});
//# sourceMappingURL=index.test.js.map