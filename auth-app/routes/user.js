const express =require("express")
const router=express.Router()

const {signup,login}=require("../controller/Auth")
const {auth,isStudent,isAdmin}=require("../middleware/auth")

router.post("/login",login)
router.post("/signup",signup)

// protected route
router.get("/student",auth,isStudent,(req,res)=>{
    return res.status(400).json({
        success:true,
        message:"Welcome to protected route for student"
    })
})
router.get("/admin",auth,isAdmin,(req,res)=>{
    return res.status(400).json({
        success:true,
        message:"Welcome to protected route for admin"
    })
})
module.exports =router