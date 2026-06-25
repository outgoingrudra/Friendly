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
import http from "http"
import {initializeSocket} from "./utils/socket.js"
import chatRouter from "./routes/chatRouter.js"
import messageRouter from "./routes/messageRouter.js"



const app = express()
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(
  cors({
   origin: "https://friendly-frontend-omega.vercel.app",
  // origin : "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth",authRouter)
app.use("/user",userRouter)
app.use("/connection",connectionRouter)
app.use("/chat",chatRouter)
app.use("/message",messageRouter)


connectDB()

try {
  connectRabbitMQ();
} catch (err) {
  console.log("RabbitMQ connection skipped:", err.message);
}


const server = http.createServer(app)
initializeSocket(server)
server.listen(PORT,ServerRunning)