import { asyncError, errorHandler } from "../../../middleware/error";
import { User } from '../../../models/User'
import { connectDB, cookiesetter, generateToken } from '../../../utils/features'
import bcrypt from 'bcrypt'

const handler = asyncError(async(req,res)=>{
    if (req.method !== "POST")
        return errorHandler("Only POST Method is allowed",req,req,500)

    const { email, password } = req.body;

    if(!email || !password) return errorHandler("Enter All Fields",res,req,400)
    await connectDB();

    const  user = await User.findOne({email}).select("+password");
    if(!user)return errorHandler("Invalid Email or Password",res,req,400)
    
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch)return errorHandler("Invalid Email or Password",res,req,400)

    const token = generateToken(user._id)
    cookiesetter(res,token,true);

    res.status(200).json({
        success:true,
        message:`Welcome Back ${user.name}`,
        user,
    })
})


export default handler;