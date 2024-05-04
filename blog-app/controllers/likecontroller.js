const Post =require("../models/Post")
const Like =require("../models/Like")

exports.likepost =async(req,res)=>{
   try{
    const {post,user}=req.body;
    const like =new Like({
        post,
        user
    })
    const savedlike =await like.save()
    const updatedpost = await Post.findByIdAndUpdate(post,{$push: {likes:savedlike._id}},{new:true}).populate("likes").exec()
    res.json({
        success:true,
        message:"post liked successfully",
        post:updatedpost,
    })
   }
   catch(error){
    console.error(error)
    res.status(400).json({
        success:false,
        message:"issue in liking post",
        err:error.message
    })
   }
}
exports.unlikepost =async(req,res)=>{
   try{
    const {post,like}=req.body;
    const deletelike =await Like.findByIdAndDelete({_id:like})
    const updatedpost =await Post.findByIdAndUpdate(post,{$pull :{likes:deletelike._id}},{new:true}).populate("likes").exec()
    res.json({
        success:true,
        post:updatedpost,
    })
   }
   catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        err:error.message,
        message:"can't unlike the post"
    })
   }
}