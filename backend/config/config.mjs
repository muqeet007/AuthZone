import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

export const PORT=process.env.PORT || 3000
export const MONGO_URL=process.env.MONGO_URL
export const SECRET_KEY = process.env.SECRET_KEY


export const connectDatabase=()=>{mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Database connected successfully");
})
  .catch(error => {
    console.log(`Error: ${error.message}`);
  })
}
