import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import orderController from '../components/orderController';
const router = express.Router();

router.post('/create-order', verifyAccessToken, orderController.createOrder);
router.put('/update-status-order/:id', verifyAccessToken, verifyIsAdmin, orderController.updateStatusOrder);
router.get('/get-user-order', verifyAccessToken, orderController.getUserOrder);
router.get('/get-order-by-admin', verifyAccessToken, verifyIsAdmin, orderController.getOrderByAdmin);

module.exports = router;
