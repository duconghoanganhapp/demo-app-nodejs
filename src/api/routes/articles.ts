import express from 'express';
import * as articlesController from '../controllers/ArticlesController';
const router = express.Router();

router.get('/', articlesController.index);
export default router;