const mongoose=require("mongoose")
require("dotenv").config()
exports.connect=()=>{
    mongoose.connect(process.env.DB_URL,{
       useNewUrlParser:true,
       useUnifiedTopology:true,
    })
    .then(console.log("DB connection successfull"))
    .catch((err)=>{
        console.error(err)
        console.log("Error in DB connection")
        process.exit(1)
    })
}