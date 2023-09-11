import User from '../models/userModel';

const createUserService = (data) => {
    return new Promise(async (resolve, reject) => {
        const { firstName, lastName, email, password } = data;
        try {
            if (!firstName || !lastName || !email || !password) {
                resolve({
                    status: 'ERROR',
                    message: 'The input is required',
                });
            } else {
                const user = await User.create(data);
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
