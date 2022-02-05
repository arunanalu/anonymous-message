const loginRoute = require('express').Router();

const { loginController } = require('../controllers/login');

loginRoute.post('/login', loginController);

module.exports = { loginRoute };
