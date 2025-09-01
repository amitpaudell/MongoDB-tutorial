const { MongoClient } = require('mongodb');

let dbConnection;

exports.connectToDB = (callback) => {
  MongoClient.connect('mongodb://localhost:27017/bookstore')
    .then((client) => {
      dbConnection = client.db();
      return callback();
    })
    .catch((err) => {
      console.log(err);
      return callback(err);
    });
};

exports.getDB = () => {
  return dbConnection;
};
