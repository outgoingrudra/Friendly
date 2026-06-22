import express from "express"
import { Feed, findUser, profile, updateUser, uploadImage } from "../controllers/usersControllers.js"
import { auth } from "../middlewares/auth.js"

const userRouter  = express.Router()

userRouter.get("/feed",auth,Feed)
userRouter.get("/profile",auth,profile)
userRouter.get("/:id",findUser)
userRouter.put("/update",auth,updateUser)
userRouter.put("/upload-image",auth,uploadImage)
export default userRouter
