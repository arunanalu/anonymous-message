const Joi = require('joi');
const { loginModel } = require('../models/login');
const { allFields, incorrectData } = require('../utils/dictionary/messagesDefault');
const { unauthorized } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');

const loginSchema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().length(6).required(),
});

const loginService = async (name, password) => {
    const { error } = loginSchema.validate({ name, password });

    if (error) throw errorConstructor(unauthorized, allFields);

    const user = await loginModel(name, password);

    if (!user) throw errorConstructor(unauthorized, incorrectData);

    console.log('service', user);

    return user;
};

module.exports = { loginService };
