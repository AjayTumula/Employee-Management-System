import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

const app = express();
app.use(express.json());
const router = express.Router();
const salt = 10;
app.use(cookieParser());
app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      expires: 60 * 60 * 24,
    },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

router.post("/register", (req, res) => {
  const sql = `INSERT INTO user_login (email, password, name) VALUES (?,?,?)`;
  const password = req.body.password;
  bcrypt.hash(password.toString(), salt, (err, hash) => {
    if (err) {
      console.log(err);
    }
    connection.query(
      sql,
      [req.body.email, hash, req.body.name],
      (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true, Result: result });
      }
    );
  });
});

router.post("/login", (req, res) => {
  const sql = `SELECT * FROM user_login WHERE email = ?`;
  connection.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign({ email: email, id: result[0].id }, "jwtSecret", {
        expiresIn: "1d",
      });
      res.cookie("token", token);
      res.json({ loginStatus: true });
    } else {
      res.json({ loginStatus: false, Error: "Wrong username password" });
    }
  });
});

router.get("/department", (req, res) => {
  const sql = "SELECT * FROM department";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_department", (req, res) => {
  const sql = "INSERT INTO department (`name`) VALUES (?)";
  connection.query(sql, [req.body.name], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});

router.get("/department/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM department WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_department/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE department set name= ? Where id= ?`;
  const value = [req.body.name];
  connection.query(sql, [...value, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_department/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from department where id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.post("/add_employee", (req, res) => {
  const sql = `INSERT INTO employee_data (name, email, jobtitle, address, department_id) VALUES (?)`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.jobtitle,
    req.body.address,
    req.body.department_id,
  ];
  connection.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json({ Status: true });
  });
});

router.get("/employee", (req, res) => {
  const sql = "SELECT * FROM employee_data";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM employee_data WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});

router.put("/edit_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE employee_data set name= ?, email= ?, jobtitle= ?, address= ?, department_id= ? Where id= ?`;
  const values = [
    req.body.name,
    req.body.email,
    req.body.jobtitle,
    req.body.address,
    req.body.department_id,
  ];
  connection.query(sql, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.delete("/delete_employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = "delete from employee_data where id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = "select count(id) as employee from employee_data";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/department_count", (req, res) => {
  const sql = "select count(id) as department from department";
  connection.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as UserRouter };
