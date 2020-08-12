import { Request, Response, NextFunction} from 'express';
import * as ArticlesCategory from '../models/mysql/ArticlesCategory';
import * as validator from 'express-validator';
import { decodeBase64, encodeBase64 } from 'bcryptjs';

const MESS_PARAMS = 'categoryArticles';
export const index = (req: Request, res: Response) => {
    return res.render('admin/category/index');
}
export const add = (req: Request, res: Response) => {
    return res.render('admin/category/add');
}
export const postAdd = (req: Request, res: Response) => {
    const errors = validator.validationResult(req);
    if(!errors.isEmpty()) {        
        for(let x of errors.array({ onlyFirstError: true })) {
            req.flash(x.param, x.msg);
        }
        return res.redirect('/category/add');
    }
    ArticlesCategory.create({ name : req.body.name }, (err, result) => {
        if(err !== undefined || result === undefined) {
           
            var message = {
                success: 'update Fail'
            }
            req.flash(MESS_PARAMS, encodingAlert(message));
            return res.redirect('/category/add');
        }
        var message = {
            success: 'Create successful'
        }
        req.flash(MESS_PARAMS, encodingAlert(message));
            return res.redirect('/category/list');
    });
}
export const list = (req: Request, res: Response) => {
    var keyword : String = '';
    if (req.query.keyword !== undefined) {
        keyword = req.query.keyword;
    }
    ArticlesCategory.list(keyword, (err , result) => {
        if(err !== undefined || result === undefined) {
            return res.redirect('/category/add');
        }
        return res.render('admin/category/list', {
            categories : result,
            keyword: keyword
        });
    })
}
export const edit = (req: Request, res: Response) => {
    ArticlesCategory.findOneById(Number(req.params.id), (err, result) => {
        if (err !== undefined || result === undefined) {
            return ;
        }
        return res.render('admin/category/edit', {
            category: result
        });
    });
}
export const postEdit = (req: Request, res: Response) => {
    const errors = validator.validationResult(req);
    if(!errors.isEmpty()) {        
        for(let x of errors.array({ onlyFirstError: true })) {
            req.flash(x.param, x.msg);
        }
        return res.redirect('/category/edit/' + req.params.id);
    }
    ArticlesCategory.update(Number(req.params.id), { name: req.body.name }, (err, result) => {
        if (err !== undefined || result === undefined) {
            return;
        } 
        var message = {
            success: 'update successful'
        }
       req.flash(MESS_PARAMS, encodingAlert(message));
        return res.redirect('/category/list');
    });
}
const encodingAlert = (message: Object) => {

    return Buffer.from(JSON.stringify(message)).toString('base64');
}
export const deleteCategory = (req: Request, res: Response) => {
    ArticlesCategory.deleteCategory(Number(req.body.id), (err, result) => {
        if (err !== undefined || result === undefined) {
            return res.json({
                message: false
            });
        }
        return res.json({
            message: true
        });
    });
}