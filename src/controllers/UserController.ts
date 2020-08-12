import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as formiable from 'formidable';
import validator from 'express-validator';
import axios from 'axios';
import formidable from 'formidable';
import xlsx from 'xlsx';
import { MESSAGE } from '../utils/messages';
import sequelize from '../config/sequelize';
import * as Users from '../models/mysql/User';
import * as csv from 'fast-csv';
import pdf from 'html-pdf';
import ejs from 'ejs';
import puppeteer from "puppeteer";
var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, '../../uploads'));
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + '-' + file.originalname);
  }
});
var uploadManyFiles = multer({
  storage: storage,
  fileFilter: (req: Request, file, callback: Function) => {
      let extensions = path.extname(file.originalname.toLowerCase());
      if (extensions !== '.jpg') {
        return callback(new Error('Only images are allowed'))
      }
      callback(null, true);
  }
});
export const index = (req: Request, res: Response, next: NextFunction) => {
    let keyword: string = '';    
    if (typeof req.query.keyword !== 'undefined') {
        keyword = req.query.keyword;
    }    
    Users.search(keyword, (err: Error, result: Object) => {
        if (typeof result === undefined || typeof err !== 'undefined') {
            return;
        }                
        return res.render('admin/user/index', {
            users: result,
            keyword: keyword
        });
    });
}
export const ajaxDeleteUser = (req: Request, response: Response, next: NextFunction) => {
    console.log('ok');
    axios.patch('http://127.0.0.1:8005/api/user/delete', {
        id: req.body.id
    }).then( res => {
        return response.json({
            message: true
        });
    }).catch(err => {
        return response.json({
            message: false
        });
    });
}
export const edit = (req: Request, res: Response, next: NextFunction) => {
    axios.get('http://127.0.0.1:8005/api/user/search/' + req.params.id, {}).then(result => {
        return res.render('admin/user/edit', {
            layout: 'auth/layout',
            user: result.data.data
         });
    });
}

