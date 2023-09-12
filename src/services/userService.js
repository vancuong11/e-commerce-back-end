import User from '../models/userModel';
import bcrypt from 'bcrypt';

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

const getAllUserService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const data = await User.find();
            if (!data) {
                resolve({
                    status: 'ERROR',
                    messageL: 'User not found',
                });
            } else {
                resolve({
                    status: 'OK',
                    messageL: 'Get all users successfully',
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
            } else {
                resolve({
                    status: 'OK',
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
module.exports = {
    createUserService,
    getAllUserService,
    loginUserService,
};
