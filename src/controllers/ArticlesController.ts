import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import multer from 'multer';
import moment from 'moment';
import { Articles, ArticlesAttributes } from '../models/mysql/Articles';
import { ArticlesMedia, ArticlesMediaAttributes } from '../models/mysql/ArticlesMedia';
import * as ArtService from '../services/ArticlesService';
import * as ArtCateService from '../services/ArticlesCategoryService';
import * as ArtMediaService from '../services/ArticlesMediaService';
import * as UsersService from '../services/UsersService';
import { PATH_UPLOAD_IMG, TABLE_FILE } from '../utils/constants';
import { validationResult } from 'express-validator';
import { MESSAGE } from '../utils/messages';
import * as flash from '../utils/flash';
import * as fs from 'fs';
import { uploadFileImg, removeFile, moveFileUpload, writeFileUpload } from '../libs/uploadFile';

export const index = async (req: Request, res: Response, next: NextFunction) => {
    let articles = await ArtService.findAllArticles();
    res.render('admin/articles/index', {
        articles: articles
    });
}

export const getAdd = async (req: Request, res: Response, next: NextFunction) => {
    let listUser: any = await UsersService.findAllUser();
    let listArtCate: any = await ArtCateService.findAllArtCate();
    res.render('admin/articles/add', {
        listUser: listUser,
        listArtCate: listArtCate
    });
}

export const postAdd = async (req: Request, res: Response, next: NextFunction) => {
    try{
        let dataReq: ArticlesAttributes = await req.body;
        let listUser: any = await UsersService.findAllUser(); 
        let listArtCate: any = await ArtCateService.findAllArtCate();
        let errors: any = await validationResult(req);
        //handle data validate
        if(!errors.isEmpty()) {
            // remove file on disk
            if(!_.isEmpty(req.file)) {
                await removeFile(req.file.path);
            }
            // get error pass view
            errors = errors.array({ onlyFirstError: true });
            return res.render('admin/articles/add', {
                errors, dataReq, listUser: listUser, listArtCate: listArtCate
            });
        } 
        let articlesSave: any = await ArtService.saveTable(dataReq);
        if(articlesSave) {
            // move file upload
            let fileUpload: any = await moveFileUpload(req.file, TABLE_FILE.articles, articlesSave.id);
            let dataArtMedia: ArticlesMediaAttributes =  { 
                articlesId: articlesSave.id,
                fileNameImg: fileUpload.fileName,
                fileUrlImg: fileUpload.fileDest,
            };
            let artMediaSave: any = await ArtMediaService.saveTable(dataArtMedia);
            console.log(artMediaSave)
            if(!artMediaSave) {
                if(!_.isEmpty(req.file)) {
                    await removeFile(req.file.path);
                }
                console.log(artMediaSave);
            } 
            // create complete redirect articles page
            flash.success(req, MESSAGE.CREATE_SUCCESS);
            return res.redirect('/articles');
        } else {
            if(!_.isEmpty(req.file)) {
                await removeFile(req.file.path);
            }
            flash.error(req, MESSAGE.CREATE_FAILURE);
            return res.redirect('/articles/add');
        }
    } catch(err) {
        next(err);
    }
}

export const getDesc = async (req: Request, res: Response, next: NextFunction) => {
    let articles: any = await ArtService.findArticlesById(Number(req.params.id));
    res.render('admin/articles/editDesc', {
        id: req.params.id,
        articles: articles
    });
}

export const postDesc = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // let dataReq: ArticlesAttributes = await req.body;
        // let fileUpload = writeFileUpload(dataReq.desc, TABLE_FILE.articles, Number(req.params.id));
    } catch(err) {
        console.log(`Error ${err}`);
    }
}
