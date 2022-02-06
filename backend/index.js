/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { individualMessagesRoute } = require('./routes/individualMessages');
const { messagesRoute } = require('./routes/messages');
const { usersRoute } = require('./routes/users');
const { loginRoute } = require('./routes/login');

const { PORT } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.send('App is working!'));
app.use(usersRoute);
app.use('/messages', messagesRoute);
app.use(individualMessagesRoute);
app.use(loginRoute);


app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

module.exports = app;