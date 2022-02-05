const mongodb = require('mongodb').MongoClient;

const { MONGODB_URI } = process.env;
const DB_NAME = 'anonymous';

const connect = () => mongodb.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(DB_NAME))
  .catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  });

module.exports = connect;
