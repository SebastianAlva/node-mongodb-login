import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true, 
    },
    createdAt:{
        type: Date,
        required:true,
        default: Date.now
    },
})

export default mongoose.model("User", userSchema)