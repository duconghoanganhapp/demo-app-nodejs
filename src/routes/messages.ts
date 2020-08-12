import * as express from 'express';
import * as messagesController from '../controllers/messagesController';
const router = express.Router();
router.get('/', messagesController.index);
export default router;