import mongoose from "mongoose";
const schema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    user:{
        type:String,
        require:true,
        ref:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})


export const Task = mongoose.models.Task ||  mongoose.model("Task", schema);