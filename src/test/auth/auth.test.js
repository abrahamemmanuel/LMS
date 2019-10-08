/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';
import { expect } from 'chai';
import app from '../../server';
import assert from 'assert';
import User from '../../database/models/User';

describe('[Authentication] /auth Testing', () => {
<<<<<<< HEAD
  beforeEach(done => {
    //Before each test we empty the database
    User.deleteMany({}, err => {
      done();
    });
  });
// const email = faker.internet.email();
=======
  // beforeEach(done => {
  //   //Before each test we empty the database
  //   User.deleteMany({}, err => {
  //     done();
  //   });
  // });

>>>>>>> master
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

  it('should not be able to sign up new user with an existing email in the database', done => {
    request(app)
      .post('/api/auth/register/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        expect(res.body).to.have.property('email');
        expect(res.body).to.have.deep.property(
          'email',
          'Email already exist'
        );
        done();
      });
  });

  it('should not be able to sign in user with invalid email', done => {
    let user = {
      name: "jane",
      email: 'jane@test.com',
      password: '123456'
    };
    request(app)
      .post('/api/auth/register/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('error');
        expect(res.body).to.have.deep.property('error', 'Email already exist');
        done();
      });
  });

<<<<<<< HEAD
  afterEach(function(done) {
=======
  it('should not be able to sign in user with invalid password', done => {
    let user = {
      email: 'jane@test.com',
      password: 'BadPass!'
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
        expect(res.body).to.have.deep.property('error', 'Password incorrect');
        done();
      });
  });
  after(function(done) {
>>>>>>> master
    return mongoose.disconnect(done);
  });
});
