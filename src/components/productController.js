import productService from '../services/productService';

const createProduct = async (req, res) => {
    try {
        const data = req.body;
        // check data client send to server
        if (Object.keys(data).length === 0) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await productService.createProductService(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create Product error',
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const { id } = req.params;
        // check data client send to server
        if (!id) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required id',
            });
        }
        const response = await productService.getDetailsProductService(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'ERROR',
            message: 'Get Details Product error',
        });
    }
};

// filter, sort, pagination
const getAllProduct = async (req, res) => {
    try {
        const response = await productService.getAllProductService(req.query);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'ERROR',
            message: 'Get All Product error',
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required id',
            });
        }
        const response = await productService.deleteProductService(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'ERROR',
            message: 'Delete Product error',
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id || Object.keys(data).length === 0) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required input',
            });
        }
        const response = await productService.updateProductService(id, data);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'ERROR',
            message: 'Delete Product error',
        });
    }
};

const ratingsProduct = async (req, res) => {
    try {
        const { id } = req.user;
        const { star, comment, pid } = req.body;
        if (!star || !pid) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required input',
            });
        }

        const response = await productService.ratingsProductService(id, star, comment, pid);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'ERROR',
            message: 'Rating Product error',
        });
    }
};

module.exports = {
    createProduct,
    getDetailsProduct,
    getAllProduct,
    deleteProduct,
    updateProduct,
    ratingsProduct,
};
