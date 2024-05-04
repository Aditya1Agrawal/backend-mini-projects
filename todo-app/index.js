const express =require("express")
const app =express()
require("dotenv").config()
const dbconnect=require("./config/database")
const todos =require("./routes/todos")
const PORT =process.env.PORT || 4000
app.use(express.json())

app.use("/api/v1",todos)
 
app.listen(PORT,()=>{
    console.log(`App started successfully on port number ${PORT} `)
})
dbconnect()
app.get("/",(req,res)=>{
    res.send(`<h1>This is Home Page</h1>`)
})