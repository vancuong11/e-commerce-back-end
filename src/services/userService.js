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

            const user = await User.create({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: hashPassword,
                phone: phone,
            });
            if (user) {
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: user,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createUserService,
};
