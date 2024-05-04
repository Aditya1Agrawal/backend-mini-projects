const express =require("express")
const app =express()
const db =require("./config/database")
const cloudinary =require("./config/cloudinary")
const fileroutes =require("./routes/Fileupload")
require("dotenv").config()
const PORT =process.env.PORT || 4000
const fileUpload =require("express-fileupload")
app.use(express.json())
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
app.use("/api/v1/upload",fileroutes)
db.connect()
cloudinary.connect()
app.listen(PORT,()=>{
    console.log(`App is succesfully running on ${PORT}`)
})