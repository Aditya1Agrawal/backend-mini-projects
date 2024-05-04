const jwt =require("jsonwebtoken")
require("dotenv").config()

exports.auth =(req,res,next)=>{
    try{
        const token =req.body.token || req.cookies.adityacookie || req.header("Authorization").replace("Bearer ","");
        console.log(token)
        if(!token || token ==undefined){
            return res.status(401).json({
                success:false,
                message:"token is missing"
            })
        }
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET)
            console.log(payload)
            req.user=payload;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid"
            })
        }
       next()

    }
    catch(err){
        console.error(err)
        return res.status(401).json({
            success:false,
            message:"Error occured while verifying the token",
            error:err
        })
    }
}
exports.isStudent =(req,res,next)=>{
    try{
        if(req.user.role!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for student"
            })
        }
        next()
    }
    catch(err){
        console.error(err)
        return res.status(401).json({
            success:false,
            message:"User is not matching",
            error:err
        })
    }
}
exports.isAdmin =(req,res,next)=>{
    try{
        if(req.user.role!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is the protected route for admin"
            })
        }
        next()
    }
    catch(err){
        console.error(err)
        return res.status(401).json({
            success:false,
            message:"User is not matching",
            error:err
        })
    }
}
