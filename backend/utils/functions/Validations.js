const joi = require('@hapi/joi');
const errHandle = require('./errorConstructor');
const status = require('../dictionary/statusCode');
const errMsg = require('../dictionary/messagesDefault');
const dontSay = require('../dictionary/invalidWords');
const { findUser } = require('../../models/userModels');

const messageOk = (message) => {
  const words = message.toLowerCase().split(' ');
  const badWords = dontSay.filter((ds) => words.find((wrd) => wrd === ds));
  if (badWords.length > 0) throw errHandle(status.unauthorized, errMsg.badMessage);
};

const messageValidation = (message) => {
  const messageSchema = joi.string().min(2).max(100).required();
  const { error } = messageSchema.validate(message);
  if (error) throw errHandle(status.badRequest, errMsg.invalidMessage);
  messageOk(message);
};

const userAlreadyExists = async (name) => {
  const user = await findUser(name);
  return user;
};

const userEntriesValidation = async (name, password, type) => {
  const userSchema = joi.object({
    name: joi.string().min(3).required(),
    password: joi.string().min(6).required(),
    type: joi.string().required(),
  });
  const { error } = userSchema.validate({ name, password, type });
  if (error) throw errHandle(status.badRequest, errMsg.invalidEntry);

  const user = await userAlreadyExists(name);
  if (user) throw errHandle(status.conflict, errMsg.userExists);
};

const loginValidation = async (name, password) => {
  const loginSchema = joi.object({
    name: joi.string().required(),
    password: joi.string().length(6).required(),
  });
  const { error } = loginSchema.validate({ name, password });
  if (error) throw errHandle(status.badRequest, errMsg.invalidEntry);

  const user = await userAlreadyExists(name);
  if (!user) throw errHandle(status.unauthorized, errMsg.incorrectData);

  return user;
};

const authorizationValidate = (auth) => {
  const isValidAuth = joi.string().required();
  const { error } = isValidAuth.validate(auth);
  if (error) throw errHandle(status.unauthorized, errMsg.missingAuth);
};

const tokenValidation = (token) => {
  if (!token) throw errHandle(status.unauthorized, errMsg.jwtMalformed);
};

module.exports = {
  messageValidation,
  messageOk,
  userEntriesValidation,
  userAlreadyExists,
  loginValidation,
  authorizationValidate,
  tokenValidation,
};
