import mongoose from "mongoose"
import { MONGODB_URI } from "../utils/constants.js"
import { dbConnectionSuccessful } from "../utils/callbacks.js"

export default async function connectDB(){
   try {
        await mongoose.connect(MONGODB_URI)
        dbConnectionSuccessful()
   } catch (error) {
      console.log("Error in config/db.js file ")
      console.log(error)
      process.exit(1)
   }
}