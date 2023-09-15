import Product from '../models/productModel';
import slugify from 'slugify';

const createProductService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, price, brand, slug, description } = data;

            const response = await Product.create({
                name: name,
                slug: slugify(name),
                price: price,
                brand: brand,
                description: description,
            });

            resolve({
                status: 'OK',
                message: 'Product created successfully',
                data: response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getDetailsProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Product.findById(id);
            if (!data) {
                resolve({
                    status: 'ERROR',
                    message: 'Product not found',
                });
            }
            resolve({
                status: 'OK',
                message: 'Get Details Products successfully',
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllProductService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Product.find();
            if (!data) {
                resolve({
                    status: 'ERROR',
                    message: 'Product not found',
                });
            }
            resolve({
                status: 'OK',
                message: 'Get All Products successfully',
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteProductService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await Product.findByIdAndDelete(id);
            if (!data) {
                resolve({
                    status: 'ERROR',
                    message: 'Product not found',
                });
            }
            resolve({
                status: 'OK',
                message: 'Delete Products successfully',
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateProductService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, price, brand, slug, description } = data;

            const res = await Product.findByIdAndUpdate(
                id,
                {
                    name: name,
                    price: price,
                    brand: brand,
                    slug: slugify(name),
                    description: description,
                },
                { new: true },
            );
            if (!res) {
                resolve({
                    status: 'ERROR',
                    message: 'Product not found',
                });
            }
            resolve({
                status: 'OK',
                message: 'Update Products successfully',
                data: res,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createProductService,
    getDetailsProductService,
    getAllProductService,
    deleteProductService,
    updateProductService,
};
