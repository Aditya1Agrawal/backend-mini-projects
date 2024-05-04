const Todo =require("../models/Todo")
exports.gettodo=async(req,res)=>{
    try{
        const response =await Todo.find({})
        res.status(200).json({
            success:true,
            data:response,
            message:"all data is fetched"
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            success:false,
            error:error.message,
            message:"server error"
        })
    }
}
exports.gettodobyid=async(req,res)=>{
    try{
        const id =req.params.id
        const response =await Todo.findById({_id:id})
        if(!response){
            res.status(500).json({
                success:false,
                message:"No data is found by given id"
            })
        }
        res.status(200).json({
            success:true,
            data:response,
            message:`Todos found with given ${id}`
        })
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            error:error.message,
            message:"server error"
        })
    }
}