const Router = require('express');
const { createANewUser, findAnExistingUser, getAllUsers } = require('../controllers/userControllers');

const usersRoute = new Router();

usersRoute.get('/users', getAllUsers);
usersRoute.get('/users/:name', findAnExistingUser);
usersRoute.post('/users', createANewUser);

module.exports = { usersRoute };
