const File =require("../models/File")
const cloudinary =require("cloudinary").v2

exports.localUpload = async(req,res)=>{
    try{
        const file =req.files.file
        console.log(file)
        let path =__dirname +"/files/"+Date.now()+`.${file.name.split('.')[1]}`
        console.log(path)
        file.mv(path,(error)=>{console.log(error)})
        res.json({
            success:true,
            message:"local file uploaded successfully"
        })
    }
    catch(err){
        console.log("Not able to upload file on server")
        console.error(err);
    }
}
function isFileSupported(fileType,supportedType){
    return supportedType.includes(fileType)
    
}
async function uploadFileToCloudinary(file,folder,quality) {
  const options ={folder}
  
  if(quality){
    options.quality =quality
  }
  options.resource_type ="auto"
  return await cloudinary.uploader.upload(file.tempFilePath,options)
}
exports.imageUpload =async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file =req.files.imageFile
        const fileType = file.name.split(".")[1].toLowerCase()
        const supportedType = ["jpg","jpeg","png"]
        if(!isFileSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }
        console.log(name +" "+ tags+ " "+email +" "+fileType+" ")
        const response =await uploadFileToCloudinary(file,"Storage")
        const dbentry =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
        return res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"file uploaded successfully",
        })

    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
exports.videoUpload =async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file =req.files.videoFile
        const fileType = file.name.split(".")[1].toLowerCase()
        const supportedType = ["mp4","mov"]
        if(!isFileSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }
        const response =await uploadFileToCloudinary(file,"Storage")
        const dbentry =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
         res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"file uploaded successfully",
        })

    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
exports.videoUpload =async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file =req.files.videoFile
        const fileType = file.name.split(".")[1].toLowerCase()
        const supportedType = ["mp4","mov"]
        if(!isFileSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }
        const response =await uploadFileToCloudinary(file,"Storage")
        const dbentry =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
         res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"file uploaded successfully",
        })

    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}
exports.imageSizeReducer =async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        const file =req.files.imageFile
        const fileType = file.name.split(".")[1].toLowerCase()
        const supportedType = ["jpeg","jpg","png"]
        if(!isFileSupported(fileType,supportedType)){
           return res.status(400).json({
                success:false,
                message:"File format is not supported"
            })
        }
        const response =await uploadFileToCloudinary(file,"Storage",50)
        const dbentry =await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url
        })
         res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:"file uploaded successfully",
        })

    }
    catch(err){
        console.error(err)
        res.status(500).json({
            success:false,
            message:"something went wrong"
        })
    }
}