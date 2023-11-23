import orderService from '../services/orderService';

const createOrder = async (req, res) => {
    try {
        const { id } = req.user;
        const { coupon } = req.body;
        const response = await orderService.createOrder(id, coupon);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create order error',
        });
    }
};

const updateStatusOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await orderService.updateOrderStatus(id, status);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Update status order error',
        });
    }
};

const getUserOrder = async (req, res) => {
    try {
        const { id } = req.user;
        const response = await orderService.getUserOrder(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Update status order error',
        });
    }
};

const getOrderByAdmin = async (req, res) => {
    try {
        const response = await orderService.getOrderByAdminService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Update status order error',
        });
    }
};

module.exports = {
    createOrder,
    updateStatusOrder,
    getUserOrder,
    getOrderByAdmin,
};
