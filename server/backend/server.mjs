import express from 'express'
import {PORT,MONGO_URL} from './config/config.mjs'
import cookieParser from 'cookie-parser'
import userRouter from './routes/User.route.mjs'
import authRouter from './routes/Auth.route.mjs'
import { connectDatabase } from './config/config.mjs'
import cors from 'cors';


const app=express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)


const startServer = async () => {
  await connectDatabase()
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
  })
}
  
startServer()
