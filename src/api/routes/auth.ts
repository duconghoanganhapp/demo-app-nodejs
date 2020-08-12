import express from 'express';
import * as authController from '../controllers/AuthController';
import * as rulesAuth from '../../rules/auth';
const router = express.Router();
router.post('/register', rulesAuth.checkRegister,  authController.register);
router.post('/login', authController.login);
export default router;