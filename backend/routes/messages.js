const Router = require('express');
const {
  messageCreate,
  getAllApproved,
  getNotApprovedMessages,
  updateMessageApproved,
  messageDelete,
} = require('../controllers/messages.controller');
const authAdmin = require('../middlewares/authAdmin');

const messagesRoute = new Router();

messagesRoute.post('/', messageCreate);
messagesRoute.get('/', getAllApproved);
messagesRoute.get('/approve', getNotApprovedMessages);
messagesRoute.put('/approve/:id', authAdmin, updateMessageApproved);
messagesRoute.delete('/approve/:id', authAdmin, messageDelete);

module.exports = { messagesRoute };
