/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';
import { expect } from 'chai';
import app from '../server';
import assert from 'assert';
import User from '../database/models/User';

describe('Empty database', () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.remove({}, err => {
      done();
    });
  });
});

describe('App basics', () => {
  it('get index route', done => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err, res) => {
        expect(res.body).to.equal('Welcome to the Loan Management System');
        done();
      });
  });

  // it('should be able to sign up a new user', (done) => {
  //     const email = faker.internet.email();
  //     const name = "test"
  //     let user = {
  //       name: name,
  //       email: email,
  //       password: "123456"
  //     }
  //     request(app)
  //       .post('/api/auth/register/')
  //       .send(user)
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .end((err, res) => {
  //         expect(res.body).to.be.an('object');
  //         done();
  //       });
  // });
});

