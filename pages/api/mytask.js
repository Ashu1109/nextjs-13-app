import { connectDB , checkAuth } from '../../utils/features'
import { asyncError, errorHandler } from '../../middleware/error'
import { Task } from '../../models/Task'

const handler = asyncError(async (req, res) => {
    if (req.method !== "GET")
    return errorHandler("Only GET Method is allowed",res,req,500)
    await connectDB()
    const user = await checkAuth(req)
    if(!user)return errorHandler("Login First",res,req,401);

    const tasks = await Task.find({user:user._id})
    res.json({
        success: true,
        tasks,
    })
})
export default handler