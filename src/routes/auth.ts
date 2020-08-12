import * as express from 'express';
import { Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import * as AuthController from '../controllers/AuthController';
import * as rulesAuth from '../rules/auth';
import  passport from 'passport';
import { forwardAuthenticated } from '../config/auth';

const router = express.Router();
router.get('/login', forwardAuthenticated,(req: Request, res: Response, next: NextFunction) => {
   if(req.isAuthenticated()) {
      return res.redirect('back');
   }
   next();
},AuthController.login);
router.post('/login' , rulesAuth.handleLogin, AuthController.handleLogin, passport.authenticate('local',
 { 
    failureFlash : true,
    successFlash: true ,
    failWithError: true
 }), (req : Request, res: Response, next: NextFunction) => {    
     console.log(req.query.url);
     if (req.query.url === undefined) return res.redirect('/');
     return res.redirect(req.query.url);  
},
 (err: ErrorRequestHandler, req : Request, res: Response, next: NextFunction) => {
    req.flash('emailValue', req.body.email);
    res.redirect('/auth/login');
 });
router.get('/register', AuthController.register); 
router.post('/register',rulesAuth.checkRegister, AuthController.handleRegister);
router.get('/forgot', AuthController.forgot);
router.post('/forgot', AuthController.forgotPost);
router.get('/change', AuthController.change);
router.post('/change',rulesAuth.change, AuthController.changePost);
router.get('/logout', AuthController.logout);
router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/');
  });

export default router;