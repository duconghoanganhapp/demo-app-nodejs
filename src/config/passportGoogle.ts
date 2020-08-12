import * as Users from '../models/mysql/User';
import GoogleStrategy from 'passport-google-oauth';
import  passport from 'passport';
const keyGoogle = {
    googleClientId:'589379104105-go8i0rihvt8301lgbaitb8m139iraj2h.apps.googleusercontent.com',
    googleSecretClient: 'FvOOXE1kvR9hHVls08gnzxha'
};
passport.use(new GoogleStrategy.OAuth2Strategy({
   clientID: keyGoogle.googleClientId,
   clientSecret: keyGoogle.googleSecretClient,
   callbackURL: "https://localhost:8005/auth/google/callback"
}, 
async(accessToken, refreshToken, profile, done) => {
   const user = await Users.findOrCreate(profile);
   if(user) return done(null,user);
   return done(null, false);
}));
passport.serializeUser((user, done) => {  
   done(null, user);
 });
 passport.deserializeUser( async(user: any, done) => {
   const userCheck = await Users.findOrCreate(user);
   if(user) return done(userCheck);
   return done(null, false);
 });