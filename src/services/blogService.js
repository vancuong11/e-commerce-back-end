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

const getAllBlog = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Blog.find();
            resolve({
                status: 'OK',
                message: 'getAllBlog successfully',
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

const disLikeBlogService = (id, bid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blog = await Blog.findById(bid);
            const alreadyLiked = blog?.likes.find((el) => el.toString() === id);
            if (alreadyLiked) {
                const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: id } }, { new: true });
                resolve({
                    status: 'OK',
                    response: response,
                });
            }

            const isDisLiked = blog?.dislikes.find((el) => el.toString() === id);
            if (isDisLiked) {
                const response = await Blog.findByIdAndUpdate(bid, { $pull: { dislikes: id } }, { new: true });
                resolve({
                    status: 'OK',
                    response: response,
                });
            } else {
                const response = await Blog.findByIdAndUpdate(bid, { $push: { dislikes: id } }, { new: true });
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

const getDetailBlogService = (bid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
                .populate('likes', 'firstName lastName')
                .populate('dislikes', 'firstName lastName');
            if (!blog) {
                resolve({
                    status: 'OK',
                    message: 'Not found blog',
                });
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: blog,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createBlog,
    getAllBlog,
    updateBlog,
    deleteBlog,
    likeBlogService,
    disLikeBlogService,
    getDetailBlogService,
};
