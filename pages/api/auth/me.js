import { asyncError, errorHandler } from "../../../middleware/error";
import { checkAuth } from "../../../utils/features";

const handler = asyncError(async(req,res)=>{
    if (req.method !== "GET")
        return errorHandler(req,500,"Only GET Method is allowed")

        const user = await checkAuth(req)
        if(!user)return errorHandler("Login First",res,req,401);

    res.status(200).json({
        success:true,
        user,
    })
})


export default handler;