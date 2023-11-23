import Order from '../models/order';
import User from '../models/user';
import Coupon from '../models/coupon';

const createOrder = (id, coupon) => {
    return new Promise(async (resolve, reject) => {
        try {
            // get cart in table user
            const userCart = await User.findById(id).select('cart').populate('cart.product', 'name price');
            const products = userCart?.cart?.map((el) => ({
                product: el.product._id,
                count: el.quantity,
                color: el.color,
            }));
            let total = userCart.cart.reduce((sum, el) => el.product.price * el.quantity + sum, 0);
            const createData = { products, total, orderBy: id };
            if (coupon) {
                const findCoupon = await Coupon.findById(coupon);
                total = Math.round((total * (1 - findCoupon.discount / 100)) / 1000) * 1000;
                createData.total = total;
                createData.coupon = coupon;
            }
            const rs = await Order.create(createData);
            resolve({
                status: 'OK',
                message: 'Order created successfully',
                data: {
                    rs,
                    userCart,
                },
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateOrderStatus = (id, status) => {
    return new Promise(async (resolve, reject) => {
        try {
            const rs = await Order.findByIdAndUpdate(id, { status }, { new: true });
            resolve({
                status: 'OK',
                massage: 'Order updated successfully',
                result: rs,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getUserOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const rs = await Order.find({ orderBy: id });
            resolve({
                status: 'OK',
                massage: 'Get Order successfully',
                result: rs,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getOrderByAdminService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const rs = await Order.find();
            resolve({
                status: 'OK',
                massage: 'Get Order successfully',
                result: rs,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrder,
    updateOrderStatus,
    getUserOrder,
    getOrderByAdminService,
};
