import express from 'express';
const router = express.Router();
import UserController from '../controllers/user.controller.js'
import JwtGuard from '../middleware/auth.js';

const userController = new UserController();

router.route('/').get(JwtGuard, userController.getUser);

export default router;