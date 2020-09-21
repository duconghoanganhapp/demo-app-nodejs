import {NextFunction, Request, Response} from 'express';
import * as Products from '../models/mysql/Product';
import * as validator from "express-validator";
import * as Messages from "../models/mysql/Messages";
import * as formiable from 'formidable';
import formidable from "formidable";
import path from "path";
import xlsx from "xlsx";
import sequelize from "../config/sequelize";
import * as Users from "../models/mysql/User";

var fs = require('fs');
var parse = require('csv-parse');
var async = require('async');
import {MESSAGE} from '../utils/messages';
import {PRODUCT_HEADER} from '../utils/headerFile';
import axios from "axios";
import * as csv from "fast-csv";

const ENTITY_NAME = 'product';
const https = require('https');
import moment from 'moment-timezone'
//Slack app
const {WebClient, ErrorCode} = require('@slack/web-api');
// Read a token from the environment variables
// const token = 'xoxp-954077817267-1359935497254-1372369719381-9806cacb2f4d90831c217f4feb166611'; // OAuth Access Token
const token = 'xoxb-954077817267-1368728135734-uN8nErNeSVCxJedRGRzxDGTO'; // Bot User OAuth Access Token

// Initialize
const web = new WebClient(token);

/**
 * Show product list
 * @param req
 * @param res
 */
export const index = async (req: Request, res: Response) => {
    const totalItem: number = Number(await Products.count());
    let {page} = req.query;
    if (page === undefined) {
        page = 1;
    }
    const pageCurrent: number = page;
    const itemEachPage: number = 1;
    let limit: number = 10;
    let offset: number = (pageCurrent - 1) * limit;
    res.locals.pagination = getPagination(totalItem, pageCurrent, itemEachPage);
    let keyword: string = '';
    if (typeof req.query.keyword !== 'undefined') {
        keyword = req.query.keyword;
    }
    Products.search(keyword, limit, offset, (err: Error, result: Object) => {
        if (result === undefined || err !== undefined) {
            return;
        }
        return res.render('admin/product/index', {
            products: result,
            keyword: keyword
        });
    });
};

/**
 * Show slackBot
 * @param req
 * @param res
 */
export const slackBot = async (req: Request, res: Response) => {
    try {

        //Channel create
        // const resultCreate = await web.conversations.create({
        //     // The token you used to initialize your app is stored in the `context` object
        //     token: token,
        //     // The name of the conversation
        //     name: "qa15"
        // });

        // if (resultCreate['ok'] && !isEmpty(resultCreate['channel']['id'])) {
        //     const conversationId = resultCreate['channel']['id'];
        //     const resultJoin = await web.conversations.join({
        //         // The token you used to initialize your app is stored in the `context` object
        //         token: token,
        //         // The name of the conversation
        //         channel: conversationId
        //     });
        //     // console.log(resultJoin);
        //
        //     if (resultJoin['ok']) {
        //         const username = 'Gia Thanh';
        //     // Post a message to the channel, and await the result.
        //         // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
        //         const result = await web.chat.postMessage({
        //             text: `${username} Just create a question`,
        //             channel: conversationId,
        //         });
        //
        //         // The result contains an identifier for the message, `ts`.
        //         console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);
        //     }
        //
        // }
        let conversationId = 'C01BGFVPP4Y';
        let user = {
            'firstName': 'Anh',
            'lastName': 'Du Cong Hoang'
        };
        let qa = {
            'createdAt': moment(Date.now()).format('DD-MM-YYYY hh:mm:ss A')
        };

        // Post a message to the channel, and await the result.
        // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
        const result = await web.chat.postMessage({
            text: `${qa.createdAt} ${user.lastName} ${user.firstName} just create a question`,
            channel: conversationId,
        });

        // The result contains an identifier for the message, `ts`.
        console.log(`Successfully send message ${result.ts} in conversation ${conversationId}`);

    } catch (error) {
        // Check the code property, and when its a PlatformError, log the whole response.
        if (error.code === ErrorCode.PlatformError) {
            console.log(error.data);
        } else {
            // Some other error, oh no!
            console.log('Well, that was unexpected.');
        }
    }
    return res.status(200).json({
        status: true
    });
};

/**
 * Show interactive
 * @param req
 * @param res
 */
export const interactive = (req: Request, res: Response) => {
    return res.render('admin/product/interactive', {});
};

/**
 * Show product edit page
 * @param req
 * @param res
 */
export const showEditProduct = (req: Request, res: Response) => {
    let id = Number(req.params.id);
    Products.findById(id, (err: Error, result: Object) => {
        if (result === undefined || err !== undefined) {
            return;
        }
        return res.render('admin/product/edit', {
            id: id,
            product: result
        });
    });
};

