import { PORT } from "./constants.js";

export function ServerRunning() {
       console.log("Server is running on PORT 🏃🏻: "+PORT)
}

export function dbConnectionSuccessful(){
    console.log("Connected successfully to MONGODB 🔗");
    
}