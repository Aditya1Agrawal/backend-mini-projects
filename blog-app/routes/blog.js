const express =require("express");
const router =express.Router()
const {createcomment}=require("../controllers/commentcontroller")
const {likepost,unlikepost}=require("../controllers/likecontroller")
const {createpost,getallpost}=require("../controllers/postcontroller")

router.get("/posts",getallpost)
router.post("/posts/create",createpost)
router.post("/comments/create",createcomment)
router.post("/likes/like",likepost)
router.post("/likes/unlike",unlikepost)

module.exports =router;