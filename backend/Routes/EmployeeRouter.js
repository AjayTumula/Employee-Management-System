import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express.Router()    


app.post("/employee_login", (req, res) => {
    const sql = `SELECT * FROM user_login WHERE email = ?`;
    connection.query(sql, [req.body.email], (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
          console.log(result)
          bcrypt.compare(req.body.password, result[0].password, (err, response)=> {
              if (err) return res.json({ loginStatus: false, Error: "wrong password" });
              if(response) {
                  const email = result[0].email;
                  const token = jwt.sign({ role: "employee", email: email, id: result[0].id }, "jwtSecret", {
                    expiresIn: "1d",
                  });
                  res.cookie("token", token);
                  res.json({ loginStatus: true, id: result[0].id });
              }
          }) 
      } else {
        res.json({ loginStatus: false, Error: "Wrong username password" });
      }
    });
  });

  app.get('/employee_profile/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee_data where id = ?"
    connection.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false});
         return res.json(result)
    })
  })

  app.get('/employee_logout', (req, res)=> {
    res.clearCookie('token')
    return res.json({Status: true})
  })

export {app as EmployeeRouter}