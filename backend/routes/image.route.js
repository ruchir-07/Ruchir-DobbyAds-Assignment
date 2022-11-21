import express from 'express';
const router = express.Router();
import ImageController from '../controllers/image.controller.js'
import JwtGuard from '../middleware/auth.js';

const imageController = new ImageController();

router.route('/').get(JwtGuard, imageController.getAllImages);
router.route('/').post(JwtGuard, imageController.createImage);

export default router;