import Product from '../models/product';
import ProductCategory from '../models/productCategory';
import data from '../../data/ecommerce.json';
import categoryData from '../../data/cate_brand';
import slugify from 'slugify';

const fn = async (product) => {
    await Product.create({
        name: product?.name,
        slug: slugify(product?.name) + Math.round(Math.random() * 100) + ' ',
        description: product?.description,
        brand: product?.brand,
        price: Math.round(Number(product?.price?.match(/\d/g).join('')) / 100),
        category: product?.category[1],
        quantity: Math.round(Math.random() * 1000),
        sold: Math.round(Math.random() * 100),
        images: product?.images,
        color: product?.variants?.find((el) => el.label === 'Color')?.variants[0],
        thumb: product?.thumb,
        totalRatings: Math.round(Math.random() * 5),
    });
};

const insertProduct = async (req, res) => {
    try {
        const promises = [];
        for (let product of data) {
            promises.push(fn(product));
        }
        await Promise.all(promises);
        return res.status(200).json('OK');
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'ERROR',
            message: 'insert data error',
        });
    }
};

const fn2 = async (cate) => {
    await ProductCategory.create({
        title: cate?.cate,
        brand: cate?.brand,
        image: cate?.image,
    });
};

const insertCategory = async (req, res) => {
    try {
        const promises = [];
        console.log(categoryData);
        for (let cate of categoryData) {
            promises.push(fn2(cate));
        }
        await Promise.all(promises);
        return res.status(200).json('OK');
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: 'ERROR',
            message: 'insert category error',
        });
    }
};

module.exports = {
    insertProduct,
    insertCategory,
};
