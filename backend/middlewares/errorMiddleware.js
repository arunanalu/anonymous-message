/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

const errorMiddleware = (error, req, res, next) => {
  if (error.status) {
    const { status, message } = error;
    return res.status(status).json(message);
  }
  console.log(error);
  return res.status(500).json({ message: 'Internal error' });
};

module.exports = { errorMiddleware };
