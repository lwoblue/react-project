var mysql = require("mysql2");

const con = mysql.createConnection({
    host: "localhost",
    user: "solomon",
    password: "admin",
    database: "react", // database name
});

module.exports = con;