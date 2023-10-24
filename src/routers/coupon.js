import express from 'express';
import { verifyAccessToken, verifyIsAdmin } from '../middlewares/verifyToken';
import couponController from '../components/couponController';
const router = express.Router();

router.post('/create-coupon', verifyAccessToken, verifyIsAdmin, couponController.createCoupon);
router.get('/get-coupon', couponController.getCoupon);
router.put('/update-coupon/:id', verifyAccessToken, verifyIsAdmin, couponController.updateCoupon);
router.delete('/delete-coupon/:id', verifyAccessToken, verifyIsAdmin, couponController.deleteCoupon);

module.exports = router;
