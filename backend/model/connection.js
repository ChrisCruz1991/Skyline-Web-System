const mysql = require("mysql");
require("dotenv/config");

const config = {
  host: process.env.HOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB,
  insecureAuth: true
};

const pool = mysql.createConnection(config);

module.exports = pool;
