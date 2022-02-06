const joi = require('@hapi/joi');
const errHandle = require('./errorConstructor');
const status = require('../dictionary/statusCode');
const errMsg = require('../dictionary/messagesDefaultPt');
const dontSay = require('../dictionary/invalidWords');
const { findUser } = require('../../models/userModels');

const messageOk = (message) => {
  const words = message.toLowerCase().split(' ');
  const badWords = dontSay.filter((ds) => words.find((wrd) => wrd === ds));
  if (badWords.length > 0) throw errHandle(status.unauthorized, errMsg.badMessage);
};

const messageValidation = (message) => {
  const messageSchema = joi.string().min(5).max(288).required();
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
  if (type !== 'user') throw errHandle(status.badRequest, errMsg.onlyUser);

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

const messagesEmpty = (msg) => {
  if (msg.length === 0) throw errHandle(status.notFound, errMsg.noMessages);
};

const onlyAdminValidations = (type) => {
  if (type !== 'admin') throw errHandle(status.unauthorized, errMsg.onlyAdmins);
};

const getPrivateMessagesValidation = (routeName, tokenName) => {
  if (routeName !== tokenName) throw errHandle(status.unauthorized, errMsg.notCorrectUser);
};

module.exports = {
  messageValidation,
  messageOk,
  userEntriesValidation,
  userAlreadyExists,
  loginValidation,
  authorizationValidate,
  tokenValidation,
  messagesEmpty,
  onlyAdminValidations,
  getPrivateMessagesValidation,
};
