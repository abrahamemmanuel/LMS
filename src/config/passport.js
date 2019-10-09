import { JwtStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import mongoose from 'mongoose';
import keys from './keys'
import User from '../database/models/User';

// create empty options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

export const passportJwt = passport => {
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    console.log(jwt_payload);
  }));
}