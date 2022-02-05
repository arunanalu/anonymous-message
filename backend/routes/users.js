const Router = require('express');
const { createANewUser } = require('../controllers/userControllers');

const usersRoute = new Router();

usersRoute.post('/users', createANewUser);

module.exports = { usersRoute };
