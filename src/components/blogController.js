import blogService from '../services/blogService';

const createBlog = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        if (!title || !description || !category) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await blogService.createBlog(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Create Blog error',
        });
    }
};

const getBlog = async (req, res) => {
    try {
        const response = await blogService.getBlog();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Get Blog error',
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, category } = req.body;
        if (Object.keys(req.body).length === 0 || !title || !description || !category) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await blogService.updateBlog(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'update Blog error',
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await blogService.deleteBlog(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'delete Blog error',
        });
    }
};

/**
 * Khi người dùng like một bài blog thì:
 * 1. check xem người dùng đó trước đó có dislike hay không => bỏ dislike
 * 2. check xem người dùng đó trước đó có like hay không => bỏ like/ thêm like
 */

const likeBlog = async (req, res) => {
    try {
        const { id } = req.user;
        const { bid } = req.body;
        if (!bid) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing data input',
            });
        }
        const response = await blogService.likeBlogService(id, bid);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(401).json({
            status: 'ERROR',
            message: 'like Blog error',
        });
    }
};

module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
};
