import express from "express"
import { auth } from "../middlewares/auth.js"
import { getMessage, markAsSeen, sendMessage } from "../controllers/messageControllers.js"

const  messageRouter = express.Router()

messageRouter.post("/send",auth,sendMessage)
messageRouter.put("/seen/:chatId",auth,markAsSeen)
messageRouter.get("/:chatId",auth,getMessage)

export default messageRouter
