import express from "express"
import { getAllChats, getChat } from "../controllers/chatControllers.js"
import { auth } from "../middlewares/auth.js"
const  chatRouter = express.Router()

chatRouter.get("/all",auth,getAllChats)
chatRouter.get("/:id",auth,getChat)

export default chatRouter
