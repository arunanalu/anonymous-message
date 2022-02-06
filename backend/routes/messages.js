const Router = require('express');
const {
  messageCreate,
  getAllApproved,
  getNotApprovedMessages,
  updateMessageApproved,
  messageDelete,
} = require('../controllers/messages.controller');

const messagesRoute = new Router();

messagesRoute.post('/', messageCreate);
messagesRoute.get('/', getAllApproved);
messagesRoute.get('/approve', getNotApprovedMessages);
messagesRoute.put('/approve/:id', updateMessageApproved);
messagesRoute.delete('/approve/:id', messageDelete);

module.exports = { messagesRoute };
