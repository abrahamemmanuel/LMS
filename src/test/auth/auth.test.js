/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';
import { expect } from 'chai';
import app from '../../server';
import assert from 'assert';
import User from '../../database/models/User';

describe('[Authentication] /auth Testing', () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.deleteMany({}, err => {
      done();
    });
  });

  let user = {
    name: 'jane',
    email: 'jane@test.com',
    password: '123456'
  };
  it('should be able to sign up new user', done => {
    request(app)
      .post('/api/auth/register/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body).to.have.deep.property(
          'message',
          'User created successfully'
        );
        done();
      });
  });

  it('should not be able to sign in user with invalid email', done => {
    let user = {
      email: 'jane@test.com9',
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
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'User not found');
        done();
      });
  });

  after(function(done) {
    return mongoose.disconnect(done);
  });
});
