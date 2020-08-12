import * as Products from '../../models/mysql/Product';
import { Request, Response, NextFunction } from 'express';
import  { MESSAGE } from '../../utils/messages';
export const list =  (req: Request, res: Response, next: NextFunction) => {
    let keyword: string = '';
    if (typeof req.query.keyword !== 'undefined') {
        keyword = req.query.keyword;
    }
    Products.search(keyword, 100, 0, (err: Error, result: Object) => {
        if (result === undefined || err !== undefined) {
            return;
        }
        return res.json({
            status: MESSAGE.SUCCESS,
            data: result,
            keyword: keyword,
        });
    });
}
export const getProduct =  (req: Request, res: Response, next: NextFunction) => {
    Products.findById(Number(req.params.id), (err, result) => {
        if(typeof err !== 'undefined' || typeof result === 'undefined') {
            return res.json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
        return res.json({
            status: MESSAGE.SUCCESS,
            data: result
        });
    });
}
export const edit =  (req: Request, res: Response, next: NextFunction) => {
    let { 
        name,
        amount,
        price,
        img,
        content,
        description,
        } = req.body;

    Products.update(Number(req.params.id),{
        name: name,
        amount: amount,
        price: price,
        img: img,
        content: content,
        description: description,
        updatedAt: new Date(),
    }, (err, result) => {
        if (typeof err !== 'undefined' || typeof result === 'undefined') {
            return res.json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
        return res.json({
            message: MESSAGE.SUCCESS,
            data: result
        });
    });
}
export const create = (req: Request, res: Response, next: NextFunction) => {
    let { 
        name,
        amount,
        price,
        img,
        content,
        description,
        } = req.body;
        let product = {
            name: name,
            amount: amount,
            price: price,
            img: img,
            content: content,
            description: description,
            createdAt: new Date
        }
    Products.update(Number(req.params.id), product ,(err, result) => {
        if(typeof err !== 'undefined' || typeof result === 'undefined') {
             return res.json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
             });
        }
        return res.json({
            message: MESSAGE.SUCCESS,
            data: product
        });
    });
        
}
export const getProductByName = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.query);
    let { name } = req.query;
    Products.findByName(name, (err, result) => {
        if (err !== undefined || result === undefined) {
            return res.json({
                status: MESSAGE.BAD_REQUEST,
                message: MESSAGE.APIEC003
            });
        }
        return res.json({
            status: MESSAGE.SUCCESS,
            data: result
        });
    });
}
export default Products;