/* eslint-disable no-undef */
import request from 'supertest';
import mongoose from 'mongoose';
import faker from 'faker';
import { expect } from 'chai';
import app from '../server';
import assert from 'assert';
import User from '../database/models/User';

describe('Should get index route', () => {

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
});
