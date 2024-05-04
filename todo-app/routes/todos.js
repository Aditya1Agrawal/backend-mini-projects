const express =require("express")
const router =express.Router()

const {createtodo}=require("../controller/createtodo")
const {deletetodo}=require("../controller/deletetodo")
const {gettodo,gettodobyid}=require("../controller/gettodo")
const {updatetodo}=require("../controller/updatetodo")
router.get("/getTodos",gettodo)
router.get("/getTodos/:id",gettodobyid)
router.delete("/deleteTodo/:id",deletetodo)
router.post("/createTodo",createtodo)
router.put("/updateTodo/:id",updatetodo)

module.exports =router