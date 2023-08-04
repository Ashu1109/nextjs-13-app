import { asyncError, errorHandler } from "../../../middleware/error";
import { User } from '../../../models/User'
import { connectDB, cookiesetter, generateToken } from "../../../utils/features";
import bcrypt from 'bcrypt'

const handler = asyncError(async(req,res)=>{
    if (req.method !== "POST")
        return errorHandler("Only POST Method is allowed",res,req,500)
    const { name, email, password } = req.body;
    if(!name || !email || !password) return errorHandler("Enter All Fields",res,req,400,)
    await connectDB();
    let  user = await User.findOne({email});
    if(user)return errorHandler("User Already Register",res,req,400)
    const hashedPassword = await bcrypt.hash(password,10)
    user = await User.create({name,email,password:hashedPassword})

    const token = generateToken(user._id)
    cookiesetter(res,token,true);

    res.status(201).json({
        success:true,
        message:"Registered Successfully",
        user,
    })
})


export default handler;