"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker = _interopRequireDefault(require("faker"));

var _chai = require("chai");

var _server = _interopRequireDefault(require("../server"));

var _assert = _interopRequireDefault(require("assert"));

var _User = _interopRequireDefault(require("../database/models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
describe('Should get index route', function () {
  it('get index route', function (done) {
    (0, _supertest["default"])(_server["default"]).get('/').set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, res) {
      (0, _chai.expect)(res.body).to.equal('Welcome to the Loan Management System');
      done();
    });
  });
});
//# sourceMappingURL=index.test.js.map