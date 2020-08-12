import { Request, Response, NextFunction } from 'express';
import * as Users from '../../models/mysql/User';
import  { MESSAGE } from '../../utils/messages';
const jwtSecret = <string>process.env.JWT_SECRET;
export const list = (req: Request, res: Response, next: NextFunction) => {
    let keyword: string = '';    
    if (typeof req.query.keyword !== 'undefined') {
        keyword = req.query.keyword;
    }    
    Users.search(keyword, (err: Error, result: Object) => {
        if (typeof result === 'undefined' || typeof err !== 'undefined') {
            return res.status(404).json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
        return res.status(200).json({
            status: MESSAGE.SUCCESS,
            data: result,
            keyword: keyword
        });
    });
}
export const search = (req: Request, res: Response, next: NextFunction) => {
    Users.findById(Number(req.params.id), (err, result) => {
        if (typeof err !== 'undefined' || typeof result === 'undefined') {
            return res.status(404).json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
        return res.status(200).json({
            status: MESSAGE.SUCCESS,
            data: result,
        });
    });
}
export const edit = (req: Request, res: Response, next: NextFunction) => {
    let user = {
        firstName : req.body.firstName, 
        lastName : req.body.lastName, 
        email : req.body.email
     };
    if (req.body.password.length !== 0) {
        user['password'] = req.body.password;
    }
    Users.update(Number(req.params.id),user,(err, result) => {
        if (typeof result === undefined || typeof err !== 'undefined') {
            return res.status(404).json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
        return res.status(200).json({
            status: MESSAGE.SUCCESS,
            data: result
        });
    });
}
export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    Users.deleteUser(req.body.id,(err : Error, result: boolean) => {
        if (typeof result === 'undefined' || typeof err !== 'undefined') {
            return res.status(404).json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
        return res.status(200).json({
            status: MESSAGE.SUCCESS,
            data: true
        });
    });
}