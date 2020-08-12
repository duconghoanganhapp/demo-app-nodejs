import express from 'express';
import user from './user';
import auth from './auth';
import routerUser from './user';
import articles from './articles';
import Product from './products'
const router = express.Router();

router.use('/user', user);
router.use('/auth', auth);
router.use('/product', Product);
routerUser.use('/articles', articles);
export default router;