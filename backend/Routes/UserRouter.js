import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const salt = 10;

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

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    jwt.verify(token, "jwtSecret", (err, decoded) => {
      if (err) {
        res.json({ auth: false, message: "you are failed to authenticate" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

router.get("/isUserAuth", verifyJWT, (req, res) => {
  return res.json("You are authenticated Congrats:");
});

router.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

router.post("/login", (req, res) => {
  const sql = `SELECT * FROM user_login WHERE email = ?`;
  connection.query(sql, [req.body.email], (err, result) => {
    if(err) {
      return res.json("Error");
    }
    if(result.length > 0) {
      bcrypt.compare(req.body.password.toString(), result[0].password, (err, result) => {
        if(result) {
          const id = result[0].id;
          const token = jwt.sign({id}, "jwtSecret", {
            expiresIn: "1d",
          });
        //   req.session.user = result;
        //   console.log(req.session.user);
        return res.json({ auth: true, token: token, loginStatus: true });
        } else {
          res.json({auth: false, message: "Wrong username password"});
        }
      });
    } else {
        return res.json("Failed")
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
  connection.query(sql, [req.body.department], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
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
