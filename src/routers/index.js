import userRouter from './userRouter';
import { notFound, errHandler } from '../middlewares/handleError';
const routers = (app) => {
    app.use('/api/user', userRouter);

    app.use(notFound);
    app.use(errHandler);
};

module.exports = routers;
