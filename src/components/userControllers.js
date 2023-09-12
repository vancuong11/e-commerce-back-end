import userService from '../services/userService';
import jwtToken from '../middlewares/jwt';

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

module.exports = {
    createUser,
    getCurrentUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
};
