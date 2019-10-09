import bodyParser from 'body-parser';
import passport from 'passport';

export const middlewares = app => {
//middleware to parse requests of extended urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}))
//middleware to parse requests of content-type - application/json
app.use(bodyParser.json())
//passport middleware
app.use(passport.initialize())
};
