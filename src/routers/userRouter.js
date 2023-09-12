import express from 'express';
import userController from '../components/userControllers';

const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/get-all', userController.getAllUser);

module.exports = router;
