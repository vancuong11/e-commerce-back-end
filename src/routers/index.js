import userRouter from './userRouter';

const routers = (app) => {
    app.use('/api/user', userRouter);
};

module.exports = routers;
