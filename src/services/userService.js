import User from '../models/user';
import { generateAccessToken, generateRefreshToken } from '../middlewares/jwt';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import sendmail from '../utils/sendMail';
import dotenv from 'dotenv';
dotenv.config();

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

const forgotPasswordService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email } = data;
            const checkEmail = await User.findOne({ email: email });
            if (!checkEmail) {
                resolve({
                    status: 'ERROR',
                    message: 'The email not found',
                });
            }

            // resetToken
            const resetToken = crypto.randomBytes(32).toString('hex');
            const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

            const response = await User.findOneAndUpdate(
                { email: email },
                {
                    passwordResetToken: passwordResetToken,
                    passwordResetExpires: Date.now() + 15 * 60 * 1000,
                },
                { new: true },
            );

            // sendmail
            const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn. Link này sẽ hết hạn sau 15p

            <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>

            `;

            const rs = await sendmail(email, html);

            resolve({
                status: 'OK',
                message: 'Success',
                data: rs,
                response,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const resetPasswordService = (pwToken, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // mã hóa password
            const hashPassword = bcrypt.hashSync(password, 10);
            const data = await User.findOneAndUpdate(
                { passwordResetToken: pwToken, passwordResetExpires: { $gt: Date.now() } },
                {
                    password: hashPassword,
                    passwordResetToken: undefined,
                    passwordChangeAt: Date.now(),
                    passwordResetExpires: undefined,
                },
                { new: true },
            );
            if (!data) {
                resolve({
                    status: 'ERROR',
                    message: 'Invalid reset token',
                });
            }
            resolve({
                status: 'OK',
                message: 'Change password success',
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await User.find().select('-password -role -refresh_token');
            if (!data) {
                resolve({
                    status: 'ERROR',
                    message: 'User not found',
                });
            }
            resolve({
                status: 'OK',
                message: 'Get all users successfully',
                data: data,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const deleteUserService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await User.findByIdAndDelete(id);
            if (!data) {
                resolve({
                    status: 'ERROR',
                    message: 'User not found',
                });
            } else {
                resolve({
                    status: 'OK',
                    message: 'Delete user successfully',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const updateUserService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                resolve({
                    status: 'ERROR',
                    message: 'User not found',
                });
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true }).select('-password -role');

            resolve({
                status: 'OK',
                message: 'Update user successfully',
                data: updateUser,
            });
        } catch (error) {
            reject(error);
        }
    });
};

const updateUserByAdminService = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ _id: id });
            if (!checkUser) {
                resolve({
                    status: 'ERROR',
                    message: 'User not found',
                });
            }
            const updateUser = await User.findByIdAndUpdate(id, data, { new: true }).select('-password -role');

            resolve({
                status: 'OK',
                message: 'Update user successfully',
                data: updateUser,
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
    forgotPasswordService,
    resetPasswordService,
    getAllUserService,
    deleteUserService,
    updateUserService,
    updateUserByAdminService,
};
