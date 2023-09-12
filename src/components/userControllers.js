import userService from '../services/userService';

const createUser = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phone } = req.body;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password || !firstName || !lastName || !phone) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required',
            });
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is email',
            });
        }
        const response = await userService.createUserService(data);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The input is required',
            });
        }
        const response = await userService.loginUserService(data);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

const getAllUser = async (req, res) => {
    try {
        const response = await userService.getAllUserService();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUser,
    getAllUser,
    loginUser,
};
