"use strict";

var _supertest = _interopRequireDefault(require("supertest"));

var _faker = _interopRequireDefault(require("faker"));

var _chai = require("chai");

var _server = _interopRequireDefault(require("../server"));

var _assert = _interopRequireDefault(require("assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/* eslint-disable no-undef */
// describe('User registration', () => {
//   it('should be able to sign up a new user', done => {
//     request(app)
//       .post('/auth/register')
//       .send({
//         // mock valid user input
//         name: 'jane',
//         email: 'jane@test.com',
//         password: '123456'
//       })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /json/)
//       .expect(201)
//       .expect(res.body).to.be.an('object')
//       .end((err, response) => {
//         assert.deepEqual(response.body, {
//           name: 'Alex',
//           city: 'London',
//           age: 25
//         });
//         done();
//       });
//   });
// });
// it('should not be able to sign in if email is incorrect', done => {
//   request(app)
//     .post('/auth/login')
//     .send({
//       email: 'jane@test.com2',
//       password: 'Pass123!'
//     })
//     .set('Accept', 'application/json')
//     .expect('Content-Type', /json/)
//     .expect(401)
//     .end((err, res) => {
//       expect(res.body.message).to.be.equal('User not found');
//       done();
//     });
// });
// describe('User registration', () => {
//   it('should not be able to sign in if email is incorrect', () => {
//     return request(app)
//       .post('/auth/register')
//       .send({
//         // mock valid user input
//         name: 'jane',
//         email: 'jane@test.com',
//         password: '123456'
//       })
//       .set('Accept', 'application/json')
//       .expect('Content-Type', /html/)
//       .expect(res => {
//         assert.equal(res.body, 'registration was successful!');
//       });
//   });
// });
it('should respond with JSON data when API is called', function (done) {
  //mock valid user input
  var new_user = {
    "name": "jane",
    "email": "jane@test.com",
    "password": "secret"
  };
  (0, _supertest["default"])(_server["default"]).post('/auth/register').send(new_user).expect(200).end(function (err, response) {
    _assert["default"].deepEqual(response.body.new_user, {
      name: "jane",
      email: "jane@test.com",
      password: "123456"
    });

    done();
  });
});
//# sourceMappingURL=index.test.js.map