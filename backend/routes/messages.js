const Router = require('express');
const { messageCreate } = require('../controllers/messages.controller');

const messagesRoute = new Router();

messagesRoute.post('/', messageCreate);

module.exports = { messagesRoute };
