import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as validator from 'express-validator';
import  passport from 'passport';
import *as Users from '../models/mysql/User';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import { MESSAGE } from '../utils/messages';

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${param}: ${msg}`;
  };

export var login = (req: Request, res: Response) => {       
    res.render('auth/login', { 
        layout: 'auth/layout',
     });
}
export var handleLogin = (req: Request, res: Response, next: NextFunction) => {
    let errors = validator.validationResult(req);
    if(!errors.isEmpty()) {
        for(let x of errors.array({ onlyFirstError: true })) {
            req.flash(x.param, x.msg);
        }
        res.redirect('/auth/login');
    } else {
        next();
    }
}
export var register =  (req: Request, res: Response) => {       
    res.render('auth/register', { 
        layout: 'auth/layout',
     });
}
export var handleRegister =  (req: Request, res: Response, next: NextFunction) => {   
    let errors = validator.validationResult(req);
    if (!errors.isEmpty()) { 
        for(let x of errors.array({ onlyFirstError: true })) {
            req.flash(x.param, x.msg);     
        }
        res.redirect('/auth/register');  
        res.end();
    } else {        
        bcrypt.hash(req.body.password, 10).then( hash => {
            // Store hash in your password DB.
            Users.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                role: 0
              }, (err, result) => {
                  if (err !== undefined || result === undefined) {
                    req.flash('error', 'create fail !!!');
                    return res.redirect('/auth/register');
                  }
                  req.flash('success', 'create user successful !!!');
                  return res.redirect('/auth/login');
              });
        });
    }
}
export const logout = (req: Request, res: Response) => {    
    req.logout();
    res.redirect('/auth/login');
}
export const forgot = (req: Request, res: Response) => {
    res.render('auth/forgotPassword', {
        layout: 'auth/layout'
    })
}
export const forgotPost = (req: Request, res: Response) => {
    let { email } = req.body;
    Users.findOne(email, (err, result) => {
        if (err !== undefined || result === undefined) {
            req.flash('problem', MESSAGE.APIEC003);
            return res.redirect('/auth/forgot');
        }
        if(!result) {
            req.flash('empty', MESSAGE.EMPTY('Email'));
            return res.redirect('/auth/forgot');
        }
        let randomPass = Math.floor((Math.random() * 100000) + 100000);
        var hashPass = bcrypt.hashSync(String(randomPass), 10);
        var user = Users.updatePassword(hashPass, result.email);
        if (!user) {
            return res.redirect('/auth/forgot');
        }
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            secure: false,
            auth: {
                user: 'laravelprojectshop@gmail.com',
                pass: '0343591529a'
            }
        });
        var mailOptions = {
            from: 'laravelprojectshop@gmail.com',
            to: result.email,
            subject: 'New password !',
            text: 'Password change is: ' + randomPass,
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.redirect('/auth/forgot');
            }
             else {
                 req.flash('emailPass', 'sended password to ' + result.email + ', please check it :_)')
                return res.redirect('/auth/change');
            }
          });
    });
}
export const change = (req: Request, res: Response) => {
    return res.render('auth/changePassword', {
        layout: 'auth/layout'
    })
}
export const changePost = (req: Request, res: Response) => {
    let errors = validator.validationResult(req);
    if (!errors.isEmpty()) { 
        console.log(errors.array({ onlyFirstError: true }));
        
        for(let x of errors.array({ onlyFirstError: true })) {
            req.flash(x.param, x.msg);     
        }
        return res.redirect('/auth/change');  
    } 
    Users.findOne(req.body.email, (err, result) => {
        if(err !== undefined || result === undefined) {
            // return something =>> you like
            return;
        }
        if (!bcrypt.compareSync(req.body.passwordOld, result.password)) {
            req.flash('failPassOld', '.....');
            return res.redirect('/auth/change');
        }
        var hashPass = bcrypt.hashSync(req.body.password, 10);
        var user = Users.updatePassword(hashPass, result.email);
        if (!user) {
            // update pass fail
            return res.redirect('/auth/change');
        }
        req.flash('success', 'change password successfuly');
        return res.redirect('/auth/login');
    });
}
export const google = () => {

}