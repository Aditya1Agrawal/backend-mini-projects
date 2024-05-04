const express = require("express")
require("dotenv").config()
const routes =require("./routes/user")
const dbconnect =require("./config/dataabase")
const cookieParser =require("cookie-parser")
const app =express()
const PORT =process.env.PORT || 4000
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1",routes)
dbconnect()
app.listen(PORT,()=>{
    console.log(`App is succesfully running on ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send(`<h1>This is Home Page</h1>`)
})