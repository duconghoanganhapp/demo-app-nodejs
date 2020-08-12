import express from 'express';
import * as productController from '../controllers/ProductController';
const router = express.Router();
router.get('/', productController.list);
router.get('/search/:id', productController.getProduct);
router.post('/edit/:id', productController.edit);
router.get('/getProductsByName', productController.getProductByName);
export default router;