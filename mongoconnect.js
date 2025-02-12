import dotenv from "dotenv";
import express from 'express';
import bodyparser from 'body-parser' ;             
import mongoose from "mongoose";
import cors from 'cors';
import route  from "./routes/userroute.js";
dotenv.config();


const app=express();
const PORT=process.env.PORT;
const URL=process.env.MONGOURL;
app.use(cors());


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        
        app.listen(PORT,()=>{
        console.log(`Server is running on http://localhost:${PORT}`);
    })}
        
    )
    .catch((err)=>console.error("Connection Failed",err))

  
    app.use('/api', route);
