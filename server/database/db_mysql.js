var mysql = require("mysql2");

const con = mysql.createConnection({
    host: "192.168.0.18",
    user: "solomon",
    password: "admin",
    database: "react", // database name
});

module.exports = con;