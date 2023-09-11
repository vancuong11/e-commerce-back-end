import userService from '../services/userService';

const createUser = async (req, res) => {
    try {
        const data = req.body;
        const response = await userService.createUserService(data);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createUser,
};
