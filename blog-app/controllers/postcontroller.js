const Post =require("../models/Post")
 
exports.createpost =async(req,res)=>{
   try{
    const {title,body}=req.body;
    const post = new Post({
        title,
        body
    })
    const newpost =await post.save()
    res.json({
        success:true,
        post:newpost
    })
   }
   catch(error){
    console.error(error);
    res.status(400).json({
        success:false,
        message:"error while creating the post"
    })
   }
}
exports.getallpost =async(req,res)=>{
    try{
        const allposts =await Post.find().populate("likes").populate("comments").exec()
        res.json({
            success:true,
            post:allposts,
        })
    }
    catch(error){
        console.error(error);
        res.status(400).json({
            success:false,
            message:"Error while fetching all posts"
        })
    }
}