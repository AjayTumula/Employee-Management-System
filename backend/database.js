
const mysql = require("mysql");

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'employee',
    user: 'root',
    password: ''
})

connection.connect(function(err) {
    if(err) {
        console.log("Error connecting")
    } else {
        console.log("Success connecting")
    }
})

module.exports = connection;