import { UserRouter } from "./Routes/UserRouter.js";
import express from 'express';
import cors from 'cors';
import jwt from "jsonwebtoken";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}    
));

app.use(express.json())
app.use('/auth', UserRouter)
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
    },
}))

app.listen(3000, ()=> {
    console.log("Sever is listening")
})
