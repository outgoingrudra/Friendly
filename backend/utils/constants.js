import dotenv from"dotenv"

dotenv.config()

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI
export const JWT_SECRET = process.env.JWT_SECRET

export const  IMAGEKIT_PUBLIC_KEY =  process.env.IMAGEKIT_PUBLIC_KEY
export const IMAGEKIT_PRIVATE_KEY =  process.env.IMAGEKIT_PRIVATE_KEY
export const IMAGEKIT_URL_ENDPOINT =  process.env.IMAGEKIT_URL_ENDPOINT