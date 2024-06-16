import { UserRouter } from "./Routes/UserRouter.js";
import express from 'express';
import cors from 'cors';


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}    
));

app.use(express.json())
app.use('/auth', UserRouter)



app.listen(3000, ()=> {
    console.log("Sever is listening")
})
