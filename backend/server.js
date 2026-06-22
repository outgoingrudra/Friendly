import express from "express"
import { dbConnectionSuccessful, ServerRunning } from "./utils/callbacks.js"
import { PORT } from "./utils/constants.js"
import connectDB from "./configs/db.js"
import authRouter from "./routes/authRoutes.js"
import userRouter from "./routes/usersRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors";
import connectionRouter from "./routes/connectionRoutes.js"
import { connectRabbitMQ } from "./configs/rabbitmq.js";



const app = express()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
    origin: true ,
    credentials: true,
  })
); 

app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/connection",connectionRouter)
connectDB()
connectRabbitMQ();
app.listen(PORT,ServerRunning)