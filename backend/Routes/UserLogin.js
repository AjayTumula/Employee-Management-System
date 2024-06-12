import express from "express";
import connection from "../database.js";
import jwt from "jsonwebtoken"


const router = express.Router();

router.post('/login', (req, res) => {
    const sql = "SELECT * from user_login Where email = ? and password = ?";
    connection.query(sql, [req.body.email, req.body.password], (err, result) => {
        
        if(err) return res.status(500).json({ loginStatus: false, msg: "Connection failed" })
         
          
            if(result.length > 0) {
                const email = result[0].email;
                const token = jwt.sign({role: "user", email: email, id: result[0].id}, "jwt_key", {expiresIn: "1d"});
                res.cookie('token', token)
                return res.json({loginStatus: true})
            } else {
                return res.json({
                    loginStatus: false,
                    msg: "Wrong credentials"
                })
            }
        
    })
})

export {router as UserRouter}