/**
 * Update product
 * @param req
 * @param res
 */
export const editProduct = (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let params = req.body;
    let errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        let errorMessages = [];
        for (let x of errors.array({onlyFirstError: true})) {
            errorMessages.push(x.msg);
        }
        return res.render('admin/product/edit', {
            id: id,
            product: params,
            errors: errorMessages
        });
    }
    //Check image none
    if (typeof req.file === "undefined") {
        params.img = 'img-none.png';
    } else {
        params.img = req.file.filename;
    }
    Products.update(id, params, (err: Error, result: Object) => {
        if (err !== undefined || result === undefined) {
            return res.redirect('back');
        }
        var message = {
            success: 'update successful'
        };
        req.flash(ENTITY_NAME, encodingAlert(message));
        return res.redirect('/product');
    });
};

/**
 * Show create product
 * @param req
 * @param res
 */
export const showAddProduct = (req: Request, res: Response) => {
    return res.render('admin/product/add', {product: {}});
};

/**
 * Create product
 * @param req
 * @param res
 */
export const addProduct = (req: Request, res: Response) => {
    let id = Number(req.params.id);
    let params = req.body;
    let errors = validator.validationResult(req);
    if (!errors.isEmpty()) {
        let errorMessages = [];
        for (let x of errors.array({onlyFirstError: true})) {
            errorMessages.push(x.msg);
        }
        return res.render('admin/product/add', {
            product: params,
            errors: errorMessages
        });
    }
    //Check image none
    if (typeof req.file === "undefined") {
        params.img = 'img-none.png';
    } else {
        params.img = req.file.filename;
    }
    Products.create(id, params, (err: Error, result: Object) => {
        if (err !== undefined || result === undefined) {
            return res.redirect('back');
        }
        var message = {
            success: 'Create successful'
        };
        req.flash(ENTITY_NAME, encodingAlert(message));
        return res.redirect('/product');
    });
};

/**
 * Delete product
 * @param req
 * @param res
 */
export const deleteProduct = (req: Request, res: Response) => {
    Products.deleteProduct(Number(req.body.id), (err, result) => {
        if (err !== undefined || result === undefined) {
            return res.json({
                message: false
            });
        }
        return res.json({
            message: true
        });
    });
};
const encodingAlert = (message: Object) => {

    return Buffer.from(JSON.stringify(message)).toString('base64');
};

export const getPagination = (totalItem: number, pageCurrent: number, itemEachPage: number) => {
    const totalPage: number = Math.ceil(totalItem / itemEachPage);
    if (pageCurrent > totalPage) {
        pageCurrent = totalPage;
    }
    let pagination: Array<any> = [pageCurrent];
    while (pagination.length < 4) {
        let status = false;
        let left: number = pagination[0] - 1;
        if (left > 0) {
            status = true;
            pagination.unshift(left);
        }
        let right: number = Number(pagination[pagination.length - 1]) + 1;
        if (right <= totalPage) {
            status = true;
            pagination.push(right);
        }
        if (status === false) {
            break;
        }
    }
    var htmlPagination = '<ul class="pagination m-2">';
    htmlPagination += buttonPrevious(pageCurrent);
    if (pagination[0] >= 2) {
        htmlPagination += `<li class="page-item"><a class="page-link" href="/product?page=1">1</a></li>`;
        htmlPagination += '<li class="page-item"><a class="page-link" href="#">...</a></li>';
    }
    pagination.forEach(page => {
        htmlPagination += `<li class="page-item"><a class="page-link" href="/product?page=${page}">${page}</a></li>`;
    });
    if (pagination[pagination.length - 1] - 1 < totalPage - 2) {
        htmlPagination += '<li class="page-item"><a class="page-link" href="#">...</a></li>';
        htmlPagination += `<li class="page-item"><a class="page-link" href="/product?page=${totalPage}">${totalPage}</a></li>`;
    }
    htmlPagination += buttonNext(pageCurrent);
    htmlPagination += '</ul>';
    return htmlPagination;
};
const buttonPrevious = (pageCurrent: number) => {
    return `<li class="page-item"><a class="page-link" href="/product?page=${Number(pageCurrent) - 1}">Previous</a></li>`;
};
const buttonNext = (pageCurrent: number) => {
    return `<li class="page-item"><a class="page-link" href="/product?page=${Number(pageCurrent) + 1}">Next</a></li>`;
};
export const comment = async (req: Request, res: Response) => {
    let {id} = req.params;
    const product = await Products.findAsync(Number(id));
    const messages = await Messages.list();
    return res.render('admin/product/comment', {
        product: product,
        messages: messages
    });
};
export const commentPost = async (req: Request, res: Response) => {
    let {message, idProduct, idUser} = req.body;

    const result = await Messages.insert(Number(idProduct), Number(idUser), message);
    if (!result) {
        return res.status(404).json({
            data: false
        });
    }

    return res.status(200).json({
        data: result
    });
};

