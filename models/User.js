import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        unique:true,
        require:true,
    },
    password:{
        type:String,
        require:true,
        select:false,
        minlength:[6,"Password is too short"],
    },
    
})


export const User = mongoose.models.User ||  mongoose.model("User",schema)







// mongoose.model = {};