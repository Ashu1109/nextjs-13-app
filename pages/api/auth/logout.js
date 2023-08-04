import { asyncError, errorHandler } from "../../../middleware/error";
import {  cookiesetter  } from "../../../utils/features";

const handler = asyncError(async(req,res)=>{
    if (req.method !== "GET")
        return errorHandler("Only GET Method is allowed",res,req,500)

    cookiesetter(res,null,false);

    res.status(200).json({
        success:true,
        message:`Logged Out Successfully`,
    })
})


export default handler;