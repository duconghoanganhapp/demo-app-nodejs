import * as express from 'express';
import puppeteer from 'puppeteer';
import * as Message from '../models/mysql/Messages';

import { Request, Response, NextFunction } from 'express';
export const index = async (req: Request, res: Response) => {
    const listMessage = await Message.list();
    // Object.keys(listMessage).map( (objectKey, index) => {
    //     console.log(listMessage[objectKey].firstName);
    // });
    console.log(listMessage);
    
    
    // const browser = await puppeteer.launch({
    //     args: [
    //       '--no-sandbox',
    //       '--disable-setuid-sandbox'
    //     ]
    //   });
    //     const page = await browser.newPage();
    //     await page.goto('https://google.com', { waitUntil: 'networkidle2' });
        
    //     await page.pdf({
    //         path: Date.now() + '-viblo-asia.pdf',
    //         format: 'A4',
    //         landscape: true,
    //         printBackground: true,
    //         margin: {
    //         top: "0",
    //         right: "0",
    //         bottom: "0",
    //         left: "0",
    //         }
    //     });
    // await browser.close();
    res.render('admin/messages/index', {
        listMessage: listMessage
    });
}