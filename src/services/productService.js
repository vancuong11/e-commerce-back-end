import Product from '../models/product';
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

const getAllProductService = (query) => {
    return new Promise(async (resolve, reject) => {
        try {
            const queries = { ...query };
            // tách các trường đặc biệt ra khỏi query
            const excludeFields = ['limit', 'sort', 'page', 'fields'];
            excludeFields.forEach((item) => delete queries[item]);

            // format lại các operators cho đúng cú pháp mongoose
            let queryString = JSON.stringify(queries);
            queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, (matchedElement) => `$${matchedElement}`);
            const formatedQueries = JSON.parse(queryString);

            // filtering
            if (queries?.name) {
                formatedQueries.name = { $regex: queries.name, $options: 'i' };
            }
            // initial
            let queryCommand = Product.find(formatedQueries);

            //    sorting
            if (query.sort) {
                const sortBy = query.sort.split(',').join(' ');
                queryCommand = queryCommand.sort(sortBy);
            } else {
                queryCommand = queryCommand.sort('-createdAt');
            }

            // Select pattern  .select("firstParam secondParam"), it will only show the selected field, add minus sign for excluding (include everything except the given params)
            if (query.fields) {
                const fields = query.fields.split(',').join(' ');
                queryCommand = queryCommand.select(fields);
            } else {
                queryCommand = queryCommand.select('-__v');
            }

            // // 4) Pagination
            // page=2&limit=10, 1-10 page 1, 11-20 page 2, 21-30 page 3
            const page = +query.page * 1 || 1;
            const limit = +query.limit * 1 || process.env.LIMIT_PRODUCT;
            const skip = (page - 1) * limit;

            queryCommand = queryCommand.skip(skip).limit(limit);

            // find product
            const tours = await queryCommand;
            const counts = await Product.find(formatedQueries).countDocuments();

            resolve({
                status: 'OK',
                message: 'Get All Products successfully',
                data: tours,
                counts,
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

const ratingsProductService = (id, star, comment, pid) => {
    return new Promise(async (resolve, reject) => {
        try {
            const ratingProduct = await Product.findById(pid);
            const alreadyRating = ratingProduct?.ratings?.find((item) => item.postedBy.toString() === id);
            if (alreadyRating) {
                // update star and comment
                await Product.updateOne(
                    {
                        // filter
                        ratings: { $elemMatch: alreadyRating },
                    },
                    {
                        // update data
                        $set: { 'ratings.$.star': star, 'ratings.$.comment': comment },
                    },
                    { new: true },
                );
            } else {
                // add star and comment
                const response = await Product.findByIdAndUpdate(
                    pid,
                    {
                        $push: { ratings: { star: star, comment: comment, postedBy: id } },
                    },
                    { new: true },
                );
            }

            // sum ratings
            const updatedProduct = await Product.findById(pid);
            const ratingCount = updatedProduct.ratings.length;
            const sumRatings = updatedProduct.ratings.reduce((sum, el) => {
                return sum + el.star;
            }, 0);
            updatedProduct.totalRatings = Math.round((sumRatings * 10) / ratingCount) / 10;

            await updatedProduct.save();

            resolve({
                status: 'OK',
                message: 'Update Ratings Products successfully',
                updatedProduct,
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
    ratingsProductService,
};
