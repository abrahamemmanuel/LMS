/* eslint-disable no-undef */
import request from 'supertest';
import faker from 'faker';
import {
  expect
} from 'chai';
import app from '../server';
import assert from 'assert';

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
describe('User registration', () => {

  it('Should return 201 and confirmation for valid input', (done) => {
    //mock valid user input
    const new_user = {
      "name": "John Wick",
      "email": "john@wick.com",
      "password": "secret"
    }
    //send request to the app
    chai.request(app).post('/register')
      .send(new_user)
      .then((res) => {
        //console.log(res.body);
        //assertions
        expect(res).to.have.status(201);
        expect(res.body.message).to.be.equal("User created!");
        expect(res.body.errors.length).to.be.equal(0);
        done();
      }).catch(err => {
        console.log(err.message);
      })
  });

})