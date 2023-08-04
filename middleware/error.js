// res,statuscode=500,message="Internal Server Error ",next
export const errorHandler = (err, res, req, next=500) =>{
    res.status( next ).json({
        success: false,
        message: err
    })
} 



export const asyncError = (passFunc) => (req,res) =>{
    return Promise.resolve(passFunc(req,res)).catch((err) => {
        return errorHandler(err.message,res,req,500)
    })
}