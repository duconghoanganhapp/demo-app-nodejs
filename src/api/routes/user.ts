import express from 'express';
import * as userController from '../controllers/UserController';
const router = express.Router();
router.get('/', userController.list);
router.get('/search/:id', userController.search);
router.put('/edit/:id', userController.edit);
router.patch('/delete', userController.deleteUser);
export default router;