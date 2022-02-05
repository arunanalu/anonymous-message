const Router = require('express');
const { createANewUser, findAnExistingUser, getAllUsers } = require('../controllers/userControllers');

const usersRoute = new Router();

usersRoute.post('/users', createANewUser);
usersRoute.get('/users/:name', findAnExistingUser);
usersRoute.get('/users', getAllUsers);

module.exports = { usersRoute };
