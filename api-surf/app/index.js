// connect to my sql Database

const mysql = require("mysql");
const dbConfig = require("./config/db.config");

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("connected to my sql database: " + dbConfig.database);
  }
});

module.exports = connection;
