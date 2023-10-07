import Blog from '../models/blog';

const createBlog = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Blog.create(data);
            resolve({
                status: 'OK',
                message: 'Blog created successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getBlog = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Blog.find();
            resolve({
                status: 'OK',
                message: 'getBlog successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateBlog = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Blog.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'updateBlog successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteBlog = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Blog.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'deleteBlog successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const likeBlogService = (id, bid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blog = await Blog.findById(bid);
            const alreadyDisliked = blog?.dislikes.find((el) => el.toString() === id);
            if (alreadyDisliked) {
                const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: id } }, { new: true });
                resolve({
                    status: 'OK',
                    response: response,
                });
            }

            const isLiked = blog?.likes.find((el) => el.toString() === id);
            if (isLiked) {
                const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: id } }, { new: true });
                resolve({
                    status: 'OK',
                    response: response,
                });
            } else {
                const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: id } }, { new: true });
                resolve({
                    status: 'OK',
                    response: response,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    likeBlogService,
};
