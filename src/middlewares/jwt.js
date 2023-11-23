import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/user';
dotenv.config();
// sign(payload, secretKey, options)

const generateAccessToken = (payload) => {
    return jwt.sign(
        {
            ...payload,
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '2d' },
    );
};
const generateRefreshToken = (payload) => {
    return jwt.sign(
        {
            ...payload,
        },
        process.env.REFRESH_TOKEN,
        { expiresIn: '7d' },
    );
};
const refreshTokenJwtService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = jwt.verify(token, process.env.REFRESH_TOKEN);
            const data = await User.findOne({ _id: response.id, refresh_token: token });
            if (!data) {
                resolve({
                    status: 'ERROR',
                    message: 'The refresh token not found',
                });
            }
            if (data) {
                // cap moi access token
                const access_token = await generateAccessToken({
                    id: data.id,
                    role: data.role,
                });
                resolve({
                    status: 'OK',
                    message: 'Success',
                    access_token: access_token,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenJwtService,
};
