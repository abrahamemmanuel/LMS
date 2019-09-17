/* eslint-disable no-undef */
import request from 'supertest';
import app from '../server';

describe('homepage', () => {
  it('Welcomes the user', done => {
    request(app)
      .get('/')
      .expect(200)
      .expect(/Server runnig on port 5000/, done);
  });
});
