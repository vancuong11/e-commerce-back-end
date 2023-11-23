import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import orderController from '../components/orderController';
const router = express.Router();

router.post('/create-order', verifyAccessToken, orderController.createOrder);

module.exports = router;
