const mongoose =require("mongoose")
const nodemailer =require("nodemailer")
require("dotenv").config()

const fileschema = new  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    imageUrl:{
        type:String
    },
    tags:{
        type:String
    },
    email:{
        type:String
    }
})
fileschema.post("save",async function(doc){
    try{
        let transporter =nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        let info =await transporter.sendMail({
            from:"Aditya",
            to:doc.email,
            subject:"New file uploaded to cloudinary",
            html:`<h2>File uploaded successfully</h2> <p>Please view here:<a href=${doc.imageUrl}>${doc.imageUrl}</a></p>`
        })
        console.log(info)
    }
    catch(err){
        console.error(err)
    }
})
module.exports= mongoose.model("File",fileschema)


