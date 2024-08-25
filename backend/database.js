import mysql from "mysql2";
import 'dotenv/config';

const connection = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

connection.connect(function (err) {
  if (err) {
    console.log("Error connecting " + err.stack);
  } else {
    console.log("Success connecting");
  }
});

export default connection;
