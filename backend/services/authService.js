const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const JWT_CONFIG = {
    expiresIn: '1h',
    algorithm: 'HS256',
};

const createToken = (data) => jwt.sign({ data }, JWT_SECRET, JWT_CONFIG );

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const { data } = decoded;
        console.log('JWT', data);
        return data;
    } catch (error) {
        console.log('erroToken', error);
        return error;
    }
};

module.exports = {
    createToken,
    verifyToken,
};
