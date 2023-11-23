import userRouter from './userRouter';
import productRouter from './productRouter';
import productCategoryRouter from './productCategory';
import blogCategoryRouter from './blogCategory';
import blogRouter from './blog';
import brand from './brand';
import coupon from './coupon';
import order from './order';
import { notFound, errHandler } from '../middlewares/handleError';
const routers = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);
    app.use('/api/productcategory', productCategoryRouter);
    app.use('/api/blogcategory', blogCategoryRouter);
    app.use('/api/blog', blogRouter);
    app.use('/api/brand', brand);
    app.use('/api/coupon', coupon);
    app.use('/api/order', order);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = routers;
