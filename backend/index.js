import express from "express";
import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import {exec} from "child_process";

dotenv.config({
    path: "./env"
});

const app = express();


app.use(cors({
    origin: ["http://localhost:8000","http://localhost:5173"],
    credentials: true,
}));

app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:5173");
     res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
     next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/uploads",express.static("uploads"));


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./uploads")
    },
    filename:function(req,file,cb){
        cb(null,file.fieldname+"-"+uuidv4()+path.extname(file.originalname));
    }
})

const upload = multer({storage:storage});

app.post('/upload',upload.single('file'),(req,res,next)=>{
    const file = req.file;
    if(!file){
        const error = new Error("no file"); 
        res.error(error);
        throw error;
    }
    console.log(file);
    res.json({
        message:"file uploaded successfully"
    })
})

app.get('/',function(req,res){
     res.json({messsage:" server is working"})
})


app.listen(process.env.PORT,()=>{
    console.log(`server is running on port ${process.env.PORT}`);
})


