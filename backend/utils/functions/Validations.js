const joi = require('@hapi/joi');
const errHandle = require('./errorConstructor');
const status = require('../dictionary/statusCode');
const errMsg = require('../dictionary/messagesDefault');
const dontSay = require('../dictionary/invalidWords');

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
  return message;
};

module.exports = {
  messageValidation,
  messageOk,
};
