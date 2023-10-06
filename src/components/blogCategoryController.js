import blogCategoryService from '../services/blogCategoryService';

const createBlogCategory = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await blogCategoryService.createBlogCategory(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create BlogCategory error',
        });
    }
};

const getBlogCategory = async (req, res) => {
    try {
        const response = await blogCategoryService.getBlogCategory();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Get BlogCategory error',
        });
    }
};

const updateBlogCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await blogCategoryService.updateBlogCategory(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'update BlogCategory error',
        });
    }
};

const deleteBlogCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await blogCategoryService.deleteBlogCategory(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'delete BlogCategory error',
        });
    }
};

module.exports = {
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};
