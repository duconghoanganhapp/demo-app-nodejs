import { Request, Response, NextFunction } from 'express';
import * as validator from 'express-validator';
import * as jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs";
import * as Users from '../../models/mysql/User';
import  { MESSAGE } from '../../utils/messages';
export const register = (req: Request, res: Response, next: NextFunction) => {
    let errors = validator.validationResult(req);
    if (!errors.isEmpty()) { 
        return res.json(errors.array({ onlyFirstError: true }));
    }
    bcrypt.hash(req.body.password, 10).then( hash => {
        // Store hash in your password DB.
        let user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: 1,
                email: req.body.email,
                delFlg: 0,
                password: hash,

            }
        Users.create(user, (err, result) => {
            if(typeof err !== 'undefined' || typeof result === 'undefined') {
                return res.status(404).json({
                    status: MESSAGE.BAD_REQUEST,
                    message: MESSAGE.APIEC003
                });
            }
            return res.status(200).json({
                status: MESSAGE.BAD_REQUEST,
                data: result
            });
        });
    });
}
export const login =  (req: Request, res: Response, next: NextFunction) => {
    Users.findOne(req.body.email, (err, result) => {
        if (typeof err !== 'undefined' || typeof result === 'undefined') {
            return res.status(404).json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
       if (bcrypt.compareSync(req.body.password, result.password) === false) {
            return res.status(404).json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
       }
        jwt.sign({ foo: 'bar' }, process.env.JWT_SECRET, { expiresIn: 60 * 60 }, (err, token) => {
            if (err) {
                return res.status(404).json({
                    status: MESSAGE.BAD_REQUEST,
                    message: MESSAGE.APIEC003
                 });
              }
            delete result['password'];
              
              return res.status(200).json({
                status: MESSAGE.SUCCESS,
                token: token,
                data: result
            })
        });
    });
}