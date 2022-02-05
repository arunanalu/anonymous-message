/* eslint-disable no-console */
const Joi = require('joi');
const { findUser } = require('../models/userModels');
// const { loginModel } = require('../models/login');
const { allFields, incorrectData } = require('../utils/dictionary/messagesDefault');
const { unauthorized } = require('../utils/dictionary/statusCode');
const errorConstructor = require('../utils/functions/errorConstructor');
const { createToken } = require('./authService');

const loginSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().length(6).required(),
});

const loginService = async (name, password) => {
  const { error } = loginSchema.validate({ name, password });

  if (error) throw errorConstructor(unauthorized, allFields);

  const user = await findUser(name, password);

  if (!user) throw errorConstructor(unauthorized, incorrectData);

  const token = await createToken(user);

  console.log('service', user, token);

  const { type } = user;

  return {
    type,
    token,
  };
};

module.exports = { loginService };
