import userService from '../services/userService';
import jwtToken from '../middlewares/jwt';
import crypto from 'crypto';

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
        const response = await userService.createUserService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
};

// refresh token => cap moi access token
// access token => xac thuc nguoi dung, phan quyen nguoi dung
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
        //destructuring rests JS get data refresh_token
        const { refresh_token, ...newResponses } = response;
        // save refresh_token in cookie
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: 'strict',
        });
        return res.status(200).json(newResponses);
    } catch (error) {
        console.log(error);
    }
};

const getCurrentUser = async (req, res) => {
    try {
        // get id from file verify token
        const { id } = req.user;
        const response = await userService.getCurrentUserService(id);
        return res.status(200).json(response);
    } catch (error) {}
};

const refreshAccessToken = async (req, res) => {
    try {
        // lay token tu cookie
        const cookie = req.cookies;
        // check xem token co hay khong
        if (!cookie && !cookie.refresh_token) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The token is not in cookies',
            });
        }
        const response = await jwtToken.refreshTokenJwtService(cookie.refresh_token);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message,
        });
    }
};

const logoutUser = async (req, res) => {
    try {
        // lay token tu cookie
        const cookie = req.cookies;
        // check xem token co hay khong
        if (!cookie || !cookie.refresh_token) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'The token is not in cookies',
            });
        }
        const response = await userService.logoutService(cookie.refresh_token);
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: 'OK',
            message: 'Logout successfully',
        });
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: error.message,
        });
    }
};

// flow reset password
/*
- client send email
- Server check email có hợp lệ hay không -> gửi mail -> kèm theo link (change password)
- client check email -> click link
- client gửi api kèm theo token
- check token có giống với token mà server gửi mail hay
- change password 
*/

const forgotPassword = async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing email',
            });
        }
        const response = await userService.forgotPasswordService(data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Error forgot password',
        });
    }
};

const restPassword = async (req, res) => {
    try {
        const { password, token } = req.body;
        if (!token || !password) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required input',
            });
        }
        const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');

        const response = await userService.resetPasswordService(passwordResetToken, password);
        return res.status(200).json(response);
        // return res.status(200);
    } catch (error) {
        console.log(error);
    }
};

// CRUD
const getAllUser = async (req, res) => {
    try {
        const response = await userService.getAllUserService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Invalid data',
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required id',
            });
        }
        const response = await userService.deleteUserService(id);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Invalid data',
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!id) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required id',
            });
        }
        const response = await userService.updateUserService(id, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Invalid data',
        });
    }
};

const updateUserByAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!id || Object.keys(data).length === 0) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required input',
            });
        }
        const response = await userService.updateUserByAdminService(id, data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Invalid data',
        });
    }
};

const updateAddressUser = async (req, res) => {
    try {
        const { id } = req.user;
        if (!req.body.address) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required input',
            });
        }
        const response = await userService.updateAddressUserByAdminService(id, req.body.address);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json({
            status: 'ERROR',
            message: 'Invalid data',
        });
    }
};

const updateCartUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { pid, quantity, color } = req.body;
        if (!pid || !quantity || !color) {
            return res.status(200).json({
                status: 'ERROR',
                message: 'Missing required input',
            });
        }
        const response = await userService.updateCartUserService(id, req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 'ERROR',
            message: 'Invalid data',
        });
    }
};

module.exports = {
    createUser,
    getCurrentUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    forgotPassword,
    restPassword,
    getAllUser,
    deleteUser,
    updateUser,
    updateUserByAdmin,
    updateAddressUser,
    updateCartUser,
};
