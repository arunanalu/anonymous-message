const Router = require('express');
const {
  messageCreate,
  getAll,
  getNotApprovedMessages,
} = require('../controllers/messages.controller');

const messagesRoute = new Router();

messagesRoute.post('/', messageCreate);
messagesRoute.get('/', getAll);
messagesRoute.get('/approve', getNotApprovedMessages);

module.exports = { messagesRoute };
