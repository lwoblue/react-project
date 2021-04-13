var mysql = require("mysql2");

const con = mysql.createConnection({
  // host: "192.168.0.111",
  host: "localhost",
  user: "solomon",
  password: "admin",
  database: "react", // database name
});

module.exports = con;
