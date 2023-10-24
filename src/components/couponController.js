import CouponService from '../services/couponServicer';

const createCoupon = async (req, res) => {
    try {
        const { name, discount, expiry } = req.body;
        if (!name || !discount || !expiry) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await CouponService.createCouponService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create Coupon error',
        });
    }
};

const getCoupon = async (req, res) => {
    try {
        const response = await CouponService.getCoupon();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Get Coupon error',
        });
    }
};

const updateCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        if (Object.keys(req.body).length === 0) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await CouponService.updateCoupon(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'update Coupon error',
        });
    }
};

const deleteCoupon = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await CouponService.deleteCoupon(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'delete Coupon error',
        });
    }
};

module.exports = {
    createCoupon,
    getCoupon,
    updateCoupon,
    deleteCoupon,
};
