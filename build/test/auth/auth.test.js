"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _faker = _interopRequireDefault(require("faker"));

var _chai = require("chai");

var _server = _interopRequireDefault(require("../../server"));

var _assert = _interopRequireDefault(require("assert"));

var _User = _interopRequireDefault(require("../../database/models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
describe('[Authentication] /auth Testing', function () {
  // beforeEach(done => {
  //   //Before each test we empty the database
  //   User.deleteMany({}, err => {
  //     done();
  //   });
  // });
  var user = {
    name: 'jane',
    email: 'jane@test.com',
    password: '123456'
  };
  it('should be able to sign up new user', function (done) {
    (0, _supertest["default"])(_server["default"]).post('/api/auth/register/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(201).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.property('message');
      (0, _chai.expect)(res.body).to.have.deep.property('message', 'User created successfully');
      done();
    });
  });
  it('should not be able to sign up new user with an existing email in the database', function (done) {
    (0, _supertest["default"])(_server["default"]).post('/api/auth/register/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(400).end(function (err, res) {
      (0, _chai.expect)(res.body).to.have.property('email');
      (0, _chai.expect)(res.body).to.have.deep.property('email', 'Email already exist');
      done();
    });
  });
  it('should not be able to sign in user with invalid email', function (done) {
    var user = {
      email: 'jane@test.com9',
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
      email: 'jane@test.com',
      password: 'BadPass!'
    };
    (0, _supertest["default"])(_server["default"]).post('/api/auth/login/').send(user).set('Accept', 'application/json').expect('Content-Type', /json/).expect(401).end(function (err, res) {
      (0, _chai.expect)(res.body).to.be.an('object');
      (0, _chai.expect)(res.body).to.have.property('error');
      (0, _chai.expect)(res.body).to.have.deep.property('error', 'Password incorrect');
      done();
    });
  });
  after(function (done) {
    return _mongoose["default"].disconnect(done);
  });
});
//# sourceMappingURL=auth.test.js.map