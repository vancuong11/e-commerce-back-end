import Order from '../models/order';
import User from '../models/user';

const createOrder = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            // get cart in table user
            const userCart = await User.findById(id).select('cart');
            resolve({
                status: 'ok',
                data: userCart,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createOrder,
};
