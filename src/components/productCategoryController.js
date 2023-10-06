import productCategoryService from '../services/productCategoryService';

const createCategory = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await productCategoryService.createCategory(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create Category error',
        });
    }
};

const getCategory = async (req, res) => {
    try {
        const response = await productCategoryService.getCategory();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Get Category error',
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await productCategoryService.updateCategory(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'update Category error',
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await productCategoryService.deleteCategory(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'delete Category error',
        });
    }
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
