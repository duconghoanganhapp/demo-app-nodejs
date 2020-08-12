import * as express from 'express';
import * as UserController from '../controllers/UserController';
import * as rulesUser from '../rules/User';

const routerUser = express.Router();
routerUser.get('/', UserController.index);
routerUser.post('/delete', UserController.ajaxDeleteUser);
routerUser.get('/edit/:id', UserController.edit);
routerUser.post('/edit/:id', rulesUser.edit, UserController.postEdit);
routerUser.get('/profile', UserController.profile);
routerUser.post('/profile', UserController.profilePost);
routerUser.get('/chat', UserController.chat);
routerUser.post('/excel', UserController.excel);
routerUser.post('/csv', UserController.exportCsv);
routerUser.post('/csv/import', UserController.excel);
export default routerUser;