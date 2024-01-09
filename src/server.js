import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import router from './routers/index';
dotenv.config();

const app = express();
const port = process.env.PORT || 8888;
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }),
);
// config mongoDB
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
        console.log('connection DB successfully');
    })
    .catch((err) => {
        console.log(err);
    });

// config bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser
app.use(cookieParser());

// config router
router(app);

// run app
app.listen(port, () => {
    console.log('server listening on port ' + port);
});
