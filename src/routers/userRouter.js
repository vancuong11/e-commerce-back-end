import express from 'express';
import userController from '../components/userControllers';
import { verifyAccessToken } from '../middlewares/verifyToken';
const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/refresh-token', userController.refreshAccessToken);
router.post('/logout', userController.logoutUser);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.restPassword);
router.get('/get-current', verifyAccessToken, userController.getCurrentUser);

module.exports = router;
