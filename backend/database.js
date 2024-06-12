
import mysql from 'mysql2'

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1311',
    database: 'employee',
})

connection.connect(function(err) {
    if(err) {
        console.log("Error connecting " + err.stack)
    } else {
        console.log("Success connecting")
    }
})


export default connection;