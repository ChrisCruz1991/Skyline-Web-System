const mysql = require("mysql");

const config = {
  host: "127.0.0.1",
  user: "root",
  password: "Chrisstacey1991!",
  database: "mech-2-tech",
  insecureAuth: true
};

const pool = mysql.createConnection(config);

module.exports = pool;
