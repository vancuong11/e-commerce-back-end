import express from 'express';
import userController from '../components/userControllers';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/refresh-token', userController.refreshAccessToken);
router.post('/logout', userController.logoutUser);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password', userController.restPassword);
router.get('/get-all', verifyAccessToken, verifyIsAdmin, userController.getAllUser);
router.delete('/delete-user/:id', verifyAccessToken, verifyIsAdmin, userController.deleteUser);
router.put('/update-user/:id', verifyAccessToken, userController.updateUser);
router.put('/update-user-by-admin/:id', verifyAccessToken, verifyIsAdmin, userController.updateUserByAdmin);
router.get('/get-current', verifyAccessToken, userController.getCurrentUser);

module.exports = router;
