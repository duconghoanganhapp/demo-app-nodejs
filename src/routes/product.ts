import express, {Request, Router} from 'express';

const router = express.Router();
import * as productController from '../controllers/ProductController';
import * as rulesProduct from "../rules/Product";
import multer from "multer";
import path from "path";

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(__dirname, '../../public/uploads/product'));
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

let uploadManyFiles = multer({
    storage: storage,
    fileFilter: (req: Request, file, callback: Function) => {
        let extensions = path.extname(file.originalname.toLowerCase());
        if (extensions !== '.jpg' && extensions !== '.png' && extensions !== '.jpeg') {
            callback(new Error('Only images are allowed'));
        }
        callback(null, true);
    }
});

let importCSV = multer({
    storage: storage,
    fileFilter: (req: Request, file, callback: Function) => {
        let extensions = path.extname(file.originalname.toLowerCase());
        if (extensions !== '.csv') {
            callback(new Error('Only csv are allowed'));
        }
        callback(null, true);
    }
});

router.get('/', productController.index);
router.get('/interactive', productController.interactive);
router.get('/edit/:id', productController.showEditProduct);
router.post('/edit/:id', uploadManyFiles.single('img'), rulesProduct.edit, productController.editProduct);
router.get('/add', productController.showAddProduct);
router.post('/add', uploadManyFiles.single('img'), rulesProduct.edit, productController.addProduct);
router.post('/delete', productController.deleteProduct);
router.get('/comment/:id', productController.comment);
router.post('/comment', productController.commentPost);
router.post('/importCSV', productController.importCSV);
router.post('/exportCSV', productController.exportCSV);
router.post('/exportPDF', productController.exportPDF);
router.post('/sendEmail', productController.sendEmail);
export default router;