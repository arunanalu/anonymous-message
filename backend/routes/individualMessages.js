const Router = require('express');

const { createAnonymousMessage, getAnonymousMessages } = require('../controllers/anonymousMessage');

const individualMessageRoute = new Router();

individualMessageRoute.post('/:user', createAnonymousMessage);
individualMessageRoute.get('/:user', getAnonymousMessages);

module.exports = { individualMessageRoute };
