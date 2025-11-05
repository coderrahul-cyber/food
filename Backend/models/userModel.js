import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email : {
        type:String,
        required: true,
        unique:true
    },
    name : {
        type:String,
        required: true,
        
    },
    password : {
        type:String,
        required: true
    },
    cartData : {
        type:Object,
        default : {}
    }
},{minimize : false});

const userModel = mongoose.model.user || mongoose.model("user" , userSchema);

export default userModel ;