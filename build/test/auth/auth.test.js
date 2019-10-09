"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _faker = _interopRequireDefault(require("faker"));

var _chai = require("chai");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _server = _interopRequireDefault(require("../../server"));

var _assert = _interopRequireDefault(require("assert"));

var _User = _interopRequireDefault(require("../../database/models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
describe('[Authentication] /auth Testing', function () {
  beforeEach(function (done) {
    //Before each test we empty the database
    _User["default"].deleteMany({}, function (err) {
      done();
    });
  });
  it('should be able to sign up new user', function (done) {
    var user = {
      name: 'admin',
      email: 'admin@test.com',
      password: '123456'
    };
    (0, _supertest["default"])(_server["default"]).post('/api/auth/register/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.property('message');
      (0, _chai.expect)(res.body).to.have.deep.property('message', 'User created successfully');
      done();
    });
  });
  it('should not be able to sign up new user with an existing email in the database', function (done) {
    var user = {
      name: 'admin5',
      email: 'admin@test.com',
      password: '123456'
    };
    (0, _supertest["default"])(_server["default"]).post('/api/auth/register/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body).to.have.deep.property('error', 'Email already exist');
      done();
    });
  });
  it('should not be able to sign in user with invalid email', function (done) {
    var user = {
      email: 'admin@test.com10',
      password: '123456'
    };
    (0, _supertest["default"])(_server["default"]).post('/api/auth/login/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(401).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body).to.have.deep.property('error', 'User not found');
      done();
    });
  });
  it('should not be able to sign in user with invalid password', function (done) {
    var user = {
      email: 'admin@test.com',
      password: 'BadPass!'
    };
    (0, _supertest["default"])(_server["default"]).post('/api/auth/login/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(401).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body).to.have.deep.property('error', 'Password incorrect');
      done();
    });
  });
});
//# sourceMappingURL=auth.test.js.map