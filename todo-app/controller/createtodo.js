const Todo=require("../models/Todo")

exports.createtodo= async(req,res)=>{
try{
    const {title,description}=req.body;
    const response =await Todo.create({title,description})
    res.status(200).json({
        success:true,
        data:response,
        message:"Entry created in db successfully"
    })
}
catch(error){
    console.error(error)
    res.status(500).json({
        success:false,
        data:"internal server error",
        message:error.message
    })
}
}