export const importCSV = async (req: Request, res: Response, next: NextFunction) => {
    var form = new formidable.IncomingForm();
    const HEADER = PRODUCT_HEADER;
    form.parse(req, function (err, fields, files) {
        const acceptFile = ['.csv', '.xlsx'];
        var find = acceptFile.find((value) => {
            return value === path.extname(files.fileCSV.name);
        });
        if (find === undefined) {
            req.flash('wrongFile', 'File must is xlsx / csv');
            return res.redirect('/product/index');
        }
        var workBook = xlsx.readFile(files.fileCSV.path);
        var sheet_name_list = workBook.SheetNames;
        var xlData: Array<any> = xlsx.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);
        var headerXlsx = get_header_row(workBook.Sheets[sheet_name_list[0]]);
        var csv = new Promise((resolve, reject) => {
            for (let i = 0; i < HEADER.length; i++) {
                if (HEADER[i] !== headerXlsx[i]) {
                    reject('invalid header');
                }
            }
            var countLine: number = 0;
            var errors: Array<any> = [];
            for (let line of xlData) {
                countLine++;
                let errorLine = checkXlsx(line);
                if (!isEmptyObject(errorLine)) {
                    errors[countLine] = errorLine;
                }
            }
            if (errors.length !== 0) {
                reject(errors);
            }
            resolve(xlData);
        });
        var Entities = Products.Products;
        csv.then(entities => {
            return sequelize.transaction(t => {
                let entitiesArray = entities as Array<any>;
                for (let i = 0; i < entitiesArray.length; i++) {
                    Entities.create(entitiesArray[i], {transaction: t});
                    if (i === entitiesArray.length - 1)
                        return Entities.create(entitiesArray[i], {transaction: t});
                }
            }).then(result => {
                req.flash('successExcel', 'Import successful');
                res.redirect('/product');
            }).catch(err => {
                req.flash('failExcel', 'There was a problem. Please try again from the beginning.')
                res.redirect('/product');
            });
        }).catch(err => {
            var myJsonString = JSON.stringify(err);
            req.flash('MessageErrorsExcel', escape(myJsonString));
            res.redirect('/product');
        });
    });
};

function get_header_row(sheet) {
    var headers = [];
    var range = xlsx.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
        var cell = sheet[xlsx.utils.encode_cell({c: C, r: R})] /* find the cell in the first row */

        var hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = xlsx.utils.format_cell(cell);

        headers.push(hdr);
    }
    return headers;
}

function checkXlsx(product: any) {
    var errors: Object = {};
    // if (isEmpty(product.id) === true) {
    //     //     errors['id'] = MESSAGE.V02('id');
    //     // }
    return errors;
}

function isEmpty(str: String) {
    return typeof str === 'undefined' || str.length === 0;
}

// function isEmptyNumber(number: any) {
//     return typeof number !== 'number' || !Number.isInteger(number);
// }

function isEmptyObject(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

/**
 * Export CSV
 * @param request
 * @param response
 * @param next
 */
export const exportCSV = (request: Request, response: Response, next: NextFunction) => {
    response.writeHead(200, {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename=' + 'download-' + Date.now() + '.csv'
    });
    axios.get('http://127.0.0.1:3000/api/product').then(res => {
        var lineCsv = 0;
        var dataCsv: Array<any> = [];
        dataCsv[lineCsv] = PRODUCT_HEADER;
        for (let product of res.data.data) {
            lineCsv++;
            dataCsv[lineCsv] = [
                product.name ? product.name : '',
                product.amout ? product.amout : '',
                product.price ? product.price : '',
                product.content ? product.content : '',
                product.description ? product.description : ''
            ];
        }
        csv.write(dataCsv, {headers: true}).pipe(response);
        response.end();
    }).catch(err => {
        return;
    });
}

/**
 * ExportPDF
 * @param req
 * @param res
 * @param next
 */
export const exportPDF = (req: Request, res: Response, next: NextFunction) => {
    var fs = require('fs');
    var pdf = require('html-pdf');
    var html = fs.readFileSync('views/admin/product/pdf.ejs', 'utf8');
    var options = {format: 'Letter'};

    pdf.create(html, options).toFile('/public/uploads/product/businesscard.pdf', function (err, res) {
        if (err) {
            return res.redirect('/Product');
        }
    });
    res.download('/public/uploads/product/businesscard.pdf');
};

/**
 * Send Email nodemailer
 * @param req
 * @param res
 * @param next
 */
export const sendEmail = (req: Request, res: Response, next: NextFunction) => {
    // "use strict";
    const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }

    main().catch(console.error);
};