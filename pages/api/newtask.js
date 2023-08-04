import { checkAuth, connectDB } from '../../utils/features'
import { asyncError, errorHandler } from '../../middleware/error'
import { Task } from '../../models/Task'

const handler = asyncError(async (req, res) => {
    if (req.method !== "POST")
    return errorHandler("Only POST Method is allowed",res,req,500)
    await connectDB()

    const { title, description } = req.body;
    if(!title || !description) return errorHandler("Please Enter All Field",res,req,400)

    const user = await checkAuth(req)
    if(!user)return errorHandler("Login First",res,req,401);

    await Task.create({
        title,
        description,
        user:user._id
    })

 
    res.json({
        success: true,
        message: "Task Created"
    })
})
export default handler