import express from 'express';
import userController from '../components/userControllers';

const router = express.Router();

router.post('/create', userController.createUser);

module.exports = router;
