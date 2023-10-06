import BlogCategory from '../models/blogCategory';

const createBlogCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await BlogCategory.create(data);
            resolve({
                status: 'OK',
                message: 'BlogCategory created successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getBlogCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await BlogCategory.find().select('title _id');
            resolve({
                status: 'OK',
                message: 'getBlogCategory successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateBlogCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await BlogCategory.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'updateBlogCategory successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteBlogCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await BlogCategory.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'deleteBlogCategory successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createBlogCategory,
    getBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
};
