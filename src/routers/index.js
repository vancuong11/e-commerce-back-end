import userRouter from './userRouter';
import productRouter from './productRouter';
import { notFound, errHandler } from '../middlewares/handleError';
const routers = (app) => {
    app.use('/api/user', userRouter);
    app.use('/api/product', productRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = routers;
