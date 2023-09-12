import User from '../models/userModel';
import { generateAccessToken, generateRefreshToken } from '../middlewares/jwt';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, email, password, phone } = data;
        try {
            const checkEmail = await User.findOne({ email: email });
            if (checkEmail !== null) {
                resolve({
                    status: 'ERROR',
                    message: 'The email is already',
                });
            }
            // mã hóa password
            const hashPassword = bcrypt.hashSync(password, 10);

            const createUser = await User.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashPassword,
                phone: phone,
            });
            if (createUser) {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: createUser,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const getCurrentUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await User.findById(id).select('-password -role -refresh_token');
            if (!data) {
                resolve({
                    status: 'ERROR',
                    messageL: 'User not found',
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Get users successfully',
                    data: data,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const loginUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = data;
        try {
            const checkUser = await User.findOne({ email: email });
            if (!checkUser) {
                resolve({
                    status: 'ERROR',
                    message: 'The email is not defined',
                });
            }
            // compare the password
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({
                    status: 'ERROR',
                    message: 'The password is not correct',
                });
            }
            // generate access, refresh token
            const access_token = generateAccessToken({
                id: checkUser._id,
                role: checkUser.role,
            });
            const refresh_token = generateRefreshToken({
                id: checkUser._id,
                role: checkUser.role,
            });
            // save refresh token into DB
            await User.findByIdAndUpdate(checkUser._id, { refresh_token: refresh_token }, { new: true });
            resolve({
                status: 'OK',
                access_token,
                refresh_token,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const logoutService = (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await User.findOneAndUpdate(
                { refresh_token: token },
                { refresh_token: '' },
                { new: true },
            );
            if (!response) {
                resolve({
                    status: 'ERROR',
                    message: 'The refresh token is not found',
                });
            }
            resolve({
                status: 'OK',
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createUserService,
    getCurrentUserService,
    loginUserService,
    logoutService,
};
