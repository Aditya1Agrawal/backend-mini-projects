const express =require("express")
const router =express.Router()

const {localUpload,imageUpload,videoUpload,imageSizeReducer}=require("../controllers/fileupload")

router.post("/localupload",localUpload)
router.post("/imageupload",imageUpload)
router.post("/videoUpload",videoUpload)
router.post("/imagesizereducer",imageSizeReducer)


module.exports =router