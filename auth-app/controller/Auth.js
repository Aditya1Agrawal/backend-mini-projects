const User =require("../models/User")
const bcrypt =require("bcrypt")
const jwt =require("jsonwebtoken")
require("dotenv").config()

exports.signup =async(req,res)=>{
    try{
        const {name,email,password,role}=req.body
    const olduser = await User.findOne({email})
    if(olduser){
       return res.status(400).json({
            success:false,
            message:"User already exist"
        })
    }
    let hashedPassword 
    try{
        hashedPassword =await bcrypt.hash(password,10)
    }
    catch(err){
       return res.status(500).json({
            success:false,
            message:"Error in hashing password"
        })
    }
    const user = await User.create({
        name,
        email,
        password:hashedPassword,
        role
    
    })
    return res.status(200).json({
        success:true,
        user,
        message:"user registered successfully"
    })
    }
    catch(err){
        console.error(err)
      return  res.status(500).json({
            success:false,
            error:err
        })
    }
}
exports.login=async(req,res)=>{
try{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Please fill all the details"
        })
    }
    let user = await User.findOne({email})
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User doesn't exist"
        })
    }
    const payload ={
        email,
        id:user._id,
        role:user.role
    }
    if(await bcrypt.compare(password,user.password)){
        const token =jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })
        user =user.toObject();
        user.token =token;
        user.password=undefined;
        const options={
            expires:new Date(Date.now()+24*60*60*1000),
            httpOnly :true,
        }
      return  res.cookie("adityacookie",token,options).status(200).json({
            success:true,
            token,
            user, 
            message:"User logged in successfully"
        })

    }
    else {
        return res.status(403).json({
            success:false,
            message:"password is incorrect"
        })
    }

}
catch(err){
    console.error(err)
    return res.status(500).json({
        success:false,
        message:"error in logging the user",
        error:err,
    })
}
}