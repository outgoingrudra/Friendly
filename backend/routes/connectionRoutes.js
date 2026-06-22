import express from "express"
import { auth } from "../middlewares/auth.js"
import { acceptConnection, getAllConnections, getAllRequests, rejectConnection, removeConnection, sendConnection } from "../controllers/connectionControllers.js"

const connectionRouter = express.Router()

connectionRouter.get("/",auth,getAllConnections)
connectionRouter.get("/requests",auth,getAllRequests)
connectionRouter.post("/send/:userId",auth,sendConnection)
connectionRouter.put("/accept/:connectionId",auth,acceptConnection)
connectionRouter.delete("/reject/:connectionId",auth,rejectConnection)
connectionRouter.delete("/remove/:connectionId",auth,removeConnection)
export default connectionRouter