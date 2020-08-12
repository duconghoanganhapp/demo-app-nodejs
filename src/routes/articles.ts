import express from 'express';
import * as articlesController from '../controllers/ArticlesController';
import validate from '../rules/articles';
import { uploadFileImg } from '../libs/uploadFile';

const router = express.Router();

router.get('/', articlesController.index);
router.get('/add', articlesController.getAdd);
router.post('/add', uploadFileImg, validate, articlesController.postAdd);
router.get('/desc/:id', articlesController.getDesc);
router.post('/desc/:id', articlesController.postDesc);
export default router;