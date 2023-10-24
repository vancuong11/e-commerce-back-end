import Coupon from '../models/coupon';

const createCouponService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Coupon.create({
                ...data,
                expiry: Date.now() + +data.expiry * 24 * 60 * 60 * 1000,
            });
            resolve({
                status: 'OK',
                message: 'Coupon created successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getCoupon = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Coupon.find().select('-createdAt -updatedAt');
            resolve({
                status: 'OK',
                message: 'getCoupon successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateCoupon = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (data.expiry) {
                data.expiry = Date.now() + +data.expiry * 24 * 60 * 60 * 1000;
            }
            const response = await Coupon.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'updateCoupon successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteCoupon = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Coupon.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'deleteCoupon successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createCouponService,
    getCoupon,
    updateCoupon,
    deleteCoupon,
};
