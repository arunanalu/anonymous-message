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
  const messageSchema = joi.string().min(2).max(100).required();
  const { error } = messageSchema.validate(message);
  if (error) throw errHandle(status.badRequest, errMsg.invalidMessage);
  messageOk(message);
};

const userAlreadyExists = async (name) => {
  const user = await findUser(name);
  if (user) throw errHandle(status.conflict, errMsg.userExists);
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

  await userAlreadyExists(name);
};

module.exports = {
  messageValidation,
  messageOk,
  userEntriesValidation,
  userAlreadyExists,
};
