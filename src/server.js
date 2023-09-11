import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import router from './routers/index';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

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

// config router
router(app);

// run app
app.listen(port, () => {
    console.log('server listening on port ' + port);
});
