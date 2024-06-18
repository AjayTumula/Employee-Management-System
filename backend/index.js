import { UserRouter } from "./Routes/UserRouter.js";
import express from "express";
import cors from "cors";
import { EmployeeRouter } from "./Routes/EmployeeRouter.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser())
app.use("/auth", UserRouter);
app.use("/auth", EmployeeRouter);

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(token) {
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) return res.json({Status: false, Error: "Wrong Token"})
                req.id = decoded.id;
                req.role = decoded.role;
                next();
        })
    } else {
        res.json({Status: false, Error: "Not authenticated"})
    }
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({Status: true, role: req.role, id: req.id})
})

app.listen(3000, () => {
  console.log("Sever is listening");
});
