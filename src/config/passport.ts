import LocalStrategy from 'passport-local';
import  passport from 'passport';
import * as Users from '../models/mysql/User';
import bcrypt from 'bcryptjs';
passport.use(new LocalStrategy.Strategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (username, password, done) => {    
    Users.findOne(username, (err: Error, result: any) => {      
      if (typeof err !== 'undefined') {
        return done(err);
      }
      if (!result) return done(null, false, { message: 'Incorrect email or password.' });
      bcrypt.compare(password, result.password, function(err, res) {        
        if(err) return done(err);
        if (res) return done(null, result, { message: 'Welcome !!!' });
        return done(null, false, { message: 'Incorrect email or password.' });
      }); 
    });
  }
));
passport.serializeUser((user, done) => {  
  done(null, user);
});
passport.deserializeUser(function(user: any, done) {
  Users.findOne(user.email, (err: Error, result: any) => {
    if (typeof err !== 'undefined') {
      return done(err);
    }
    return done(null, result);
  });
});