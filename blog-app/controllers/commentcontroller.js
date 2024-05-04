const Comment =require("../models/Comment");
const Post =require("../models/Post")

exports.createcomment =async(req,res)=>{
    try{
        const {post,user,body}=req.body;
        const comment =new Comment({
            post,
            user,
            body
        })
        const newcomment = await comment.save()
        const updatedpost =await Post.findByIdAndUpdate(post,{$push :{comments:newcomment._id}},{new:true})
        .populate("comments").exec()
        res.json({
            success:true,
            post:updatedpost,
        })
    }
    catch(error){
        console.error(error)
        res.status(400).json({
            success:false,
            message:"issue in commenting on post "
        })
    }
}