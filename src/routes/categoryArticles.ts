import * as express from 'express';
import * as CategoryController from '../controllers/CategoryArticlesController';
import * as rulesCategory from '../rules/categoryArticles';
const router = express.Router();
router.get('/', CategoryController.index);
router.get('/add', CategoryController.add);
router.post('/add', rulesCategory.add, CategoryController.postAdd);
router.get('/list', CategoryController.list);
router.get('/edit/:id', CategoryController.edit);
router.post('/edit/:id', rulesCategory.add, CategoryController.postEdit);
router.post('/delete', CategoryController.deleteCategory);
export default router;