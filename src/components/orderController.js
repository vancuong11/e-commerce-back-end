import orderService from '../services/orderService';

const createOrder = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await orderService.createOrder(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create order error',
        });
    }
};

module.exports = {
    createOrder,
};
