import { Request } from 'express';
import multer from 'multer';
import util from 'util';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import moment from 'moment';
import { TMP_PATH_UPLOAD_IMG, PATH_UPLOAD_IMG, DEFAULT_IMG_SIZE, PATH_UPLOAD_TXT } from '../utils/constants';

let storage = multer.diskStorage({
  // Inititalize storage image
  destination: (req: Request, file, cb: Function) => {
    if(file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      const dir = path.join(`${__dirname}/../../${TMP_PATH_UPLOAD_IMG}`);
      // if(!fs.existsSync(dir)) {
      //   fs.mkdirSync(dir, { recursive: true });
      // }
      cb(null, dir);
    }
  },
  filename: (req: Request, file, cb: Function) => {
    //TODO: process validate file
    cb(null, Date.now() + '_' + file.originalname);
  },
});

let fileFiler = (req: Request, file, cb: Function) => {
  if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
    cb(new Error('File image allowed extension are png|jpg|jpeg'), false);
  }
  cb(null, true);
}

let multerFile = multer({
  storage: storage, 
  fileFilter: fileFiler,
  limits: {
    fileSize: DEFAULT_IMG_SIZE
  },
}).single('fileUrl');

// util.promisify for controller can use aysn-await
const uploadFileImg = util.promisify(multerFile);
// remvove file
const removeFile = util.promisify(fs.unlink);
// move file uploaded
const moveFileUpload = (file: any, directory: string, id: number) => {
  let result = {};
  if(_.isEmpty(file)) {
    result = {
      fileName: null,
      fileDest: null,
      filePath: null,
      status: false
    }
    return result;
  }
  let fileName = path.parse(file.originalname).name;
  let fileExt  = path.parse(file.originalname).ext;
  let cusFileName = `${directory}_${id}_` + moment().format('YYYYMMDDHHmmss');
  let newFile = file.originalname.replace(fileName, cusFileName);
  let newDest = `${PATH_UPLOAD_IMG}${directory}/${id}/${newFile}`;
  let oldPath = file.path;
  let newPath = path.join(`${__dirname}/../../${newDest}`);
  try {
    // create folder
    let dir = path.join(`${__dirname}/../../${PATH_UPLOAD_IMG}${directory}/${id}/`);
    if(!fs.existsSync(dir)) {
      fs.mkdirSync(dir, {recursive: true});
    }
    fs.renameSync(oldPath, newPath);
    result = {
      fileName: newFile,
      fileDest: newDest,
      filePath: newPath,
      status: true
    }
    return result;
  } catch(err) {
    throw err;
  }
}

const writeFileUpload = (content: string, directory: string, id: number) => {
  let dir = path.join(`${__dirname}/../../${PATH_UPLOAD_TXT}${directory}/${id}/`);
  let fileName = `${directory}_${id}_` + moment().format('YYYYMMDDHHmmss') + '.txt';
  let fileDest = `${PATH_UPLOAD_TXT}${directory}/${id}/${fileName}`;
  let filePath = dir + fileName;
  let result = {
    status: false,
    fileName: null,
    fileDest: null,
    filePath: null
  }
  if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive: true});
  }
  //TODO: waiting process
}

export {
  uploadFileImg,
  removeFile,
  moveFileUpload,
  writeFileUpload
}