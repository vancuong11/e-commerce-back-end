import Brand from '../models/brand';

const createBrand = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Brand.create(data);
            resolve({
                status: 'OK',
                message: 'Brand created successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getBrand = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Brand.find().select('title _id');
            resolve({
                status: 'OK',
                message: 'getBrand successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateBrand = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Brand.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'OK',
                message: 'updateBrand successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteBrand = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await Brand.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'deleteBrand successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand,
};
