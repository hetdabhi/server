import mongoose from "mongoose";
const userschemas = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        age:{
            type:Number,
            required:true
        },
        token:{
           type:String,
           default:""
        }
    },
    {
        timestamps:true
    }
   
)

const User= mongoose.model('User',userschemas);

export default User;