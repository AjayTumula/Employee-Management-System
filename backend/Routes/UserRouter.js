import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken"


const router = express.Router();

router.post('/login', (req, res) => {
    const sql = "SELECT * from user_login Where email = ? and password = ?";
    connection.query(sql, [req.body.email, req.body.password], (err, result) => {
        
        if(err) return res.status(500).json({ loginStatus: false, Error: "Connection failed" })
            if(result.length > 0) {
                const email = result[0].email;
                const token = jwt.sign({role: "user", email: email, id: result[0].id}, "jwt_key", {expiresIn: "1d"});
                res.cookie('token', token)
                return res.json({loginStatus: true})
            } else {
                return res.json({
                    loginStatus: false,
                    Error: "Wrong credentials"
                })
            }
        
    })
})

router.get('/department', (req, res) => {
    const sql = "SELECT * FROM department";
    connection.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true, Result: result})
    })
})

router.post('/add_department', (req, res) => {
    const sql = "INSERT INTO department (`name`) VALUES (?)";
    connection.query(sql, [req.body.department], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
            return res.json({Status: true})
    })
})

 

router.post('/add_employee', (req, res) => {
    
    const sql = `INSERT INTO employee_data (name, email, jobtitle, address, department_id) VALUES (?)`;  
        const value = [
            req.body.name,
            req.body.email,
            req.body.jobtitle,
            req.body.address,
            req.body.department_id,
        ];
        // const departmentId = parseInt(req.body.department_id);
    
        // if (isNaN(departmentId) || !Number.isInteger(departmentId)) {
        //     return res.status(400).json({ error: "Department ID must be a valid integer." });
        // }
        connection.query(sql, [value] , (err, result) => {
            if(err) return res.json(err)
                return res.json({Status: true});
        })
})

export {router as UserRouter}