import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config({
    path: "./env"
});

const app = express();


app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));




app.get('/',function(req,res){
     res.json({messsage:"server is working"})
})


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})


