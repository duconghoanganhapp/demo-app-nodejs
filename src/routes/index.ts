import * as express from 'express';
import {Request, Response, NextFunction} from 'express';

const router = express.Router();
import routeProduct from './product';
import routerUser from './user';
import routerAuth from './auth';
import routerArticles from './articles';
import { ensureAuthenticated, forwardAuthenticated} from '../config/auth';
import routerCategory from './categoryArticles';
import routerMessages from './messages';
// Auth
router.use('/auth', routerAuth);
// router.use(ensureAuthenticated);
router.use( (req: Request, res: Response, next: NextFunction) => {
    res.locals.user = req.user
    next();
});
// Dashboard
router.get('/', (req: Request, res: Response) => {          
    res.render('dashboard');
});
// Error
router.get('/error/404', (req: Request, res: Response) => {
    res.render('partials/error404', {
        layout: false
    });
});
router.get('/error/500', (req: Request, res: Response) => {
    res.render('partials/error500');
});
// User
router.use('/user', routerUser);
// Product
router.use('/product', routeProduct);
// Articles
router.use('/articles', routerArticles);

router.use('/category', routerCategory);
router.use('/messages', routerMessages);
export default router;