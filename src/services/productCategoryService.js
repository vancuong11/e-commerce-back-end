import ProductCategory from '../models/productCategory';

const createCategory = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await ProductCategory.create(data);
            resolve({
                status: 'OK',
                message: 'Category created successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getCategory = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await ProductCategory.find();
            resolve({
                status: 'OK',
                message: 'getCategory successfully',
                prod: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateCategory = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await ProductCategory.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'updateCategory successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await ProductCategory.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'deleteCategory successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory,
};
