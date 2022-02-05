const Router = require('express');
const { messageCreate, getAll } = require('../controllers/messages.controller');

const messagesRoute = new Router();

messagesRoute.post('/', messageCreate);
messagesRoute.get('/', getAll);

module.exports = { messagesRoute };
