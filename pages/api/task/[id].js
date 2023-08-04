import { connectDB , checkAuth } from '../../../utils/features'
import { asyncError, errorHandler } from '../../../middleware/error'
import { Task } from '../../../models/Task'

const handler = asyncError(async (req, res) => {
    await connectDB()
    const user = await checkAuth(req)
    if(!user)return errorHandler("Login First",res,req,401);
    
    
    const taskId = req.query.id;
    
    const task = await Task.findById(taskId);
    if(!task)return errorHandler("Task Not Found",res,req,404)
    if (req.method === "PUT"){
        
        task.isCompleted = !task.isCompleted;

        await task.save();
        res.status(200).json({
            success:true,
            message:"Task Updated Successfully"
        })
    }

    else if(req.method === "DELETE"){
        await Task.deleteOne({_id:taskId});
        res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })
    }
    else{
        return errorHandler("Only PUT And DELETE Method is allowed",res,req,400)
    }
})
export default handler