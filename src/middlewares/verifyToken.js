import jwt from 'jsonwebtoken';

const verifyAccessToken = async (req, res, next) => {
    if (req.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    status: 'ERROR',
                    message: 'The authentication',
                });
            }
            // gang decode => req.user
            req.user = decode;
            next();
        });
    } else {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Required authorization',
        });
    }
};

const verifyIsAdmin = async (req, res, next) => {
    const { role } = req.user;

    if (role !== 'admin') {
        return res.status(401).json({
            status: 'ERROR',
            message: 'Required admin role',
        });
    } else {
        next();
    }
};

module.exports = {
    verifyAccessToken,
    verifyIsAdmin,
};
