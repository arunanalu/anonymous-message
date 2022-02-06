const Router = require('express');

const { createAnonymousMessage, getAnonymousMessages } = require('../controllers/anonymousMessage');
const auth = require('../middlewares/auth');

const individualMessageRoute = new Router();

individualMessageRoute.post('/:user', createAnonymousMessage);
individualMessageRoute.get('/:user', auth, getAnonymousMessages);

module.exports = { individualMessageRoute };