export const postEdit = (req: Request, res: Response) => {  
    // const errors = validator.validationResult(req);
    // if(!errors.isEmpty()) {
    //     for(let x of errors.array({ onlyFirstError: true })) {
    //         req.flash(x.param, x.msg);
    //     }
    //     return res.redirect('/user/edit/' + req.params.id);
    // }
    let user = {
        firstName : req.body.firstName, 
        lastName : req.body.lastName, 
        email : req.body.email
     };
    if (req.body.password.length !== 0) {
        user['password'] = req.body.password;
    }
    Users.update(Number(req.params.id),user,(err, result) => {
        if (result) {
            req.flash('success', 'edit successfuly')
            return res.redirect('/user');
        }
        return;
    });
}
export const uploadSingleFile =  (req :Request, res: Response, next: NextFunction) => {
    var upload = uploadManyFiles.single('images');
      upload(req, res, (err) => {
        if( err instanceof multer.MulterError) {
              return res.redirect('');
          } else if (err) {
              return res.redirect('');
          }
          next();
      });
}
export const profile = (req: Request, res: Response, next: NextFunction) => {
    Users.findById(res.locals.user.id, (err: String, result: any) => {
        if (err === 'undefined') {
            return res.redirect('back');
        }
        return res.render('admin/user/profile');
    });
}
export const profilePost = (req: Request, res: Response, next: NextFunction) => {
    Users.update(res.locals.user.id, req.body, (err, result) => {
        if (err !== undefined || result === undefined){
            return;
        }
        return res.redirect('/user/profile');
    });
}
export const chat = (req: Request, res: Response, next: NextFunction) => {
    res.render('chat/chat');
}
export const excel = (req: Request, res: Response, next: NextFunction) => {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
       const acceptFile = ['.csv', '.xlsx'];
       var find = acceptFile.find( (value) => {
            return value === path.extname(files.file.name);
       }); 
        if (find === undefined) {
            req.flash('wrongFile', 'File must is xlsx / csv');
            return res.redirect('/user');
        }
        
      var workBook = xlsx.readFile(files.file.path);
      var sheet_name_list = workBook.SheetNames;
      var xlData : Array<any> = xlsx.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);
        var header = [
            'firstName',
            'lastName',
            'role',
            'email',
            'password',
            'delFlg'
        ];
        var headerXlsx = get_header_row(workBook.Sheets[sheet_name_list[0]]);
        var csv = new Promise( (resolve, reject) => {
            for(let i = 0; i < header.length; i ++) {
                if(header[i] !== headerXlsx[i]) { 
                    reject('invalid header');
                }
            }   
        var countLine : number = 0;
        var errors : Array<any> = [];
           for(let line of xlData) {   
            countLine ++;       
            let errorLine = checkXlsx(line);    
            if (!isEmptyObject(errorLine)) {
                errors[countLine] = errorLine; 
            }        
           }        
           if(errors.length !== 0) {
            reject(errors);
           }
           resolve(xlData);
        });
        csv.then(users => {
            return sequelize.transaction(t => {
                let usersArray = users as Array<any>;
                for(let i = 0; i< usersArray.length; i++) {
                 Users.Users.create(usersArray[i], {transaction: t});
                 if(i === usersArray.length - 1)
                 return  Users.Users.create(usersArray[i], {transaction: t});
                 }
              }).then(result => {
                  req.flash('successExcel', 'Import successfuly');
                 res.redirect('/user');
              }).catch(err => {
                  req.flash('failExcel', 'There was a problem. Please try again from the beginning.')
                  res.redirect('/user');
              });
        }).catch(err => {            
            var myJsonString = JSON.stringify(err);
           req.flash('MessageErrorsExcel', escape(myJsonString));
           res.redirect('/user');
        });
      });
}
function checkXlsx(user : any) {
    var errors: Object = {};        
    if (isEmpty(user.firstName) === true) {   
       errors['firstName'] = MESSAGE.EMPTY('firstName');       
    }
    if (isEmpty(user.lastName) === true) {
        errors['lastName'] = MESSAGE.EMPTY('lastName');
    }
    if (isEmpty(user.email) === true) {
        errors['email'] = MESSAGE.EMPTY('email');
    }
    if (isEmptyNumber(user.role) === true) {
        errors['role'] = MESSAGE.EMPTY('role');
    }
    if (isEmpty(user.password) === true) {
        errors['password'] = MESSAGE.EMPTY('password');
    }
    if (isEmptyNumber(user.delFlg) === true) {
        errors['delFlg'] = MESSAGE.EMPTY('delFlg');
    }    
    return errors;
}
function isEmpty(str: String) {    
    return typeof str === 'undefined' || str.trim() === '';
}
function isEmptyNumber(number: any) {
    return typeof number !== 'number' || !Number.isInteger(number);
}
function isEmptyObject(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
function get_header_row(sheet) {
    var headers = [];
    var range = xlsx.utils.decode_range(sheet['!ref']);    
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for(C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[xlsx.utils.encode_cell({c:C, r:R})] /* find the cell in the first row */

        var hdr = "UNKNOWN " + C; // <-- replace with your desired default 
        if(cell && cell.t) hdr = xlsx.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
}
export const exportCsv = (request: Request, response: Response, next: NextFunction) => {
    response.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=' + 'download-' + Date.now() + '.csv'
    });
    axios.get('http://127.0.0.1:8005/api/user').then( res => {
        var lineCsv = 0;
        var dataCsv: Array<any> = [];
        var header = [
            'firstName',
            'lastName',
            'role',
            'email',
            'delFlg'
        ];
        dataCsv[lineCsv] = header;         
        for(let user of res.data.data) {
            lineCsv ++;
            dataCsv[lineCsv] = [user.id, user.firstName, user.lastName, user.role === 'TRUE' ? 0: 1, user.email, user.delFlg === 'TRUE' ? 0 : 1, ];
        }
        csv.write(dataCsv,{headers:true}).pipe(response);
        response.end();
    }).catch(err => {
        return;
    });
}