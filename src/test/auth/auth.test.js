/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';
import {
  expect
} from 'chai';
import app from '../../server';
import assert from 'assert';
import User from '../../database/models/User';

describe('App basics', () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.deleteMany({}, err => {
      done();
    });
  });

  it('should be able to sign up a new user', done => {
    const email = 'john@test.com';
    const name = 'test';
    let user = {
      name: name,
      email: email,
      password: '123456'
    };
    request(app)
      .post('/api/auth/register/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.deep.property(
          'user.email',
          'email'
        );
        done();
      });
  });

  it('should not be able to sign in user with invalid email', done => {
    const name = 'test';
    let user = {
      email: 'test@test.com',
      password: '123456'
    };
    request(app)
      .post('/api/auth/login/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  after(function (done) {
    return mongoose.disconnect(done);
  });
});
